from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import (
    get_current_admin,
)

from models.doctor import Doctor

from schemas.doctor import (
    DoctorRejectionRequest,
)

from services.doctor_service import (
    approve_doctor,
    reject_doctor,
    delete_doctor,
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


# =====================================================
# List All Doctors
# =====================================================

@router.get("/doctors")
def get_all_doctors(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    doctors = db.query(Doctor).all()

    return [
        doctor.to_public_dict()
        for doctor in doctors
    ]


# =====================================================
# Approve Doctor
# =====================================================

@router.put("/doctors/{doctor_id}/approve")
def approve_doctor_route(
    doctor_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    try:

        doctor = approve_doctor(
            db,
            doctor_id,
        )

        return {
            "message":
                "Doctor approved successfully",
            "doctor":
                doctor.to_public_dict(),
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


# =====================================================
# Reject Doctor
# =====================================================

@router.put("/doctors/{doctor_id}/reject")
def reject_doctor_route(
    doctor_id: int,
    payload: DoctorRejectionRequest,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    try:

        doctor = reject_doctor(
            db,
            doctor_id,
            payload.notes,
        )

        return {
            "message":
                "Doctor rejected successfully",
            "doctor":
                doctor.to_public_dict(),
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


# =====================================================
# Delete Doctor
# =====================================================

@router.delete("/doctors/{doctor_id}")
def delete_doctor_route(
    doctor_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    try:

        delete_doctor(
            db,
            doctor_id,
        )

        return {
            "message":
                "Doctor deleted successfully"
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )