from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# =====================================================
# Prediction Report
# =====================================================

class PredictionReport(BaseModel):
    total_predictions: int

    most_common_prediction: Optional[str] = None

    high_risk_predictions: int


# =====================================================
# Appointment Report
# =====================================================

class AppointmentReport(BaseModel):
    total_appointments: int

    pending_appointments: int

    completed_appointments: int

    cancelled_appointments: int


# =====================================================
# Health Report
# =====================================================

class HealthReport(BaseModel):
    latest_bmi: Optional[float] = None

    total_health_records: int


# =====================================================
# Dashboard Report
# =====================================================

class DashboardReport(BaseModel):
    prediction_report: PredictionReport

    appointment_report: AppointmentReport

    health_report: HealthReport

    generated_at: datetime