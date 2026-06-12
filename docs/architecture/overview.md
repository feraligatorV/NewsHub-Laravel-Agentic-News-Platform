# Arquitectura general

## Propósito

NewsHub es una aplicación web de noticias implementada con Laravel 12, PHP 8.3, MySQL, React, TypeScript, Inertia.js, Vite y Material UI. La solución debe ser simple, profesional y adecuada para una prueba técnica, evitando un frontend standalone y manteniendo todo el código de interfaz bajo `resources/js`.

## Principios

- Mantener una arquitectura monolítica Laravel con frontend integrado.
- Separar responsabilidades sin sobreingeniería.
- Usar services o actions para lógica de negocio relevante.
- Usar Form Requests para validación de entrada.
- Usar API Resources para respuestas JSON.
- Proteger endpoints privados con `JWT`.
- Ejecutar el sistema con Docker, Docker Compose, MySQL y Nginx.
- Documentar decisiones y operación en español.

## Componentes principales

- `Laravel App`: contiene rutas web, rutas API, controllers, models, services, resources, requests, migrations, factories, seeders y pruebas.
- `React + TypeScript`: interfaz renderizada mediante Inertia.js dentro del proyecto Laravel.
- `Vite`: compila assets frontend desde `resources/js`.
- `MySQL`: almacena usuarios, categorías, noticias y relaciones.
- `Nginx`: expone la aplicación HTTP y reenvía solicitudes a PHP-FPM.
- `Docusaurus`: contiene la documentación técnica y de producto.

## Flujo de alto nivel

1. El usuario accede a una ruta web servida por Laravel.
2. Laravel resuelve datos mediante controllers, models, services y API Resources cuando corresponda.
3. Inertia.js entrega la página React adecuada ubicada en `resources/js/Pages`.
4. React renderiza la experiencia usando componentes compartidos de `resources/js/Components`.
5. Las APIs protegidas validan el token `JWT` antes de responder.

