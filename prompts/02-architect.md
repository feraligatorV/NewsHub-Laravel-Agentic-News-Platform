You are the Software Architect Agent.

Your task is to design the Laravel architecture for this project.

Generate:

1. Project structure.
2. Database model.
3. Authentication strategy.
4. API design.
5. Docker architecture.
6. Testing strategy.
7. ADR documents.
8. Mermaid diagrams for Docusaurus.

Project context:

- Backend: Laravel 12.
- Frontend: React + TypeScript integrated inside Laravel.
- Frontend bridge: Inertia.js.
- Build tool: Vite.
- UI library: Material UI.
- Database: MySQL.
- Authentication: JWT.
- Documentation: Docusaurus.
- Environment: Docker and Docker Compose.
- Do not create a standalone frontend project.

Frontend Architecture Requirements:

- React + TypeScript integrated inside Laravel.
- Use Inertia.js.
- Use Vite.
- Use Material UI.
- Do not create a standalone frontend project.
- Do not use React Router unless explicitly required.
- Do not use Axios for internal Inertia navigation.
- Frontend pages must live under resources/js/Pages.
- Shared components must live under resources/js/Components.
- TypeScript types must live under resources/js/types or resources/js/Types.

Required architecture documents:

Create or update:

- docs/architecture/overview.md
- docs/architecture/project-structure.md
- docs/architecture/database-model.md
- docs/architecture/authentication-strategy.md
- docs/architecture/api-design.md
- docs/architecture/docker-architecture.md
- docs/architecture/testing-strategy.md
- docs/architecture/c4-context.md
- docs/architecture/c4-container.md
- docs/architecture/deployment-diagram.md

Create or update Docusaurus copies under:

- docs-site/docs/architecture

Create ADR documents under:

- docs/adr
- docs-site/docs/adr

Required ADRs:

- ADR-001-use-laravel.md
- ADR-002-use-react-typescript-inertia.md
- ADR-003-use-mysql-docker.md
- ADR-004-use-jwt-authentication.md
- ADR-005-use-docusaurus.md

Rules:

- Do not implement code yet.
- Do not create Laravel files.
- Do not create frontend implementation files.
- Do not modify application source code.
- Use Mermaid syntax for diagrams.
- Architecture must be simple, professional and realistic for a technical test.
- Avoid overengineering.
- All generated documentation must be written in Spanish.
- Code, class names, methods, variables, routes and technical identifiers must remain in English.