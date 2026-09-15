from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import (
    get_current_user,
)

from services.report_service import (
    get_dashboard_report,
    get_user_summary,
    get_prediction_report,
    get_latest_prediction,
    get_appointment_report,
    get_next_appointment,
    get_health_report,
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


# =====================================================
# Dashboard Report
# =====================================================

@router.get("/dashboard")
def dashboard_report(
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user
    ),
):
    return get_dashboard_report(
        db,
        current_user.id,
    )

# =====================================================
# User Summary Report
# =====================================================

@router.get("/user-summary")
def user_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_user_summary(
        db,
        current_user.id,
    )

# =====================================================
# Prediction Report
# =====================================================

@router.get("/predictions")
def prediction_report(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_prediction_report(
        db,
        current_user.id,
    )

# =====================================================
# Latest Prediction
# =====================================================

@router.get("/latest-prediction")
def latest_prediction(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_latest_prediction(
        db,
        current_user.id,
    )

# =====================================================
# Appointment Report
# =====================================================

@router.get("/appointments")
def appointment_report(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_appointment_report(
        db,
        current_user.id,
    )

# =====================================================
# Next Appointment
# =====================================================

@router.get("/next-appointment")
def next_appointment(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_next_appointment(
        db,
        current_user.id,
    )

# =====================================================
# Health Report
# =====================================================

@router.get("/health")
def health_report(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_health_report(
        db,
        current_user.id,
    )

