from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# =====================================================
# User Message
# =====================================================

class ChatMessageRequest(BaseModel):
    conversation_id: int
    message: str


# =====================================================
# Chat Response
# =====================================================

class ChatMessageResponse(BaseModel):
    response: str

    source: str

    timestamp: datetime


# =====================================================
# Chat History Item
# =====================================================

class ChatHistoryItem(BaseModel):
    role: str

    message: str

    timestamp: datetime


# =====================================================
# Chat History Response
# =====================================================

class ChatHistoryResponse(BaseModel):
    messages: list[ChatHistoryItem]

# =====================================================
# Conversation Create Request
# =====================================================

class ConversationCreateRequest(BaseModel):
    title: str | None = "New Conversation"

# =====================================================
# Conversation Update Request
# =====================================================

class ConversationUpdateRequest(BaseModel):
    title: str

# =====================================================
# Conversation Response
# =====================================================

class ConversationResponse(BaseModel):
    id: int
    user_id: int

    title: str

    is_active: bool

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# =====================================================
# Chat Message Responce
# =====================================================

class ChatMessageResponse(BaseModel):
    id: int

    conversation_id: int

    role: str

    message: str

    created_at: datetime

    class Config:
        from_attributes = True

# =====================================================
# Conversation Detail Response
# =====================================================

class ConversationDetailResponse(BaseModel):
    conversation: ConversationResponse

    messages: list[ChatMessageResponse]

# =====================================================
# Conversation List Response
# =====================================================

class ConversationListResponse(BaseModel):
    conversations: list[ConversationResponse]