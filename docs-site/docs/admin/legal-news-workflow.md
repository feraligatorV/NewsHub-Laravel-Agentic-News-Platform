---
sidebar_position: 2
title: Flujo de noticias legales
---

# Flujo de noticias legales

## Flujo editorial

```mermaid
flowchart TD
    Draft[Borrador] --> Review[Revision admin]
    Review --> Metadata[Categoria, tags y metadata legal]
    Metadata --> Publish[Publicacion]
    Publish --> Public[Portal publico y API]
    Publish --> Archive[Archivado opcional]
```

## Creacion manual

1. Admin ingresa a `/admin/news/create`.
2. Completa titulo, slug, resumen y cuerpo.
3. Asigna categoria y tags.
4. Completa campos legales si aplican.
5. Guarda como `draft` o `published`.

## Publicacion

Solo las noticias `published` aparecen en:

- `GET /api/news`
- `GET /api/news/{slug}`
- `GET /api/news/{slug}/recommended`
- `GET /api/categories/{slug}/news`

Los borradores y archivados quedan disponibles para revision dentro del CMS.

## Revision de borradores IA

Cuando `ai_generated` es verdadero, la noticia se crea como `draft`. El administrador debe revisar:

- PDF oficial de origen.
- Texto extraido.
- Resumen IA.
- Puntos clave IA.
- Categoria, tags y metadata legal.

Despues de la revision, puede publicar manualmente.
