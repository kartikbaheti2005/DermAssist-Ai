from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# =====================================================
# Outbreak Alert
# =====================================================

class OutbreakAlert(BaseModel):
    disease: str

    location: str

    cases: int

    severity: str

    message: str

    generated_at: datetime


# =====================================================
# Trending Disease
# =====================================================

class TrendingDisease(BaseModel):
    disease: str

    total_cases: int

    growth_percentage: float


# =====================================================
# Outbreak Summary
# =====================================================

class OutbreakSummary(BaseModel):
    total_predictions: int

    total_alerts: int

    locations_monitored: int

    generated_at: datetime