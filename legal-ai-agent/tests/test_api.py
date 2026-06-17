from fastapi.testclient import TestClient

from app.presentation.api.dependencies import process_url_use_case
from app.presentation.api.main import app


def test_health_endpoint() -> None:
    client = TestClient(app)

    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "legal-ai-agent"}


def test_process_url_request_validation() -> None:
    client = TestClient(app)

    response = client.post("/api/legal/process-url", json={"pdf_url": "not-a-url"})

    assert response.status_code == 422


def test_process_url_returns_use_case_payload() -> None:
    class FakeUseCase:
        async def execute(self, pdf_url: str) -> dict:
            return {
                "source_url": pdf_url,
                "document_title": "Decreto de prueba",
                "executive_summary": "Resumen",
                "key_points": ["Punto"],
                "full_explanation": "Explicacion",
                "disclaimer": "Contenido generado por IA. Requiere revisión humana legal antes de publicación.",
                "suggested_news": {
                    "title": "Decreto de prueba",
                    "slug": "decreto-de-prueba",
                    "summary": "Resumen",
                    "body": "Explicacion",
                    "tags": ["decreto"],
                    "status": "draft",
                    "ai_generated": True,
                    "ai_summary": "Resumen",
                    "ai_key_points": ["Punto"],
                    "original_pdf_url": pdf_url,
                    "source_url": pdf_url,
                    "extracted_text": "Texto",
                },
            }

    app.dependency_overrides[process_url_use_case] = lambda: FakeUseCase()
    client = TestClient(app)

    response = client.post(
        "/api/legal/process-url",
        json={"pdf_url": "https://legal.dca.gob.gt/test.pdf"},
    )

    app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json()["suggested_news"]["status"] == "draft"
