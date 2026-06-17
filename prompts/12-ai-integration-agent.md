You are the AI Integration Agent.

Your task is to connect the NewsHub Admin CMS with the legal-ai-agent FastAPI microservice.

Goal:

Allow an admin user to submit a legal PDF URL from the admin panel, send it to the legal-ai-agent, receive the AI-generated draft payload, save it as a draft news record in Laravel, and show it in the admin drafts list for review and publication.

Before implementing, read:

- AGENTS.md
- docs/ADMIN_CMS_REPORT.md
- docs/AI_LEGAL_AGENT_REPORT.md
- legal-ai-agent/docs/API.md
- legal-ai-agent/docs/LEGAL_AI_WORKFLOW.md
- docs/architecture/api-design.md

Architecture:

Admin UI
→ Laravel Admin Controller
→ Laravel AI Client Service
→ legal-ai-agent FastAPI
→ AI draft payload
→ Laravel saves draft news
→ Admin reviews draft
→ Admin publishes manually

Backend requirements:

1. Configuration
   - Add environment variables to backend/.env.example:
     - LEGAL_AI_AGENT_URL=http://legal-ai-agent:8000
     - LEGAL_AI_AGENT_TIMEOUT=120
     - LEGAL_AI_AGENT_SHARED_SECRET=
   - Add config/legal_ai.php or equivalent configuration file.

2. Laravel AI client
   Create a service such as:
   - app/Services/LegalAi/LegalAiClient.php

   Responsibilities:
   - Send POST request to legal-ai-agent /api/legal/create-draft.
   - Send PDF URL.
   - Handle timeout.
   - Handle errors.
   - Return normalized draft payload.
   - Never expose AI API keys to Laravel frontend.

3. Admin routes
   Add protected admin routes for:
   - Showing AI draft generation page.
   - Submitting PDF URL.
   - Previewing AI response if needed.
   - Saving generated response as News draft.

   Suggested routes:
   - GET /admin/ai-drafts
   - POST /admin/ai-drafts/process-url
   - POST /admin/ai-drafts/save

4. Draft persistence
   When legal-ai-agent returns suggested_news:
   - Save as News with status draft.
   - Set ai_generated = true.
   - Save ai_summary.
   - Save ai_key_points.
   - Save original_pdf_url.
   - Save extracted_text.
   - Save legal fields if present.
   - Attach suggested tags when possible.
   - Do not auto-publish.

5. Security
   - Only admin users can access AI draft routes.
   - Normal users cannot access AI draft functionality.
   - Do not expose Cerebras API key to the browser.
   - Optional shared secret between Laravel and legal-ai-agent if already implemented.

Frontend requirements:

1. Admin page
   Create:

   - resources/js/Pages/Admin/AiDrafts/Index.tsx

2. UI features
   - Form to paste legal PDF URL.
   - Button: Procesar con IA.
   - Loading state.
   - Error state.
   - Result preview:
     - suggested title
     - summary
     - key points
     - legal document type
     - decree number
     - institution
     - affected law
     - effective date
     - extracted text collapsed/preview
   - Button: Guardar como borrador.
   - Show link to edit generated draft after saving.

3. Admin navigation
   - Add menu item: Borradores IA.
   - Admin can see generated drafts inside existing News draft list.
   - AI-generated drafts should show a visual badge.

Testing requirements:

Create or update tests for:

- Non-admin cannot access AI draft page.
- Admin can access AI draft page.
- Laravel AI client handles successful response.
- Laravel AI client handles service unavailable.
- Admin can save AI generated draft as News draft.
- AI generated draft is not visible in public news listing until published.

Documentation requirements:

Create or update:

- docs/AI_INTEGRATION_REPORT.md
- docs-site/docs/ai/ai-integration.md
- docs-site/docs/admin/ai-drafts.md

Document in Spanish:

1. Integration architecture.
2. Laravel to FastAPI communication.
3. Environment variables.
4. Admin workflow.
5. Draft creation flow.
6. Security considerations.
7. Error handling.
8. Test results.
9. Pending risks.

Execution:

After implementation:

- Run backend tests.
- Run frontend build.
- Run Docusaurus build if possible.
- Fix errors caused by the implementation.

Rules:

- Do not auto-publish AI-generated content.
- Do not expose AI provider API keys to the frontend.
- Do not replace JWT with Sanctum.
- Do not create a standalone frontend project.
- Do not modify legal-ai-agent internals unless required for integration compatibility.
- Keep implementation simple and maintainable.

IMPORTANT:
All generated documentation must be written in Spanish.
Code, class names, methods, variables, routes and technical identifiers must remain in English.