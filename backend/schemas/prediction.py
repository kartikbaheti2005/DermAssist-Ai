from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from pydantic import ConfigDict

# =====================================================
# Prediction Request
# =====================================================

class PredictionRequest(BaseModel):
    image_id: int


# =====================================================
# Prediction Create Response
# =====================================================

class PredictionCreateResponse(BaseModel):
    prediction_id: int
    predicted_label: str
    confidence_score: float
    risk_level: str


# =====================================================
# Prediction Detail Response
# =====================================================

class PredictionResponse(BaseModel):
    id: int

    image_id: int
    user_id: int

    predicted_label: str
    confidence_score: float

    risk_level: Optional[str] = None

    stage_used: Optional[str] = None
    model_version: Optional[str] = None

    processing_time_ms: Optional[int] = None

    heatmap_overlay_path: Optional[str] = None
    heatmap_only_path: Optional[str] = None

    status: str

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


# =====================================================
# Prediction History Item
# =====================================================

class PredictionHistoryItem(BaseModel):
    id: int

    predicted_label: str
    confidence_score: float

    risk_level: str

    created_at: datetime

    class Config:
        from_attributes = True