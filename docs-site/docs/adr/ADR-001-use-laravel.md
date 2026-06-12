---
title: ADR-001 - Usar Laravel
sidebar_position: 1
---

# ADR-001 - Usar Laravel 13 como framework backend

## Estado

Aceptada

## Contexto

La prueba técnica requiere una aplicación de noticias con autenticación, API protegida, MySQL, pruebas y ejecución con Docker. Aunque el enunciado original menciona otras tecnologías, el proyecto se implementará con Laravel 13 y PHP 8.4.

## Decisión

Se usará Laravel 13 como framework principal del backend y como contenedor de la experiencia web integrada con Inertia.js.

## Consecuencias

- Se aprovechan routing, Eloquent, migrations, factories, seeders, Form Requests, API Resources y testing de Laravel.
- La aplicación puede mantener backend y frontend en un solo proyecto.
- El equipo debe respetar convenciones Laravel para evitar complejidad innecesaria.

