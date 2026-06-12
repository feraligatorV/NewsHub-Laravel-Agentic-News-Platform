---
title: Modelo de base de datos
sidebar_position: 3
---

# Modelo de base de datos

## Entidades principales

### users

Campos sugeridos: `id`, `name`, `email`, `password`, `created_at`, `updated_at`.

### categories

Campos sugeridos: `id`, `name`, `slug`, `description`, `created_at`, `updated_at`.

### news

Campos sugeridos: `id`, `category_id`, `title`, `slug`, `summary`, `content`, `image_url`, `source`, `published_at`, `created_at`, `updated_at`.

## Relaciones

- `Category` tiene muchas `News`.
- `News` pertenece a `Category`.
- `User` se autentica en API mediante `JWT`; no se requiere relación directa con `News` para el alcance mínimo.

## Índices recomendados

- `users.email` único.
- `categories.slug` único.
- `news.slug` único.
- `news.category_id` indexado.
- `news.published_at` indexado.

## Diagrama entidad-relación

```mermaid
erDiagram
    USERS {
        bigint id PK
        string name
        string email UK
        string password
        timestamp created_at
        timestamp updated_at
    }
    CATEGORIES {
        bigint id PK
        string name
        string slug UK
        text description
        timestamp created_at
        timestamp updated_at
    }
    NEWS {
        bigint id PK
        bigint category_id FK
        string title
        string slug UK
        text summary
        longtext content
        string image_url
        string source
        timestamp published_at
        timestamp created_at
        timestamp updated_at
    }
    CATEGORIES ||--o{ NEWS : contains
```
