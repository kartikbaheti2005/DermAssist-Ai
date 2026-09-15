from sqlalchemy.orm import Session

from models.doctor import Doctor
from models.prediction import Prediction


# =====================================================
# Disease → Specialty Mapping
# =====================================================

SPECIALTY_MAPPING = {

    # Skin Cancer

    "melanoma":
        "Dermatologist",

    "bcc":
        "Dermatologist",

    "scc":
        "Dermatologist",

    "akiec":
        "Dermatologist",

    # Common Conditions

    "eczema":
        "Dermatologist",

    "psoriasis":
        "Dermatologist",

    "acne":
        "Dermatologist",

    "rosacea":
        "Dermatologist",

    "fungal infection":
        "Dermatologist",

    "ringworm":
        "Dermatologist",
}


# =====================================================
# Get Recommended Specialty
# =====================================================

def get_specialty_for_disease(
    disease: str,
):
    return SPECIALTY_MAPPING.get(
        disease.lower(),
        "Dermatologist",
    )


# =====================================================
# Recommend Doctors
# =====================================================

def recommend_doctors(
    db: Session,
    prediction_id: int,
    user_id: int,
):
    prediction = (
        db.query(Prediction)
        .filter(
            Prediction.id == prediction_id,
            Prediction.user_id == user_id,
        )
        .first()
    )

    if not prediction:
        raise ValueError(
            "Prediction not found"
        )

    specialty = (
        get_specialty_for_disease(
            prediction.predicted_label
        )
    )

    doctors = (
        db.query(Doctor)
        .filter(
            Doctor.is_active == True,
            Doctor.specialty == specialty,
        )
        .order_by(
            Doctor.rating.desc()
        )
        .all()
    )

    return {
        "predicted_label":
            prediction.predicted_label,

        "recommended_specialty":
            specialty,

        "doctors": [
            {
                "doctor_id":
                    doctor.id,

                "doctor_name":
                    doctor.full_name,

                "specialty":
                    doctor.specialty,

                "clinic_name":
                    doctor.clinic_name,

                "city":
                    doctor.city,

                "rating":
                    doctor.rating,

                "recommendation_reason":
                    (
                        f"Specialist in "
                        f"{specialty}"
                    ),
            }
            for doctor in doctors
        ],
    }