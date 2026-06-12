---
title: Estrategia de autenticación
sidebar_position: 4
---

# Estrategia de autenticación

## Decisión

La autenticación de API se diseñará con `JWT`. La aplicación web puede usar sesión de Laravel para páginas Inertia si se requiere, pero los endpoints API protegidos deben exigir un token `JWT` válido.

## Endpoints sugeridos

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
- El token debe enviarse con `Authorization: Bearer <token>`.
- Los tests deben cubrir login exitoso, login inválido y acceso no autorizado.

