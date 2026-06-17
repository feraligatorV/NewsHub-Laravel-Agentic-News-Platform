# Diagrama C4 - Contenedores

```mermaid
flowchart LR
    visitor["Visitante<br/>Consulta noticias publicadas, categorias y recomendaciones"]
    authUser["Usuario autenticado<br/>Consume endpoints protegidos con JWT"]
    admin["Administrador<br/>Gestiona noticias, usuarios y borradores IA"]
    aiProvider["Proveedor IA<br/>Modelo externo para analisis y generacion de borradores"]
    pdfSource["Fuente legal oficial<br/>PDF o pagina publica con documento legal"]

    subgraph newshub["NewsHub"]
        nginx["Nginx<br/>Nginx 1.27<br/>Expone HTTP, sirve public/ y delega PHP a PHP-FPM"]
        app["Laravel Application<br/>Laravel 13 / PHP 8.4<br/>API REST, rutas web, Inertia, JWT, reglas editoriales y persistencia"]
        frontend["React UI<br/>React + TypeScript + Inertia.js + Material UI<br/>Interfaz publica y Admin CMS bajo resources/js"]
        mysql[("MySQL<br/>MySQL 8.4<br/>Usuarios, categorias, noticias, tags y campos de IA")]
        aiAgent["legal-ai-agent<br/>FastAPI / Python<br/>Procesa URLs de PDF legal y devuelve suggested_news"]
        docs["Docusaurus<br/>Documentacion tecnica, arquitectura, API y reportes"]
    end

    visitor -->|Lee portal publico por HTTP| nginx
    authUser -->|Consume API protegida con Bearer JWT| nginx
    admin -->|Administra contenido con sesion web| nginx
    nginx -->|Reenvia requests PHP por FastCGI| app
    app -->|Renderiza paginas Inertia y entrega assets Vite| frontend
    app -->|Lee y escribe datos por SQL| mysql
    app -->|Solicita procesamiento legal por HTTP interno| aiAgent
    aiAgent -->|Descarga o resuelve PDF por HTTPS| pdfSource
    aiAgent -->|Envia texto extraido para generar propuesta por HTTPS| aiProvider
    visitor -->|Consulta documentacion por HTTP opcional| docs
```

## Descripcion

La interfaz React no es una aplicacion desplegable independiente: vive dentro del proyecto Laravel en `resources/js` y se publica como assets de Vite. Se muestra como contenedor logico porque tiene componentes, pruebas y responsabilidades propias dentro de la experiencia web.
