from datetime import date
import json
from sqlalchemy import or_
from sqlalchemy.orm import Session

from models.doctor import Doctor

from core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


# =====================================================
# Doctor Registration
# =====================================================

def register_doctor(
    db: Session,
    payload,
):
    existing_email = (
        db.query(Doctor)
        .filter(
            Doctor.email == payload.email
        )
        .first()
    )

    if existing_email:
        raise ValueError(
            "Email already registered"
        )

    existing_username = (
        db.query(Doctor)
        .filter(
            Doctor.username == payload.username
        )
        .first()
    )

    if existing_username:
        raise ValueError(
            "Username already taken"
        )

    dob = None

    if payload.date_of_birth:
        try:
            dob = date.fromisoformat(
                payload.date_of_birth
            )
        except Exception:
            pass

    initials = "".join(
        word[0]
        for word in payload.full_name.split()
        if word
    )[:2].upper()

    doctor = Doctor(
        username=payload.username,
        email=payload.email,
        password_hash=hash_password(
            payload.password
        ),

        full_name=payload.full_name,
        phone=payload.phone,

        gender=payload.gender,
        date_of_birth=dob,

        post=payload.post,
        specialty=payload.specialty,

        qualification=payload.qualification,
        education_details=payload.education_details,

        practice_start_year=payload.practice_start_year,

        clinic_name=payload.clinic_name,
        address=payload.address,
        city=payload.city,

        available_days=json.dumps(
            payload.available_days
        ),

        available_slots=json.dumps(
            payload.available_slots
        ),

        specializes_in=json.dumps(
            payload.specializes_in
        ),

        languages=json.dumps(
            payload.languages
        ),

        consultation_fee=payload.consultation_fee,

        bio=payload.bio,

        status="pending",
        is_active=False,
    )

    db.add(doctor)
    db.commit()
    db.refresh(doctor)

    return doctor


# =====================================================
# Doctor Login
# =====================================================

def login_doctor(
    db: Session,
    identifier: str,
    password: str,
):
    doctor = (
        db.query(Doctor)
        .filter(
            or_(
                Doctor.email == identifier,
                Doctor.username == identifier,
            )
        )
        .first()
    )

    if not doctor:
        return None

    if not verify_password(
        password,
        doctor.password_hash,
    ):
        return None

    if doctor.status == "pending":
        raise ValueError(
            "Account pending admin approval"
        )

    if doctor.status == "rejected":
        raise ValueError(
            "Registration rejected"
        )

    if not doctor.is_active:
        raise ValueError(
            "Doctor account inactive"
        )

    token = create_access_token(
        {
            "sub": doctor.username,
            "role": "doctor",
            "doctor_id": doctor.id,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "doctor",
        "doctor": doctor,
    }


# =====================================================
# Doctor Listing
# =====================================================

def get_doctors(
    db: Session,
    city: str = None,
    search: str = None,
):
    query = db.query(Doctor).filter(
        Doctor.status == "approved",
        Doctor.is_active == True,
    )

    if city:
        query = query.filter(
            Doctor.city.ilike(
                f"%{city}%"
            )
        )

    doctors = query.all()

    result = []

    for doctor in doctors:

        doctor_data = doctor.to_public_dict()

        if search:
            s = search.lower()

            searchable = (
                doctor_data["name"].lower()
                + doctor_data["specialty"].lower()
                + doctor_data["city"].lower()
                + " ".join(
                    doctor_data.get(
                        "specializes_in",
                        []
                    )
                ).lower()
            )

            if s not in searchable:
                continue

        result.append(
            doctor_data
        )

    return result


# =====================================================
# Doctor Cities
# =====================================================

def get_doctor_cities(
    db: Session,
):
    rows = (
        db.query(Doctor.city)
        .distinct()
        .all()
    )

    return sorted(
        row.city
        for row in rows
        if row.city
    )


# =====================================================
# Profile
# =====================================================

def get_doctor_profile(
    db: Session,
    doctor_id: int,
):
    return (
        db.query(Doctor)
        .filter(
            Doctor.id == doctor_id
        )
        .first()
    )


def update_doctor_profile(
    db: Session,
    doctor,
    payload,
):
    updates = payload.model_dump(
        exclude_none=True
    )

    if not updates:
        raise ValueError(
            "No valid fields provided for update"
        )

    for field, value in updates.items():

        if hasattr(
            doctor,
            field,
        ):
            setattr(
                doctor,
                field,
                value,
            )

    db.commit()
    db.refresh(doctor)

    return doctor


# =====================================================
# Rating
# =====================================================

def rate_doctor(
    db: Session,
    doctor_id: int,
    rating: float,
):
    if not (
        1.0 <= rating <= 5.0
    ):
        raise ValueError(
            "Rating must be between 1 and 5"
        )

    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == doctor_id
        )
        .first()
    )

    if not doctor:
        raise ValueError(
            "Doctor not found"
        )

    doctor.rating = round(
        (
            doctor.rating
            * doctor.review_count
            + rating
        )
        /
        (
            doctor.review_count
            + 1
        ),
        1,
    )

    doctor.review_count += 1

    db.commit()

    return doctor


# =====================================================
# Admin Functions
# =====================================================

def approve_doctor(
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
        raise ValueError(
            "Doctor not found"
        )

    doctor.status = "approved"
    doctor.is_active = True
    doctor.admin_notes = None

    db.commit()

    return doctor


def reject_doctor(
    db: Session,
    doctor_id: int,
    notes: str = "",
):
    doctor = (
        db.query(Doctor)
        .filter(
            Doctor.id == doctor_id
        )
        .first()
    )

    if not doctor:
        raise ValueError(
            "Doctor not found"
        )

    doctor.status = "rejected"
    doctor.is_active = False
    doctor.admin_notes = notes

    db.commit()

    return doctor


def delete_doctor(
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
        raise ValueError(
            "Doctor not found"
        )

    db.delete(doctor)

    db.commit()

    return True