from typing import Optional

from pydantic import BaseModel, EmailStr, ConfigDict


# =====================================================
# Doctor Registration
# =====================================================

class DoctorRegisterRequest(BaseModel):
    full_name: str
    username: str
    email: EmailStr
    password: str

    phone: str

    gender: Optional[str] = None
    date_of_birth: Optional[str] = None

    post: str
    specialty: str

    qualification: str
    education_details: Optional[str] = None

    practice_start_year: int

    clinic_name: str
    address: str
    city: str

    available_days: list[str] = []
    available_slots: list[str] = []

    specializes_in: list[str] = []
    languages: list[str] = []

    consultation_fee: int = 500

    bio: Optional[str] = None


# =====================================================
# Doctor Login
# =====================================================

class DoctorLoginRequest(BaseModel):
    identifier: str
    password: str


# =====================================================
# Doctor Profile Update
# =====================================================

class DoctorProfileUpdateRequest(BaseModel):
    model_config = ConfigDict(
        extra="forbid"
        )

    full_name: Optional[str] = None
    phone: Optional[str] = None

    bio: Optional[str] = None

    consultation_fee: Optional[int] = None

    clinic_name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None

    available_days: Optional[list[str]] = None
    available_slots: Optional[list[str]] = None

    specializes_in: Optional[list[str]] = None
    languages: Optional[list[str]] = None

    qualification: Optional[str] = None


# =====================================================
# Doctor Rating
# =====================================================

class DoctorRatingRequest(BaseModel):
    doctor_id: int
    rating: float


# =====================================================
# Doctor Approval
# =====================================================

class DoctorRejectionRequest(BaseModel):
    notes: Optional[str] = ""


# =====================================================
# Appointment Status Update
# =====================================================

class DoctorAppointmentStatusRequest(BaseModel):
    status: str