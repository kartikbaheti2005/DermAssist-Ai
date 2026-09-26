"""Translate model screening output into bounded, deterministic next-step guidance."""


def assess_screening_risk(model_risk_output: str | None) -> dict:
    """Do not infer diagnosis or clinical urgency from a model screening label."""
    level = (model_risk_output or "").strip().lower()
    if level == "high":
        return {
            "risk_level": "high",
            "urgency": "clinical_review_recommended",
            "referral_required": True,
            "recommended_action": "Discuss this high-risk screening result with a qualified dermatologist.",
            "follow_up": "Follow the clinician’s advice. This model does not set a follow-up timeframe.",
        }
    if level == "low":
        return {
            "risk_level": "low",
            "urgency": "not_assessed",
            "referral_required": False,
            "recommended_action": "A low-risk screening result does not rule out disease. Seek a clinician’s advice if the area is changing or concerning.",
            "follow_up": "This model does not determine a clinical follow-up interval.",
        }
    return {
        "risk_level": "unknown",
        "urgency": "not_assessed",
        "referral_required": None,
        "recommended_action": "Discuss symptoms or concerns with a qualified clinician.",
        "follow_up": "Follow the clinician’s advice; no interval is determined by this model.",
    }
