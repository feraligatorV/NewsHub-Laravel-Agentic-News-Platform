---
title: Contrato API final
sidebar_position: 12
---

# Contrato API final

## Revisión aplicada

El backend inicializado ya tiene scaffolding web con Breeze e Inertia. Para la API final se usará `JWT` con `tymon/jwt-auth`, porque la prueba técnica exige autenticación JWT explícitamente.

Todas las respuestas API deben ser JSON. Las entidades de dominio deben exponerse mediante API Resources.

## Convenciones

- Base path: `/api`.
- Autenticación: `Authorization: Bearer <token>`.
- Middleware protegido: `auth:api`.
- Paquete de autenticación: `tymon/jwt-auth`.
- Fechas: ISO 8601.
- Errores de validación: `422 Unprocessable Entity`.
- Recursos inexistentes: `404 Not Found`.
- Acceso no autenticado: `401 Unauthorized`.

## Endpoints finales

| Método | Ruta | Protección | Descripción |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Pública | Registra usuario API |
| `POST` | `/api/auth/login` | Pública | Emite token `JWT` |
| `GET` | `/api/auth/me` | `auth:api` | Devuelve usuario autenticado |
| `POST` | `/api/auth/refresh` | `auth:api` | Renueva token |
| `POST` | `/api/auth/logout` | `auth:api` | Invalida token actual |
| `GET` | `/api/news` | Pública | Lista noticias publicadas |
| `GET` | `/api/news/{slug}` | Pública | Devuelve detalle de noticia |
| `GET` | `/api/news/{slug}/recommendations` | Pública | Devuelve recomendaciones |
| `GET` | `/api/categories` | Pública | Lista categorías |
| `GET` | `/api/categories/{slug}/news` | Pública | Lista noticias por categoría |

## Login

Request:

```json
{
  "email": "jane@example.com",
  "password": "password"
}
```

Response `200 OK`:

```json
{
  "data": {
    "user": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com"
    },
    "token_type": "bearer",
    "access_token": "jwt-token",
    "expires_in": 3600
  }
}
```

## Listado de noticias

Query parameters: `page`, `per_page`, `category`, `search`.

Response `200 OK`:

```json
{
  "data": [
    {
      "id": 1,
      "title": "News title",
      "slug": "news-title",
      "summary": "Short summary",
      "published_at": "2026-06-11T10:00:00Z",
      "category": {
        "id": 1,
        "name": "Technology",
        "slug": "technology"
      }
    }
  ]
}
```

