from urllib.parse import urlparse

import httpx

from app.domain.value_objects.errors import InvalidPdfUrlError, PdfDownloadError
from app.infrastructure.legal_dca_client.legal_dca_client import LegalDcaClient


class HttpPdfDownloader:
    def __init__(self, legal_dca_client: LegalDcaClient | None = None) -> None:
        self.legal_dca_client = legal_dca_client or LegalDcaClient()

    async def download(self, url: str) -> bytes:
        parsed = urlparse(url)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            raise InvalidPdfUrlError("PDF URL must be a valid HTTP or HTTPS URL.")

        pdf_url = await self.legal_dca_client.resolve_pdf_url(url)

        try:
            async with httpx.AsyncClient(timeout=60, follow_redirects=True) as client:
                response = await client.get(pdf_url)
                response.raise_for_status()
        except httpx.HTTPError as exc:
            raise PdfDownloadError(f"Could not download PDF: {exc}") from exc

        content_type = response.headers.get("content-type", "").lower()
        if "pdf" not in content_type and not pdf_url.lower().endswith(".pdf"):
            raise PdfDownloadError("Downloaded content is not a PDF.")

        return response.content
