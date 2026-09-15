from datetime import datetime, UTC

from sqlalchemy import func
from sqlalchemy.orm import Session

from models.prediction import Prediction


# =====================================================
# Generate Outbreak Summary
# =====================================================

def get_outbreak_summary(
    db: Session,
):
    total_predictions = (
        db.query(Prediction)
        .count()
    )

    high_risk = (
        db.query(Prediction)
        .filter(
            Prediction.risk_level == "high"
        )
        .count()
    )

    diseases = (
        db.query(
            Prediction.predicted_label
        )
        .distinct()
        .count()
    )

    return {

        "total_predictions":
            total_predictions,

        "high_risk_cases":
            high_risk,

        "tracked_diseases":
            diseases,

        "locations_monitored":
            0,

        "generated_at":
            datetime.now(UTC),
    }

# =====================================================
# Trending Diseases
# =====================================================


def get_trending_diseases(
    db: Session,
):
    diseases = (
        db.query(
            Prediction.predicted_label,
            func.count(Prediction.id),
        )
        .group_by(
            Prediction.predicted_label,
        )
        .order_by(
            func.count(Prediction.id).desc(),
        )
        .all()
    )

    return [
        {
            "disease": disease,
            "total_cases": total,
            "growth_percentage": 0.0,
        }
        for disease, total in diseases
    ]


# =====================================================
# Active Alerts
# =====================================================

def get_active_alerts(
    db: Session,
):
    alerts = (
        db.query(
            Prediction.predicted_label,
            func.count(Prediction.id),
        )
        .filter(
            Prediction.risk_level == "high"
        )
        .group_by(
            Prediction.predicted_label,
        )
        .all()
    )

    if not alerts:
        return {
            "status": "healthy",
            "message": (
                "No outbreak alerts available. "
                "ML prediction engine is not yet connected "
                "or no high-risk cases exist."
            ),
            "alerts": [],
        }

    return [
        {
            "disease": disease,
            "location": "Unknown",
            "cases": total,
            "severity": (
                "high"
                if total >= 3
                else "medium"
            ),
            "message": (
                f"{total} high-risk "
                f"cases detected."
            ),
        }
        for disease, total in alerts
    ]


# =====================================================
# Generate Alerts
# =====================================================

def generate_outbreak_alerts(
    db: Session,
):
    alerts = (
        db.query(
            Prediction.predicted_label,
            func.count(Prediction.id),
        )
        .filter(
            Prediction.risk_level == "high"
        )
        .group_by(
            Prediction.predicted_label,
        )
        .all()
    )

    generated = sum(
        1
        for _, count in alerts
        if count >= 3
    )

    return {
        "alerts_generated": generated,
        "message": (
            "Outbreak analysis "
            "completed successfully."
        ),
    }