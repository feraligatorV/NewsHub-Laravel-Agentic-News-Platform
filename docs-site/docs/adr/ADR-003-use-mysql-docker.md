---
title: ADR-003 - Usar MySQL con Docker
sidebar_position: 3
---

# ADR-003 - Usar MySQL con Docker

## Estado

Aceptada

## Contexto

La aplicación necesita persistencia relacional para usuarios, categorías y noticias. También debe poder ejecutarse de forma reproducible con Docker.

## Decisión

Se usará MySQL como base de datos y Docker Compose para orquestar servicios como `app`, `nginx` y `mysql`.

## Consecuencias

- El entorno local será más consistente para evaluación.
- Los datos pueden persistirse mediante volúmenes Docker.
- Las migrations y seeders serán la fuente principal para preparar la base de datos.
- La configuración debe documentar variables como `DB_HOST`, `DB_DATABASE`, `DB_USERNAME` y `DB_PASSWORD`.

