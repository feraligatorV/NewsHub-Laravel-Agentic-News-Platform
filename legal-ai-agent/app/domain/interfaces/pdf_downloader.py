from typing import Protocol


class PdfDownloader(Protocol):
    async def download(self, url: str) -> bytes:
        ...
