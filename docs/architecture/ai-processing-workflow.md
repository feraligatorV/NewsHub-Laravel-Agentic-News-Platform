# Flujo de procesamiento IA

```mermaid
flowchart TD
    Start([Inicio]) --> ReceiveUrl["Recibir URL HTTP/HTTPS"]
    ReceiveUrl --> ValidateUrl{"URL valida?"}
    ValidateUrl -- No --> UrlError["Responder error controlado"]
    ValidateUrl -- Si --> ResolvePdf["Resolver PDF directo o enlace en pagina"]
    ResolvePdf --> DownloadPdf["Descargar documento legal"]
    DownloadPdf --> ExtractText["Extraer texto del PDF"]
    ExtractText --> TextEnough{"Texto suficiente?"}
    TextEnough -- No --> TextError["Responder que no se pudo extraer contenido util"]
    TextEnough -- Si --> BuildPrompt["Construir prompt legal estructurado"]
    BuildPrompt --> AIProvider["Enviar texto al proveedor IA"]
    AIProvider --> ParseResponse["Parsear respuesta del modelo"]
    ParseResponse --> ValidatePayload{"Payload suggested_news valido?"}
    ValidatePayload -- No --> PayloadError["Responder error de formato"]
    ValidatePayload -- Si --> Normalize["Normalizar titulo, resumen, cuerpo, metadata y tags"]
    Normalize --> Response["Devolver suggested_news a Laravel"]
    Response --> End([Fin])

    UrlError --> End
    TextError --> End
    PayloadError --> End
```

## Salida esperada

El agente debe devolver un payload estructurado con `suggested_news`, incluyendo titulo, resumen, cuerpo, metadata legal, puntos clave, texto extraido y tags sugeridos. Laravel decide si guarda el resultado y siempre lo conserva como borrador editorial.
