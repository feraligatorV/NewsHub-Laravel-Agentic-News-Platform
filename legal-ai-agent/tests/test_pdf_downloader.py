import pytest

from app.domain.value_objects.errors import InvalidPdfUrlError
from app.infrastructure.pdf_downloader.http_pdf_downloader import HttpPdfDownloader


class FakeLegalDcaClient:
    async def resolve_pdf_url(self, url: str) -> str:
        return url


@pytest.mark.asyncio
async def test_pdf_downloader_rejects_non_http_url() -> None:
    downloader = HttpPdfDownloader(FakeLegalDcaClient())

    with pytest.raises(InvalidPdfUrlError):
        await downloader.download("ftp://example.com/file.pdf")


@pytest.mark.asyncio
async def test_pdf_downloader_accepts_any_http_host(monkeypatch: pytest.MonkeyPatch) -> None:
    class FakeResponse:
        content = b"%PDF-1.4"
        headers = {"content-type": "application/pdf"}

        def raise_for_status(self) -> None:
            return None

    class FakeAsyncClient:
        def __init__(self, timeout: int, follow_redirects: bool) -> None:
            self.timeout = timeout
            self.follow_redirects = follow_redirects

        async def __aenter__(self) -> "FakeAsyncClient":
            return self

        async def __aexit__(self, exc_type: object, exc: object, tb: object) -> None:
            return None

        async def get(self, url: str) -> FakeResponse:
            assert url == "https://example.com/file.pdf"
            return FakeResponse()

    monkeypatch.setattr(
        "app.infrastructure.pdf_downloader.http_pdf_downloader.httpx.AsyncClient",
        FakeAsyncClient,
    )

    downloader = HttpPdfDownloader(FakeLegalDcaClient())

    assert await downloader.download("https://example.com/file.pdf") == b"%PDF-1.4"
