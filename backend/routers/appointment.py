from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
)

from sqlalchemy.orm import Session

from models.user import User
from database.session import get_db

from core.dependencies import (
    get_current_user,
    get_current_doctor,
)

from datetime import date

from schemas.appointment import (
    AppointmentCreateRequest,
    AppointmentStatusUpdateRequest,
    AppointmentResponse,
    AppointmentRescheduleRequest,
)

from services.appointment_service import (
    create_appointment,
    get_user_appointments,
    get_doctor_appointments,
    update_appointment_status,
    cancel_appointment,
    get_appointment,
    reschedule_appointment,
    get_available_slots,
)

router = APIRouter(
    tags=["Appointments"],
)


# =====================================================
# Create Appointment
# =====================================================

@router.post("/appointments")
def create_appointment_route(
    payload: AppointmentCreateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:

        appointment = create_appointment(
            db,
            current_user,
            payload,
        )

        return {
            "message":
                "Appointment booked successfully",
            "appointment":
                appointment.to_dict(),
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# =====================================================
# User Appointments
# =====================================================

@router.get("/appointments/my")
def my_appointments(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    appointments = get_user_appointments(
        db,
        current_user.id,
    )

    return [
        appointment.to_dict()
        for appointment in appointments
    ]


# =====================================================
# Get Appointment by id
# =====================================================

@router.get(
    "/appointments/{appointment_id}",
    response_model=AppointmentResponse,
)
def get_appointment_details(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return get_appointment(
            db=db,
            appointment_id=appointment_id,
            user_id=current_user.id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

# =====================================================
# Cancel Appointment
# =====================================================

@router.put("/appointments/{appointment_id}/cancel")
def cancel_appointment_route(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:

        appointment = cancel_appointment(
            db,
            appointment_id,
            current_user.id,
        )

        return {
            "message":
                "Appointment cancelled",
            "appointment":
                appointment.to_dict(),
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

# =====================================================
# Appointment Reschedule
# =====================================================
@router.put(
    "/appointments/{appointment_id}/reschedule",
    response_model=AppointmentResponse,
)
def reschedule_user_appointment(
    appointment_id: int,
    payload: AppointmentRescheduleRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return reschedule_appointment(
            db=db,
            appointment_id=appointment_id,
            user_id=current_user.id,
            appointment_date=payload.appointment_date,
            appointment_time=payload.appointment_time,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

# =====================================================
# Get Avalable Slots
# =====================================================

@router.get(
    "/appointments/available-slots/{doctor_id}",
)
def available_slots(
    doctor_id: int,
    appointment_date: date = Query(
        ...,
        alias="date",
    ),
    db: Session = Depends(get_db),
):
    try:
        return get_available_slots(
            db=db,
            doctor_id=doctor_id,
            appointment_date=appointment_date,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

# =====================================================
# Doctor Appointments
# =====================================================

@router.get("/doctor/appointments")
def doctor_appointments(
    db: Session = Depends(get_db),
    doctor=Depends(get_current_doctor),
):
    appointments = get_doctor_appointments(
        db,
        doctor.id,
    )

    return [
        appointment.to_dict()
        for appointment in appointments
    ]


# =====================================================
# Update Appointment Status
# =====================================================

@router.put(
    "/doctor/appointments/{appointment_id}/status"
)
def update_status(
    appointment_id: int,
    payload: AppointmentStatusUpdateRequest,
    db: Session = Depends(get_db),
    doctor=Depends(get_current_doctor),
):
    try:

        appointment = (
            update_appointment_status(
                db,
                appointment_id,
                doctor.id,
                payload.status,
            )
        )

        return {
            "message":
                "Appointment status updated",
            "appointment":
                appointment.to_dict(),
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )