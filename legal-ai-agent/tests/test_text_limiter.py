from app.application.services.text_limiter import TextLimiter


def test_large_text_handling_strategy_truncates_with_marker() -> None:
    text = "a" * 100

    limited = TextLimiter(max_chars=40).limit(text)

    assert len(limited) <= 40
    assert "[TRUNCATED_FOR_AI_CONTEXT]" in limited
