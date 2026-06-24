from datetime import date

from sqlalchemy.orm import Session

from models.health_record import HealthRecord
from models.user import User


# =====================================================
# BMI Calculator
# =====================================================

def calculate_bmi(
    height_cm: float | None,
    weight_kg: float | None,
):
    if (
        not height_cm
        or not weight_kg
        or height_cm <= 0
    ):
        return None

    height_m = height_cm / 100

    return round(
        weight_kg / (height_m * height_m),
        2,
    )


# =====================================================
# Create Health Record
# =====================================================

def create_health_record(
    db: Session,
    current_user: User,
    payload,
):
    bmi = calculate_bmi(
        payload.height_cm,
        payload.weight_kg,
    )

    record = HealthRecord(
        user_id=current_user.id,

        height_cm=payload.height_cm,
        weight_kg=payload.weight_kg,

        bmi=bmi,

        blood_group=payload.blood_group,

        medical_history=payload.medical_history,
        allergies=payload.allergies,
        medications=payload.medications,

        notes=payload.notes,

        record_date=(
            payload.record_date
            or date.today()
        ),
    )

    current_user.height_cm = payload.height_cm
    current_user.weight_kg = payload.weight_kg

    current_user.blood_group = payload.blood_group

    current_user.medical_history = payload.medical_history
    current_user.allergies = payload.allergies

    db.add(record)

    db.commit()

    db.refresh(record)

    return record


# =====================================================
# Get User Health Records
# =====================================================

def get_user_health_records(
    db: Session,
    user_id: int,
):
    return (
        db.query(HealthRecord)
        .filter(
            HealthRecord.user_id == user_id
        )
        .order_by(
            HealthRecord.record_date.desc()
        )
        .all()
    )


# =====================================================
# Get Single Record
# =====================================================

def get_health_record(
    db: Session,
    record_id: int,
    user_id: int,
):
    return (
        db.query(HealthRecord)
        .filter(
            HealthRecord.id == record_id,
            HealthRecord.user_id == user_id,
        )
        .first()
    )


# =====================================================
# Update Record
# =====================================================

def update_health_record(
    db: Session,
    record: HealthRecord,
    payload,
):
    updates = payload.model_dump(
        exclude_none=True
    )

    for field, value in updates.items():
        setattr(
            record,
            field,
            value,
        )

    record.bmi = calculate_bmi(
        record.height_cm,
        record.weight_kg,
    )

    record.user.height_cm = record.height_cm
    record.user.weight_kg = record.weight_kg
    
    record.user.blood_group = record.blood_group
    
    record.user.medical_history = record.medical_history
    record.user.allergies = record.allergies

    db.commit()

    db.refresh(record)

    return record


# =====================================================
# Delete Record
# =====================================================

def delete_health_record(
    db: Session,
    record_id: int,
    user_id: int,
):
    record = (
        db.query(HealthRecord)
        .filter(
            HealthRecord.id == record_id,
            HealthRecord.user_id == user_id,
        )
        .first()
    )

    if not record:
        raise ValueError(
            "Health record not found"
        )

    db.delete(record)

    db.commit()

    return True


# =====================================================
# Latest Record
# =====================================================

def get_latest_record(
    db: Session,
    user_id: int,
):
    return (
        db.query(HealthRecord)
        .filter(
            HealthRecord.user_id == user_id
        )
        .order_by(
            HealthRecord.record_date.desc(),
            HealthRecord.created_at.desc(),
        )
        .first()
    )