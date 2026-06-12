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

## Autenticación

### `POST /api/auth/register`

Registra un usuario para consumo API.

Request:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

Response `201 Created`:

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

### `POST /api/auth/login`

Autentica un usuario y emite token `JWT`.

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

### `GET /api/auth/me`

Protección: `auth:api`.

Response `200 OK`:

```json
{
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

### `POST /api/auth/refresh`

Protección: `auth:api`.

Response `200 OK`:

```json
{
  "data": {
    "token_type": "bearer",
    "access_token": "new-jwt-token",
    "expires_in": 3600
  }
}
```

### `POST /api/auth/logout`

Protección: `auth:api`.

Response `204 No Content`.

## Noticias

### `GET /api/news`

Lista noticias publicadas.

Query parameters:

| Parámetro | Tipo | Requerido | Descripción |
| --- | --- | --- | --- |
| `page` | integer | No | Página de resultados |
| `per_page` | integer | No | Tamaño de página, máximo recomendado 20 |
| `category` | string | No | `slug` de categoría |
| `search` | string | No | Texto para buscar por título o resumen |

Response `200 OK`:

```json
{
  "data": [
    {
      "id": 1,
      "title": "News title",
      "slug": "news-title",
      "summary": "Short summary",
      "image_url": "https://example.com/image.jpg",
      "source": "NewsHub",
      "published_at": "2026-06-11T10:00:00Z",
      "category": {
        "id": 1,
        "name": "Technology",
        "slug": "technology"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 5
  }
}
```

### `GET /api/news/{slug}`

Devuelve el detalle de una noticia.

### `GET /api/news/{slug}/recommendations`

Devuelve al menos 3 noticias recomendadas cuando existan suficientes datos.

## Categorías

### `GET /api/categories`

Lista categorías disponibles.

### `GET /api/categories/{slug}/news`

Lista noticias publicadas de una categoría.

## Contrato de errores

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

