from datetime import datetime, timedelta, UTC
import secrets

from sqlalchemy import or_
from sqlalchemy.orm import Session

from models.user import User

from schemas.auth import RegisterRequest

from core.security import (
    hash_password,
    verify_password,
    create_access_token,
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

    if not user:
        return None
    
# TODO:Re-enable after email verification flow is implemented

    # if not user.is_verified:
    #     raise ValueError(
    #         "Please verify your email"
    #     )

    if not verify_password(
        password,
        user.password_hash,
    ):
        return None

    try:
        user.last_login = datetime.now(UTC)
        db.commit()

    except Exception:
        db.rollback()

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role,
        }
    )

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
        }
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

    user.reset_token = None
    user.reset_token_expiry = None

    db.commit()

    return True