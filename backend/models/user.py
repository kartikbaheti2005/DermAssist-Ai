from datetime import date

from passlib.context import CryptContext
from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Float,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship, Mapped, mapped_column

from .base import Base, ist_now

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class User(Base):
    __tablename__ = "users"

    # -------------------------
    # Primary Key
    # -------------------------

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # -------------------------
    # Basic Information
    # -------------------------

    full_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

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

    phone_number: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
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
    # Authentication
    # -------------------------

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    role: Mapped[str] = mapped_column(
        String(20),
        default="user"
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    # -------------------------
    # Password Reset
    # -------------------------

    reset_token: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    reset_token_expiry: Mapped[DateTime | None] = mapped_column(
        DateTime,
        nullable=True
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
    # Health Records
    # -------------------------

    height_cm: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    weight_kg: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    blood_group: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True
    )

    medical_history: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    allergies: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # -------------------------
    # Audit
    # -------------------------

    last_login: Mapped[DateTime | None] = mapped_column(
        DateTime,
        default=ist_now,
        onupdate=ist_now
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        default=ist_now
    )

    # -------------------------
    # Relationships
    # -------------------------

    images = relationship(
        "Image",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    predictions = relationship(
        "Prediction",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    appointments = relationship(
        "Appointment",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    # -------------------------
    # Password Helpers
    # -------------------------

    def set_password(self, password: str):
        self.password_hash = pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(
            password,
            self.password_hash
        )

    # -------------------------
    # Representation
    # -------------------------

    def __repr__(self):
        return (
            f"<User(id={self.id}, "
            f"username='{self.username}', "
            f"role='{self.role}')>"
        )