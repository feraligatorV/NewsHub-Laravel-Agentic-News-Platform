---
title: ADR-005 - Usar Docusaurus
sidebar_position: 5
---

# ADR-005 - Usar Docusaurus para documentación

## Estado

Aceptada

## Contexto

El proyecto requiere documentación técnica, de producto, API, QA y DevOps en español. También se solicita Docusaurus como herramienta documental.

## Decisión

Se usará Docusaurus bajo `docs-site` para publicar documentación navegable. La documentación fuente adicional se mantendrá bajo `docs`.

## Consecuencias

- La documentación queda organizada por secciones como backlog, arquitectura y ADRs.
- El sidebar puede autogenerarse desde `docs-site/docs`.
- El equipo debe mantener sincronizadas las decisiones relevantes entre implementación y documentación.

