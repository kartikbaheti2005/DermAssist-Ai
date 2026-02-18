from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import cv2
import os
import time
from typing import Optional
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, User
from models.images import Image
from models.prediciton import Prediction
import auth
from auth import get_current_user

app = FastAPI(
    title="DermAssist AI Backend",
    description="AI-powered skin cancer screening API",
    version="1.0.0"
)

# ─── Create DB tables on startup ─────────────────────────────────────────────
Base.metadata.create_all(bind=engine)

# ─── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Auth Router ──────────────────────────────────────────────────────────────
app.include_router(auth.router)

# ─── Load TFLite Model ────────────────────────────────────────────────────────
MODEL_PATH = "skin_cancer_model.tflite"
interpreter = None
input_details = None
output_details = None

if not os.path.exists(MODEL_PATH):
    print(f"⚠️  WARNING: Model file '{MODEL_PATH}' not found.")
else:
    try:
        interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
        interpreter.allocate_tensors()
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        print("✅ Model loaded successfully.")
    except Exception as e:
        print(f"❌ Error loading model: {e}")


# ─── DB Dependency ────────────────────────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ─── Image Preprocessing ──────────────────────────────────────────────────────
def preprocess_for_tflite(image_data: bytes) -> np.ndarray:
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Could not decode image. Please upload a valid JPEG or PNG.")
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (128, 128))
    img_array = img.astype('float32') / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


# ─── Routes ───────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "message": "DermAssist AI Backend is running.",
        "model_loaded": interpreter is not None,
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": interpreter is not None}


@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    if interpreter is None:
        raise HTTPException(status_code=503, detail="Model not loaded.")

    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{file.content_type}'. Only JPEG and PNG are accepted."
        )

    contents = await file.read()

    try:
        input_data = preprocess_for_tflite(contents)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    start_time = time.time()
    try:
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {str(e)}")

    processing_ms = int((time.time() - start_time) * 1000)

    classes = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']
    idx = int(np.argmax(output_data))
    prediction = classes[idx]
    confidence = float(output_data[0][idx])

    risk_map = {
        'mel': 'High Risk', 'bcc': 'High Risk', 'akiec': 'High Risk',
        'bkl': 'Moderate Risk', 'df': 'Moderate Risk', 'vasc': 'Moderate Risk',
        'nv': 'Low Risk',
    }
    name_map = {
        'mel': 'Melanoma', 'bcc': 'Basal Cell Carcinoma',
        'akiec': 'Actinic Keratosis', 'bkl': 'Benign Keratosis',
        'df': 'Dermatofibroma', 'vasc': 'Vascular Lesion',
        'nv': 'Melanocytic Nevi',
    }

    # ── Save scan to DB if user is logged in ──────────────────────────────────
    if current_user:
        try:
            # Save image record
            import uuid, json
            image_name = f"{uuid.uuid4().hex}.{file.filename.split('.')[-1] if file.filename else 'jpg'}"
            image_record = Image(
                image_name=image_name,
                image_path=f"uploads/{image_name}",
                image_format=file.content_type,
                image_size_kb=len(contents) // 1024,
                user_id=current_user.id,
            )
            db.add(image_record)
            db.flush()  # get image_record.id without committing

            # Save prediction record
            scan_record = Prediction(
                predicted_label=prediction,
                confidence_score=round(confidence, 4),
                model_version="v1.0",
                processing_time_ms=processing_ms,
                raw_output=json.dumps({classes[i]: round(float(output_data[0][i]), 4) for i in range(len(classes))}),
                extra_metadata=json.dumps({"risk_level": risk_map[prediction], "diagnosis_name": name_map[prediction]}),
                status="completed",
                user_id=current_user.id,
                image_id=image_record.id,
            )
            db.add(scan_record)
            db.commit()
        except Exception as e:
            db.rollback()
            print(f"⚠️ Could not save scan to DB: {e}")

    return {
        "diagnosis": prediction,
        "diagnosis_name": name_map[prediction],
        "risk_level": risk_map[prediction],
        "confidence": round(confidence, 4),
        "all_scores": {classes[i]: round(float(output_data[0][i]), 4) for i in range(len(classes))}
    }


# ─── User scan history ────────────────────────────────────────────────────────
@app.get("/user/scans")
def get_user_scans(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    import json
    scans = db.query(Prediction).filter(
        Prediction.user_id == current_user.id
    ).order_by(Prediction.created_at.desc()).all()

    result = []
    for scan in scans:
        extra = {}
        try:
            extra = json.loads(scan.extra_metadata) if scan.extra_metadata else {}
        except Exception:
            pass
        result.append({
            "id": scan.id,
            "predicted_label": scan.predicted_label,
            "confidence_score": scan.confidence_score,
            "risk_level": extra.get("risk_level", ""),
            "diagnosis_name": extra.get("diagnosis_name", scan.predicted_label),
            "processing_time_ms": scan.processing_time_ms,
            "created_at": str(scan.created_at),
        })
    return result


# ─── Extended /auth/me with full profile ─────────────────────────────────────
@app.get("/user/me")
def get_full_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    total_scans = db.query(Prediction).filter(Prediction.user_id == current_user.id).count()
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "username": current_user.username,
        "email": current_user.email,
        "phone_number": current_user.phone_number,
        "gender": current_user.gender,
        "date_of_birth": str(current_user.date_of_birth) if current_user.date_of_birth else None,
        "role": current_user.role,
        "is_active": current_user.is_active,
        "total_scans": total_scans,
        "created_at": str(current_user.created_at),
    }