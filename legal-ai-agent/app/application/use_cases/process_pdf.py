from app.application.services.draft_news_service import DraftNewsService
from app.application.services.text_limiter import TextLimiter
from app.domain.entities.legal_document import LegalDocument
from app.domain.interfaces.ai_gateway import AiGateway
from app.domain.interfaces.text_extractor import TextExtractor


class ProcessPdfUseCase:
    def __init__(
        self,
        extractor: TextExtractor,
        ai_gateway: AiGateway,
        draft_service: DraftNewsService,
        text_limiter: TextLimiter,
    ) -> None:
        self.extractor = extractor
        self.ai_gateway = ai_gateway
        self.draft_service = draft_service
        self.text_limiter = text_limiter

    async def execute(self, pdf_bytes: bytes, source_url: str | None = None) -> dict:
        extracted_text = self.extractor.extract(pdf_bytes)
        limited_text = self.text_limiter.limit(extracted_text)
        analysis = await self.ai_gateway.generate_legal_analysis(limited_text)
        document = LegalDocument(source_url=source_url, extracted_text=extracted_text)
        return self.draft_service.build(document, analysis).model_dump()
