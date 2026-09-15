from datetime import date, time
from typing import Optional

from pydantic import BaseModel


# =====================================================
# Create Appointment
# =====================================================

class AppointmentCreateRequest(BaseModel):
    doctor_id: int

    appointment_date: date
    appointment_time: str

    reason: Optional[str] = None
    notes: Optional[str] = None


# =====================================================
# Update Appointment Status
# =====================================================

class AppointmentStatusUpdateRequest(BaseModel):
    status: str


# =====================================================
# Reschedule Appointment
# =====================================================

class AppointmentRescheduleRequest(BaseModel):
    appointment_date: date
    appointment_time: str


# =====================================================
# Appointment Response
# =====================================================

class AppointmentResponse(BaseModel):
    id: int

    doctor_id: int
    user_id: int

    doctor_name: str
    doctor_specialty: str

    appointment_date: date
    appointment_time: str

    status: str

    reason: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True