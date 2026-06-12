# Reporte de implementación backend

## Resumen

Se implementó el backend API de NewsHub para Laravel 13 y PHP 8.4, manteniendo Breeze/Inertia como scaffolding web existente y usando `JWT` con `tymon/jwt-auth` como mecanismo principal de autenticación API.

## Archivos implementados o actualizados

### Configuración

- `backend/composer.json`
- `backend/composer.lock`
- `backend/bootstrap/app.php`
- `backend/config/auth.php`
- `backend/config/jwt.php`
- `backend/.env.example`
- `backend/phpunit.xml`

### Dominio

- `backend/app/Models/Category.php`
- `backend/app/Models/News.php`
- `backend/app/Models/User.php`
- `backend/database/migrations/2026_06_11_000001_create_categories_table.php`
- `backend/database/migrations/2026_06_11_000002_create_news_table.php`
- `backend/database/factories/CategoryFactory.php`
- `backend/database/factories/NewsFactory.php`
- `backend/database/seeders/DatabaseSeeder.php`

### API

- `backend/routes/api.php`
- `backend/app/Http/Controllers/Api/AuthController.php`
- `backend/app/Http/Controllers/Api/NewsController.php`
- `backend/app/Http/Controllers/Api/CategoryController.php`
- `backend/app/Http/Requests/Api/Auth/RegisterRequest.php`
- `backend/app/Http/Requests/Api/Auth/LoginRequest.php`
- `backend/app/Http/Resources/UserResource.php`
- `backend/app/Http/Resources/CategoryResource.php`
- `backend/app/Http/Resources/NewsResource.php`
- `backend/app/Services/NewsRecommendationService.php`

### Pruebas

- `backend/tests/Feature/Api/AuthApiTest.php`
- `backend/tests/Feature/Api/NewsApiTest.php`
- `backend/tests/Feature/Api/CategoryApiTest.php`

## Endpoints implementados

### Autenticación JWT

| Método | Ruta | Protección | Descripción |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Pública | Registra usuario y devuelve token JWT |
| `POST` | `/api/auth/login` | Pública | Autentica usuario y devuelve token JWT |
| `GET` | `/api/auth/me` | `auth:api` | Devuelve usuario autenticado |
| `POST` | `/api/auth/refresh` | `auth:api` | Renueva token JWT |
| `POST` | `/api/auth/logout` | `auth:api` | Invalida token JWT |

### Noticias y categorías

| Método | Ruta | Protección | Descripción |
| --- | --- | --- | --- |
| `GET` | `/api/news` | Pública | Lista noticias paginadas |
| `GET` | `/api/news/{news}` | Pública | Devuelve detalle por `slug` |
| `GET` | `/api/news/{news}/recommended` | Pública | Devuelve noticias recomendadas |
| `GET` | `/api/categories` | Pública | Lista categorías |
| `GET` | `/api/categories/{category}/news` | Pública | Lista noticias por categoría |

## Estrategia de autenticación

- Se agregó `tymon/jwt-auth` como dependencia.
- Se configuró el guard `api` con driver `jwt`.
- `User` implementa `Tymon\JWTAuth\Contracts\JWTSubject`.
- Los endpoints protegidos usan `auth:api`.
- El cliente debe enviar `Authorization: Bearer <token>`.
- `Sanctum` fue removido de las dependencias de Composer porque no debe ser la estrategia principal de autenticación API.

## Datos iniciales

El seeder principal crea:

- 1 usuario demo: `demo@newshub.test`.
- 3 categorías: `Technology`, `Business`, `Science`.
- 8 noticias distribuidas entre categorías.

## Resultados de pruebas

Comando ejecutado:

```bash
docker run --rm -v "${PWD}:/app" -w /app composer:2 php artisan test
```

Resultado:

```text
Tests: 34 passed (140 assertions)
Duration: 22.86s
```

También se validó el registro de rutas API con:

```bash
docker run --rm -v "${PWD}:/app" -w /app composer:2 php artisan route:list --path=api
```

## Riesgos pendientes

- El entorno local del host no tiene `php` ni `composer` en el `PATH`; las verificaciones se ejecutaron mediante Docker.
- Es necesario definir `JWT_SECRET` en `.env` antes de ejecutar el proyecto fuera de testing.
- Aún falta integrar estas APIs con la experiencia React/Inertia en una etapa frontend posterior.
