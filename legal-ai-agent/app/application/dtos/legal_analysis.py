from pydantic import BaseModel, Field


DISCLAIMER = "Contenido generado por IA. Requiere revisión humana legal antes de publicación."


class SuggestedNews(BaseModel):
    title: str
    slug: str
    summary: str
    body: str
    tags: list[str] = Field(default_factory=list)
    status: str = "draft"
    ai_generated: bool = True
    ai_summary: str
    ai_key_points: list[str] = Field(default_factory=list)
    original_pdf_url: str | None = None
    extracted_text: str
    source_url: str | None = None
    publication_date: str | None = None
    legal_document_type: str | None = None
    decree_number: str | None = None
    institution: str | None = None
    affected_law: str | None = None
    effective_date: str | None = None
    suggested_category: str | None = "Leyes"


class LegalAnalysis(BaseModel):
    source_url: str | None = None
    document_title: str
    institution: str | None = None
    legal_document_type: str | None = None
    decree_number: str | None = None
    affected_law: str | None = None
    effective_date: str | None = None
    executive_summary: str
    key_points: list[str] = Field(default_factory=list)
    full_explanation: str
    disclaimer: str = DISCLAIMER
    suggested_news: SuggestedNews
