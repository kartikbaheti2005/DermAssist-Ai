from datetime import datetime

from pydantic import BaseModel


# ==========================================
# Create Notification
# ==========================================

class NotificationCreateRequest(BaseModel):
    title: str
    message: str

    type: str = "system"

    priority: str = "medium"

    action_url: str | None = None


# ==========================================
# Notification Response
# ==========================================

class NotificationResponse(BaseModel):
    id: int

    user_id: int

    title: str
    message: str

    type: str

    priority: str

    action_url: str | None

    is_read: bool

    created_at: datetime

    class Config:
        from_attributes = True


# ==========================================
# Notification Summary
# ==========================================

class NotificationSummary(BaseModel):
    total_notifications: int

    unread_notifications: int