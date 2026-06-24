from fastapi import (
    APIRouter,
    Depends,
)

from core.dependencies import (
    get_current_user,
)

from schemas.chatbot import (
    ChatMessageRequest,
)

from services.chatbot_service import (
    process_chat_message,
)

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"],
)


# =====================================================
# Chat Message
# =====================================================

@router.post("/message")
def send_message(
    payload: ChatMessageRequest,
    current_user=Depends(
        get_current_user
    ),
):
    return process_chat_message(
        current_user,
        payload.message,
    )


# =====================================================
# Health Check
# =====================================================

@router.get("/health")
def chatbot_health():
    return {
        "status": "healthy",
        "service": "chatbot",
        "llm_connected": False,
    }