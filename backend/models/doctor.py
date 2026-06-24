import json
from datetime import date

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Float,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from .base import Base, ist_now


def _parse_json_field(value):
    if value is None:
        return []

    if isinstance(value, (list, dict)):
        return value

    if isinstance(value, str):
        try:
            parsed = json.loads(value)

            if isinstance(parsed, (list, dict)):
                return parsed

        except Exception:
            pass

    return value


class Doctor(Base):
    __tablename__ = "doctors"

    # -------------------------
    # Primary Key
    # -------------------------

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # -------------------------
    # Authentication
    # -------------------------

    username: Mapped[str] = mapped_column(
        String(80),
        unique=True,
        nullable=False,
        index=True
    )

    email: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    # -------------------------
    # Personal Information
    # -------------------------

    full_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    gender: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    date_of_birth: Mapped[date | None] = mapped_column(
        Date,
        nullable=True
    )

    # -------------------------
    # Professional Information
    # -------------------------

    post: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    specialty: Mapped[str | None] = mapped_column(
        String(120),
        nullable=True
    )

    qualification: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    education_details: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    practice_start_year: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    # -------------------------
    # Clinic Information
    # -------------------------

    clinic_name: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    address: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    city: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    # -------------------------
    # Availability
    # -------------------------

    available_days: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    available_slots: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # -------------------------
    # Expertise
    # -------------------------

    specializes_in: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    languages: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    consultation_fee: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    # -------------------------
    # Profile
    # -------------------------

    bio: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    profile_picture: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    # -------------------------
    # Rating System
    # -------------------------

    rating: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    review_count: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    # -------------------------
    # Approval Workflow
    # -------------------------

    status: Mapped[str] = mapped_column(
        String(30),
        default="pending"
    )

    admin_notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    # -------------------------
    # Timestamps
    # -------------------------

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        default=ist_now
    )

    updated_at: Mapped[DateTime] = mapped_column(
        DateTime,
        default=ist_now,
        onupdate=ist_now
    )

    # -------------------------
    # Relationships
    # -------------------------

    appointments = relationship(
        "Appointment",
        back_populates="doctor",
        cascade="all, delete-orphan"
    )

    # -------------------------
    # Helpers
    # -------------------------

    def _list_field(self, field_value):
        parsed = _parse_json_field(field_value)

        if isinstance(parsed, list):
            return parsed

        if parsed is None:
            return []

        return [parsed] if isinstance(parsed, str) else parsed

    # -------------------------
    # Serialization
    # -------------------------

    def to_public_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "name": self.full_name,
            "phone": self.phone,
            "gender": self.gender,
            "date_of_birth": str(self.date_of_birth) if self.date_of_birth else None,
            "post": self.post,
            "specialty": self.specialty,
            "qualification": self.qualification,
            "education_details": self.education_details,
            "practice_start_year": self.practice_start_year,
            "clinic_name": self.clinic_name,
            "address": self.address,
            "city": self.city,
            "available_days": self._list_field(self.available_days),
            "available_slots": self._list_field(self.available_slots),
            "specializes_in": self._list_field(self.specializes_in),
            "languages": self._list_field(self.languages),
            "consultation_fee": self.consultation_fee,
            "bio": self.bio,
            "profile_picture": self.profile_picture,
            "rating": self.rating,
            "review_count": self.review_count,
            "status": self.status,
            "is_active": self.is_active,
        }

    def to_admin_dict(self):
        data = self.to_public_dict()

        data.update({
            "admin_notes": self.admin_notes,
            "created_at": str(self.created_at) if self.created_at else None,
            "updated_at": str(self.updated_at) if self.updated_at else None,
        })

        return data

    def __repr__(self):
        return (
            f"<Doctor(id={self.id}, "
            f"username='{self.username}', "
            f"specialty='{self.specialty}')>"
        )