from sqlalchemy.orm import Session

from models.user import User

from services.report_service import (
    get_dashboard_report,
    get_latest_prediction,
    get_next_appointment,
)

from services.health_record_service import (
    get_latest_record,
)

def get_assistant_context(
    db: Session,
    current_user: User,
):
    latest_record = get_latest_record(
        db,
        current_user.id,
    )

    return {
        "user": {
            "id": current_user.id,
            "name": current_user.full_name,
            "email": current_user.email,
        },

        "dashboard":
            get_dashboard_report(
                db,
                current_user.id,
            ),

        "latest_prediction":
            get_latest_prediction(
                db,
                current_user.id,
            ),

        "next_appointment":
            get_next_appointment(
                db,
                current_user.id,
            ),

        "latest_health_record":
            latest_record.to_dict()
            if latest_record
            else None,
    }



def get_assistant_suggestions(
    db: Session,
    current_user: User,
):
    suggestions = []

    latest_prediction = get_latest_prediction(
        db,
        current_user.id,
    )

    latest_record = get_latest_record(
        db,
        current_user.id,
    )

    next_appointment = get_next_appointment(
        db,
        current_user.id,
    )

    # -------------------------
    # Health Record
    # -------------------------

    if not latest_record:

        suggestions.append({
            "type": "health",
            "title": "Complete your health profile",
            "description":
                "Add your height, weight and medical history.",
            "priority": "high",
        })

    # -------------------------
    # Prediction
    # -------------------------

    if not latest_prediction:

        suggestions.append({
            "type": "prediction",
            "title": "Upload a skin image",
            "description":
                "Get an AI-powered skin analysis.",
            "priority": "medium",
        })

    elif latest_prediction["risk_level"] == "high":

        suggestions.append({
            "type": "prediction",
            "title": "Consult a dermatologist",
            "description":
                "Your latest prediction indicates a high-risk condition.",
            "priority": "critical",
        })

    # -------------------------
    # Appointment
    # -------------------------

    if next_appointment:

        suggestions.append({
            "type": "appointment",
            "title": "Upcoming appointment",
            "description":
                f"You have an appointment on "
                f"{next_appointment['appointment_date']}.",
            "priority": "low",
        })

    else:

        suggestions.append({
            "type": "appointment",
            "title": "Book an appointment",
            "description":
                "Consult a dermatologist if symptoms persist.",
            "priority": "medium",
        })

    return suggestions

def get_assistant_actions(
    db: Session,
    current_user: User,
):
    actions = []

    latest_prediction = get_latest_prediction(
        db,
        current_user.id,
    )

    latest_record = get_latest_record(
        db,
        current_user.id,
    )

    next_appointment = get_next_appointment(
        db,
        current_user.id,
    )

    # -------------------------
    # Health Record
    # -------------------------

    if latest_record:

        actions.append({
            "title": "View Health Record",
            "icon": "activity",
            "action": "view_health_record",
            "route": "/health-records/latest",
        })

    else:

        actions.append({
            "title": "Create Health Record",
            "icon": "activity",
            "action": "create_health_record",
            "route": "/health-records",
        })

    # -------------------------
    # Prediction
    # -------------------------

    if latest_prediction:

        actions.append({
            "title": "View Prediction",
            "icon": "scan",
            "action": "view_prediction",
            "route": "/predictions",
        })

    else:

        actions.append({
            "title": "Upload Skin Image",
            "icon": "upload",
            "action": "upload_image",
            "route": "/images/upload",
        })

    # -------------------------
    # Appointment
    # -------------------------

    if next_appointment:

        actions.append({
            "title": "View Appointment",
            "icon": "calendar",
            "action": "view_appointment",
            "route": "/appointments/my",
        })

    else:

        actions.append({
            "title": "Book Appointment",
            "icon": "calendar",
            "action": "book_appointment",
            "route": "/appointments",
        })

    return actions

def submit_assistant_feedback(
    current_user: User,
    rating: int,
    feedback: str | None,
):
    """
    Phase 4

    Placeholder.

    Future:

    Store feedback

    Link with conversation

    Link with LLM response

    RLHF dataset

    Analytics
    """

    return {
        "message": "Feedback received successfully.",
        "rating": rating,
        "feedback": feedback,
        "stored": False,
    }

def get_prediction_heatmap(
    db: Session,
    prediction_id: int,
    user_id: int,
):
    prediction = get_prediction(
        db,
        prediction_id,
        user_id,
    )

    if not prediction:
        raise ValueError(
            "Prediction not found"
        )

    return {
        "prediction_id": prediction.id,

        "overlay_image":
            prediction.heatmap_overlay_path,

        "heatmap_image":
            prediction.heatmap_only_path,

        "available": bool(
            prediction.heatmap_overlay_path
            or prediction.heatmap_only_path
        ),

        "message": (
            "Heatmap available."
            if (
                prediction.heatmap_overlay_path
                or prediction.heatmap_only_path
            )
            else
            "Heatmap will be generated after ML integration."
        ),
    }