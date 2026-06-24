from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# =====================================================
# Upload Response
# =====================================================

class ImageUploadResponse(BaseModel):
    image_id: int
    image_name: Optional[str] = None
    image_path: str


# =====================================================
# Image Detail Response
# =====================================================

class ImageResponse(BaseModel):
    id: int

    user_id: int

    image_name: Optional[str] = None

    image_path: str

    image_format: Optional[str] = None

    image_size_kb: Optional[int] = None

    lesion_id: Optional[str] = None

    is_followup: bool = False

    body_part: Optional[str] = None

    uploaded_at: datetime

    class Config:
        from_attributes = True


# =====================================================
# Image History Item
# =====================================================

class ImageHistoryItem(BaseModel):
    id: int

    image_name: Optional[str] = None

    body_part: Optional[str] = None

    uploaded_at: datetime

    class Config:
        from_attributes = True