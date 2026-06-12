# AGENTS.md

## Project Context

This is a Laravel-based technical test for a News Web Application.

Although the original test mentions Angular and Spring Boot, this implementation will use Laravel with MySQL and Docker.

The goal is to deliver a simple requirement with a professional, scalable, agentic development approach.

## Main Requirements

- News listing page with at least 5 news.
- News detail page.
- Recommended news section with at least 3 related news.
- Categories section.
- JWT or Sanctum authentication.
- Protected API endpoints.
- Dockerized MySQL environment.
- Unit and feature tests.
- Technical documentation.
- API documentation.

# Technology Stack

Backend:
- Laravel 12
- PHP 8.4
- MySQL

Frontend:
- React + TypeScript
- Inertia.js
- Vite
- Material UI
- Integrated inside Laravel
- All frontend code must live under resources/js
- Do not create a standalone React application

Infrastructure:
- Docker
- Docker Compose
- Nginx

Documentation:
- Docusaurus
- Mermaid

Testing:
- PHPUnit
- Pest
- React Testing Library

## Coding Rules

- Use clean architecture principles where useful, but avoid overengineering.
- Prefer services/actions for business logic.
- Use Form Requests for validation.
- Use API Resources for JSON responses.
- Use migrations, factories and seeders.
- Write tests for authentication, news list, news detail and recommendations.
- Keep commits small and descriptive.

## Documentation Language

All generated documentation must be written in Spanish.

This includes:
- Backlog
- User stories
- Acceptance criteria
- Architecture documents
- ADRs
- QA reports
- Review reports
- DevOps reports
- Docusaurus documentation

Code, class names, methods, variables, routes, commits and technical identifiers must remain in English.

## Definition of Done

A task is complete only when:

- Code is implemented.
- Tests pass.
- Documentation is updated.
- Edge cases are considered.
- The solution can run with Docker.