# legal-ai-agent

Microservicio FastAPI para procesar publicaciones legales en PDF desde URLs HTTP/HTTPS y devolver borradores estructurados compatibles con el Admin CMS de NewsHub.

## Comandos principales

```bash
cp legal-ai-agent/.env.example legal-ai-agent/.env
docker compose build legal-ai-agent
docker compose up -d legal-ai-agent
docker compose logs legal-ai-agent
docker compose exec legal-ai-agent pytest
curl http://localhost:8000/api/health
```

Validacion ejecutada:

```text
docker compose exec legal-ai-agent pytest
10 passed in 0.71s
GET http://localhost:8000/api/health: 200 OK
```

## Seguridad

No se incluyen secretos reales. `CEREBRAS_API_KEY`, `CEREBRAS_MODEL` y `NEWSHUB_AI_SHARED_SECRET` deben configurarse por variables de entorno. Si faltan credenciales de IA, los endpoints que requieren resumen devuelven un error claro de configuracion.

## Endpoints

- `GET /api/health`
- `POST /api/legal/process-url`
- `POST /api/legal/process-pdf`
- `POST /api/legal/summarize`
- `POST /api/legal/create-draft`

El servicio siempre devuelve borradores con `status = draft`; no publica noticias ni escribe en la base de datos de Laravel.
