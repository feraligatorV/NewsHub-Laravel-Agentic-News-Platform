# Diseño de API

## Convenciones

- Usar JSON como formato de intercambio.
- Usar API Resources para respuestas.
- Usar Form Requests para validación.
- Mantener rutas REST simples.
- Proteger endpoints privados con `auth:api` usando `tymon/jwt-auth`.

## Endpoints públicos

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/news` | Lista noticias publicadas |
| `GET` | `/api/news/{slug}` | Devuelve detalle de una noticia |
| `GET` | `/api/news/{slug}/recommendations` | Devuelve noticias recomendadas |
| `GET` | `/api/categories` | Lista categorías |
| `GET` | `/api/categories/{slug}/news` | Lista noticias por categoría |

## Endpoints protegidos

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/auth/me` | Devuelve usuario autenticado |
| `POST` | `/api/auth/logout` | Cierra sesión API |

## Respuesta de noticia sugerida

```json
{
  "data": {
    "id": 1,
    "title": "News title",
    "slug": "news-title",
    "summary": "Short summary",
    "content": "Full content",
    "category": {
      "id": 1,
      "name": "Technology",
      "slug": "technology"
    },
    "source": "NewsHub",
    "published_at": "2026-06-11T10:00:00Z"
  }
}
```

## Paginación

El listado `/api/news` debe usar paginación para mantener respuestas pequeñas. Para la prueba técnica, una paginación estándar de Laravel es suficiente.

## Manejo de errores

- `401 Unauthorized` para solicitudes sin token válido.
- `404 Not Found` para noticias o categorías inexistentes.
- `422 Unprocessable Entity` para validaciones fallidas.
- `500 Internal Server Error` solo para errores no controlados.
