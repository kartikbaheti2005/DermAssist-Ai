"""Compact structured context; ORM objects are never serialized to an LLM."""
from datetime import date
from sqlalchemy.orm import Session
from models.appointment import Appointment
from models.health_record import HealthRecord
from models.prediction import Prediction
from models.user import User


def build_patient_context(db: Session, user: User) -> dict:
    record = (db.query(HealthRecord).filter(HealthRecord.user_id == user.id)
              .order_by(HealthRecord.record_date.desc(), HealthRecord.created_at.desc()).first())
    screenings = (db.query(Prediction).filter(Prediction.user_id == user.id)
                  .order_by(Prediction.created_at.desc()).limit(5).all())
    appointment = (db.query(Appointment).filter(
        Appointment.user_id == user.id,
        Appointment.status.in_(["pending", "confirmed"]),
        Appointment.appointment_date >= date.today(),
    ).order_by(Appointment.appointment_date.asc(), Appointment.appointment_time.asc()).first())

    height = (record.height_cm if record else None) or user.height_cm
    weight = (record.weight_kg if record else None) or user.weight_kg
    bmi = record.bmi if record else None
    if bmi is None and height and weight and height > 0:
        bmi = round(weight / ((height / 100) ** 2), 1)

    age = None
    if user.date_of_birth:
        today = date.today()
        age = today.year - user.date_of_birth.year - ((today.month, today.day) < (user.date_of_birth.month, user.date_of_birth.day))
    health = {
        "height_cm": height, "weight_kg": weight, "bmi": bmi,
        "blood_group": (record.blood_group if record else None) or user.blood_group,
        "medical_history": (record.medical_history if record else None) or user.medical_history,
        "allergies": (record.allergies if record else None) or user.allergies,
        "medications": record.medications if record else None,
        "record_date": record.record_date.isoformat() if record and record.record_date else None,
    }
    health = {key: value for key, value in health.items() if value not in (None, "")}
    history = [{
        "label": item.predicted_label, "confidence": item.confidence_score,
        "screening_risk_output": item.risk_level, "model_version": item.model_version,
        "created_at": item.created_at.isoformat() if item.created_at else None,
    } for item in screenings]
    next_appointment = None if not appointment else {
        "specialty": appointment.doctor_specialty,
        "date": appointment.appointment_date.isoformat() if appointment.appointment_date else None,
        "time": appointment.appointment_time, "status": appointment.status,
    }
    demographics = {key: value for key, value in {"age_years": age, "gender": user.gender}.items() if value not in (None, "")}
    return {"patient": demographics, "health_record": health or None, "recent_screenings": history, "next_appointment": next_appointment}
