# Arquitectura Docker final

## Estado revisado

El repositorio aún no contiene `Dockerfile` ni `docker-compose.yml`. Esta arquitectura define el objetivo final requerido para que la solución pueda ejecutarse con Docker.

## Servicios finales

| Servicio | Responsabilidad | Puerto sugerido |
| --- | --- | --- |
| `nginx` | Servir HTTP y reenviar PHP a `app` | `8080:80` |
| `app` | Ejecutar Laravel con PHP-FPM 8.3 | Interno |
| `mysql` | Persistir datos de la aplicación | `3306:3306` opcional |
| `node` | Instalar dependencias y compilar assets con Vite | Uso temporal |
| `docs` | Ejecutar Docusaurus en desarrollo | `3000:3000` opcional |

## Diagrama final

```mermaid
flowchart TD
    Browser[Navegador] -->|HTTP :8080| Nginx[Nginx container]

    subgraph Compose[Docker Compose]
        Nginx -->|FastCGI| App[app: PHP 8.4 FPM + Laravel 13]
        App -->|SQL| MySQL[(mysql: MySQL)]
        Node[node: Vite build] -->|assets en public/build| App
        Docs[docs: Docusaurus] -->|lee docs-site| DocsVolume[(docs-site)]
    end

    Browser -->|HTTP :3000 opcional| Docs
```

## Volúmenes

- Código Laravel: montar `backend/` en `app`.
- Datos MySQL: volumen persistente `mysql_data`.
- Documentación: montar `docs-site/` en `docs` cuando se ejecute Docusaurus.

## Variables mínimas

```text
APP_ENV=local
APP_URL=http://localhost:8080
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=newshub
DB_USERNAME=newshub
DB_PASSWORD=secret
SESSION_DRIVER=database
QUEUE_CONNECTION=database
JWT_SECRET=generated-jwt-secret
```

## Flujo operativo final

1. Crear contenedores con `docker compose up -d`.
2. Instalar dependencias PHP en `app`.
3. Instalar dependencias Node y compilar assets con `node`.
4. Ejecutar migrations y seeders.
5. Acceder a la aplicación por Nginx.
6. Ejecutar pruebas dentro del contenedor `app`.

## Decisiones

- Nginx será el único punto de entrada HTTP para Laravel.
- MySQL será obligatorio para desarrollo y evaluación.
- Vite no se ejecutará como frontend standalone; solo compilará assets del proyecto Laravel.
- Docusaurus puede ejecutarse como servicio separado porque es documentación, no frontend de producto.
