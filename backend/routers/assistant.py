from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import get_current_user

from services.assistant_service import (
    get_assistant_context,
    get_assistant_suggestions,
    get_assistant_actions,
    submit_assistant_feedback,
    get_prediction_heatmap,
)

from schemas.assistant import (
    AssistantFeedbackRequest,
)

router = APIRouter(
    prefix="/assistant",
    tags=["Assistant"],
)


@router.get("/context")
def assistant_context(
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user,
    ),
):
    return get_assistant_context(
        db,
        current_user,
    )

@router.get("/suggestions")
def assistant_suggestions(
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user,
    ),
):
    return get_assistant_suggestions(
        db,
        current_user,
    )

@router.get("/actions")
def assistant_actions(
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user,
    ),
):
    return get_assistant_actions(
        db,
        current_user,
    )

@router.post("/feedback")
def assistant_feedback(
    payload: AssistantFeedbackRequest,
    current_user=Depends(
        get_current_user,
    ),
):
    return submit_assistant_feedback(
        current_user,
        payload.rating,
        payload.feedback,
    )
