import fitz

from app.infrastructure.pdf_text_extractor.pymupdf_text_extractor import PyMuPdfTextExtractor


def test_text_extraction_service_extracts_pdf_text() -> None:
    document = fitz.open()
    page = document.new_page()
    page.insert_text((72, 72), "Decreto de prueba")
    pdf_bytes = document.tobytes()
    document.close()

    text = PyMuPdfTextExtractor().extract(pdf_bytes)

    assert "Decreto de prueba" in text
