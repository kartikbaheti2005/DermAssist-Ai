from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from database.session import get_db

from schemas.auth import LoginResponse
from schemas.auth import RegisterResponse

from schemas.auth import (
    RegisterRequest,
    LoginRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
)

from services.auth_service import (
    register_user,
    login_user,
    forgot_password,
    reset_password,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# =====================================================
# Register
# =====================================================

@router.post(
        "/register",
        response_model=RegisterResponse
        )
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db),
):
    try:

        user = register_user(
            db,
            payload,
        )

        return {
            "message": "User registered successfully",
            "user_id": user.id,
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# =====================================================
# Login
# =====================================================

@router.post(
    "/login",
    response_model=LoginResponse,
)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db),
):
    try:

        result = login_user(
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
# Forgot Password
# =====================================================

@router.post("/forgot-password")
def forgot_password_route(
    payload: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    forgot_password(
        db,
        payload.email,
    )

    return {
        "message":
        "If account exists, reset email sent."
    }


# =====================================================
# Reset Password
# =====================================================

@router.post("/reset-password")
def reset_password_route(
    payload: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    success = reset_password(
        db,
        payload.token,
        payload.new_password,
    )

    if not success:

        raise HTTPException(
            status_code=400,
            detail="Invalid or expired token",
        )

    return {
        "message":
        "Password reset successful"
    }