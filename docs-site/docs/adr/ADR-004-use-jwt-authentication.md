---
title: ADR-004 - Usar JWT
sidebar_position: 4
---

# ADR-004 - Usar JWT para autenticación API

## Estado

Aceptada

## Contexto

El backend inicializado en `backend/` incluye scaffolding web con Laravel Breeze, Inertia.js, React y TypeScript. Sin embargo, la prueba técnica requiere explícitamente autenticación API con `JWT`.

## Decisión

Se usará `JWT` con `tymon/jwt-auth` como mecanismo principal de autenticación API. Los clientes deberán enviar el token con `Authorization: Bearer <token>`.

## Consecuencias

- Breeze/Inertia puede permanecer como scaffolding web, pero no define la autenticación principal de la API.
- No se debe usar Sanctum como estrategia principal de autenticación API.
- Los endpoints protegidos usarán el guard o middleware configurado para `tymon/jwt-auth`, por ejemplo `auth:api`.
- Las pruebas deben validar emisión, uso, expiración o invalidación de tokens JWT.
