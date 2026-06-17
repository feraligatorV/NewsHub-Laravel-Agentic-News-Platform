import re
import unicodedata

from app.application.dtos.legal_analysis import LegalAnalysis, SuggestedNews
from app.domain.entities.legal_document import LegalDocument


class DraftNewsService:
    def build(self, document: LegalDocument, analysis: dict) -> LegalAnalysis:
        title = str(analysis.get("document_title") or document.document_title or "Borrador legal generado por IA")
        summary = str(analysis.get("executive_summary") or "Resumen legal pendiente de revisión humana.")
        key_points = self._list(analysis.get("key_points"))
        legal_document_type = analysis.get("legal_document_type") or document.legal_document_type
        institution = analysis.get("institution") or document.institution
        decree_number = analysis.get("decree_number") or document.decree_number
        affected_law = analysis.get("affected_law") or document.affected_law
        effective_date = analysis.get("effective_date") or document.effective_date
        full_explanation = str(analysis.get("full_explanation") or summary)
        tags = self._list(analysis.get("tags")) or document.tags or self._default_tags(legal_document_type, institution)

        suggested_news = SuggestedNews(
            title=title,
            slug=self._slugify(title),
            summary=summary,
            body=full_explanation,
            tags=tags,
            ai_summary=summary,
            ai_key_points=key_points,
            original_pdf_url=document.source_url,
            source_url=document.source_url,
            extracted_text=document.extracted_text,
            legal_document_type=legal_document_type,
            decree_number=decree_number,
            institution=institution,
            affected_law=affected_law,
            effective_date=effective_date,
        )

        return LegalAnalysis(
            source_url=document.source_url,
            document_title=title,
            institution=institution,
            legal_document_type=legal_document_type,
            decree_number=decree_number,
            affected_law=affected_law,
            effective_date=effective_date,
            executive_summary=summary,
            key_points=key_points,
            full_explanation=full_explanation,
            suggested_news=suggested_news,
        )

    def _slugify(self, value: str) -> str:
        normalized = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
        slug = re.sub(r"[^a-zA-Z0-9]+", "-", normalized.lower()).strip("-")
        return slug[:100] or "borrador-legal"

    def _list(self, value: object) -> list[str]:
        if not value:
            return []
        if isinstance(value, list):
            return [str(item) for item in value if str(item).strip()]
        return [str(value)]

    def _default_tags(self, legal_document_type: object, institution: object) -> list[str]:
        tags = ["legal", "ia"]
        if legal_document_type:
            tags.append(str(legal_document_type).lower())
        if institution:
            tags.append(str(institution).lower())
        return tags
