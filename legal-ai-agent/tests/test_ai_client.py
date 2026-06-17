import pytest

from app.domain.value_objects.errors import AiConfigurationError
from app.infrastructure.ai_client.cerebras_client import CerebrasAiClient
from app.infrastructure.settings import Settings


def settings(api_key: str | None = None, model: str | None = None) -> Settings:
    return Settings(
        cerebras_api_key=api_key,
        cerebras_base_url="https://api.cerebras.ai/v1",
        cerebras_model=model,
        ai_request_timeout_seconds=1,
        ai_max_input_chars=60000,
        newshub_api_url="http://app/api",
        newshub_ai_shared_secret=None,
        app_env="test",
        log_level="INFO",
    )


@pytest.mark.asyncio
async def test_missing_ai_configuration_returns_clear_error() -> None:
    client = CerebrasAiClient(settings())

    with pytest.raises(AiConfigurationError, match="CEREBRAS_API_KEY"):
        await client.generate_legal_analysis("texto legal")


@pytest.mark.asyncio
async def test_ai_client_parses_mocked_structured_response(monkeypatch: pytest.MonkeyPatch) -> None:
    class FakeResponse:
        def raise_for_status(self) -> None:
            return None

        def json(self) -> dict:
            return {
                "choices": [
                    {
                        "message": {
                            "content": (
                                '{"document_title":"Decreto de prueba",'
                                '"institution":"Congreso",'
                                '"legal_document_type":"decreto",'
                                '"executive_summary":"Resumen",'
                                '"key_points":["Punto"],'
                                '"full_explanation":"Explicacion",'
                                '"tags":["decreto"]}'
                            )
                        }
                    }
                ]
            }

    class FakeAsyncClient:
        def __init__(self, timeout: float) -> None:
            self.timeout = timeout

        async def __aenter__(self) -> "FakeAsyncClient":
            return self

        async def __aexit__(self, exc_type: object, exc: object, tb: object) -> None:
            return None

        async def post(self, url: str, headers: dict, json: dict) -> FakeResponse:
            assert headers["Authorization"] == "Bearer test-key"
            assert json["model"] == "test-model"
            return FakeResponse()

    monkeypatch.setattr(
        "app.infrastructure.ai_client.cerebras_client.httpx.AsyncClient",
        FakeAsyncClient,
    )

    client = CerebrasAiClient(settings(api_key="test-key", model="test-model"))

    result = await client.generate_legal_analysis("texto legal")

    assert result["document_title"] == "Decreto de prueba"
    assert result["key_points"] == ["Punto"]
