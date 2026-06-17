You are the Legal AI Agent Architect and Developer.

Your task is to create a parallel Python FastAPI microservice using Clean Architecture and integrate it into the existing NewsHub Docker ecosystem.

Project name:

legal-ai-agent

Goal:

Build an AI service capable of processing official legal PDF publications from https://legal.dca.gob.gt, extracting legal content, summarizing reforms, identifying key points, and preparing structured draft news payloads compatible with the NewsHub Admin CMS.

Important security rule:

Never hardcode API keys.
Use environment variables only.
Use .env.example with placeholder values.
Do not store secrets in repository.
If any secret-like value exists in files, remove it and replace it with an environment variable reference.

Repository context:

The repository already contains:

- backend/ Laravel application
- docs/
- docs-site/
- prompts/
- AGENTS.md
- Root Docker Compose environment

Infrastructure requirement:

Do not create an isolated docker-compose.yml inside legal-ai-agent.

Instead:

- Create legal-ai-agent/Dockerfile.
- Create legal-ai-agent/.dockerignore.
- Create legal-ai-agent/.env.example.
- Update the existing root docker-compose.yml to include the legal-ai-agent service.
- Reuse the existing Docker network.
- The AI service must be callable from Laravel through the Docker internal network.
- Suggested internal URL: http://legal-ai-agent:8000.
- The project must run without local Python installed.
- The AI service must be executable through Docker Compose.

Expected Docker validation commands:

- docker compose up -d --build
- docker compose ps
- docker compose logs legal-ai-agent
- GET http://localhost:8000/api/health if exposed locally
- Internal Laravel-to-AI URL: http://legal-ai-agent:8000/api/health

Service exposure:

- Expose legal-ai-agent on host port 8000 only for local development.
- Keep the internal Docker service name as legal-ai-agent.
- Do not modify existing Laravel container names unless necessary.

Stack:

- Python 3.12
- FastAPI
- Uvicorn
- Pydantic
- httpx
- PyMuPDF or pdfplumber
- BeautifulSoup or Playwright only if needed
- Cerebras/OpenAI-compatible client
- Docker
- Pytest

Architecture:

Use Clean Architecture.

Required structure:

legal-ai-agent/
├── app/
│   ├── domain/
│   │   ├── entities/
│   │   ├── value_objects/
│   │   └── interfaces/
│   ├── application/
│   │   ├── dtos/
│   │   ├── services/
│   │   └── use_cases/
│   ├── infrastructure/
│   │   ├── ai_client/
│   │   ├── legal_dca_client/
│   │   ├── pdf_downloader/
│   │   ├── pdf_text_extractor/
│   │   └── repositories/
│   └── presentation/
│       ├── api/
│       └── schemas/
├── tests/
├── docs/
├── Dockerfile
├── .dockerignore
├── .env.example
├── requirements.txt
└── README.md

Core use cases:

1. Process PDF from URL.
2. Extract text from PDF.
3. Split newspaper edition into legal publications.
4. Detect legal document metadata.
5. Generate executive summary.
6. Generate key points.
7. Generate full structured explanation.
8. Generate draft news payload compatible with NewsHub Admin CMS.

Endpoints:

- GET /api/health
- POST /api/legal/process-url
- POST /api/legal/process-pdf
- POST /api/legal/summarize
- POST /api/legal/create-draft

Expected process-url input:

{
  "pdf_url": "https://legal.dca.gob.gt/..."
}

Expected process-url output:

{
  "source_url": "...",
  "document_title": "...",
  "institution": "...",
  "legal_document_type": "...",
  "decree_number": "...",
  "affected_law": "...",
  "effective_date": "...",
  "executive_summary": "...",
  "key_points": [],
  "full_explanation": "...",
  "disclaimer": "Contenido generado por IA. Requiere revisión humana legal antes de publicación.",
  "suggested_news": {
    "title": "...",
    "slug": "...",
    "summary": "...",
    "body": "...",
    "tags": [],
    "status": "draft",
    "ai_generated": true,
    "ai_summary": "...",
    "ai_key_points": [],
    "original_pdf_url": "...",
    "extracted_text": "..."
  }
}

AI requirements:

- Use Cerebras API through environment variables.
- Model name must come from environment variable.
- Use OpenAI-compatible request format if supported.
- Do not hardcode API keys.
- Add retry/error handling.
- Add timeout handling.
- Add max text length handling.
- Add chunking or truncation strategy for large PDFs.
- If AI credentials are missing, return a clear configuration error instead of crashing.

Environment variables:

Create legal-ai-agent/.env.example with placeholders only:

