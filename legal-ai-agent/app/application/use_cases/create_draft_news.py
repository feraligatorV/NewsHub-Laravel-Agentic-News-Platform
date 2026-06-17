from app.application.services.draft_news_service import DraftNewsService
from app.domain.entities.legal_document import LegalDocument


class CreateDraftNewsUseCase:
    def __init__(self, draft_service: DraftNewsService) -> None:
        self.draft_service = draft_service

    def execute(self, text: str, metadata: dict | None = None) -> dict:
        metadata = metadata or {}
        document = LegalDocument(
            source_url=metadata.get("source_url") or metadata.get("original_pdf_url"),
            extracted_text=text,
            document_title=metadata.get("document_title"),
            institution=metadata.get("institution"),
            legal_document_type=metadata.get("legal_document_type"),
            decree_number=metadata.get("decree_number"),
            affected_law=metadata.get("affected_law"),
            effective_date=metadata.get("effective_date"),
            tags=metadata.get("tags") or [],
        )
        return self.draft_service.build(document, metadata).model_dump()
