from datetime import date, timedelta
from calendar import monthrange

from sqlalchemy import func
from sqlalchemy.orm import Session

from models.doctor import Doctor
from models.appointment import Appointment
from models.prediction import Prediction
from models.notification import Notification
from models.user import User

from services.notification_service import (
    get_notifications,
)

def get_doctor_summary(
    db: Session,
    doctor_id: int,
):
    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == doctor_id
        )
        .first()
    )

    if not doctor:
        return None

    return {
        "id": doctor.id,
        "name": doctor.full_name,
        "specialty": doctor.specialty,
        "clinic": doctor.clinic_name,
        "rating": doctor.rating,
        "review_count": doctor.review_count,
        "status": doctor.status,
    }

def get_today_appointments(
    db: Session,
    doctor_id: int,
):
    today = date.today()

    appointments = (
        db.query(Appointment)
        .filter(
            Appointment.doctor_id == doctor_id,
            Appointment.appointment_date == today,
        )
        .all()
    )

    return {
        "total": len(appointments),

        "pending": len([
            a for a in appointments
            if a.status == "pending"
        ]),

        "confirmed": len([
            a for a in appointments
            if a.status == "confirmed"
        ]),

        "completed": len([
            a for a in appointments
            if a.status == "completed"
        ]),
    }

def get_patient_statistics(
    db: Session,
    doctor_id: int,
):
    total = (
        db.query(
            func.count(
                func.distinct(
                    Appointment.user_id
                )
            )
        )
        .filter(
            Appointment.doctor_id == doctor_id
        )
        .scalar()
    )

    return {
        "total_patients": total or 0,
    }

def get_prediction_statistics(
    db: Session,
    doctor_id: int,
):
    return {
        "reviewed_predictions": 0,
        "high_risk_cases": 0,
        "message":
            "Prediction review "
            "will be available "
            "after ML integration.",
    }

def get_recent_notifications(
    db: Session,
    doctor_id: int,
):
    notifications = get_notifications(
        db,
        doctor_id,
    )

    return [
        notification.to_dict()
        for notification in notifications[:5]
    ]

def get_doctor_dashboard(
    db: Session,
    doctor_id: int,
):
    return {

        "doctor":
            get_doctor_summary(
                db,
                doctor_id,
            ),

        "today":
            get_today_appointments(
                db,
                doctor_id,
            ),

        "upcoming_appointments":
            get_upcoming_appointments(
                db,
                doctor_id,
            ),


        "weekly_statistics":
            get_weekly_statistics(
                db,
                doctor_id,
            ),

        "monthly_statistics":
            get_monthly_statistics(
                db,
                doctor_id,
            ),

        "patients":
            get_patient_statistics(
                db,
                doctor_id,
            ),

        "recent_patients":
            get_recent_patients(
                db,
                doctor_id,
            ),

        "predictions":
            get_prediction_statistics(
                db,
                doctor_id,
            ),

        "notifications":
            get_recent_notifications(
                db,
                doctor_id,
            ),

        "insights":
            get_dashboard_insights(
                db,
                doctor_id,
            ),

        "quick_actions":
            get_quick_actions(),
    
    }

def get_upcoming_appointments(
    db: Session,
    doctor_id: int,
):
    appointments = (
        db.query(
            Appointment,
            User.full_name,
        )
        .join(
            User,
            Appointment.user_id == User.id,
        )
        .filter(
            Appointment.doctor_id == doctor_id,
            Appointment.appointment_date >= date.today(),
            Appointment.status.in_(
                [
                    "pending",
                    "confirmed",
                ]
            ),
        )
        .order_by(
            Appointment.appointment_date.asc(),
            Appointment.appointment_time.asc(),
        )
        .limit(5)
        .all()
    )

    return [
        {
            "appointment_id": appointment.id,
            "patient_id": appointment.user_id,
            "patient_name": patient_name,
            "date": appointment.appointment_date,
            "time": appointment.appointment_time,
            "status": appointment.status,
        }
        for appointment, patient_name in appointments
    ]

def get_weekly_statistics(
    db: Session,
    doctor_id: int,
):
    today = date.today()

    week_start = today - timedelta(days=today.weekday())
    week_end = week_start + timedelta(days=6)

    appointments = (
        db.query(Appointment)
        .filter(
            Appointment.doctor_id == doctor_id,
            Appointment.appointment_date >= week_start,
            Appointment.appointment_date <= week_end,
        )
        .all()
    )

    return {
        "appointments": len(appointments),

        "confirmed": len([
            a for a in appointments
            if a.status == "confirmed"
        ]),

        "pending": len([
            a for a in appointments
            if a.status == "pending"
        ]),

        "completed": len([
            a for a in appointments
            if a.status == "completed"
        ]),

        "cancelled": len([
            a for a in appointments
            if a.status == "cancelled"
        ]),
    }

def get_monthly_statistics(
    db: Session,
    doctor_id: int,
):
    today = date.today()

    month_start = today.replace(day=1)

    last_day = monthrange(
        today.year,
        today.month,
    )[1]

    month_end = today.replace(
        day=last_day,
    )

    appointments = (
        db.query(Appointment)
        .filter(
            Appointment.doctor_id == doctor_id,
            Appointment.appointment_date >= month_start,
            Appointment.appointment_date <= month_end,
        )
        .all()
    )

    return {
        "appointments": len(appointments),

        "confirmed": len([
            a for a in appointments
            if a.status == "confirmed"
        ]),

        "pending": len([
            a for a in appointments
            if a.status == "pending"
        ]),

        "completed": len([
            a for a in appointments
            if a.status == "completed"
        ]),

        "cancelled": len([
            a for a in appointments
            if a.status == "cancelled"
        ]),
    }

def get_recent_patients(
    db: Session,
    doctor_id: int,
):
    appointments = (
        db.query(
            Appointment,
            User.full_name,
        )
        .join(
            User,
            Appointment.user_id == User.id,
        )
        .filter(
            Appointment.doctor_id == doctor_id,
        )
        .order_by(
            Appointment.appointment_date.desc(),
            Appointment.created_at.desc(),
        )
        .all()
    )

    recent = []
    visited = set()

    for appointment, patient_name in appointments:

        if appointment.user_id in visited:
            continue

        visited.add(appointment.user_id)

        recent.append(
            {
                "patient_id": appointment.user_id,
                "patient_name": patient_name,
                "last_visit": appointment.appointment_date,
                "status": appointment.status,
            }
        )

        if len(recent) == 5:
            break

    return recent

def get_dashboard_insights(
    db: Session,
    doctor_id: int,
):
    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == doctor_id
        )
        .first()
    )

    today = get_today_appointments(
        db,
        doctor_id,
    )

    patients = get_patient_statistics(
        db,
        doctor_id,
    )

    return {
        "pending_requests":
            today["pending"],

        "today_schedule":
            today["total"],

        "active_patients":
            patients["total_patients"],

        "average_rating":
            doctor.rating if doctor else 0,

        "review_count":
            doctor.review_count if doctor else 0,
    }

def get_quick_actions():
    return [
        {
            "title": "View Today's Appointments",
            "route": "/doctor/appointments",
            "icon": "calendar",
        },
        {
            "title": "Manage Availability",
            "route": "/doctor/profile",
            "icon": "clock",
        },
        {
            "title": "Review AI Predictions",
            "route": "/doctor/predictions",
            "icon": "brain",
        },
        {
            "title": "Update Profile",
            "route": "/doctor/profile",
            "icon": "user",
        },
    ]