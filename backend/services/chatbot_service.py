from datetime import datetime, UTC

from models.user import User


# =====================================================
# Placeholder LLM Engine
# =====================================================

def generate_chat_response(
    message: str,
    current_user: User,
):
    """
    Future:

    Groq
    OpenAI
    Gemini
    Claude

    Medical RAG

    Prediction Context

    Health Records Context
    """

    lower_message = message.lower()

    if "prediction" in lower_message:
        return (
            "Prediction analysis integration "
            "will be available after the ML "
            "pipeline is connected."
        )

    if "doctor" in lower_message:
        return (
            "Doctor recommendation "
            "system will be connected "
            "soon."
        )

    if "health record" in lower_message:
        return (
            "Health record assistant "
            "integration is under development."
        )

    return (
        "AI medical assistant "
        "is currently in development."
    )


# =====================================================
# Chat Endpoint Service
# =====================================================

def process_chat_message(
    current_user: User,
    message: str,
):
    response = generate_chat_response(
        message,
        current_user,
    )

    return {
        "response": response,
        "source": "placeholder",
        "timestamp": datetime.now(UTC),
    }