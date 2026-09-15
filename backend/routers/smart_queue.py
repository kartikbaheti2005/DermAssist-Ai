

from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from database.session import get_db

from services.smart_queue_service import (
    build_queue,
    get_queue,
    get_queue_summary,
    get_doctor_queue,
)

router = APIRouter(
    prefix="/queue",
    tags=["Smart Queue"],
)

@router.post("/rebuild")
def rebuild_queue(
    db: Session = Depends(get_db),
):
    return build_queue(db)

@router.get("")
def queue(
    db: Session = Depends(get_db),
):
    return get_queue(db)

@router.get("/summary")
def queue_summary(
    db: Session = Depends(get_db),
):
    return get_queue_summary(db)

@router.get("/doctor/{doctor_id}")
def doctor_queue(
    doctor_id: int,
    db: Session = Depends(get_db),
):
    return get_doctor_queue(
        db,
        doctor_id,
    )