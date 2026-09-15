from sqlalchemy.orm import Session

from models.smart_queue import SmartQueue
from models.appointment import Appointment
from models.prediction import Prediction

RISK_PRIORITY = {
    "high": 100,
    "medium": 50,
    "low": 20,
    "unknown": 10,
}

STATUS_PRIORITY = {
    "confirmed": 20,
    "pending": 10,
    "completed": 0,
    "cancelled": 0,
    "rejected": 0,
}

def calculate_priority(
    appointment: Appointment,
    prediction: Prediction | None,
):
    score = 0

    if prediction:
        score += RISK_PRIORITY.get(
            prediction.risk_level.lower(),
            10,
        )
    else:
        score += 10

    score += STATUS_PRIORITY.get(
        appointment.status,
        0,
    )

    return score

def build_queue(
    db: Session,
):
    db.query(SmartQueue).delete()

    db.commit()

    appointments = (
        db.query(Appointment)
        .filter(
            Appointment.status.in_(
                [
                    "pending",
                    "confirmed",
                ]
            )
        )
        .all()
    )

    queue = []

    for appointment in appointments:

        prediction = (
            db.query(Prediction)
            .filter(
                Prediction.user_id == appointment.user_id
            )
            .order_by(
                Prediction.created_at.desc()
            )
            .first()
        )

        priority = calculate_priority(
            appointment,
            prediction,
        )

        queue.append(
            (
                appointment,
                priority,
            )
        )

    queue.sort(
        key=lambda x: x[1],
        reverse=True,
    )

    for position, (
        appointment,
        priority,
    ) in enumerate(
        queue,
        start=1,
    ):

        item = SmartQueue(
            appointment_id=appointment.id,
            doctor_id=appointment.doctor_id,
            patient_id=appointment.user_id,
            priority_score=priority,
            queue_position=position,
            estimated_wait_time=(position - 1) * 15,
            status="waiting",
        )

        db.add(item)

    db.commit()

    return {
        "message": "Queue rebuilt successfully.",
        "total_items": len(queue),
    }

def get_queue(
    db: Session,
):
    queue = (
        db.query(SmartQueue)
        .order_by(
            SmartQueue.queue_position.asc()
        )
        .all()
    )

    return [
        {
            "id": item.id,
            "appointment_id": item.appointment_id,
            "doctor_id": item.doctor_id,
            "patient_id": item.patient_id,
            "priority_score": item.priority_score,
            "queue_position": item.queue_position,
            "estimated_wait_time": item.estimated_wait_time,
            "status": item.status,
        }
        for item in queue
    ]

def get_queue_summary(
    db: Session,
):
    queue = (
        db.query(SmartQueue)
        .all()
    )

    if not queue:
        return {
            "total_patients": 0,
            "average_wait_time": 0,
            "highest_priority": 0,
        }

    return {
        "total_patients": len(queue),

        "average_wait_time": (
            sum(
                q.estimated_wait_time
                for q in queue
            )
            // len(queue)
        ),

        "highest_priority": max(
            q.priority_score
            for q in queue
        ),
    }

def get_doctor_queue(
    db: Session,
    doctor_id: int,
):
    queue = (
        db.query(SmartQueue)
        .filter(
            SmartQueue.doctor_id == doctor_id
        )
        .order_by(
            SmartQueue.queue_position.asc()
        )
        .all()
    )

    return [
        {
            "id": item.id,
            "appointment_id": item.appointment_id,
            "patient_id": item.patient_id,
            "priority_score": item.priority_score,
            "queue_position": item.queue_position,
            "estimated_wait_time": item.estimated_wait_time,
            "status": item.status,
        }
        for item in queue
    ]