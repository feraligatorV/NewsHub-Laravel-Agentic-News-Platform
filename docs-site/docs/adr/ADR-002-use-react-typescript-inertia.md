---
title: ADR-002 - Usar React TypeScript e Inertia
sidebar_position: 2
---

# ADR-002 - Usar React, TypeScript e Inertia.js

## Estado

Aceptada

## Contexto

El proyecto requiere React + TypeScript integrado dentro de Laravel, sin crear una aplicación frontend standalone. También se requiere Vite y Material UI.

## Decisión

Se usará React + TypeScript con Inertia.js y Vite dentro del proyecto Laravel. Las páginas vivirán en `resources/js/Pages`, los componentes compartidos en `resources/js/Components` y los tipos en `resources/js/types` o `resources/js/Types`.

## Consecuencias

- No se usará React Router salvo necesidad explícita.
- No se usará Axios para navegación interna de Inertia.
- La interfaz se beneficia de componentes tipados y build moderno con Vite.
- El despliegue se mantiene como una aplicación Laravel integrada.

