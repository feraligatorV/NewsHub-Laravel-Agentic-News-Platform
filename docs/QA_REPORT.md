# Reporte QA

## 1. Alcance probado

Se validó el estado de calidad del proyecto NewsHub después de la implementación backend y frontend.

El alcance cubrió:

- Autenticación JWT con `tymon/jwt-auth`.
- Protección de endpoints con `auth:api`.
- Uso de `Authorization: Bearer <token>` para endpoints protegidos.
- Registro de usuario.
- Login de usuario y emisión de token JWT.
- Rechazo de solicitudes no autenticadas a `/api/auth/me`.
- Acceso autenticado a `/api/auth/me`.
- Listado de noticias.
- Detalle de noticia.
- Noticias recomendadas.
- Categorías.
- Datos sembrados documentados.
- Build productivo del frontend con Vite.
- Build productivo de la documentación Docusaurus.
- Estructura documental de Docusaurus.

## 2. Comandos ejecutados

Desde `backend/`:

```bash
docker run --rm -v "${PWD}:/app" -w /app composer:2 php artisan test
```

```bash
npm run build
```

Desde `docs-site/`:

```bash
npm run build
```

## 3. Resultados de pruebas

### Backend

Resultado:

```text
Tests: 34 passed (140 assertions)
Duration: 21.88s
```

Suites relevantes ejecutadas:

- `Tests\Feature\Api\AuthApiTest`
- `Tests\Feature\Api\NewsApiTest`
- `Tests\Feature\Api\CategoryApiTest`
- Tests heredados de Breeze/Inertia para autenticación web y perfil.

Cobertura funcional validada por tests API:

| Caso | Estado |
| --- | --- |
| Registro de usuario | Aprobado |
| Login de usuario | Aprobado |
| Login devuelve token JWT | Aprobado |
| Ruta protegida rechaza solicitudes sin token | Aprobado |
| Usuario autenticado accede a `/api/auth/me` | Aprobado |
| Listado de noticias | Aprobado |
| Detalle de noticia | Aprobado |
| Noticias recomendadas | Aprobado |
| Categorías | Aprobado |

## 4. Validación backend

El backend cumple los requisitos principales de la prueba técnica:

- Laravel 13 y PHP 8.4 están documentados como stack vigente.
- `backend/composer.json` declara `tymon/jwt-auth`.
- `backend/config/auth.php` configura el guard `api` con driver `jwt`.
- `backend/routes/api.php` protege rutas privadas mediante `auth:api`.
- `GET /api/auth/me`, `POST /api/auth/refresh` y `POST /api/auth/logout` están protegidas.
- Las rutas públicas de noticias y categorías responden mediante controladores API.
- Los tests de feature validan registro, login, protección JWT y recursos de noticias/categorías.

## 5. Validación frontend build

Comando ejecutado desde `backend/`:

```bash
npm run build
```

Resultado:

```text
tsc && vite build
vite v8.0.16 building client environment for production...
1883 modules transformed.
built in 1.35s
```

Conclusión:

- TypeScript compiló correctamente.
- Vite generó assets productivos en `public/build`.
- El frontend permanece integrado dentro de Laravel bajo `backend/resources/js`.
- La navegación se mantiene con Inertia.js y no usa React Router.

## 6. Validación Docusaurus

Comando ejecutado desde `docs-site/`:

```bash
npm run build
```

Resultado:

```text
docusaurus build
[SUCCESS] Generated static files in "build".
```

Conclusión:

- El sitio de documentación compila correctamente.
- La estructura incluye documentación de backlog, arquitectura, ADRs, backend, frontend, API y QA.
- La sección `frontend` está disponible en la navegación.
- Se agregó la sección `testing` para el reporte QA.

## 7. Validación de autenticación JWT

La validación confirma:

- La autenticación API usa `JWT` con `tymon/jwt-auth`.
- El guard `api` usa driver `jwt`.
- Las rutas protegidas usan `auth:api`.
- El cliente debe enviar el token con `Authorization: Bearer <token>`.
- El endpoint `POST /api/auth/login` devuelve `access_token`, `token_type` y `expires_in`.
- El endpoint `GET /api/auth/me` rechaza solicitudes sin token con `401 Unauthorized`.
- El endpoint `GET /api/auth/me` acepta solicitudes autenticadas con bearer token válido.

Sanctum no se usa como estrategia principal de autenticación API. Si existieran archivos heredados por scaffolding Breeze/Inertia, se consideran parte del soporte web y no del mecanismo API principal.

## 8. Issues encontrados

No se encontraron fallos bloqueantes en la ejecución QA.

Observaciones no bloqueantes:

- PowerShell mostró advertencias del perfil local relacionadas con `Start-SshAgent`; no afectaron los comandos ejecutados ni los resultados.
- El almacenamiento de JWT en `localStorage` es aceptable para la prueba técnica, pero debe revisarse para producción por riesgo XSS.
- La documentación previa en consola puede mostrarse con caracteres corruptos por configuración de codificación del terminal, aunque los archivos generados se mantienen en Markdown.

## 9. Fixes aplicados

No se aplicaron fixes de backend, frontend ni lógica de negocio.

Cambios documentales aplicados:

- Creación de `docs/QA_REPORT.md`.
- Creación de `docs-site/docs/testing/qa-report.md`.
- Creación de `docs-site/docs/testing/_category_.json`.
- Actualización de `docs-site/sidebars.ts` para incluir la sección `testing`.

## 10. Riesgos pendientes

- No se ejecutaron pruebas automatizadas frontend con React Testing Library porque no se identificó una suite frontend específica en el alcance actual.
- `localStorage` para JWT requiere endurecimiento si el proyecto pasa a producción.
- La expiración y renovación de token pueden requerir mejoras de experiencia de usuario en frontend.
- Es necesario mantener `JWT_SECRET` configurado en ambientes reales.
- Las advertencias del perfil PowerShell local conviene corregirlas para reducir ruido en futuras ejecuciones.

## 11. Conclusión QA final

El proyecto queda en estado QA aprobado para la prueba técnica.

La suite backend pasó con `34 passed (140 assertions)`, el build productivo del frontend pasó con Vite y el build de Docusaurus generó correctamente el sitio estático.

La estrategia de autenticación cumple el requisito explícito de JWT con `tymon/jwt-auth` y bearer token. No se detectó uso de Sanctum como mecanismo principal de autenticación API.

## Referencias técnicas consultadas

- `jwt-auth` documenta el uso de `JWTSubject`, guard `jwt` y solicitudes autenticadas con `Authorization: Bearer <token>`: https://jwt-auth.readthedocs.io/en/develop/quick-start/
- Docusaurus documenta que `docusaurus build` compila el sitio para producción: https://docusaurus.io/docs/cli
