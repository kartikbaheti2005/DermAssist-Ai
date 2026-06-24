from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import (
    get_current_user,
)

from services.report_service import (
    get_dashboard_report,
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


# =====================================================
# Dashboard Report
# =====================================================

@router.get("/dashboard")
def dashboard_report(
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user
    ),
):
    return get_dashboard_report(
        db,
        current_user.id,
    )