from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from .base import Base, ist_now


class Image(Base):
    __tablename__ = "images"

    # -------------------------
    # Primary Key
    # -------------------------

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    # -------------------------
    # Image Information
    # -------------------------

    image_name: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True
    )

    image_path: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    image_format: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    image_size_kb: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    # -------------------------
    # Future Lesion Tracking
    # -------------------------

    lesion_id: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    is_followup: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    body_part: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    # -------------------------
    # Audit
    # -------------------------

    uploaded_at: Mapped[DateTime] = mapped_column(
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

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "image_name": self.image_name,
            "image_path": self.image_path,
            "image_format": self.image_format,
            "image_size_kb": self.image_size_kb,
            "lesion_id": self.lesion_id,
            "is_followup": self.is_followup,
            "body_part": self.body_part,
            "uploaded_at": (
                self.uploaded_at.isoformat()
                if self.uploaded_at
                else None
            ),
    }

    # -------------------------
    # Relationships
    # -------------------------

    owner = relationship(
        "User",
        back_populates="images"
    )

    predictions = relationship(
        "Prediction",
        back_populates="image",
        cascade="all, delete-orphan"
    )

    # -------------------------
    # Representation
    # -------------------------

    def __repr__(self):
        return (
            f"<Image(id={self.id}, "
            f"name='{self.image_name}')>"
        )