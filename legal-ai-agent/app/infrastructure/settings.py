import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    cerebras_api_key: str | None
    cerebras_base_url: str
    cerebras_model: str | None
    ai_request_timeout_seconds: float
    ai_max_input_chars: int
    newshub_api_url: str
    newshub_ai_shared_secret: str | None
    app_env: str
    log_level: str


def get_settings() -> Settings:
    return Settings(
        cerebras_api_key=os.getenv("CEREBRAS_API_KEY") or None,
        cerebras_base_url=os.getenv("CEREBRAS_BASE_URL", "https://api.cerebras.ai/v1"),
        cerebras_model=os.getenv("CEREBRAS_MODEL") or None,
        ai_request_timeout_seconds=float(os.getenv("AI_REQUEST_TIMEOUT_SECONDS", "60")),
        ai_max_input_chars=int(os.getenv("AI_MAX_INPUT_CHARS", "60000")),
        newshub_api_url=os.getenv("NEWSHUB_API_URL", "http://app/api"),
        newshub_ai_shared_secret=os.getenv("NEWSHUB_AI_SHARED_SECRET") or None,
        app_env=os.getenv("APP_ENV", "local"),
        log_level=os.getenv("LOG_LEVEL", "INFO"),
    )
