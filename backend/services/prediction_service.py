from time import perf_counter

from sqlalchemy.orm import Session

from models.image import Image
from models.prediction import Prediction
from models.user import User

from core.config import MODEL_PATH
from ml_models.inference import predict_image as run_model_prediction
from ml_models.gradcanm import generate_gradcam
from services.risk_engine import assess_screening_risk


def serialize_prediction(prediction: Prediction) -> dict:
    result = prediction.to_dict()
    result.update(assess_screening_risk(prediction.risk_level))
    return result

# =====================================================
# ML Inference
# =====================================================

def predict_image(image_path: str):
    """Run the production DermAssist AI EfficientNet-B0 V1 model."""
    return run_model_prediction(
        image_path=image_path,
        model_path=MODEL_PATH,
    )


def generate_heatmap(image_path: str):
    return generate_gradcam(
        image_path=image_path,
        model_path=MODEL_PATH,
        output_dir="uploads/heatmaps",
    )
    


# =====================================================
# Create Prediction
# =====================================================

def create_prediction(
    db: Session,
    current_user: User,
    image_id: int,
):
    image = (
        db.query(Image)
        .filter(
            Image.id == image_id,
            Image.user_id == current_user.id,
        )
        .first()
    )

    if not image:
        raise ValueError(
            "Image not found"
        )

    start_time = perf_counter()

    prediction_result = predict_image(
        image.image_path
    )

    heatmaps = generate_heatmap(
        image.image_path
    )

    processing_time = int(
        (perf_counter() - start_time)
        * 1000
    )

    prediction = Prediction(
        image_id=image.id,
        user_id=current_user.id,

        predicted_label=
            prediction_result[
                "predicted_label"
            ],

        confidence_score=
            prediction_result[
                "confidence_score"
            ],

        risk_level=
            prediction_result[
                "risk_level"
            ],

        stage_used=
            prediction_result[
                "stage_used"
            ],

        model_version=
            prediction_result[
                "model_version"
            ],

        processing_time_ms=
            processing_time,

        heatmap_overlay_path=
            heatmaps[
                "heatmap_overlay_path"
            ],

        heatmap_only_path=
            heatmaps[
                "heatmap_only_path"
            ],

        status="completed",
    )

    db.add(prediction)

    db.commit()

    db.refresh(prediction)

    return prediction


# =====================================================
# Get Prediction
# =====================================================

def get_prediction(
    db: Session,
    prediction_id: int,
    user_id: int,
):
    prediction = (
        db.query(Prediction)
        .filter(
            Prediction.id == prediction_id,
            Prediction.user_id == user_id,
        )
        .first()
    )

    return prediction


# =====================================================
# Get User Predictions
# =====================================================

def get_user_predictions(
    db: Session,
    user_id: int,
):
    return (
        db.query(Prediction)
        .filter(
            Prediction.user_id == user_id
        )
        .order_by(
            Prediction.created_at.desc()
        )
        .all()
    )


# =====================================================
# Delete Prediction
# =====================================================

def delete_prediction(
    db: Session,
    prediction_id: int,
    user_id: int,
):
    prediction = (
        db.query(Prediction)
        .filter(
            Prediction.id == prediction_id,
            Prediction.user_id == user_id,
        )
        .first()
    )

    if not prediction:
        raise ValueError(
            "Prediction not found"
        )

    db.delete(prediction)

    db.commit()

    return True

def get_prediction_explanation(
    db: Session,
    prediction_id: int,
    user_id: int,
):
    prediction = get_prediction(
        db,
        prediction_id,
        user_id,
    )

    if not prediction:
        raise ValueError("Prediction not found")

    return {
        "prediction": {
            "id": prediction.id,
            "disease": prediction.predicted_label,
            "confidence": prediction.confidence_score,
            "risk_level": prediction.risk_level,
            "stage": prediction.stage_used,
            "model_version": prediction.model_version,
            "processing_time_ms": prediction.processing_time_ms,
            "risk_assessment": assess_screening_risk(prediction.risk_level),
        },

        "explanation": {
            "summary": (
                "This result was generated by the "
                "DermAssist AI EfficientNet-B0 screening model."
            ),

            "limitations": [
                "This prediction is generated by an AI screening model.",
                "It is not a confirmed medical diagnosis.",
                "The model is intended for cancer-related high-risk screening.",
                "Consult a qualified dermatologist for medical advice.",
            ],
        },
    }

def get_prediction_heatmap(
    db: Session,
    prediction_id: int,
    user_id: int,
):
    prediction = get_prediction(
        db,
        prediction_id,
        user_id,
    )

    if not prediction:
        raise ValueError("Prediction not found")

    from pathlib import Path
    from PIL import Image as PILImage

    def public_upload_url(file_path):
        if not file_path:
            return None
        path = Path(file_path)
        try:
            relative = path.resolve().relative_to(Path("uploads").resolve())
        except ValueError:
            return None
        if not path.is_file():
            return None
        return "/uploads/" + relative.as_posix()

    heatmap_url = public_upload_url(prediction.heatmap_only_path)
    overlay_url = public_upload_url(prediction.heatmap_overlay_path)
    image_metadata = None
    if heatmap_url:
        try:
            with PILImage.open(prediction.heatmap_only_path) as image:
                image_metadata = {
                    "width": image.width,
                    "height": image.height,
                    "format": image.format,
                }
        except (OSError, ValueError):
            image_metadata = None

    available = bool(heatmap_url and overlay_url)
    return {
        "prediction_id": prediction.id,
        "heatmap_available": available,
        "heatmap_url": heatmap_url,
        "overlay_url": overlay_url,
        "image_metadata": image_metadata,
        "message": None if available else (
            "Grad-CAM evidence is unavailable for this prediction."
        ),
        "model_version": prediction.model_version,
    }

