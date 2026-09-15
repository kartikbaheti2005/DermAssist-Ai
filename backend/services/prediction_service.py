from time import perf_counter

from sqlalchemy.orm import Session

from models.image import Image
from models.prediction import Prediction
from models.user import User

from services.notification_service import (
    create_notification,
    notify_high_risk_prediction,
    notify_prediction_completed,
)

# =====================================================
# Placeholder ML Functions
# Future:
# YOLO + ConvNeXt + ViT + LLM
# =====================================================

def predict_image(image_path: str):
    """
    Temporary placeholder.

    Future:
        - Lesion Detection
        - Disease Classification
        - Risk Assessment
        - LLM Reasoning

    Returns prediction dictionary.
    """

    return {
        "predicted_label": "Model Not Connected",
        "confidence_score": 0.0,
        "risk_level": "unknown",
        "stage_used": "placeholder",
        "model_version": "v0.0",
    }


def generate_heatmap(image_path: str):
    """
    Future GradCAM / Explainability module.
    """

    return {
        "heatmap_overlay_path": None,
        "heatmap_only_path": None,
    }


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

    notify_prediction_completed(
        db=db,
        user_id=current_user.id,
        prediction_label=prediction.predicted_label,
    )
    
    if (
        prediction.risk_level
        and prediction.risk_level.lower() == "high"
    ):
        notify_high_risk_prediction(
            db=db,
            user_id=current_user.id,
        )

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

    return 

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
        raise ValueError(
            "Prediction not found"
        )

    return {
        "prediction": {
            "id": prediction.id,
            "disease": prediction.predicted_label,
            "confidence": prediction.confidence_score,
            "risk_level": prediction.risk_level,
            "stage": prediction.stage_used,
            "model_version": prediction.model_version,
            "processing_time_ms": prediction.processing_time_ms,
        },

        "explanation": {
            "summary":
                "Explainable AI will be available after ML model integration.",

            "limitations": [
                "This prediction is generated by an AI model.",
                "It is not a confirmed medical diagnosis.",
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
        raise ValueError(
            "Prediction not found"
        )

    return {
        "prediction_id": prediction.id,

        "overlay_image":
            prediction.heatmap_overlay_path,

        "heatmap_image":
            prediction.heatmap_only_path,

        "available": bool(
            prediction.heatmap_overlay_path
            or prediction.heatmap_only_path
        ),

        "message": (
            "Heatmap available."
            if (
                prediction.heatmap_overlay_path
                or prediction.heatmap_only_path
            )
            else
            "Heatmap will be generated after ML integration."
        ),
    }