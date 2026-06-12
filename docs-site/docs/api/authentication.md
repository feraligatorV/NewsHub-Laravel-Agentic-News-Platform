---
title: Autenticación
sidebar_position: 1
---

# Autenticación API

## Estrategia

La API usa `JWT` con `tymon/jwt-auth` como mecanismo principal de autenticación. Los endpoints protegidos usan `auth:api`.

El cliente debe enviar el token en cada solicitud protegida:

```text
Authorization: Bearer <token>
```

`Sanctum` no se usa como estrategia principal de autenticación API.

## Flujo de autenticación

```mermaid
sequenceDiagram
    participant Client as Cliente
    participant API as Laravel API
    participant DB as MySQL
    participant JWT as tymon/jwt-auth

    Client->>API: POST /api/auth/login
    API->>DB: Buscar User por email
    DB-->>API: User
    API->>API: Validar password
    API->>JWT: Emitir access_token
    JWT-->>API: JWT
    API-->>Client: token_type, access_token, expires_in, user
    Client->>API: GET /api/auth/me + Authorization Bearer
    API->>JWT: Validar token
    JWT-->>API: Token válido
    API-->>Client: UserResource
```

## Endpoints

| Método | Ruta | Protección | Descripción |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Pública | Registra usuario y emite token |
| `POST` | `/api/auth/login` | Pública | Autentica usuario y emite token |
| `GET` | `/api/auth/me` | `auth:api` | Devuelve usuario autenticado |
| `POST` | `/api/auth/refresh` | `auth:api` | Renueva token |
| `POST` | `/api/auth/logout` | `auth:api` | Invalida token |

## Register

### Request

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

### Response `201 Created`

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

## Login

### Request

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "jane@example.com",
  "password": "password"
}
```

### Response `200 OK`

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

## Me

```http
GET /api/auth/me
Authorization: Bearer <token>
```

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

## Refresh

```http
POST /api/auth/refresh
Authorization: Bearer <token>
```

Response `200 OK`:

```json
{
  "data": {
    "user": null,
    "token_type": "bearer",
    "access_token": "new-jwt-token",
    "expires_in": 3600
  }
}
```

## Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

Response `204 No Content`.

