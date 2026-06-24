from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import (
    get_current_user,
    get_current_doctor,
)

from schemas.appointment import (
    AppointmentCreateRequest,
    AppointmentStatusUpdateRequest,
)

from services.appointment_service import (
    create_appointment,
    get_user_appointments,
    get_doctor_appointments,
    update_appointment_status,
    cancel_appointment,
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