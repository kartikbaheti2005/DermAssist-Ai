from sqlalchemy import func
from sqlalchemy.orm import Session

from models.user import User
from models.doctor import Doctor
from models.appointment import Appointment
from models.prediction import Prediction
from models.health_record import HealthRecord

def get_platform_summary(
    db: Session,
):
    total_users = (
        db.query(User)
        .count()
    )

    total_doctors = (
        db.query(Doctor)
        .count()
    )

    pending_doctors = (
        db.query(Doctor)
        .filter(
            Doctor.status == "pending"
        )
        .count()
    )

    return {
        "total_users": total_users,
        "total_doctors": total_doctors,
        "pending_doctors": pending_doctors,
    }

def get_admin_appointment_statistics(
    db: Session,
):
    appointments = (
        db.query(Appointment)
        .all()
    )

    return {
        "total": len(appointments),

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

def get_admin_prediction_statistics(
    db: Session,
):
    predictions = (
        db.query(Prediction)
        .all()
    )

    return {
        "total_predictions": len(predictions),

        "high_risk_predictions": len([
            p for p in predictions
            if (
                p.risk_level
                and p.risk_level.lower() == "high"
            )
        ]),
    }

def get_admin_health_statistics(
    db: Session,
):
    records = (
        db.query(HealthRecord)
        .all()
    )

    return {
        "total_health_records": len(records),
    }

def get_admin_dashboard(
    db: Session,
):
    return {

        "platform":
            get_platform_summary(
                db,
            ),

        "appointments":
            get_admin_appointment_statistics(
                db,
            ),

        "predictions":
            get_admin_prediction_statistics(
                db,
            ),

        "health":
            get_admin_health_statistics(
                db,
            ),

        "recent_users":
            get_recent_users(
                db,
            ),

        "pending_doctors":
            get_pending_doctors(
                db,
            ),

        "insights":
            get_platform_insights(
                db,
            ),

        "recent_activity":
            get_recent_activity(
                db,
            ),
            
    }

def get_recent_users(
    db: Session,
):
    users = (
        db.query(User)
        .order_by(
            User.created_at.desc()
        )
        .limit(5)
        .all()
    )

    return [
        {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role,
            "registered_at": user.created_at,
        }
        for user in users
    ]

def get_pending_doctors(
    db: Session,
):
    doctors = (
        db.query(Doctor)
        .filter(
            Doctor.status == "pending"
        )
        .order_by(
            Doctor.created_at.desc()
        )
        .limit(10)
        .all()
    )

    return [
        {
            "id": doctor.id,
            "name": doctor.full_name,
            "specialty": doctor.specialty,
            "clinic": doctor.clinic_name,
            "email": doctor.email,
        }
        for doctor in doctors
    ]

def get_platform_insights(
    db: Session,
):
    return {

        "active_users":
            db.query(User).count(),

        "approved_doctors":
            db.query(Doctor)
            .filter(
                Doctor.status == "approved"
            )
            .count(),

        "pending_approvals":
            db.query(Doctor)
            .filter(
                Doctor.status == "pending"
            )
            .count(),

        "high_risk_predictions":
            db.query(Prediction)
            .filter(
                Prediction.risk_level == "high"
            )
            .count(),
    }

def get_recent_activity(
    db: Session,
):
    appointments = (
        db.query(Appointment)
        .order_by(
            Appointment.created_at.desc()
        )
        .limit(5)
        .all()
    )

    return [
        {
            "type": "appointment",
            "id": appointment.id,
            "user_id": appointment.user_id,
            "doctor_id": appointment.doctor_id,
            "status": appointment.status,
            "created_at": appointment.created_at,
        }
        for appointment in appointments
    ]