from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

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

    if not prediction:

        raise HTTPException(
            status_code=404,
            detail="Prediction not found",
        )

    return prediction.to_dict()


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