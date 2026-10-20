from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# =====================================================
# User Message
# =====================================================

class ChatMessageRequest(BaseModel):
    conversation_id: int
    message: str = Field(min_length=1, max_length=4000)


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

    message: str = Field(min_length=1, max_length=4000)

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

    message: str = Field(min_length=1, max_length=4000)

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
