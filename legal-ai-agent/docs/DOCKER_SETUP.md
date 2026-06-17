# Docker

El servicio se integra en el `docker-compose.yml` raiz. No existe un `docker-compose.yml` aislado dentro de `legal-ai-agent`.

## Configuracion local

```bash
cp legal-ai-agent/.env.example legal-ai-agent/.env
```

Variables principales:

| Variable | Proposito |
| --- | --- |
| `CEREBRAS_API_KEY` | Token de API. No debe versionarse. |
| `CEREBRAS_BASE_URL` | URL compatible OpenAI. |
| `CEREBRAS_MODEL` | Modelo usado para resumen. |
| `AI_REQUEST_TIMEOUT_SECONDS` | Timeout de peticion IA. |
| `AI_MAX_INPUT_CHARS` | Maximo de texto enviado a IA. |
| `NEWSHUB_API_URL` | URL interna futura hacia Laravel. |
| `NEWSHUB_AI_SHARED_SECRET` | Secreto futuro para integracion Laravel. |

## Comandos

```bash
docker compose build legal-ai-agent
docker compose up -d legal-ai-agent
docker compose ps
docker compose logs legal-ai-agent
docker compose exec legal-ai-agent pytest
curl http://localhost:8000/api/health
```

## Red interna

Laravel podra llamar al servicio con:

```text
http://legal-ai-agent:8000/api/health
```

Para desarrollo local se expone:

```text
http://localhost:8000/api/health
```
