from app.application.services.draft_news_service import DraftNewsService
from app.domain.entities.legal_document import LegalDocument


def test_draft_news_generation_is_compatible_with_newshub() -> None:
    service = DraftNewsService()
    document = LegalDocument(
        source_url="https://legal.dca.gob.gt/test.pdf",
        extracted_text="Texto legal extraido",
    )

    result = service.build(
        document,
        {
            "document_title": "Reforma a la ley de prueba",
            "executive_summary": "Resumen ejecutivo",
            "key_points": ["Punto uno", "Punto dos"],
            "full_explanation": "Explicacion completa",
            "legal_document_type": "reforma",
            "institution": "Congreso",
        },
    )

    payload = result.model_dump()["suggested_news"]

    assert payload["title"] == "Reforma a la ley de prueba"
    assert payload["slug"] == "reforma-a-la-ley-de-prueba"
    assert payload["status"] == "draft"
    assert payload["ai_generated"] is True
    assert payload["original_pdf_url"] == "https://legal.dca.gob.gt/test.pdf"
    assert payload["extracted_text"] == "Texto legal extraido"
