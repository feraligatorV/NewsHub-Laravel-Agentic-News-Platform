# Reporte DevOps

## Resumen

Se preparó la infraestructura DevOps de NewsHub para ejecución local con Docker, validación CI y entrega de la prueba técnica.

La solución mantiene Laravel 13, PHP 8.4, React + TypeScript integrado con Inertia.js dentro de `backend/resources/js`, MySQL y Docusaurus. No se creó una aplicación frontend independiente.

## Artefactos implementados

### Docker

- `docker-compose.yml`
- `backend/Dockerfile`
- `docker/nginx/default.conf`
- `.dockerignore`

Servicios definidos:

| Servicio | Imagen/base | Responsabilidad |
| --- | --- | --- |
| `app` | `php:8.4-fpm` | Ejecutar Laravel con PHP-FPM, Composer, Node, Vite y extensiones PHP requeridas. |
| `nginx` | `nginx:1.27-alpine` | Servir HTTP y delegar PHP a `app` por FastCGI. |
| `mysql` | `mysql:8.4` | Base de datos MySQL persistente. |

Extensiones PHP incluidas:

- `pdo_mysql` para conexión con MySQL.
- `pdo_sqlite` para pruebas con SQLite en memoria.
- `zip` para dependencias de Composer.

Volúmenes:

- `app_code`: comparte el código construido de Laravel entre `app` y `nginx`.
- `mysql_data`: persiste datos de MySQL.

## Variables de entorno

`backend/.env.example` fue actualizado con valores locales reproducibles:

| Variable | Valor local |
| --- | --- |
| `APP_NAME` | `NewsHub` |
| `APP_URL` | `http://localhost:8080` |
| `DB_CONNECTION` | `mysql` |
| `DB_HOST` | `mysql` |
| `DB_DATABASE` | `newshub` |
| `DB_USERNAME` | `newshub` |
| `DB_PASSWORD` | `newshub` |
| `JWT_SECRET` | `local-dev-jwt-secret-change-me-32bytes` |

El valor de `APP_KEY` incluido es solo para desarrollo local reproducible. Para producción debe generarse uno propio.

También se agregó `backend/.env.testing` para que `php artisan test` use `APP_ENV=testing`, SQLite en memoria, `SESSION_DRIVER=array`, `MAIL_MAILER=array` y un `JWT_SECRET` válido para `tymon/jwt-auth`.

## Ejecución local

Desde la raíz del repositorio:

```bash
docker compose up -d --build
```

Validar contenedores:

```bash
docker compose ps
```

Ejecutar migraciones y seeders:

```bash
docker compose exec app php artisan migrate --seed
```

Ejecutar pruebas:

```bash
docker compose exec app php artisan test
```

Compilar assets frontend:

```bash
docker compose exec app npm run build
```

La aplicación queda disponible en:

```text
http://localhost:8080
```

## CI/CD

Se agregó `.github/workflows/ci.yml`.

El pipeline ejecuta:

1. Checkout del repositorio.
2. Instalación de PHP 8.4.
3. Instalación de Node 22.
4. `composer install`.
5. `npm ci`.
6. Preparación de `.env`.
7. `php artisan migrate --force`.
8. `php artisan test`.
9. `npm run build`.
10. Build de Docusaurus desde `docs-site`.

La suite de tests usa `phpunit.xml` y `backend/.env.testing`, con SQLite en memoria para pruebas rápidas y aisladas. El servicio MySQL de CI queda disponible para validar compatibilidad de entorno y futuras pruebas de integración.

## Quality gates

Comandos cubiertos:

```bash
composer install
npm install
npm run build
php artisan migrate
php artisan test
```

En CI se usa `npm ci` por reproducibilidad. Localmente puede usarse `npm install` si se requiere regenerar dependencias.

## Validación local realizada

Validaciones ejecutadas en Docker:

| Comando | Resultado |
| --- | --- |
| `docker compose config` | Aprobado. |
| `docker compose --progress=plain build app` | Aprobado. |
| `docker compose up -d --build` | Aprobado. |
| `docker compose ps` | `app`, `nginx` y `mysql` activos; MySQL saludable. |
| `docker compose exec app php artisan migrate --seed` | Aprobado. |
| `docker compose exec app php artisan test` | Aprobado: `34 passed (140 assertions)`. |
| `docker compose exec app npm run build` | Aprobado. |
| `npm run build` en `docs-site` | Aprobado. |

Notas de validación:

- Se detectó que `tymon/jwt-auth` requiere un `JWT_SECRET` de al menos 256 bits; se actualizó el secreto local documentado.
- Se agregó `pdo_sqlite` al contenedor para soportar SQLite en memoria durante tests.
- `npm ci` reporta 2 vulnerabilidades críticas en dependencias existentes del frontend; no se corrigieron en esta tarea porque implicaría cambios de dependencias fuera del alcance DevOps solicitado.
- PowerShell muestra un error local de perfil por `Start-SshAgent`; no afecta Docker ni la ejecución del proyecto.

## Consideraciones de despliegue

- Cambiar `APP_KEY` y `JWT_SECRET` en ambientes reales.
- Usar credenciales MySQL por entorno y no las de desarrollo.
- Desactivar `APP_DEBUG` en producción.
- Ejecutar `php artisan config:cache`, `route:cache` y `view:cache` en una imagen o release de producción.
- Considerar HTTPS delante de Nginx en producción.
- Rotar secretos si fueron compartidos fuera del entorno local.

## Referencias

- Docker Compose: https://docs.docker.com/compose/
- GitHub Actions para PHP: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-php
- Laravel deployment: https://laravel.com/docs/deployment
