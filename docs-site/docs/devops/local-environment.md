---
sidebar_position: 2
title: Entorno local
---

# Entorno local

El entorno local usa los valores definidos en `docker-compose.yml` y `backend/.env.example`.

## Variables principales

| Variable | Valor local |
| --- | --- |
| `APP_URL` | `http://localhost:8080` |
| `DB_CONNECTION` | `mysql` |
| `DB_HOST` | `mysql` |
| `DB_DATABASE` | `newshub` |
| `DB_USERNAME` | `newshub` |
| `DB_PASSWORD` | `newshub` |
| `JWT_SECRET` | `local-dev-jwt-secret-change-me-32bytes` |

## Credenciales sembradas

El seeder crea un usuario demo:

```text
demo@newshub.test
```

La contraseña depende de la configuración de la factory de `User`.

## Comandos útiles

Instalar dependencias dentro del contenedor:

```bash
docker compose exec app composer install
docker compose exec app npm install
```

Ejecutar migraciones:

```bash
docker compose exec app php artisan migrate
```

Ejecutar seeders:

```bash
docker compose exec app php artisan db:seed
```

Limpiar cachés:

```bash
docker compose exec app php artisan optimize:clear
```

## Notas

- No se debe crear una aplicación React separada.
- Vite compila assets desde el proyecto Laravel.
- JWT sigue siendo la estrategia principal para API.
- `backend/.env.testing` define SQLite en memoria y un `JWT_SECRET` válido para ejecutar `php artisan test`.
