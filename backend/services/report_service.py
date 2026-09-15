from collections import Counter
from datetime import datetime, UTC

from sqlalchemy.orm import Session

from models.appointment import Appointment
from models.health_record import HealthRecord
from models.prediction import Prediction
from models.user import User

# =====================================================
# User Summary
# =====================================================

def get_user_summary(
    db: Session,
    user_id: int,
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        return {}

    return {
        "full_name": user.full_name,
        "profile_picture": user.profile_picture,
        "member_since": user.created_at,
        "last_login": user.last_login,
    }

# =====================================================
# Prediction Analytics
# =====================================================

def get_prediction_report(
    db: Session,
    user_id: int,
):
    predictions = (
        db.query(Prediction)
        .filter(
            Prediction.user_id == user_id
        )
        .all()
    )

    labels = [
        p.predicted_label
        for p in predictions
        if p.predicted_label
    ]

    most_common = None

    if labels:
        most_common = (
            Counter(labels)
            .most_common(1)[0][0]
        )

    high_risk = len(
        [
            p for p in predictions
            if p.risk_level
            and p.risk_level.lower()
            in [
                "high",
                "very high"
            ]
        ]
    )

    return {
        "total_predictions":
            len(predictions),

        "most_common_prediction":
            most_common,

        "high_risk_predictions":
            high_risk,
    }

# =====================================================
# Latest Prediction
# =====================================================

def get_latest_prediction(
    db: Session,
    user_id: int,
):
    prediction = (
        db.query(Prediction)
        .filter(
            Prediction.user_id == user_id
        )
        .order_by(
            Prediction.created_at.desc()
        )
        .first()
    )

    if not prediction:
        return None

    return {
        "id": prediction.id,
        "disease": prediction.predicted_label,
        "confidence": prediction.confidence_score,
        "risk_level": prediction.risk_level,
        "created_at": prediction.created_at,
    }

# =====================================================
# Appointment Analytics
# =====================================================

def get_appointment_report(
    db: Session,
    user_id: int,
):
    appointments = (
        db.query(Appointment)
        .filter(
            Appointment.user_id == user_id
        )
        .all()
    )

    return {
        "total_appointments":
            len(appointments),

        "confirmed_appointments":
            len([
                a for a in appointments
                if a.status == "confirmed"
            ]),
            
        "pending_appointments":
            len([
                a for a in appointments
                if a.status == "pending"
            ]),

        "completed_appointments":
            len([
                a for a in appointments
                if a.status == "completed"
            ]),


        "cancelled_appointments":
            len([
                a for a in appointments
                if a.status == "cancelled"
            ]),
    }

# =====================================================
# Next Appointment
# =====================================================

def get_next_appointment(
    db: Session,
    user_id: int,
):
    appointment = (
        db.query(Appointment)
        .filter(
            Appointment.user_id == user_id,
            Appointment.status.in_(
                [
                    "pending",
                    "confirmed",
                ]
            ),
        )
        .order_by(
            Appointment.appointment_date.asc()
        )
        .first()
    )

    if not appointment:
        return None

    return {
    "id": appointment.id,
    "appointment_date": appointment.appointment_date,
    "appointment_time": appointment.appointment_time,
    "status": appointment.status,
    "doctor": {
        "id": appointment.doctor_id,
        "name": appointment.doctor_name,
        "specialty": appointment.doctor_specialty,
        "clinic": appointment.doctor_clinic,
    },
}

# =====================================================
# Health Analytics
# =====================================================

def get_health_report(
    db: Session,
    user_id: int,
):
    records = (
        db.query(HealthRecord)
        .filter(
            HealthRecord.user_id == user_id
        )
        .order_by(
            HealthRecord.record_date.desc()
        )
        .all()
    )

    latest_bmi = None

    if records:
        latest_bmi = records[0].bmi

    return {
        "latest_bmi":
            latest_bmi,

        "total_health_records":
            len(records),
    }


# =====================================================
# Dashboard
# =====================================================

def get_dashboard_report(
    db: Session,
    user_id: int,
):
    return {
    "user_summary":
        get_user_summary(
            db,
            user_id,
        ),

    "prediction_summary":
        get_prediction_report(
            db,
            user_id,
        ),

    "latest_prediction":
        get_latest_prediction(
            db,
            user_id,
        ),

    "appointment_summary":
        get_appointment_report(
            db,
            user_id,
        ),

    "next_appointment":
        get_next_appointment(
            db,
            user_id,
        ),

    "health_summary":
        get_health_report(
            db,
            user_id,
        ),

    "generated_at":
        datetime.now(UTC),

    "version":
        "2.0",
}