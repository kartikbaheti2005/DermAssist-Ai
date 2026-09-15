from sqlalchemy import (
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from .base import Base, ist_now


class Notification(Base):
    __tablename__ = "notifications"

    # -------------------------
    # Primary Key
    # -------------------------

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    # -------------------------
    # User
    # -------------------------

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    # -------------------------
    # Notification Content
    # -------------------------

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    message: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    # -------------------------
    # Metadata
    # -------------------------

    type: Mapped[str] = mapped_column(
        String(50),
        default="system",
    )

    priority: Mapped[str] = mapped_column(
        String(20),
        default="medium",
    )

    action_url: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    # -------------------------
    # Status
    # -------------------------

    is_read: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
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
        back_populates="notifications",
    )

    # -------------------------
    # Helper
    # -------------------------

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "message": self.message,
            "type": self.type,
            "priority": self.priority,
            "action_url": self.action_url,
            "is_read": self.is_read,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
        }

    def __repr__(self):
        return (
            f"<Notification(id={self.id}, "
            f"title='{self.title}', "
            f"user_id={self.user_id})>"
        )