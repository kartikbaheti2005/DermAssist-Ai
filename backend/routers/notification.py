from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import (
    get_current_user,
)

from services.notification_service import (
    get_notifications,
    get_unread_notifications,
    get_notification,
    mark_notification_as_read,
    mark_all_notifications_as_read,
    delete_notification,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)

@router.get("/")
def notification_list(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    
    notifications = get_notifications(
        db,
        current_user.id,
    )

    return [
        notification.to_dict()
        for notification in notifications
    ]

@router.get("/unread")
def unread_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    notifications = get_unread_notifications(
        db,
        current_user.id,
    )

    return [
        notification.to_dict()
        for notification in notifications
    ]

@router.patch("/{notification_id}/read")
def read_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    notification = get_notification(
        db,
        notification_id,
        current_user.id,
    )

    if not notification:

        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    notification = mark_notification_as_read(
        db,
        notification,
    )

    return {
        "message": "Notification marked as read",
        "notification": notification.to_dict(),
    }

@router.patch("/read-all")
def read_all_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    count = mark_all_notifications_as_read(
        db,
        current_user.id,
    )

    return {
        "message": f"{count} notifications marked as read"
    }

@router.delete("/{notification_id}")
def remove_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    notification = get_notification(
        db,
        notification_id,
        current_user.id,
    )

    if not notification:

        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    delete_notification(
        db,
        notification,
    )

    return {
        "message": "Notification deleted"
    }