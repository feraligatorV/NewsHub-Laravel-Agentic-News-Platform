# Estructura final del proyecto

## Revisión aplicada

El proyecto ya contiene una aplicación Laravel inicializada en `backend/` con React, TypeScript, Inertia.js, Vite y Breeze. La estructura final respeta esa base y agrega únicamente carpetas previstas para el dominio de noticias, API Resources, Form Requests, services/actions y pruebas.

## Alineación de stack

El backend actual declara `laravel/framework` con versión `^13.8`, por lo que la documentación final queda alineada a Laravel 13 y PHP 8.4.

## Estructura final

```text
NewsHub-Laravel-Agentic-News-Platform/
  backend/
    app/
      Actions/
        News/
          GetRecommendedNewsAction.php
      Http/
        Controllers/
          Api/
            AuthController.php
            CategoryController.php
            NewsController.php
          Auth/
          ProfileController.php
        Middleware/
          HandleInertiaRequests.php
        Requests/
          Auth/
          News/
            ListNewsRequest.php
          ProfileUpdateRequest.php
        Resources/
          CategoryResource.php
          NewsResource.php
          UserResource.php
      Models/
        Category.php
        News.php
        User.php
      Providers/
        AppServiceProvider.php
      Services/
        NewsRecommendationService.php
    bootstrap/
    config/
    database/
      factories/
        CategoryFactory.php
        NewsFactory.php
        UserFactory.php
      migrations/
        create_categories_table.php
        create_news_table.php
      seeders/
        CategorySeeder.php
        DatabaseSeeder.php
        NewsSeeder.php
    public/
    resources/
      css/
      js/
        Components/
          News/
        Layouts/
          AuthenticatedLayout.tsx
          GuestLayout.tsx
        Pages/
          Auth/
          News/
            Index.tsx
            Show.tsx
          Profile/
          Welcome.tsx
        types/
          index.d.ts
          news.ts
      views/
        app.blade.php
    routes/
      api.php
      auth.php
      console.php
      web.php
    tests/
      Feature/
        Api/
          AuthApiTest.php
          CategoryApiTest.php
          NewsApiTest.php
          RecommendationApiTest.php
        Auth/
      Unit/
        NewsRecommendationServiceTest.php
    composer.json
    package.json
    phpunit.xml
    tsconfig.json
    vite.config.js
  docs/
    adr/
    architecture/
    backlog/
  docs-site/
    docs/
      adr/
      architecture/
      backlog/
  prompts/
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
