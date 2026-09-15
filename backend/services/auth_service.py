from datetime import datetime, timedelta, UTC
import secrets
from time import perf_counter
from sqlalchemy import or_
from sqlalchemy.orm import Session

from models.user import User

from schemas.auth import (
    RegisterRequest,
    UpdateProfileRequest,
)

from core.security import (
    hash_password,
    verify_password,
    create_access_token,
    token_blacklist,
)

from services.email_service import (
    send_reset_email,
)


# =====================================================
# Register
# =====================================================


def register_user(
    db: Session,
    data: RegisterRequest,
):
    existing_user = (
        db.query(User)
        .filter(
            or_(
                User.email == data.email,
                User.username == data.username,
            )
        )
        .first()
    )

    if existing_user:
        raise ValueError(
            "Email or username already registered"
        )

    user = User(
        full_name=data.full_name,
        username=data.username,
        email=data.email,
        phone_number=data.phone_number,
        gender=data.gender,
    )

    user.password_hash = hash_password(
        data.password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


# =====================================================
# Login
# =====================================================

def login_user(
    db: Session,
    identifier: str,
    password: str,
):
    total_start = perf_counter()

    # Database lookup
    t = perf_counter()

    user = (
        db.query(User)
        .filter(
            or_(
                User.email == identifier,
                User.username == identifier,
            )
        )
        .first()
    )

    print(f"[LOGIN] Database Query: {(perf_counter() - t) * 1000:.2f} ms")

    if not user:
        raise ValueError(
            "Invalid email/username or password."
        )

    if not user.is_active:
        raise ValueError(
            "Your account has been deactivated. Please contact support."
        )

    # Password verification
    t = perf_counter()

    if not verify_password(
        password,
        user.password_hash,
    ):
        raise ValueError(
            "Invalid email/username or password."
        )

    print(f"[LOGIN] Password Verify: {(perf_counter() - t) * 1000:.2f} ms")

    # Update last login
    t = perf_counter()

    try:
        user.last_login = datetime.now(UTC)
        db.commit()
    except Exception:
        db.rollback()

    print(f"[LOGIN] DB Commit: {(perf_counter() - t) * 1000:.2f} ms")

    # JWT creation
    t = perf_counter()

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

    print(f"[LOGIN] JWT Creation: {(perf_counter() - t) * 1000:.2f} ms")

    print(f"[LOGIN] TOTAL: {(perf_counter() - total_start) * 1000:.2f} ms")

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number,
            "gender": user.gender,
            "role": user.role,
            "is_active": user.is_active,
            "profile_picture": user.profile_picture,
        },
    }

# =====================================================
# Current User
# =====================================================

def get_current_user_profile(
    current_user: User,
) -> User:
    return current_user


# =====================================================
# Logout
# =====================================================

def logout_user(
    token: str,
) -> dict:
    token_blacklist.add(token)

    return {
        "message": "Logged out successfully"
    }


# =====================================================
# Change Password
# =====================================================

def change_password(
    db: Session,
    current_user: User,
    current_password: str,
    new_password: str,
):
    if not verify_password(
        current_password,
        current_user.password_hash,
    ):
        raise ValueError(
            "Current password is incorrect"
        )

    if verify_password(
        new_password,
        current_user.password_hash,
    ):
        raise ValueError(
            "New password must be different from the current password."
        )

    current_user.password_hash = hash_password(
        new_password
    )

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Password changed successfully"
    }


# =====================================================
# Forgot Password
# =====================================================

def forgot_password(
    db: Session,
    email: str,
):
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        return False

    reset_token = secrets.token_urlsafe(64)

    user.reset_token = reset_token

    user.reset_token_expiry = (
        datetime.utcnow()
        + timedelta(minutes=30)
    )

    db.commit()

    send_reset_email(
        user.email,
        user.full_name,
        reset_token,
    )

    return True


# =====================================================
# Reset Password
# =====================================================

def reset_password(
    db: Session,
    token: str,
    new_password: str,
):
    user = (
        db.query(User)
        .filter(
            User.reset_token == token
        )
        .first()
    )

    if not user:
        return False

    if (
        not user.reset_token_expiry
        or user.reset_token_expiry
        < datetime.utcnow()
    ):
        return False

    if len(new_password) < 8:
        return False
    
    user.password_hash = hash_password(
        new_password
    )
    
    user.reset_token = None
    user.reset_token_expiry = None

    db.commit()

    return True

# =====================================================
# Update Profile
# =====================================================

def update_profile(
    db: Session,
    current_user: User,
    data: UpdateProfileRequest,
):
    update_data = data.model_dump(exclude_unset=True)

    print("Incoming payload:", update_data)

    for field, value in update_data.items():
        setattr(current_user, field, value)

    db.commit()
    db.refresh(current_user)

    return current_user

# =====================================================
# Deactivate Account
# =====================================================

def deactivate_account(
    db: Session,
    current_user: User,
):
    current_user.is_active = False

    db.commit()

    return {
        "message": "Account deactivated successfully."
    }