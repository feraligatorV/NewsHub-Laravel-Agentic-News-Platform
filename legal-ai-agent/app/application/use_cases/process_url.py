from app.application.use_cases.process_pdf import ProcessPdfUseCase
from app.domain.interfaces.pdf_downloader import PdfDownloader


class ProcessUrlUseCase:
    def __init__(self, downloader: PdfDownloader, process_pdf_use_case: ProcessPdfUseCase) -> None:
        self.downloader = downloader
        self.process_pdf_use_case = process_pdf_use_case

    async def execute(self, pdf_url: str) -> dict:
        pdf_bytes = await self.downloader.download(pdf_url)
        return await self.process_pdf_use_case.execute(pdf_bytes, source_url=pdf_url)
