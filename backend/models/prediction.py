from sqlalchemy import (
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

from .base import Base, ist_now


class Prediction(Base):
    __tablename__ = "predictions"

    # -------------------------
    # Primary Key
    # -------------------------

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # -------------------------
    # Prediction Results
    # -------------------------

    predicted_label: Mapped[str] = mapped_column(
        String(120),
        nullable=False
    )

    confidence_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    risk_level: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    # -------------------------
    # Stage Information
    # -------------------------

    stage_used: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    model_version: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    processing_time_ms: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    # -------------------------
    # Explainable AI
    # -------------------------

    heatmap_overlay_path: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    heatmap_only_path: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    # -------------------------
    # Advanced Storage
    # -------------------------

    raw_output: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    extra_metadata: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    # -------------------------
    # Processing Status
    # -------------------------

    status: Mapped[str] = mapped_column(
        String(20),
        default="completed"
    )

    # -------------------------
    # Audit
    # -------------------------

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        default=ist_now
    )

    # -------------------------
    # Foreign Keys
    # -------------------------

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    image_id: Mapped[int] = mapped_column(
        ForeignKey("images.id"),
        nullable=False
    )

    # -------------------------
    # Relationships
    # -------------------------

    user = relationship(
        "User",
        back_populates="predictions"
    )

    image = relationship(
        "Image",
        back_populates="predictions"
    )

    def to_dict(self):
        return {
            "id": self.id,
    
            "image_id": self.image_id,
            "user_id": self.user_id,
    
            "predicted_label": self.predicted_label,
            "confidence_score": self.confidence_score,
    
            "risk_level": self.risk_level,
    
            "stage_used": self.stage_used,
            "model_version": self.model_version,
    
            "processing_time_ms": self.processing_time_ms,
    
            "heatmap_overlay_path":
                self.heatmap_overlay_path,
    
            "heatmap_only_path":
                self.heatmap_only_path,
    
            "status": self.status,
    
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
        }

    # -------------------------
    # Representation
    # -------------------------

    def __repr__(self):
        return (
            f"<Prediction(id={self.id}, "
            f"label='{self.predicted_label}', "
            f"confidence_score={self.confidence_score})>"
        )