---
sidebar_position: 1
title: Admin CMS
---

# Admin CMS

## Proposito

El Admin CMS permite administrar noticias legales dentro de NewsHub. Los usuarios publicos siguen usando el portal de lectura, mientras que los administradores gestionan contenido desde `/admin`.

## Roles y acceso

Se agrego el campo `is_admin` a `users`.

| Rol | Acceso |
| --- | --- |
| Usuario normal | Portal publico, perfil y autenticacion web. |
| Admin | Portal publico y seccion `/admin`. |

Las rutas admin estan protegidas con `auth` y `admin`. El middleware `EnsureUserIsAdmin` bloquea usuarios sin permisos.

## Funciones del CMS

- Dashboard administrativo.
- Listado de noticias.
- Creacion de noticias.
- Edicion de noticias.
- Eliminacion de noticias.
- Publicacion y despublicacion.
- Asignacion de categoria.
- Asignacion de tags.
- Revision de campos generados por IA.
- Gestion de usuarios registrados.
- Asignacion y revocacion de rol admin.

## Campos legales

El CMS soporta `legal_document_type`, `decree_number`, `institution`, `affected_law`, `effective_date`, `source_url` y `publication_date`.

Tambien se agregaron campos preparados para IA: `ai_generated`, `ai_summary`, `ai_key_points`, `original_pdf_url` y `extracted_text`.

## Estados

- `draft`: no visible publicamente.
- `published`: visible en API y portal publico.
- `archived`: retirado de listados publicos.

La API publica solo devuelve noticias `published`.

## Tags

Las noticias pueden asociarse a multiples tags mediante `news_tag`. Los tags legales iniciales incluyen `ley`, `reforma`, `decreto`, `acuerdo`, `reglamento`, `congreso`, `municipalidad`, `tribunal` y `ministerio`.

## Gestion de usuarios

La ruta `/admin/users` permite listar usuarios registrados y controlar el campo `is_admin`.

Reglas aplicadas:

- Solo usuarios admin pueden acceder.
- Se puede otorgar admin a un usuario normal.
- Se puede revocar admin si queda al menos otro administrador activo.
- No se permite revocar el ultimo administrador.
- No se permite que un administrador elimine su propia cuenta desde el CMS.
- No se permite eliminar el ultimo administrador.

La gestion se concentra en `App\Http\Controllers\Admin\UserController` y conserva el middleware `auth` + `admin`.

## Resultados

```text
Tests: 49 passed (191 assertions)
Frontend build: tsc && vite build, built in 8.54s
```
