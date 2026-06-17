from fastapi import Depends, FastAPI, File, HTTPException, UploadFile

from app.application.use_cases.create_draft_news import CreateDraftNewsUseCase
from app.application.use_cases.process_pdf import ProcessPdfUseCase
from app.application.use_cases.process_url import ProcessUrlUseCase
from app.application.use_cases.summarize_text import SummarizeTextUseCase
from app.domain.value_objects.errors import LegalAiError
from app.presentation.api.dependencies import (
    create_draft_news_use_case,
    process_pdf_use_case,
    process_url_use_case,
    summarize_text_use_case,
)
from app.presentation.schemas.legal import CreateDraftRequest, ProcessUrlRequest, SummarizeRequest

app = FastAPI(title="NewsHub Legal AI Agent", version="0.1.0")


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok", "service": "legal-ai-agent"}


@app.post("/api/legal/process-url")
async def process_url(
    request: ProcessUrlRequest,
    use_case: ProcessUrlUseCase = Depends(process_url_use_case),
) -> dict:
    try:
        return await use_case.execute(str(request.pdf_url))
    except LegalAiError as exc:
        raise HTTPException(status_code=exc.status_code, detail=str(exc)) from exc


@app.post("/api/legal/process-pdf")
async def process_pdf(
    file: UploadFile = File(...),
    use_case: ProcessPdfUseCase = Depends(process_pdf_use_case),
) -> dict:
    try:
        return await use_case.execute(await file.read(), source_url=None)
    except LegalAiError as exc:
        raise HTTPException(status_code=exc.status_code, detail=str(exc)) from exc


@app.post("/api/legal/summarize")
async def summarize(
    request: SummarizeRequest,
    use_case: SummarizeTextUseCase = Depends(summarize_text_use_case),
) -> dict:
    try:
        return await use_case.execute(request.text)
    except LegalAiError as exc:
        raise HTTPException(status_code=exc.status_code, detail=str(exc)) from exc


@app.post("/api/legal/create-draft")
async def create_draft(
    request: CreateDraftRequest,
    use_case: CreateDraftNewsUseCase = Depends(create_draft_news_use_case),
) -> dict:
    return use_case.execute(request.text, request.metadata)
