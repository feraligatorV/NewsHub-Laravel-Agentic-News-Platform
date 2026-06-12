# Diagrama de despliegue

```mermaid
flowchart TB
    subgraph Host[Equipo local o servidor de evaluación]
        subgraph Docker[Docker Compose]
            Nginx[Nginx container]
            App[PHP-FPM Laravel container]
            MySQL[(MySQL container)]
            Node[Node/Vite build container opcional]
        end

        Docs[Docusaurus docs-site]
    end

    Browser[Navegador] -->|HTTP| Nginx
    Nginx -->|FastCGI| App
    App -->|SQL| MySQL
    Node -->|Build assets| App
    Browser -->|HTTP opcional| Docs
```

## Notas

- Docker Compose orquesta los servicios principales.
- MySQL usa volumen persistente.
- Nginx sirve `public/` y delega PHP a `app`.
- Los assets se compilan con Vite dentro del proyecto Laravel.
- Docusaurus puede ejecutarse desde `docs-site` para consultar documentación.

