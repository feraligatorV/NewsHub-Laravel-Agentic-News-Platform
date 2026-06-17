# Diagrama de despliegue

```mermaid
flowchart TD
    subgraph Client["Cliente"]
        Browser["Navegador web"]
    end

    subgraph Host["Host local o servidor de evaluacion"]
        subgraph Compose["Docker Compose"]
            Nginx["newshub-nginx<br/>nginx:1.27-alpine<br/>Puerto host 8080 -> 80"]
            App["newshub-app<br/>Laravel 13 / PHP-FPM<br/>Codigo en /var/www/html"]
            MySQL[("newshub-mysql<br/>mysql:8.4<br/>Puerto host 33066 -> 3306")]
            Agent["newshub-legal-ai-agent<br/>FastAPI<br/>Puerto host 8000 -> 8000"]
        end

        Docs["docs-site<br/>Docusaurus<br/>Build estatico o servidor local"]
        AppVolume[("app_code<br/>Volumen Docker")]
        DbVolume[("mysql_data<br/>Volumen Docker")]
        NginxConf["docker/nginx/default.conf"]
    end

    ExternalAI["Proveedor IA externo"]
    LegalSource["Fuente legal oficial<br/>PDF o pagina publica"]

    Browser -->|HTTP :8080| Nginx
    Browser -.->|HTTP opcional| Docs
    Nginx -->|FastCGI| App
    Nginx -.->|Lee configuracion| NginxConf
    Nginx -->|Sirve public/| AppVolume
    App -->|Lee codigo Laravel| AppVolume
    App -->|SQL interno| MySQL
    MySQL -->|Persistencia| DbVolume
    App -->|POST /api/legal/process-url| Agent
    Agent -->|HTTPS| LegalSource
    Agent -->|HTTPS| ExternalAI
```

## Notas

- `docker-compose.yml` orquesta `app`, `nginx`, `mysql` y `legal-ai-agent` dentro de la red bridge `newshub`.
- MySQL persiste datos en `mysql_data`.
- Nginx expone la aplicacion en el puerto `8080` del host y delega ejecucion PHP al contenedor `app`.
- El agente de IA se expone en el puerto `8000` para pruebas locales, pero Laravel lo consume internamente como servicio Docker.
- Docusaurus se mantiene separado en `docs-site` y puede publicarse como build estatico.
