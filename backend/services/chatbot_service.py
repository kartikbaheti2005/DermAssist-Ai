from datetime import datetime, UTC

from sqlalchemy import desc

from models.user import User

from sqlalchemy.orm import Session

from models.chat_conversation import ChatConversation
from models.chat_message import ChatMessage

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
    db: Session,
    current_user: User,
    conversation_id: int,
    message: str,
):
    conversation = (
        db.query(ChatConversation)
        .filter(
            ChatConversation.id == conversation_id,
            ChatConversation.user_id == current_user.id,
            ChatConversation.is_active == True,
        )
        .first()
    )

    if not conversation:
        raise ValueError(
            "Conversation not found"
        )

    user_message = ChatMessage(
        conversation_id=conversation.id,
        role="user",
        message=message,
    )

    db.add(user_message)

    ai_response = generate_chat_response(
        message,
        current_user,
    )

    assistant_message = ChatMessage(
        conversation_id=conversation.id,
        role="assistant",
        message=ai_response,
    )

    db.add(assistant_message)

    db.commit()

    db.refresh(user_message)
    db.refresh(assistant_message)

    return {
        "conversation_id": conversation.id,
        "response": ai_response,
        "source": "placeholder",
        "timestamp": datetime.now(UTC),
    }

# =====================================================
# Create Conversation
# =====================================================
def create_conversation(
    db: Session,
    current_user: User,
    title: str | None = None,
):
    conversation = ChatConversation(
        user_id=current_user.id,
        title=title or "New Conversation",
    )

    db.add(conversation)

    db.commit()

    db.refresh(conversation)

    return conversation

# =====================================================
# Get User Conversation
# =====================================================
def get_conversations(
    db: Session,
    user_id: int,
):
    return (
        db.query(ChatConversation)
        .filter(
            ChatConversation.user_id == user_id,
            ChatConversation.is_active == True,
        )
        .order_by(
            desc(ChatConversation.updated_at)
        )
        .all()
    )

# =====================================================
# Get Conversation
# =====================================================
def get_conversation(
    db: Session,
    conversation_id: int,
    user_id: int,
):
    return (
        db.query(ChatConversation)
        .filter(
            ChatConversation.id == conversation_id,
            ChatConversation.user_id == user_id,
            ChatConversation.is_active == True,
        )
        .first()
    )

# =====================================================
# Create Conversation
# =====================================================
def update_conversation(
    db: Session,
    conversation: ChatConversation,
    title: str,
):
    conversation.title = title

    db.commit()

    db.refresh(conversation)

    return conversation

# =====================================================
# Create Conversation
# =====================================================
def delete_conversation(
    db: Session,
    conversation: ChatConversation,
):
    conversation.is_active = False

    db.commit()

    return True