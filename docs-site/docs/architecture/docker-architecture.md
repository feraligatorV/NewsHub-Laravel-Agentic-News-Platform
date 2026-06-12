---
title: Arquitectura Docker
sidebar_position: 6
---

# Arquitectura Docker

## Servicios

- `app`: contenedor PHP 8.3 con Laravel y PHP-FPM.
- `nginx`: servidor HTTP que expone la aplicación.
- `mysql`: base de datos MySQL.
- `node`: opcional para instalar dependencias y compilar assets con Vite.

## Flujo de ejecución

```mermaid
flowchart LR
    Browser[Navegador] --> Nginx[Nginx]
    Nginx --> App[Laravel PHP-FPM]
    App --> MySQL[(MySQL)]
    App --> Vite[Vite assets]
```

## Variables relevantes

- `APP_ENV`
- `APP_KEY`
- `APP_URL`
- `DB_CONNECTION`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`

## Consideraciones

- MySQL debe persistir datos en un volumen Docker.
- Nginx debe apuntar al directorio público de Laravel.
- Vite debe compilar assets desde el proyecto Laravel, no desde una app separada.

