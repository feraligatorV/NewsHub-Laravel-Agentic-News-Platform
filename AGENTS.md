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

## Tech Stack

- Laravel
- PHP 8.3+
- MySQL
- Docker / Docker Compose
- Nginx
- PHPUnit or Pest
- Swagger/OpenAPI

## Coding Rules

- Use clean architecture principles where useful, but avoid overengineering.
- Prefer services/actions for business logic.
- Use Form Requests for validation.
- Use API Resources for JSON responses.
- Use migrations, factories and seeders.
- Write tests for authentication, news list, news detail and recommendations.
- Keep commits small and descriptive.

## Definition of Done

A task is complete only when:

- Code is implemented.
- Tests pass.
- Documentation is updated.
- Edge cases are considered.
- The solution can run with Docker.