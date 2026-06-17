from dataclasses import dataclass, field


@dataclass(frozen=True)
class LegalDocument:
    source_url: str | None
    extracted_text: str
    document_title: str | None = None
    institution: str | None = None
    legal_document_type: str | None = None
    decree_number: str | None = None
    affected_law: str | None = None
    effective_date: str | None = None
    tags: list[str] = field(default_factory=list)
