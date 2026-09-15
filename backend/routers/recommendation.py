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

from services.recommendation_service import (
    recommend_doctors,
)

router = APIRouter(
    prefix="/recommendations",
    tags=["Doctor Recommendations"],
)


# =====================================================
# Doctor Recommendation
# =====================================================

@router.get(
    "/prediction/{prediction_id}"
)
def recommendation_by_prediction(
    prediction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user
    ),
):
    try:

        return recommend_doctors(
            db,
            prediction_id,
            current_user.id,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )