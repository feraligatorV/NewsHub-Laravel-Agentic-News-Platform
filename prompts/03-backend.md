You are the Backend Developer Agent.

Your task is to implement the Laravel backend for the NewsHub technical test.

Before implementing, read:

- AGENTS.md
- docs/backlog/product-owner-documentation.md
- docs/architecture/overview.md
- docs/architecture/database-model.md
- docs/architecture/authentication-strategy.md
- docs/architecture/api-design.md
- docs/adr/ADR-004-use-jwt-authentication.md

Implement:

1. Models and migrations.
2. Seeders and factories.
3. JWT authentication endpoints.
4. News endpoints.
5. Categories endpoints.
6. Recommended news endpoint.
7. API Resources.
8. Form Requests when needed.
9. Feature tests for backend behavior.

Technology context:

- Laravel 13.
- PHP 8.4.
- MySQL.
- React + TypeScript + Inertia.js already exists only as frontend scaffolding.
- The frontend must remain inside Laravel.
- Do not create a standalone frontend project.

IMPORTANT AUTHENTICATION DECISION:

The technical test explicitly requires JWT authentication.

Even if the current Laravel scaffolding includes Breeze, session auth, Sanctum references, or Inertia auth pages, the API authentication required for this project must be implemented with JWT using tymon/jwt-auth.

Breeze/Inertia can remain only as frontend scaffolding.

Do not use Laravel Sanctum as the main API authentication mechanism.

Implement API authentication with:

- tymon/jwt-auth
- Authorization: Bearer <token>
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh
- GET /api/auth/me
- Protected routes using auth:api or JWT middleware

News API requirements:

- GET /api/news
- GET /api/news/{news}
- GET /api/news/{news}/recommended
- GET /api/categories
- GET /api/categories/{category}/news

Implementation rules:

- Use English for code, class names, methods, variables, routes and technical identifiers.
- Use Spanish for generated documentation and reports.
- Use Form Requests for auth validation.
- Use API Resources for JSON responses.
- Use Services or Actions for recommendation logic.
- Use factories and seeders to create at least:
  - 1 demo user
  - 3 categories
  - 8 news records
- Recommended news must:
  - Return at least 3 items when enough data exists.
  - Exclude the current news.
  - Prefer news from the same category.
- Avoid overengineering.
- Do not create repositories unless clearly useful.
- Do not modify Docusaurus unless documenting backend changes.
- Do not create frontend pages in this step.

Testing requirements:

Create or update tests for:

- User registration.
- User login returns JWT token.
- Protected route rejects unauthenticated requests.
- Authenticated user can access /api/auth/me.
- News listing returns seeded news.
- News detail returns correct news.
- Recommended news excludes current news.
- Categories endpoint returns categories.

After implementation:

1. Run backend tests.
2. Fix failing tests if related to the implemented behavior.
3. Create docs/BACKEND_IMPLEMENTATION_REPORT.md in Spanish summarizing:
   - Implemented files
   - Endpoints
   - Authentication strategy
   - Test results
   - Pending risks, if any

IMPORTANT:
All generated documentation must be written in Spanish.
Code, class names, methods, variables, routes and technical identifiers must remain in English.