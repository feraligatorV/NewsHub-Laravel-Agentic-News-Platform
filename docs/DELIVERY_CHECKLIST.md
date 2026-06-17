# Checklist de entrega

## Código

- [x] El backend Laravel 13 está completo.
- [x] El frontend React + TypeScript vive bajo `backend/resources/js`.
- [x] No existe una aplicación frontend standalone.
- [x] La API usa JWT con `tymon/jwt-auth`.
- [x] Los endpoints protegidos usan `Authorization: Bearer <token>`.
- [x] Sanctum no se usa como estrategia principal de autenticación API.

## Docker

- [x] Ejecutar `docker compose up -d --build`.
- [x] Verificar `docker compose ps`.
- [x] Ejecutar `docker compose exec app php artisan migrate --seed`.
- [x] Verificar que `http://localhost:8080` queda expuesto por Nginx.
- [x] Ejecutar `docker compose exec app php artisan test`.
- [x] Ejecutar `docker compose exec app npm run build`.

## Calidad

- [x] Backend tests aprobados.
- [x] Frontend build aprobado.
- [x] Docusaurus build aprobado.
- [x] No hay errores bloqueantes en QA.
- [x] Riesgos pendientes documentados.

## Documentación

- [x] `docs/DEVOPS_REPORT.md` actualizado.
- [x] `docs/QA_REPORT.md` actualizado.
- [x] `docs/REVIEW_REPORT.md` actualizado.
- [x] Docusaurus incluye secciones de API, backend, frontend, QA, review y DevOps.
- [x] Toda la documentación generada está en español.

## Entrega

- [x] Revisar `.env.example` y documentar secretos requeridos.
- [x] No incluir `.env` real ni secretos privados.
- [x] Confirmar que `.github/workflows/ci.yml` está preparado para versionarse.
- [x] Confirmar que `docker-compose.yml`, `backend/Dockerfile` y `docker/nginx/default.conf` están preparados para versionarse.
- [x] Preparar instrucciones finales de ejecución para el evaluador.
