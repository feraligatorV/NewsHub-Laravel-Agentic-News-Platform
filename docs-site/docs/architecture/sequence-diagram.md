---
sidebar_position: 5
title: Secuencia
---

# Diagrama de secuencia

Este diagrama resume el flujo principal de lectura publica, autenticacion JWT y acceso a endpoints protegidos.

```mermaid
sequenceDiagram
    autonumber
    actor Visitor as Visitante
    actor User as Usuario autenticado
    participant Browser as Navegador
    participant Nginx as Nginx
    participant Laravel as Laravel App
    participant JWT as tymon/jwt-auth
    participant DB as MySQL

    Visitor->>Browser: Abre pagina de noticias
    Browser->>Nginx: GET /
    Nginx->>Laravel: FastCGI request
    Laravel->>DB: Consulta noticias published y categorias
    DB-->>Laravel: Noticias, categorias y recomendadas
    Laravel-->>Browser: Pagina Inertia con React UI
    Browser-->>Visitor: Muestra listado publico

    User->>Browser: Envia credenciales
    Browser->>Nginx: POST /api/auth/login
    Nginx->>Laravel: FastCGI request
    Laravel->>DB: Busca usuario
    DB-->>Laravel: Usuario valido
    Laravel->>JWT: Genera token
    JWT-->>Laravel: Bearer token
    Laravel-->>Browser: JSON con access_token

    User->>Browser: Solicita recurso protegido
    Browser->>Nginx: GET /api/user<br/>Authorization: Bearer token
    Nginx->>Laravel: FastCGI request
    Laravel->>JWT: Valida token
    JWT-->>Laravel: Identidad del usuario
    Laravel->>DB: Consulta datos autorizados
    DB-->>Laravel: Datos
    Laravel-->>Browser: JSON protegido
```

## Criterios representados

- El portal publico solo muestra noticias `published`.
- La API protegida requiere `Authorization: Bearer <token>`.
- JWT es el mecanismo principal de autenticacion API.
- Breeze/Inertia queda limitado a experiencia web y administracion.
