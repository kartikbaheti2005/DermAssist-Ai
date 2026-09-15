from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


# =====================================================
# Create Health Record
# =====================================================

class HealthRecordCreateRequest(BaseModel):
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None

    blood_group: Optional[str] = None

    medical_history: Optional[str] = None
    allergies: Optional[str] = None
    medications: Optional[str] = None

    notes: Optional[str] = None

    record_date: Optional[date] = None


# =====================================================
# Update Health Record
# =====================================================

class HealthRecordUpdateRequest(BaseModel):
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None

    blood_group: Optional[str] = None

    medical_history: Optional[str] = None
    allergies: Optional[str] = None
    medications: Optional[str] = None

    notes: Optional[str] = None

    record_date: Optional[date] = None


# =====================================================
# Health Record Response
# =====================================================

class HealthRecordResponse(BaseModel):
    id: int

    user_id: int

    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None

    bmi: Optional[float] = None

    blood_group: Optional[str] = None

    medical_history: Optional[str] = None
    allergies: Optional[str] = None
    medications: Optional[str] = None

    notes: Optional[str] = None

    record_date: Optional[date] = None

    created_at: datetime

    class Config:
        from_attributes = True


# =====================================================
# Health Record Summary
# =====================================================

class HealthRecordSummary(BaseModel):
    id: int

    weight_kg: Optional[float] = None
    bmi: Optional[float] = None

    record_date: Optional[date] = None

    class Config:
        from_attributes = True