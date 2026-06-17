class TextLimiter:
    def __init__(self, max_chars: int) -> None:
        self.max_chars = max_chars

    def limit(self, text: str) -> str:
        if len(text) <= self.max_chars:
            return text

        marker = "\n\n[TRUNCATED_FOR_AI_CONTEXT]\n\n"
        if self.max_chars <= len(marker):
            return text[: self.max_chars]

        available = self.max_chars - len(marker)
        head_size = int(available * 0.7)
        tail_size = available - head_size
        return text[:head_size] + marker + text[-tail_size:]
