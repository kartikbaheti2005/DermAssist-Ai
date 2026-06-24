from collections import Counter
from datetime import datetime, UTC

from sqlalchemy.orm import Session

from models.appointment import Appointment
from models.health_record import HealthRecord
from models.prediction import Prediction


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
        "prediction_report":
            get_prediction_report(
                db,
                user_id,
            ),

        "appointment_report":
            get_appointment_report(
                db,
                user_id,
            ),

        "health_report":
            get_health_report(
                db,
                user_id,
            ),

        "generated_at":
            datetime.now(UTC),
    }