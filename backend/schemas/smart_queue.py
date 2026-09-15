from datetime import datetime

from pydantic import BaseModel


class QueueItemResponse(BaseModel):
    id: int

    appointment_id: int

    doctor_id: int

    patient_id: int

    priority_score: int

    queue_position: int

    estimated_wait_time: int

    status: str

    created_at: datetime


class QueueSummary(BaseModel):
    total_patients: int

    average_wait_time: int

    highest_priority: int