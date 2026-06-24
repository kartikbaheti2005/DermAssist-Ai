from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# =====================================================
# User Message
# =====================================================

class ChatMessageRequest(BaseModel):
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