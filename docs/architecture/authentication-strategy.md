# Estrategia de autenticación

## Decisión

La autenticación de API se diseñará con `JWT`, según el contexto arquitectónico del Architect Agent. La aplicación web puede usar sesión de Laravel para páginas Inertia si se requiere, pero los endpoints API protegidos deben exigir un token `JWT` válido.

## Objetivos

- Proteger endpoints privados.
- Permitir login y logout.
- Rechazar solicitudes no autenticadas.
- Mantener una estrategia entendible para una prueba técnica.

## Endpoints de autenticación sugeridos

| Método | Ruta | Protección | Descripción |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Pública | Registra un usuario |
| `POST` | `/api/auth/login` | Pública | Genera token `JWT` |
| `POST` | `/api/auth/logout` | `auth:api` | Invalida token |
| `GET` | `/api/auth/me` | `auth:api` | Devuelve usuario autenticado |

## Flujo de login

```mermaid
sequenceDiagram
    participant Client as Cliente
    participant API as Laravel API
    participant Auth as JWT Guard
    participant DB as MySQL

    Client->>API: POST /api/auth/login
    API->>DB: Buscar usuario por email
    DB-->>API: Usuario
    API->>Auth: Validar password y emitir token
    Auth-->>API: JWT
    API-->>Client: token y datos del usuario
```

## Reglas

- Las credenciales deben validarse con Form Requests.
- Las respuestas deben evitar exponer detalles sensibles.
- El token debe enviarse con `Authorization: Bearer <token>`.
- Los tests deben cubrir login exitoso, login inválido y acceso no autorizado.

