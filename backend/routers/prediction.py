from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from models.image import Image
from database.session import get_db

from core.dependencies import (
    get_current_user,
)

from schemas.prediction import (
    PredictionRequest,
)

from services.prediction_service import (
    create_prediction,
    get_prediction,
    get_user_predictions,
    delete_prediction,
    get_prediction_explanation,
    get_prediction_heatmap,
)

router = APIRouter(
    tags=["Predictions"],
)


# =====================================================
# Create Prediction
# =====================================================

@router.post("/predict")
def predict_image_route(
    payload: PredictionRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:

        prediction = create_prediction(
            db,
            current_user,
            payload.image_id,
        )

        return {
            "message":
                "Prediction completed",
            "prediction":
                prediction.to_dict(),
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# =====================================================
# Prediction History
# =====================================================

@router.get("/predictions")
def prediction_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    predictions = get_user_predictions(
        db,
        current_user.id,
    )

    return [
        prediction.to_dict()
        for prediction in predictions
    ]


# =====================================================
# Single Prediction
# =====================================================

@router.get("/predictions/{prediction_id}")
def prediction_detail(
    prediction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    prediction = get_prediction(
        db,
        prediction_id,
        current_user.id,
    )

    image = (
        db.query(Image)
          .filter(Image.id == prediction.image_id)
          .first()
    )

    if not prediction:

        raise HTTPException(
            status_code=404,
            detail="Prediction not found",
        )

    return {

        **prediction.to_dict(),

        "image": {

            "id": image.id,

            "image_path": image.image_path,

            "image_name": image.image_name,

            "body_part": image.body_part,

            "lesion_id": image.lesion_id,

            "is_followup": image.is_followup,

            "uploaded_at": image.uploaded_at,

            "image_format": image.image_format,

            "image_size_kb": image.image_size_kb,

        }

    }


# =====================================================
# Delete Prediction
# =====================================================

@router.delete(
    "/predictions/{prediction_id}"
)
def delete_prediction_route(
    prediction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:

        delete_prediction(
            db,
            prediction_id,
            current_user.id,
        )

        return {
            "message":
                "Prediction deleted"
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
    
@router.get(
    "/predictions/{prediction_id}/explanation"
)
def prediction_explanation(
    prediction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user,
    ),
):
    try:

        return get_prediction_explanation(
            db,
            prediction_id,
            current_user.id,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )
    
@router.get(
    "/predictions/{prediction_id}/heatmap"
)
def prediction_heatmap(
    prediction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user,
    ),
):
    try:

        return get_prediction_heatmap(
            db,
            prediction_id,
            current_user.id,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )