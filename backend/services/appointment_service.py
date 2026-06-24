from sqlalchemy.orm import Session

from models.appointment import Appointment
from models.doctor import Doctor
from models.user import User


# =====================================================
# Create Appointment
# =====================================================

def create_appointment(
    db: Session,
    current_user: User,
    payload,
):
    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == payload.doctor_id,
            Doctor.status == "approved",
            Doctor.is_active == True,
        )
        .first()
    )

    if not doctor:
        raise ValueError(
            "Doctor not found"
        )

    appointment = Appointment(
        user_id=current_user.id,

        doctor_id=doctor.id,

        doctor_name=doctor.full_name,
        doctor_specialty=doctor.specialty,
        doctor_clinic=doctor.clinic_name,

        appointment_date=payload.appointment_date,
        appointment_time=payload.appointment_time,

        reason=payload.reason,
        notes=payload.notes,

        status="pending",
    )

    db.add(appointment)

    db.commit()

    db.refresh(appointment)

    return appointment


# =====================================================
# User Appointments
# =====================================================

def get_user_appointments(
    db: Session,
    user_id: int,
):
    return (
        db.query(Appointment)
        .filter(
            Appointment.user_id == user_id
        )
        .order_by(
            Appointment.appointment_date.desc()
        )
        .all()
    )


# =====================================================
# Doctor Appointments
# =====================================================

def get_doctor_appointments(
    db: Session,
    doctor_id: int,
):
    return (
        db.query(Appointment)
        .filter(
            Appointment.doctor_id == doctor_id
        )
        .order_by(
            Appointment.appointment_date.desc()
        )
        .all()
    )


# =====================================================
# Appointment By ID
# =====================================================

def get_appointment(
    db: Session,
    appointment_id: int,
):
    return (
        db.query(Appointment)
        .filter(
            Appointment.id == appointment_id
        )
        .first()
    )


# =====================================================
# Update Status
# =====================================================

def update_appointment_status(
    db: Session,
    appointment_id: int,
    doctor_id: int,
    status: str,
):
    appointment = (
        db.query(Appointment)
        .filter(
            Appointment.id == appointment_id,
            Appointment.doctor_id == doctor_id,
        )
        .first()
    )

    if not appointment:
        raise ValueError(
            "Appointment not found"
        )

    valid_statuses = [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
        "rejected",
    ]

    if status not in valid_statuses:
        raise ValueError(
            "Invalid appointment status"
        )

    appointment.status = status

    db.commit()

    db.refresh(appointment)

    return appointment


# =====================================================
# Cancel Appointment
# =====================================================

def cancel_appointment(
    db: Session,
    appointment_id: int,
    user_id: int,
):
    appointment = (
        db.query(Appointment)
        .filter(
            Appointment.id == appointment_id,
            Appointment.user_id == user_id,
        )
        .first()
    )

    if not appointment:
        raise ValueError(
            "Appointment not found"
        )

    appointment.status = "cancelled"

    db.commit()

    db.refresh(appointment)

    return appointment