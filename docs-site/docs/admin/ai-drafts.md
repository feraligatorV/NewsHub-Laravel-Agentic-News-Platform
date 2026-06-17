---
sidebar_position: 4
title: Borradores IA
---

# Borradores IA

## Proposito

La pagina `/admin/ai-drafts` permite generar borradores legales con apoyo de IA a partir de URLs HTTP/HTTPS directas a PDF o paginas que enlacen un PDF.

## Funciones

- Captura de URL de PDF legal.
- Envio al microservicio `legal-ai-agent`.
- Previsualizacion del resultado.
- Revision de resumen, puntos clave, metadata legal y texto extraido.
- Guardado como noticia `draft`.
- Enlace directo para editar el borrador generado.

## Campos guardados

Al guardar un borrador se persisten:

- `title`
- `slug`
- `summary`
- `body`
- `source_url`
- `status = draft`
- `legal_document_type`
- `decree_number`
- `institution`
- `affected_law`
- `effective_date`
- `ai_generated = true`
- `ai_summary`
- `ai_key_points`
- `original_pdf_url`
- `extracted_text`
- tags sugeridos

## Reglas editoriales

El sistema no publica automaticamente. El administrador debe revisar el borrador, editarlo si hace falta y publicarlo manualmente desde el CMS de noticias.

## Seguridad

La pagina usa los middleware `auth` y `admin`. Usuarios no administradores no pueden acceder.

## Errores comunes

- Servicio AI no disponible.
- URL invalida o no accesible.
- Credenciales IA no configuradas en `legal-ai-agent`.
- Payload devuelto por el agente no tiene `suggested_news`.

## Validacion

```text
Backend tests: 56 passed (220 assertions)
Frontend build: exitoso
Docusaurus build: exitoso
```
