from time import perf_counter

from sqlalchemy.orm import Session

from models.image import Image
from models.prediction import Prediction
from models.user import User


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