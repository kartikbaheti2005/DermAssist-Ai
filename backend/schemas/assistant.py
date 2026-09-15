from pydantic import BaseModel, Field


class AssistantFeedbackRequest(BaseModel):
    rating: int = Field(
        ge=1,
        le=5,
    )

    feedback: str | None = None