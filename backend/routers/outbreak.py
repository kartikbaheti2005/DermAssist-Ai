from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from database.session import get_db

from services.outbreak_service import (
    get_outbreak_summary,
    get_trending_diseases,
    get_active_alerts,
    generate_outbreak_alerts,
)

router = APIRouter(
    prefix="/outbreaks",
    tags=["Outbreak Intelligence"],
)


# =====================================================
# Summary
# =====================================================

@router.get("")
def outbreak_summary(
    db: Session = Depends(get_db),
):
    return get_outbreak_summary(db)


# =====================================================
# Trending Diseases
# =====================================================

@router.get("/trending")
def trending_diseases(
    db: Session = Depends(get_db),
):
    return get_trending_diseases(db)


# =====================================================
# Active Alerts
# =====================================================

@router.get("/alerts")
def active_alerts():
    return get_active_alerts()


# =====================================================
# Generate Alerts
# =====================================================

@router.post("/generate")
def generate_alerts(
    db: Session = Depends(get_db),
):
    return generate_outbreak_alerts(db)