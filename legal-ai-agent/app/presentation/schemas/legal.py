from pydantic import BaseModel, Field, HttpUrl


class ProcessUrlRequest(BaseModel):
    pdf_url: HttpUrl


class SummarizeRequest(BaseModel):
    text: str = Field(min_length=1)


class CreateDraftRequest(BaseModel):
    text: str = Field(min_length=1)
    metadata: dict = Field(default_factory=dict)
