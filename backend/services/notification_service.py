from sqlalchemy.orm import Session

from core.constants import NotificationPriority, NotificationType
from models.notification import Notification
from models.user import User

def create_notification(
    db: Session,
    user_id: int,
    title: str,
    message: str,
    notification_type=NotificationType.APPOINTMENT,
    priority=NotificationPriority.MEDIUM,
    action_url: str | None = None,
):

    notification = Notification(
        user_id=user_id,
        title=title,
        message=message,
        type=notification_type,
        priority=priority,
        action_url=action_url,
    )

    db.add(notification)

    db.commit()

    db.refresh(notification)

    return notification

def notify_appointment_booked(
    db: Session,
    user_id: int,
    doctor_name: str,
    appointment_date,
    appointment_time,
):
    return create_notification(
        db=db,
        user_id=user_id,
        title="Appointment Booked",
        message=(
            f"Your appointment with {doctor_name} "
            f"has been booked for "
            f"{appointment_date} at "
            f"{appointment_time}."
        ),
        notification_type="appointment",
        priority="medium",
        action_url="/appointments/my",
    )

def notify_appointment_status(
    db: Session,
    user_id: int,
    status: str,
):
    return create_notification(
        db=db,
        user_id=user_id,
        title="Appointment Updated",
        message=(
            f"Your appointment status "
            f"has been updated to "
            f"'{status}'."
        ),
        notification_type="appointment",
        priority=(
            "high"
            if status == "confirmed"
            else "medium"
        ),
        action_url="/appointments/my",
    )

def notify_prediction_completed(
    db: Session,
    user_id: int,
    prediction_label: str,
):
    return create_notification(
        db=db,
        user_id=user_id,
        title="Prediction Completed",
        message=(
            f"Your AI skin analysis "
            f"has been completed. "
            f"Prediction: {prediction_label}."
        ),
        notification_type="prediction",
        priority="medium",
        action_url="/predictions",
    )

def notify_high_risk_prediction(
    db: Session,
    user_id: int,
):
    return create_notification(
        db=db,
        user_id=user_id,
        title="High Risk Alert",
        message=(
            "Your latest prediction indicates "
            "a high-risk condition. "
            "Please consult a dermatologist."
        ),
        notification_type="prediction",
        priority="critical",
        action_url="/appointments",
    )

def notify_health_record_created(
    db: Session,
    user_id: int,
):
    return create_notification(
        db=db,
        user_id=user_id,
        title="Health Record Created",
        message=(
            "Your health profile "
            "has been created successfully."
        ),
        notification_type="health",
        priority="low",
        action_url="/health-records",
    )

def notify_health_record_updated(
    db: Session,
    user_id: int,
):
    return create_notification(
        db=db,
        user_id=user_id,
        title="Health Record Updated",
        message=(
            "Your health profile "
            "has been updated successfully."
        ),
        notification_type="health",
        priority="low",
        action_url="/health-records",
    )

def get_notifications(
    db: Session,
    user_id: int,
):
    return (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id
        )
        .order_by(
            Notification.created_at.desc()
        )
        .all()
    )

def get_unread_notifications(
    db: Session,
    user_id: int,
):
    return (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == False,
        )
        .order_by(
            Notification.created_at.desc()
        )
        .all()
    )

def get_notification(
    db: Session,
    notification_id: int,
    user_id: int,
):
    return (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == user_id,
        )
        .first()
    )

def mark_notification_as_read(
    db: Session,
    notification: Notification,
):
    notification.is_read = True

    db.commit()

    db.refresh(notification)

    return notification

def mark_all_notifications_as_read(
    db: Session,
    user_id: int,
):
    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == False,
        )
        .all()
    )

    for notification in notifications:
        notification.is_read = True

    db.commit()

    return len(notifications)

def delete_notification(
    db: Session,
    notification: Notification,
):
    db.delete(notification)

    db.commit()

    return True

