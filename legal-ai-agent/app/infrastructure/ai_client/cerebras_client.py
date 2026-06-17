import json

import httpx

from app.domain.value_objects.errors import AiConfigurationError, AiGatewayError
from app.infrastructure.settings import Settings


class CerebrasAiClient:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def generate_legal_analysis(self, text: str) -> dict:
        if not self.settings.cerebras_api_key or not self.settings.cerebras_model:
            raise AiConfigurationError(
                "AI credentials are not configured. Set CEREBRAS_API_KEY and CEREBRAS_MODEL."
            )

        payload = {
            "model": self.settings.cerebras_model,
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You draft structured summaries of Guatemalan legal publications. "
                        "Return only valid JSON with document_title, institution, legal_document_type, "
                        "decree_number, affected_law, effective_date, executive_summary, key_points, "
                        "full_explanation and tags. Do not provide legal advice as final authority."
                    ),
                },
                {
                    "role": "user",
                    "content": text,
                },
            ],
            "response_format": {"type": "json_object"},
        }

        try:
            async with httpx.AsyncClient(timeout=self.settings.ai_request_timeout_seconds) as client:
                response = await client.post(
                    f"{self.settings.cerebras_base_url.rstrip('/')}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.settings.cerebras_api_key}",
                        "Content-Type": "application/json",
                    },
                    json=payload,
                )
                response.raise_for_status()
        except httpx.TimeoutException as exc:
            raise AiGatewayError("AI request timed out.") from exc
        except httpx.HTTPError as exc:
            raise AiGatewayError(f"AI request failed: {exc}") from exc

        try:
            content = response.json()["choices"][0]["message"]["content"]
            parsed = json.loads(content)
        except (KeyError, IndexError, TypeError, json.JSONDecodeError) as exc:
            raise AiGatewayError("AI response did not contain valid structured JSON.") from exc

        return parsed
