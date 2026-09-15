from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict
from pydantic import Field
from datetime import date

# =====================================================
# Register
# =====================================================

class RegisterRequest(BaseModel):
    full_name: str
    username: str
    email: EmailStr
    password: str

    phone_number: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[str] = None


# =====================================================
# Login
# =====================================================

class LoginRequest(BaseModel):
    identifier: str
    password: str

#=======================================================
# User Responce
#=======================================================

class UserResponse(BaseModel):
    id: int
    full_name: str
    username: str
    email: str
    phone_number: str | None = None
    gender: str | None = None
    role: str
    is_active: bool

    profile_picture: str | None = None
    bio: str | None = None
    date_of_birth: date | None = None

    height_cm: float | None = None
    weight_kg: float | None = None
    blood_group: str | None = None
    medical_history: str | None = None
    allergies: str | None = None

    model_config = ConfigDict(from_attributes=True)


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class RegisterResponse(BaseModel):
    message: str
    user_id: int
# =====================================================
# Password Reset
# =====================================================

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(
        min_length=8,
        max_length=128,
    )

class ChangePasswordRequest(BaseModel):
    current_password: str = Field(
        min_length=8,
        max_length=128,
    )

    new_password: str = Field(
        min_length=8,
        max_length=128,
    )
# =====================================================
# Profile Update
# =====================================================

class UpdateProfileRequest(BaseModel):
    full_name: Optional[str] = None
    phone_number: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[date] = None

    bio: Optional[str] = None
    profile_picture: Optional[str] = None

    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None

    blood_group: Optional[str] = None

    medical_history: Optional[str] = None
    allergies: Optional[str] = None


# =====================================================
# Auth Responses
# =====================================================

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class MessageResponse(BaseModel):
    message: str