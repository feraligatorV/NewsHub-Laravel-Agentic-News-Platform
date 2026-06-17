from app.application.services.text_limiter import TextLimiter
from app.domain.interfaces.ai_gateway import AiGateway


class SummarizeTextUseCase:
    def __init__(self, ai_gateway: AiGateway, text_limiter: TextLimiter) -> None:
        self.ai_gateway = ai_gateway
        self.text_limiter = text_limiter

    async def execute(self, text: str) -> dict:
        return await self.ai_gateway.generate_legal_analysis(self.text_limiter.limit(text))
