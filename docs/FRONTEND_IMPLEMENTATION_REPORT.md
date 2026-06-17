# Reporte de implementacion frontend

## Resumen

El frontend de NewsHub esta integrado dentro de la aplicacion Laravel con React, TypeScript, Inertia.js, Vite y Material UI. No se creo una aplicacion frontend independiente y todo el codigo de interfaz vive bajo `backend/resources/js`.

La navegacion de paginas usa rutas web de Laravel e Inertia.js. No se usa React Router.

La autenticacion principal de API sigue siendo JWT con `tymon/jwt-auth`; las llamadas protegidas usan `Authorization: Bearer <token>`. Las paginas Breeze/Inertia existen como scaffolding web y experiencia de usuario, pero no reemplazan JWT ni introducen Sanctum como estrategia principal.

## Paginas creadas o actualizadas

| Ruta web | Pagina Inertia | Proposito |
| --- | --- | --- |
| `/` | `backend/resources/js/Pages/News/Index.tsx` | Lista principal de noticias, categorias y estados de carga/error. |
| `/news/{news}` | `backend/resources/js/Pages/News/Show.tsx` | Detalle de una noticia y noticias recomendadas. |
| `/categories` | `backend/resources/js/Pages/Categories/Index.tsx` | Exploracion de categorias y noticias asociadas. |
| `/login` | `backend/resources/js/Pages/Auth/Login.tsx` | Inicio de sesion contra la API JWT y persistencia local del token. |
| `/register` | `backend/resources/js/Pages/Auth/Register.tsx` | Registro de usuario web mediante scaffolding Breeze/Inertia. |
| `/forgot-password` | `backend/resources/js/Pages/Auth/ForgotPassword.tsx` | Solicitud de enlace para recuperacion de password. |
| `/reset-password/{token}` | `backend/resources/js/Pages/Auth/ResetPassword.tsx` | Definicion de nuevo password cuando Laravel entrega un token valido. |
| `/profile` | `backend/resources/js/Pages/Profile/Edit.tsx` | Edicion de perfil, actualizacion de password y eliminacion de cuenta. |

## Pagina Register

`Register.tsx` fue actualizada con Material UI y `useForm` de Inertia. La pagina usa la ruta web `register` provista por Breeze/Inertia para crear una cuenta de usuario web.

Esta pagina no modifica el contrato JWT de la API. El endpoint publico `POST /api/auth/register` sigue disponible para clientes API, mientras que la pagina web usa el scaffolding existente de Laravel para la experiencia visible de registro.

## Recuperacion de password

`ForgotPassword.tsx` usa `route('password.email')` para solicitar el correo de recuperacion. `ResetPassword.tsx` usa `route('password.store')` para guardar el nuevo password cuando existe un token valido.

Estas pantallas se implementaron porque el backend ya incluye los controladores y rutas Breeze correspondientes: `PasswordResetLinkController` y `NewPasswordController`.

## Perfil

`Profile/Edit.tsx` ahora usa `AppShell` y Material UI. Incluye tres secciones:

- `UpdateProfileInformationForm`: edicion de `name` y `email`.
- `UpdatePasswordForm`: actualizacion de password desde `route('password.update')`.
- `DeleteUserForm`: eliminacion de cuenta desde `route('profile.destroy')`.

La seccion de eliminacion se mantiene porque Breeze/Inertia ya la soportaba en backend mediante `ProfileController::destroy`.

## Navbar auth behavior

`AppShell` fue actualizado para mostrar enlaces segun estado de autenticacion:

- Sin sesion web ni token JWT: muestra `Login` y `Register`.
- Con usuario web de Inertia o token JWT en `localStorage`: muestra `Profile` y `Logout`.
- `Logout` intenta invalidar el JWT via `POST /api/auth/logout`, limpia `localStorage` y tambien dispara el logout web de Laravel cuando aplica.

Este comportamiento permite convivir con el login JWT usado por la API y con las paginas web de Breeze/Inertia.

## Componentes y tecnologia visual

Las paginas nuevas y actualizadas usan Material UI para formularios, botones, alertas, dialogos y layout. Los iconos se toman de `@mui/icons-material`.

No se agrego React Router. La navegacion sigue usando `Link`, `router` y `useForm` de `@inertiajs/react`.

## Resultado de build

Comando ejecutado:

```bash
npm run build
```

Resultado:

```text
tsc && vite build
built in 1.32s
```

El build finalizo correctamente. La salida tambien mostro un aviso del perfil local de PowerShell sobre `Start-SshAgent`, pero no bloqueo TypeScript ni Vite.

Tambien se valido la documentacion Docusaurus desde `docs-site`:

```bash
npm run build
```

Resultado:

```text
docusaurus build
Generated static files in "build".
```

## Riesgos pendientes

- El login principal de la API sigue guardando el JWT en `localStorage`; para produccion requiere endurecimiento ante XSS, expiracion y renovacion.
- Las paginas web de registro, recuperacion y perfil dependen del scaffolding Breeze/Inertia y de la configuracion de correo de Laravel.
- La convivencia entre sesion web e inicio de sesion JWT esta resuelta a nivel de UI, pero podria requerir una decision de producto si se desea una sola fuente de verdad para usuarios finales.
- No se ejecutaron pruebas E2E de flujos de correo para `forgot-password` y `reset-password`.
