# API

## `GET /api/health`

Devuelve estado basico del servicio.

```json
{
  "status": "ok",
  "service": "legal-ai-agent"
}
```

## `POST /api/legal/process-url`

Procesa una URL HTTP/HTTPS directa a PDF o una pagina HTML que enlace un PDF.

Entrada:

```json
{
  "pdf_url": "https://example.com/legal.pdf"
}
```

Salida resumida:

```json
{
  "source_url": "https://example.com/legal.pdf",
  "document_title": "...",
  "institution": "...",
  "legal_document_type": "...",
  "executive_summary": "...",
  "key_points": [],
  "full_explanation": "...",
  "disclaimer": "Contenido generado por IA. Requiere revisión humana legal antes de publicación.",
  "suggested_news": {
    "title": "...",
    "slug": "...",
    "summary": "...",
    "body": "...",
    "tags": [],
    "status": "draft",
    "ai_generated": true,
    "ai_summary": "...",
    "ai_key_points": [],
    "original_pdf_url": "...",
    "extracted_text": "..."
  }
}
```

## `POST /api/legal/process-pdf`

Recibe un archivo PDF por `multipart/form-data` con el campo `file`.

## `POST /api/legal/summarize`

Resume texto legal ya extraido.

```json
{
  "text": "contenido legal..."
}
```

## `POST /api/legal/create-draft`

Crea un borrador compatible con NewsHub desde texto y metadata ya preparada. No requiere credenciales IA.

```json
{
  "text": "contenido legal...",
  "metadata": {
    "document_title": "Decreto de prueba",
    "institution": "Congreso",
    "legal_document_type": "decreto"
  }
}
```
