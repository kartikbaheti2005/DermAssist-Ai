from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import (
    get_current_user,
)

from schemas.chatbot import (
    ChatMessageRequest,
    ConversationCreateRequest,
    ConversationUpdateRequest,
)

from services.chatbot_service import (
    process_chat_message,
    create_conversation,
    get_conversations,
    get_conversation,
    update_conversation,
    delete_conversation,
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
    db: Session = Depends(get_db),
        current_user=Depends(
            get_current_user
        ),
):
    try:

        return process_chat_message(
            db,
            current_user,
            payload.conversation_id,
            payload.message,
        )
    
    except ValueError as e:
    
        raise HTTPException(
            status_code=404,
            detail=str(e),
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

# =====================================================
# Create Conversation
# =====================================================

@router.post("/conversations")
def create_conversation_route(
    payload: ConversationCreateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    conversation = create_conversation(
        db,
        current_user,
        payload.title,
    )

    return {
        "message": "Conversation created",
        "conversation": conversation.to_dict(),
    }

# =====================================================
# Conversation List
# =====================================================

@router.get("/conversations")
def conversation_list(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    conversations = get_conversations(
        db,
        current_user.id,
    )

    return [
        conversation.to_dict()
        for conversation in conversations
    ]

# =====================================================
# Conversation Details
# =====================================================

@router.get("/conversations/{conversation_id}")
def conversation_details(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    conversation = get_conversation(
        db,
        conversation_id,
        current_user.id,
    )

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return {
        "conversation": conversation.to_dict(),
        "messages": [
            message.to_dict()
            for message in conversation.messages
        ],
    }

# =====================================================
# Update Conversation
# =====================================================

@router.patch("/conversations/{conversation_id}")
def rename_conversation(
    conversation_id: int,
    payload: ConversationUpdateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    conversation = get_conversation(
        db,
        conversation_id,
        current_user.id,
    )

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    updated = update_conversation(
        db,
        conversation,
        payload.title,
    )

    return {
        "message": "Conversation updated",
        "conversation": updated.to_dict(),
    }

# =====================================================
# Update Conversation
# =====================================================

@router.patch("/conversations/{conversation_id}")
def rename_conversation(
    conversation_id: int,
    payload: ConversationUpdateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    conversation = get_conversation(
        db,
        conversation_id,
        current_user.id,
    )

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    updated = update_conversation(
        db,
        conversation,
        payload.title,
    )

    return {
        "message": "Conversation updated",
        "conversation": updated.to_dict(),
    }

