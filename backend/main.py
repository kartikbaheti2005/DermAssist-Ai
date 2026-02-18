from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import cv2
import os
from io import BytesIO
from PIL import Image

app = FastAPI(
    title="DermAssist AI Backend",
    description="AI-powered skin cancer screening API",
    version="1.0.0"
)

# ─── CORS Configuration ───────────────────────────────────────────────────────
# Allows the React frontend (localhost:5173) to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Load TFLite Model ────────────────────────────────────────────────────────
MODEL_PATH = "skin_cancer_model.tflite"
interpreter = None
input_details = None
output_details = None

if not os.path.exists(MODEL_PATH):
    print(f"⚠️  WARNING: Model file '{MODEL_PATH}' not found.")
    print("   Please copy your skin_cancer_model.tflite into the backend/ folder.")
    print("   The /predict endpoint will return an error until the model is loaded.")
else:
    try:
        interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
        interpreter.allocate_tensors()
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        print("✅ Model loaded successfully.")
    except Exception as e:
        print(f"❌ Error loading model: {e}")


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
async def predict(file: UploadFile = File(...)):
    if interpreter is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please add skin_cancer_model.tflite to the backend folder and restart the server."
        )

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

    try:
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {str(e)}")

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

    return {
        "diagnosis": prediction,
        "diagnosis_name": name_map[prediction],
        "risk_level": risk_map[prediction],
        "confidence": round(confidence, 4),  # 0.0 – 1.0 (frontend multiplies by 100)
        "all_scores": {classes[i]: round(float(output_data[0][i]), 4) for i in range(len(classes))}
    }
