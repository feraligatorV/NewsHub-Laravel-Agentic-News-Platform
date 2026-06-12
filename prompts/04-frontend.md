You are the Frontend Developer Agent.

Your task is to implement the Laravel frontend for the NewsHub technical test.

Before implementing, read:

- AGENTS.md
- docs/backlog/product-owner-documentation.md
- docs/architecture/project-structure.md
- docs/architecture/api-design.md
- docs/architecture/authentication-strategy.md
- docs/BACKEND_IMPLEMENTATION_REPORT.md
- docs-site/docs/api/authentication.md
- docs-site/docs/api/news.md
- docs-site/docs/api/categories.md

Implement:

1. Main news page.
2. News detail page.
3. Recommended news section.
4. Navbar with Home and Categories.
5. Categories page.
6. Login page.
7. Logout behavior.
8. Responsive UI.

Frontend Requirements:

- Use React + TypeScript.
- Use Inertia.js.
- Use Vite.
- Use Material UI.
- Do not use React Router.
- Do not create a separate frontend project.
- Do not create a standalone SPA.
- Use Inertia pages under resources/js/Pages.
- Use reusable components under resources/js/Components.
- Use shared types under resources/js/types or resources/js/Types.
- Implement responsive UI.

API Integration Requirements:

- Consume the existing Laravel API endpoints.
- Use JWT authentication.
- Login must call POST /api/auth/login.
- Store JWT token safely enough for this technical test.
- Protected API calls must use Authorization: Bearer <token>.
- Logout must call POST /api/auth/logout when a token exists.
- News list must consume GET /api/news.
- News detail must consume GET /api/news/{news}.
- Recommended section must consume GET /api/news/{news}/recommended.
- Categories page must consume GET /api/categories.
- Category news page or filter must consume GET /api/categories/{category}/news if useful.

Important Inertia clarification:

- Inertia is used to render React pages inside Laravel.
- Do not use React Router.
- Navigation between Inertia pages must use Inertia Link or server routes.
- API data may be loaded from Laravel controllers or consumed from React when appropriate.
- Avoid duplicating business logic in the frontend.

UI Requirements:

- Use Material UI components.
- Create a professional but simple news layout.
- Include loading states.
- Include error states.
- Include empty states.
- Use cards for news items.
- Show title, image, summary, category and publication date.
- Detail page must show title, image, body/content, category and publication date.
- Recommended news must display at least 3 items when available.
- Navbar must include Home and Categories.

Implementation Rules:

- Do not modify backend business logic unless a frontend integration bug requires a small safe fix.
- Do not change API contracts unless absolutely necessary.
- Do not replace JWT with Sanctum.
- Do not create a standalone frontend folder.
- Do not install unnecessary libraries.
- Keep code readable and simple.

After implementation:

1. Run npm build.
2. Fix TypeScript or Vite errors.
3. If possible, run backend tests again.
4. Create docs/FRONTEND_IMPLEMENTATION_REPORT.md in Spanish summarizing:
   - Pages created
   - Components created
   - API integration
   - Authentication handling
   - Build result
   - Pending risks, if any

IMPORTANT:
All generated documentation must be written in Spanish.
Code, class names, methods, variables, routes and technical identifiers must remain in English.