---
title: Estructura final del proyecto
sidebar_position: 14
---

# Estructura final del proyecto

## Revisión aplicada

El proyecto ya contiene una aplicación Laravel inicializada en `backend/` con React, TypeScript, Inertia.js, Vite y Breeze. La estructura final respeta esa base y agrega únicamente carpetas previstas para el dominio de noticias, API Resources, Form Requests, services/actions y pruebas.

## Alineación de stack

El backend actual declara `laravel/framework` con versión `^13.8`, por lo que la documentación final queda alineada a Laravel 13 y PHP 8.4.

## Estructura final

```mermaid
flowchart TD
    root["NewsHub-Laravel-Agentic-News-Platform"]
    root --> backend["backend/"]
    root --> docs["docs/"]
    root --> docsSite["docs-site/"]

    backend --> app["app/"]
    app --> actions["Actions/News/"]
    app --> http["Http/"]
    http --> apiControllers["Controllers/Api/"]
    http --> authControllers["Controllers/Auth/"]
    http --> requests["Requests/"]
    http --> apiResources["Resources/"]
    app --> models["Models/"]
    app --> services["Services/"]

    backend --> database["database/"]
    database --> factories["factories/"]
    database --> migrations["migrations/"]
    database --> seeders["seeders/"]

    backend --> resourcesDir["resources/"]
    resourcesDir --> js["js/"]
    js --> components["Components/"]
    js --> layouts["Layouts/"]
    js --> pages["Pages/"]
    js --> types["types/"]
    resourcesDir --> views["views/"]

    backend --> routes["routes/"]
    routes --> apiRoute["api.php"]
    routes --> authRoute["auth.php"]
    routes --> consoleRoute["console.php"]
    routes --> webRoute["web.php"]

    backend --> tests["tests/"]
    tests --> featureTests["Feature/"]
    tests --> unitTests["Unit/"]

    docs --> docsGroups["adr/<br/>architecture/<br/>backlog/"]
    docsSite --> siteDocs["docs<br/>adr, architecture, backlog"]
```

## Reglas finales

- No crear una aplicación React standalone.
- Mantener todo el frontend de producto bajo `backend/resources/js`.
- Usar `resources/js/Pages` para páginas Inertia.
- Usar `resources/js/Components` para componentes compartidos.
- Usar `resources/js/types` para tipos TypeScript.
- Usar `routes/web.php` para páginas Inertia.
- Usar `routes/api.php` para endpoints JSON.
- Usar `auth:api` con `tymon/jwt-auth` en endpoints API protegidos.
- Usar Form Requests para validación.
- Usar API Resources para respuestas JSON.
- Mantener Docusaurus bajo `docs-site`.
