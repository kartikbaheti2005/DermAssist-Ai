from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import get_current_user

from models.user import User

from schemas.auth import (
    UpdateProfileRequest,
    UserResponse,
)

from services.auth_service import (
    get_current_user_profile,
    update_profile,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


# =====================================================
# Get Current User Profile
# =====================================================

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_current_profile(
    current_user: User = Depends(get_current_user),
):
    return get_current_user_profile(
        current_user,
    )


# =====================================================
# Update Current User Profile
# =====================================================

@router.put(
    "/me",
    response_model=UserResponse,
)
def update_current_profile(
    payload: UpdateProfileRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_profile(
        db=db,
        current_user=current_user,
        data=payload,
    )