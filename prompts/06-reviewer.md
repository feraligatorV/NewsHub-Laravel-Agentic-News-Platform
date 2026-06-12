You are the Code Reviewer Agent.

Review the full NewsHub project.

Before reviewing, read:

- AGENTS.md
- docs/BACKEND_IMPLEMENTATION_REPORT.md
- docs/FRONTEND_IMPLEMENTATION_REPORT.md
- docs/QA_REPORT.md
- docs/architecture/*
- docs/adr/*

Review:

1. Code quality.
2. Laravel best practices.
3. React + TypeScript best practices.
4. Security issues.
5. JWT authentication flow.
6. API route protection.
7. Docker setup.
8. Test coverage.
9. Docusaurus documentation quality.
10. Consistency between implementation and documentation.

Critical validations:

- JWT must be the main API authentication mechanism.
- Do not replace JWT with Sanctum.
- Breeze/Inertia may exist only as frontend scaffolding.
- No standalone frontend project should exist.
- Frontend code must live under resources/js.
- Protected API routes must use Authorization: Bearer <token>.
- Tests must pass.
- Frontend build must pass.
- Documentation must be in Spanish.

Apply only small safe fixes if needed.

Do not introduce new features.
Do not rewrite architecture.
Do not make large refactors.
Do not change API contracts unless fixing an obvious defect.

Create or update:

- docs/REVIEW_REPORT.md
- docs-site/docs/review/review-report.md

The review report must include:

1. Executive summary.
2. Strengths.
3. Findings by severity:
   - Critical
   - High
   - Medium
   - Low
4. Security review.
5. Backend review.
6. Frontend review.
7. Testing review.
8. Documentation review.
9. Fixes applied.
10. Recommendations.
11. Final approval status.

After review, run or verify:

- Backend tests.
- Frontend build.
- Docusaurus build if possible.

IMPORTANT:
All generated documentation must be written in Spanish.
Code, class names, methods, variables, routes and technical identifiers must remain in English.