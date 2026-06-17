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
    root --> prompts["prompts/"]

    backend --> app["app/"]
    app --> actions["Actions/News<br/>GetRecommendedNewsAction.php"]
    app --> http["Http/"]
    http --> controllers["Controllers<br/>Api, Auth, ProfileController.php"]
    http --> middleware["Middleware<br/>HandleInertiaRequests.php"]
    http --> requests["Requests<br/>Auth, News, ProfileUpdateRequest.php"]
    http --> apiResources["Resources<br/>CategoryResource.php, NewsResource.php, UserResource.php"]
    app --> models["Models<br/>Category.php, News.php, User.php"]
    app --> providers["Providers<br/>AppServiceProvider.php"]
    app --> services["Services<br/>NewsRecommendationService.php"]

    backend --> framework["bootstrap/ y config/"]
    backend --> database["database/"]
    database --> factories["factories<br/>CategoryFactory.php, NewsFactory.php, UserFactory.php"]
    database --> migrations["migrations<br/>create_categories_table.php, create_news_table.php"]
    database --> seeders["seeders<br/>CategorySeeder.php, DatabaseSeeder.php, NewsSeeder.php"]

    backend --> publicDir["public/"]
    backend --> resourcesDir["resources/"]
    resourcesDir --> css["css/"]
    resourcesDir --> js["js/"]
    js --> components["Components/News"]
    js --> layouts["Layouts<br/>AuthenticatedLayout.tsx, GuestLayout.tsx"]
    js --> pages["Pages<br/>Auth, News, Profile, Welcome.tsx"]
    js --> types["types<br/>index.d.ts, news.ts"]
    resourcesDir --> views["views<br/>app.blade.php"]

    backend --> routes["routes<br/>api.php, auth.php, console.php, web.php"]
    backend --> tests["tests/"]
    tests --> feature["Feature<br/>Api y Auth"]
    tests --> unit["Unit<br/>NewsRecommendationServiceTest.php"]
    backend --> configFiles["composer.json<br/>package.json<br/>phpunit.xml<br/>tsconfig.json<br/>vite.config.js"]

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
