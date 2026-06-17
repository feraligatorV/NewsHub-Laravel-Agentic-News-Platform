from functools import lru_cache

from app.application.services.draft_news_service import DraftNewsService
from app.application.services.text_limiter import TextLimiter
from app.application.use_cases.create_draft_news import CreateDraftNewsUseCase
from app.application.use_cases.process_pdf import ProcessPdfUseCase
from app.application.use_cases.process_url import ProcessUrlUseCase
from app.application.use_cases.summarize_text import SummarizeTextUseCase
from app.infrastructure.ai_client.cerebras_client import CerebrasAiClient
from app.infrastructure.pdf_downloader.http_pdf_downloader import HttpPdfDownloader
from app.infrastructure.pdf_text_extractor.pymupdf_text_extractor import PyMuPdfTextExtractor
from app.infrastructure.settings import Settings, get_settings


@lru_cache
def settings() -> Settings:
    return get_settings()


def draft_service() -> DraftNewsService:
    return DraftNewsService()


def text_limiter() -> TextLimiter:
    return TextLimiter(settings().ai_max_input_chars)


def ai_client() -> CerebrasAiClient:
    return CerebrasAiClient(settings())


def process_pdf_use_case() -> ProcessPdfUseCase:
    return ProcessPdfUseCase(PyMuPdfTextExtractor(), ai_client(), draft_service(), text_limiter())


def process_url_use_case() -> ProcessUrlUseCase:
    return ProcessUrlUseCase(HttpPdfDownloader(), process_pdf_use_case())


def summarize_text_use_case() -> SummarizeTextUseCase:
    return SummarizeTextUseCase(ai_client(), text_limiter())


def create_draft_news_use_case() -> CreateDraftNewsUseCase:
    return CreateDraftNewsUseCase(draft_service())
