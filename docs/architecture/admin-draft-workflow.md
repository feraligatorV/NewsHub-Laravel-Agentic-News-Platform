# Flujo de borradores Admin IA

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Administrador
    participant UI as React Admin UI
    participant Laravel as Laravel Admin Controllers
    participant Client as LegalAiClient
    participant Agent as legal-ai-agent
    participant DB as MySQL

    Admin->>UI: Abre /admin/ai-drafts
    UI->>Laravel: GET /admin/ai-drafts
    Laravel-->>UI: Formulario para URL legal
    Admin->>UI: Pega URL y solicita procesamiento
    UI->>Laravel: POST /admin/ai-drafts/process
    Laravel->>Laravel: Valida URL y permisos auth/admin
    Laravel->>Client: processUrl(pdf_url)
    Client->>Agent: POST /api/legal/process-url
    Agent-->>Client: suggested_news
    Client-->>Laravel: Payload normalizado
    Laravel-->>UI: Previsualizacion del borrador
    Admin->>UI: Revisa y confirma guardar
    UI->>Laravel: POST /admin/ai-drafts
    Laravel->>DB: Inserta news con status=draft y ai_generated=true
    Laravel->>DB: Crea o vincula tags sugeridos
    DB-->>Laravel: Borrador persistido
    Laravel-->>UI: Redireccion a edicion CMS
    Admin->>UI: Edita y publica manualmente
    UI->>Laravel: PATCH /admin/news/{news}
    Laravel->>DB: Actualiza status=published
```

## Reglas editoriales

- Solo usuarios con middleware `auth` y `admin` pueden usar el flujo.
- El resultado de IA nunca se publica automaticamente.
- Todo contenido generado por IA se guarda con `status = draft` y `ai_generated = true`.
- El administrador mantiene la responsabilidad de revisar, corregir y publicar.
