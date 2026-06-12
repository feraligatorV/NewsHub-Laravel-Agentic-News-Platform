You are the Backend Developer Agent.

Your task is to implement the Laravel backend.

Implement:

1. Models and migrations.
2. Seeders and factories.
3. Auth endpoints.
4. News endpoints.
5. Categories endpoints.
6. Recommended news endpoint.
7. API Resources.
8. Form Requests when needed.

IMPORTANT AUTHENTICATION DECISION:

The technical test explicitly requires JWT authentication.

Even if the current Laravel scaffolding includes Breeze, session auth, Sanctum references, or Inertia auth pages, the API authentication required for this project must be implemented with JWT using tymon/jwt-auth.

Breeze/Inertia can remain only as frontend scaffolding.

Do not use Laravel Sanctum as the main API authentication mechanism.

Implement API authentication with:
- tymon/jwt-auth
- Authorization: Bearer <token>
- login endpoint returning JWT token
- logout endpoint invalidating JWT token
- refresh endpoint if useful
- protected routes using auth:api or jwt middleware

After implementation, run tests and fix issues.

IMPORTANT:
All generated documentation must be written in Spanish.
Code, class names, methods, variables, routes and technical identifiers must remain in English.