from typing import Optional

from pydantic import BaseModel, EmailStr
from pydantic import Field

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
    email: EmailStr

    phone_number: Optional[str] = None
    gender: Optional[str] = None

    role: str
    is_active: bool

    profile_picture: Optional[str] = None


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
    new_password: str

password: str = Field(
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
    bio: Optional[str] = None


# =====================================================
# Auth Responses
# =====================================================

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class MessageResponse(BaseModel):
    message: str