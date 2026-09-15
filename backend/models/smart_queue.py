from datetime import datetime, UTC

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
)

from models.base import Base


class SmartQueue(Base):
    __tablename__ = "smart_queue"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    appointment_id = Column(
        Integer,
        ForeignKey("appointments.id"),
        nullable=False,
    )

    doctor_id = Column(
        Integer,
        nullable=False,
    )

    patient_id = Column(
        Integer,
        nullable=False,
    )

    priority_score = Column(
        Integer,
        default=0,
    )

    queue_position = Column(
        Integer,
        nullable=False,
    )

    estimated_wait_time = Column(
        Integer,
        default=0,
    )

    status = Column(
        String,
        default="waiting",
    )

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC),
    )