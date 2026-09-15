from sqlalchemy import (
    Date,
    DateTime,
    Float,
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

from .base import (
    Base,
    ist_now,
)


class HealthRecord(Base):
    __tablename__ = "health_records"

    # -------------------------
    # Primary Key
    # -------------------------

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    # -------------------------
    # User Link
    # -------------------------

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    # -------------------------
    # Physical Metrics
    # -------------------------

    height_cm: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    weight_kg: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    bmi: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    blood_group: Mapped[str | None] = mapped_column(
        String(10),
        nullable=True,
    )

    # -------------------------
    # Medical Information
    # -------------------------

    medical_history: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    allergies: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    medications: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # -------------------------
    # Record Date
    # -------------------------

    record_date: Mapped[Date | None] = mapped_column(
        Date,
        nullable=True,
    )

    # -------------------------
    # Audit
    # -------------------------

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        default=ist_now,
    )

    # -------------------------
    # Relationship
    # -------------------------

    user = relationship(
        "User",
        back_populates="health_records",
    )

    # -------------------------
    # Helper
    # -------------------------

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,

            "height_cm": self.height_cm,
            "weight_kg": self.weight_kg,
            "bmi": self.bmi,

            "blood_group": self.blood_group,

            "medical_history": self.medical_history,
            "allergies": self.allergies,
            "medications": self.medications,
            "notes": self.notes,

            "record_date": (
                str(self.record_date)
                if self.record_date
                else None
            ),

            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
        }