---
title: C4 Contexto
sidebar_position: 8
---

# Diagrama C4 - Contexto

```mermaid
C4Context
    title Contexto de NewsHub
    Person(visitor, "Visitante", "Lee noticias y explora categorías")
    Person(user, "Usuario autenticado", "Consume endpoints protegidos")
    Person(evaluator, "Evaluador técnico", "Revisa arquitectura, pruebas y documentación")
    System(newshub, "NewsHub", "Aplicación web de noticias con Laravel, React e Inertia.js")
    System_Ext(browser, "Navegador", "Cliente web")
    Rel(visitor, browser, "Usa")
    Rel(user, browser, "Usa")
    Rel(evaluator, newshub, "Evalúa")
    Rel(browser, newshub, "Accede por HTTP/HTTPS")
```

NewsHub concentra backend, frontend integrado y API en una sola aplicación Laravel. Los endpoints privados requieren autenticación con `JWT`.
