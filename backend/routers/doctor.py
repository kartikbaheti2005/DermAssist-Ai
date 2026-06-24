from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import (
    get_current_doctor,
    get_current_user
)

from models.user import User

from schemas.doctor import (
    DoctorRegisterRequest,
    DoctorLoginRequest,
    DoctorProfileUpdateRequest,
    DoctorRatingRequest,
)

from services.doctor_service import (
    register_doctor,
    login_doctor,
    get_doctors,
    get_doctor_cities,
    update_doctor_profile,
    rate_doctor,
)

router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"],
)


# =====================================================
# Register Doctor
# =====================================================

@router.post("/register")
def register_doctor_route(
    payload: DoctorRegisterRequest,
    db: Session = Depends(get_db),
):
    try:

        doctor = register_doctor(
            db,
            payload,
        )

        return {
            "message":
                "Doctor registration submitted successfully. Waiting for admin approval.",
            "doctor_id":
                doctor.id,
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# =====================================================
# Doctor Login
# =====================================================

@router.post("/login")
def doctor_login(
    payload: DoctorLoginRequest,
    db: Session = Depends(get_db),
):
    try:

        result = login_doctor(
            db,
            payload.identifier,
            payload.password,
        )

        if not result:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials",
            )

        return result

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# =====================================================
# List Doctors
# =====================================================

@router.get("")
def list_doctors(
    city: str | None = None,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    return get_doctors(
        db=db,
        city=city,
        search=search,
    )


# =====================================================
# Available Cities
# =====================================================

@router.get("/cities")
def available_cities(
    db: Session = Depends(get_db),
):
    return get_doctor_cities(
        db,
    )


# =====================================================
# Current Doctor Profile
# =====================================================

@router.get("/me")
def doctor_me(
    doctor=Depends(
        get_current_doctor
    ),
):
    return doctor.to_public_dict()


# =====================================================
# Update Profile
# =====================================================

@router.put("/profile")
def update_profile(
    payload: DoctorProfileUpdateRequest,
    db: Session = Depends(get_db),
    doctor=Depends(
        get_current_doctor
    ),
):
    try:

        updated = update_doctor_profile(
            db,
            doctor,
            payload,
        )

        return {
            "message":
                "Profile updated successfully",
            "doctor":
                updated.to_public_dict(),
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# =====================================================
# Rate Doctor
# =====================================================

@router.post("/rate")
def rate_doctor_route(
    payload: DoctorRatingRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:

        doctor = rate_doctor(
            db,
            payload.doctor_id,
            payload.rating,
        )

        return {
            "message":
                "Rating submitted successfully",
            "rating":
                doctor.rating,
            "review_count":
                doctor.review_count,
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )