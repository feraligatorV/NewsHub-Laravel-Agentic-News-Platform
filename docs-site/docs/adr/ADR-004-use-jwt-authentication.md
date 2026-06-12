---
title: ADR-004 - Usar JWT
sidebar_position: 4
---

# ADR-004 - Usar JWT para autenticación API

## Estado

Aceptada

## Contexto

El Architect Agent define autenticación con `JWT`. La aplicación necesita proteger endpoints API y demostrar control de acceso.

## Decisión

Se usará `JWT` para autenticación de endpoints API protegidos. Los clientes deberán enviar el token con `Authorization: Bearer <token>`.

## Consecuencias

- Los endpoints protegidos pueden consumirse sin depender de cookies de sesión.
- Se deben cubrir pruebas de login, token válido, token ausente y logout.
- Se requiere gestionar `JWT_SECRET` en variables de entorno.
- La estrategia debe mantenerse simple para no sobrepasar el alcance de la prueba.

