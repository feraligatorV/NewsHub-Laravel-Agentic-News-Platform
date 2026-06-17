import fitz

from app.domain.value_objects.errors import PdfTextExtractionError


class PyMuPdfTextExtractor:
    def extract(self, pdf_bytes: bytes) -> str:
        try:
            with fitz.open(stream=pdf_bytes, filetype="pdf") as document:
                text = "\n".join(page.get_text("text") for page in document)
        except Exception as exc:
            raise PdfTextExtractionError("Could not extract text from PDF bytes.") from exc

        normalized = "\n".join(line.strip() for line in text.splitlines() if line.strip())
        if not normalized:
            raise PdfTextExtractionError("PDF does not contain extractable text.")

        return normalized
