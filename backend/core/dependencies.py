from fastapi import (
    Depends,
    HTTPException,
    status,
)

from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from database.session import get_db

from core.security import decode_token

from models.user import User
from models.doctor import Doctor


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:

    payload = decode_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled",
        )

    return user

def get_current_admin(
    current_user: User = Depends(get_current_user),
) -> User:

    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    return current_user


def get_current_doctor(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> Doctor:

    payload = decode_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    if payload.get("role") != "doctor":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Doctor access required",
        )

    doctor_id = payload.get("doctor_id")

    if not doctor_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid doctor token",
        )

    doctor = (
        db.query(Doctor)
        .filter(Doctor.id == doctor_id)
        .first()
    )

    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Doctor not found",
        )

    if not doctor.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Doctor account inactive",
        )

    return doctor