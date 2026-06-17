---
sidebar_position: 3
title: CI/CD
---

# CI/CD

La integración continua está definida en `.github/workflows/ci.yml`.

## Jobs

| Job | Validación |
| --- | --- |
| `backend` | Dependencias PHP/Node, migraciones, tests Laravel y build Vite. |
| `docs` | Instalación de dependencias y build de Docusaurus. |

## Quality gates

El pipeline ejecuta:

```bash
composer install --no-interaction --prefer-dist --no-progress
npm ci
php artisan migrate --force
php artisan test
npm run build
```

Para documentación:

```bash
npm ci
npm run build
```

## Entorno de CI

- PHP 8.4.
- Node 22.
- MySQL 8.4 como servicio.
- `JWT_SECRET` de CI.
- `APP_KEY` fijo para ejecución reproducible.

`phpunit.xml` y `backend/.env.testing` mantienen SQLite en memoria para los tests actuales, lo que acelera la suite y evita dependencia fuerte de estado externo. MySQL queda disponible para futuras pruebas de integración.

## Validación local

La validación local equivalente aprobó:

- `docker compose exec app php artisan migrate --seed`.
- `docker compose exec app php artisan test`: `34 passed (140 assertions)`.
- `docker compose exec app npm run build`.
- `npm run build` en `docs-site`.