CEREBRAS_API_KEY=
CEREBRAS_BASE_URL=https://api.cerebras.ai/v1
CEREBRAS_MODEL=
AI_REQUEST_TIMEOUT_SECONDS=60
AI_MAX_INPUT_CHARS=60000
NEWSHUB_API_URL=http://app/api
NEWSHUB_AI_SHARED_SECRET=
APP_ENV=local
LOG_LEVEL=INFO

Root Docker Compose requirements:

Update the existing root docker-compose.yml and add:

- legal-ai-agent service
- build context ./legal-ai-agent
- env_file ./legal-ai-agent/.env
- port mapping 8000:8000 for local development
- restart unless-stopped
- same network as Laravel
- healthcheck using /api/health if simple

Do not break existing Laravel, MySQL, Nginx or Docusaurus services.

Legal DCA requirements:

The service must support PDF URLs from https://legal.dca.gob.gt.

Implementation guidance:

- Start with direct PDF URL processing.
- If the site uses a viewer and the direct PDF URL must be discovered, create a LegalDcaClient interface and infrastructure implementation prepared to resolve PDF URLs.
- Use httpx for normal HTTP retrieval.
- Use BeautifulSoup for simple HTML parsing only if needed.
- Do not add Playwright unless simple HTTP parsing is insufficient.
- If PDF discovery cannot be fully implemented without live browser automation, document the limitation clearly and keep the architecture ready.

Legal safety:

- Do not auto-publish news.
- Always return status draft.
- Add disclaimer that AI output requires human legal review.
- Preserve extracted text for traceability.
- Preserve original PDF URL.
- Preserve source URL.
- Do not provide legal advice as final authority.
- The generated content is a drafting aid only.

NewsHub Admin CMS integration:

The output must be compatible with existing NewsHub fields:

- title
- slug
- summary
- body
- category_id if available or suggested_category if not
- source_url
- publication_date
- status
- legal_document_type
- decree_number
- institution
- affected_law
- effective_date
- ai_generated
- ai_summary
- ai_key_points
- original_pdf_url
- extracted_text
- tags

Do not directly write to the Laravel database in this step.
Return structured JSON so the Admin CMS can create or review drafts.

Optional integration documentation:

Document the future flow:

Admin CMS
→ user submits legal PDF URL
→ Laravel calls legal-ai-agent
→ legal-ai-agent extracts text and summarizes
→ legal-ai-agent returns draft payload
→ Laravel saves draft news
→ admin reviews
→ admin publishes

Testing:

Create tests for:

- Health endpoint.
- PDF URL request validation.
- PDF downloader with mocked response.
- Text extraction service with mocked PDF bytes or fixture.
- AI client mocked response.
- Draft news generation.
- Missing AI configuration returns clear error.
- Large text handling strategy.

Validation commands:

Use Docker where possible.

Document and support:

- docker compose build legal-ai-agent
- docker compose up -d legal-ai-agent
- docker compose logs legal-ai-agent
- docker compose exec legal-ai-agent pytest
- curl http://localhost:8000/api/health

Documentation:

Create:

- legal-ai-agent/README.md
- legal-ai-agent/docs/ARCHITECTURE.md
- legal-ai-agent/docs/API.md
- legal-ai-agent/docs/DOCKER_SETUP.md
- legal-ai-agent/docs/LEGAL_AI_WORKFLOW.md
- docs/AI_LEGAL_AGENT_REPORT.md
- docs-site/docs/ai/legal-ai-agent.md

Document in Spanish:

1. Arquitectura Clean Architecture.
2. Estructura de carpetas.
3. Endpoints.
4. Variables de entorno.
5. Flujo de extracción PDF.
6. Flujo de resumen IA.
7. Integración con NewsHub Admin CMS.
8. Integración Docker Compose raíz.
9. Seguridad de secretos.
10. Revisión humana obligatoria.
11. Limitaciones conocidas.
12. Comandos de validación.
13. Resultados de pruebas si se ejecutan.

Rules:

- Do not modify existing NewsHub backend unless only documentation or Docker integration is needed.
- Do not change Laravel business logic.
- Do not create an isolated docker-compose.yml inside legal-ai-agent.
- Do not hardcode API keys.
- Do not include real secrets in documentation.
- Do not auto-publish AI-generated content.
- Keep implementation simple, testable and extensible.
- Prefer clear interfaces and use cases over framework-heavy code.
- If root docker-compose.yml structure is unusual, adapt carefully without breaking existing services.
- If a command cannot be executed, document the reason clearly in docs/AI_LEGAL_AGENT_REPORT.md.

IMPORTANT:
All generated documentation must be written in Spanish.
Code, class names, methods, variables, routes and technical identifiers must remain in English.