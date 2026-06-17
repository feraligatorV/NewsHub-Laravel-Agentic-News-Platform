from typing import Protocol


class AiGateway(Protocol):
    async def generate_legal_analysis(self, text: str) -> dict:
        ...
