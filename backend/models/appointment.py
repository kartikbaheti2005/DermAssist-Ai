from sqlalchemy import (
    Date,
    DateTime,
    ForeignKey,
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


class Appointment(Base):
    __tablename__ = "appointments"

    # -------------------------
    # Primary Key
    # -------------------------

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # -------------------------
    # Foreign Keys
    # -------------------------

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    doctor_id: Mapped[int] = mapped_column(
        ForeignKey("doctors.id"),
        nullable=False
    )

    # -------------------------
    # Doctor Snapshot
    # Stored for historical records
    # -------------------------

    doctor_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    doctor_specialty: Mapped[str | None] = mapped_column(
        String(120),
        nullable=True
    )

    doctor_clinic: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    doctor_address: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    doctor_phone: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True
    )

    # -------------------------
    # Appointment Details
    # -------------------------

    appointment_date: Mapped[Date] = mapped_column(
        Date,
        nullable=False
    )

    appointment_time: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    reason: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # -------------------------
    # Status Tracking
    # -------------------------

    status: Mapped[str] = mapped_column(
        String(50),
        default="pending"
    )

    # Possible values:
    #
    # pending
    # confirmed
    # completed
    # cancelled
    # rejected

    # -------------------------
    # Audit
    # -------------------------

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        default=ist_now
    )

    def to_dict(self):
        return {
            "id": self.id,

            "user_id": self.user_id,
            "doctor_id": self.doctor_id,

            "doctor_name": self.doctor_name,
            "doctor_specialty": self.doctor_specialty,
            "doctor_clinic": self.doctor_clinic,

            "appointment_date": (
                str(self.appointment_date)
                if self.appointment_date
                else None
            ),

            "appointment_time": self.appointment_time,

            "reason": self.reason,
            "notes": self.notes,

            "status": self.status,

            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
    }
    
    # -------------------------
    # Relationships
    # -------------------------

    user = relationship(
        "User",
        back_populates="appointments"
    )

    doctor = relationship(
        "Doctor",
        back_populates="appointments"
    )

    # -------------------------
    # Representation
    # -------------------------

    def __repr__(self):
        return (
            f"<Appointment(id={self.id}, "
            f"doctor='{self.doctor_name}', "
            f"date='{self.appointment_date}')>"
        )