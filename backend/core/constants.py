# backend/core/constants.py

class NotificationType:
    APPOINTMENT = "appointment"
    PREDICTION = "prediction"
    HEALTH = "health"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class NotificationPriority:
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"