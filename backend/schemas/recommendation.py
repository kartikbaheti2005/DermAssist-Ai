from typing import Optional

from pydantic import BaseModel


# =====================================================
# Recommended Doctor
# =====================================================

class RecommendedDoctor(BaseModel):
    doctor_id: int

    doctor_name: str

    specialty: Optional[str] = None

    clinic_name: Optional[str] = None

    city: Optional[str] = None

    rating: Optional[float] = None

    recommendation_reason: str


# =====================================================
# Recommendation Response
# =====================================================

class DoctorRecommendationResponse(BaseModel):
    predicted_label: str

    recommended_specialty: str

    doctors: list[RecommendedDoctor]