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
    ChangePasswordRequest,
    UserResponse,
    MessageResponse,
    UpdateProfileRequest,
)

from services.auth_service import (
    register_user,
    login_user,
    forgot_password,
    reset_password,
    get_current_user_profile,
    logout_user,
    change_password,
    update_profile,
    deactivate_account,
)

from core.dependencies import (
    get_current_user,
    oauth2_scheme,
)

from models.user import User

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
# Current User
# =====================================================

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return get_current_user_profile(
        current_user,
    )


# =====================================================
# Logout
# =====================================================

@router.post(
    "/logout",
    response_model=MessageResponse,
)
def logout(
    token: str = Depends(oauth2_scheme),
    current_user: User = Depends(get_current_user),
):
    return logout_user(
        token,
    )


# =====================================================
# Change Password
# =====================================================

@router.post(
    "/change-password",
    response_model=MessageResponse,
)
def change_user_password(
    payload: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        return change_password(
            db=db,
            current_user=current_user,
            current_password=payload.current_password,
            new_password=payload.new_password,
        )

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

# =======================================================
# Update Profile
# =======================================================

@router.put(
    "/profile",
    response_model=UserResponse,
)
def update_user_profile(
    payload: UpdateProfileRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_profile(
        db=db,
        current_user=current_user,
        data=payload,
    )

@router.delete(
    "/account",
    response_model=MessageResponse,
)
def delete_account(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return deactivate_account(
        db=db,
        current_user=current_user,
    )