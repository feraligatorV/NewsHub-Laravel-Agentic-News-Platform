from typing import Protocol


class TextExtractor(Protocol):
    def extract(self, pdf_bytes: bytes) -> str:
        ...
