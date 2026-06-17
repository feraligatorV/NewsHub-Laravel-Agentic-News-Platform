from urllib.parse import urljoin

import httpx
from bs4 import BeautifulSoup

from app.domain.value_objects.errors import InvalidPdfUrlError


class LegalDcaClient:
    async def resolve_pdf_url(self, url: str) -> str:
        if url.lower().endswith(".pdf"):
            return url

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(url)
            response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        for link in soup.find_all("a", href=True):
            href = str(link["href"])
            if href.lower().endswith(".pdf"):
                return urljoin(url, href)

        raise InvalidPdfUrlError("No direct PDF link was found in the provided Legal DCA page.")
