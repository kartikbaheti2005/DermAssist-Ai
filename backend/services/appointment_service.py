from sqlalchemy.orm import Session

from models import doctor
from models.appointment import Appointment
from models.doctor import Doctor
from models.user import User

from datetime import date, datetime

from services.notification_service import (
    create_notification,
    notify_appointment_booked
)
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
    
    # -------------------------------------------------
    # Prevent double booking
    # -------------------------------------------------

    existing_appointment = (
        db.query(Appointment)
        .filter(
            Appointment.doctor_id == doctor.id,
            Appointment.appointment_date == payload.appointment_date,
            Appointment.appointment_time == payload.appointment_time,
            Appointment.status.in_(
                [
                    "pending",
                    "confirmed",
                ]
            ),
        )
        .first()
    )

    if existing_appointment:
        raise ValueError(
            "Selected appointment slot is already booked."
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

    notify_appointment_booked(
        db=db,
        user_id=current_user.id,
        doctor_name=doctor.full_name,
        appointment_date=appointment.appointment_date,
        appointment_time=appointment.appointment_time,
    )

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
    user_id: int,
):
    print("Appointment ID:", appointment_id)
    print("Current User ID:", user_id)
    
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
            "Appointment not found."
        )

    return appointment

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
        if appointment.status == "completed":
            raise ValueError(
                "Completed appointments cannot be modified."
            )

        if appointment.status == "cancelled":
            raise ValueError(
                "Cancelled appointments cannot be modified."
            )
        raise ValueError(
            "Invalid appointment status"
        )

    appointment.status = status

    db.commit()

    db.refresh(appointment)

    create_notification(
        db=db,
        user_id=appointment.user_id,
        title="Appointment Updated",
        message=(
            f"Your appointment status "
            f"is now '{appointment.status}'."
        ),
        notification_type="appointment",
        priority=(
            "high"
            if appointment.status == "confirmed"
            else "medium"
        ),
        action_url="/appointments/my",
    )

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
    
    if appointment.status in [
        "completed",
        "cancelled",
    ]:
        raise ValueError(
            f"Appointment is already {appointment.status}."
        )

    appointment.status = "cancelled"

    db.commit()

    db.refresh(appointment)

    return appointment

# =====================================================
# Reschedule Appointment
# =====================================================

def reschedule_appointment(
    db: Session,
    appointment_id: int,
    user_id: int,
    appointment_date: date,
    appointment_time: str,
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
            "Appointment not found."
        )

    if appointment.status == "completed":
        raise ValueError(
            "Completed appointments cannot be rescheduled."
        )

    if appointment.status == "cancelled":
        raise ValueError(
            "Cancelled appointments cannot be rescheduled."
        )

    if appointment_date < date.today():
        raise ValueError(
            "Appointment date cannot be in the past."
        )

    existing_appointment = (
        db.query(Appointment)
        .filter(
            Appointment.doctor_id == appointment.doctor_id,
            Appointment.appointment_date == appointment_date,
            Appointment.appointment_time == appointment_time,
            Appointment.status.in_(
                [
                    "pending",
                    "confirmed",
                ]
            ),
            Appointment.id != appointment.id,
        )
        .first()
    )

    if existing_appointment:
        raise ValueError(
            "Selected appointment slot is already booked."
        )

    appointment.appointment_date = appointment_date
    appointment.appointment_time = appointment_time

    db.commit()
    db.refresh(appointment)

    return appointment

# =====================================================
# Normalize Time
# =====================================================

def normalize_time(time_str: str) -> str:
    return (
        datetime.strptime(
            time_str.strip(),
            "%I:%M %p",
        )
        .strftime("%H:%M")
    )

# =====================================================
# Available Appointment Slots
# =====================================================

def get_available_slots(
    db: Session,
    doctor_id: int,
    appointment_date: date,
):
    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == doctor_id,
            Doctor.status == "approved",
            Doctor.is_active == True,
        )
        .first()
    )

    if not doctor:
        raise ValueError(
            "Doctor not found."
        )

    available_slots = doctor._list_field(
        doctor.available_slots
    )

    booked_slots = (
        db.query(Appointment)
        .filter(
            Appointment.doctor_id == doctor_id,
            Appointment.appointment_date == appointment_date,
            Appointment.status.in_(
                [
                    "pending",
                    "confirmed",
                ]
            ),
        )
        .all()
    )

    print("Requested Date:", appointment_date)

    print("Appointments Found:")
    for appointment in booked_slots:
        print(
            f"Doctor={appointment.doctor_id}, "
            f"Date={appointment.appointment_date}, "
            f"Time={appointment.appointment_time}, "
            f"Status={appointment.status}"
        )

    print("Requested Date:", appointment_date)

    print("Booked Appointments:")
    for appointment in booked_slots:
        print(
            appointment.doctor_id,
            appointment.appointment_date,
            appointment.appointment_time,
            appointment.status,
        )

    print("Doctor Available Slots:", available_slots)

    booked_times = {
        normalize_time(
            appointment.appointment_time
        )
        for appointment in booked_slots
    }

    print("Booked Times:", booked_times)

    slots = []

    for slot in available_slots:

        normalized_slot = normalize_time(slot)

        slots.append(
            {
                "time": slot,
                "available": normalized_slot not in booked_times,
            }
        )
    
    return {
        "doctor_id": doctor_id,
        "date": appointment_date,
        "slots": slots,
    }