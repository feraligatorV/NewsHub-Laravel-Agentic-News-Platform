# Reporte Legal AI Agent

## 1. Proposito

Se creo `legal-ai-agent`, un microservicio FastAPI para procesar publicaciones legales PDF desde URLs HTTP/HTTPS, extraer texto, solicitar analisis IA y devolver borradores compatibles con el Admin CMS de NewsHub.

## 2. Arquitectura

El servicio usa Clean Architecture:

- `domain`: entidades, interfaces y errores.
- `application`: casos de uso, DTOs y servicios de borrador.
- `infrastructure`: cliente Cerebras, descarga PDF, extraccion PyMuPDF y cliente Legal DCA.
- `presentation`: API FastAPI y schemas.

## 3. Endpoints

- `GET /api/health`
- `POST /api/legal/process-url`
- `POST /api/legal/process-pdf`
- `POST /api/legal/summarize`
- `POST /api/legal/create-draft`

## 4. Docker Compose

Se actualizo el `docker-compose.yml` raiz con el servicio `legal-ai-agent`. El servicio usa la red `newshub`, se expone en `8000:8000` para desarrollo local y queda disponible internamente como:

```text
http://legal-ai-agent:8000
```

## 5. Seguridad

No se hardcodearon API keys. Las credenciales se leen desde variables de entorno:

- `CEREBRAS_API_KEY`
- `CEREBRAS_MODEL`
- `NEWSHUB_AI_SHARED_SECRET`

`.env.example` contiene placeholders sin secretos reales.

## 6. Integracion con Admin CMS

El payload `suggested_news` incluye campos compatibles con NewsHub:

- `title`
- `slug`
- `summary`
- `body`
- `source_url`
- `status`
- `legal_document_type`
- `decree_number`
- `institution`
- `affected_law`
- `effective_date`
- `ai_generated`
- `ai_summary`
- `ai_key_points`
- `original_pdf_url`
- `extracted_text`
- `tags`

El servicio no escribe en la base de datos y siempre devuelve `status = draft`.

## 7. Revision humana

Todo resultado incluye el disclaimer:

```text
Contenido generado por IA. Requiere revisión humana legal antes de publicación.
```

## 8. Limitaciones

- La resolucion de PDFs desde paginas HTML usa BeautifulSoup y enlaces directos.
- El servicio acepta URLs HTTP/HTTPS de cualquier dominio, no solo `legal.dca.gob.gt`.
- No se implemento Playwright.
- No se implemento todavia el guardado automatico en Laravel.
- Sin `CEREBRAS_API_KEY` y `CEREBRAS_MODEL`, los endpoints que usan IA devuelven error de configuracion claro.

## 9. Comandos de validacion

```bash
docker compose build legal-ai-agent
docker compose up -d legal-ai-agent
docker compose logs legal-ai-agent
docker compose exec legal-ai-agent pytest
curl http://localhost:8000/api/health
```

## 10. Resultados

Build:

```bash
docker compose build legal-ai-agent
```

Resultado:

```text
newshub-laravel-agentic-news-platform-legal-ai-agent  Built
```

Ejecucion:

```bash
docker compose up -d legal-ai-agent
docker compose ps legal-ai-agent
```

Resultado:

```text
newshub-legal-ai-agent   Up   healthy   0.0.0.0:8000->8000/tcp
```

Health check:

```bash
curl http://localhost:8000/api/health
```

Resultado:

```json
{"status":"ok","service":"legal-ai-agent"}
```

Tests:

```bash
docker compose exec legal-ai-agent pytest
```

Resultado:

```text
10 passed in 0.71s
```
