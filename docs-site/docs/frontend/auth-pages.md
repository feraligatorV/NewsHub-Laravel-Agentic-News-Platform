---
sidebar_position: 5
title: Paginas de autenticacion
---

# Paginas de autenticacion

## Alcance

El frontend mantiene las paginas de autenticacion dentro de Laravel + React + TypeScript + Inertia.js. No existe una aplicacion React separada y no se usa React Router.

JWT con `tymon/jwt-auth` sigue siendo el mecanismo principal para la API. Las paginas Breeze/Inertia se usan como scaffolding web para registro, recuperacion de password y perfil.

## Register page

La ruta `/register` renderiza `backend/resources/js/Pages/Auth/Register.tsx`.

La pagina permite crear una cuenta web usando la ruta `register` existente en Laravel. Usa Material UI para campos, alertas y acciones. El registro API `POST /api/auth/register` sigue documentado como contrato para clientes API.

## Password recovery page

La ruta `/forgot-password` renderiza `backend/resources/js/Pages/Auth/ForgotPassword.tsx` y envia solicitudes a `route('password.email')`.

La ruta `/reset-password/{token}` renderiza `backend/resources/js/Pages/Auth/ResetPassword.tsx` y guarda el nuevo password con `route('password.store')`.

Estas paginas dependen de que Laravel tenga correo configurado para enviar enlaces reales de recuperacion.

## Profile edit page

La ruta `/profile` renderiza `backend/resources/js/Pages/Profile/Edit.tsx`.

Incluye:

- Edicion de `name` y `email`.
- Actualizacion de password.
- Eliminacion de cuenta, porque Breeze/Inertia ya soporta `profile.destroy`.

Las secciones usan Material UI y formularios Inertia.

## Navbar auth behavior

`backend/resources/js/Components/Layout/AppShell.tsx` muestra enlaces de autenticacion segun estado:

- Sin usuario web ni JWT: `Login` y `Register`.
- Con usuario web o JWT local: `Profile` y `Logout`.

El logout limpia el JWT local mediante `lib/auth.ts`, intenta llamar `POST /api/auth/logout` y tambien ejecuta el logout web de Laravel cuando corresponde.

## Build result

Validacion ejecutada:

```bash
npm run build
```

Resultado:

```text
tsc && vite build
built in 1.32s
```

El build termino correctamente. Se observo un aviso local de PowerShell relacionado con `Start-SshAgent`, sin impacto en TypeScript ni Vite.

Tambien se ejecuto el build de Docusaurus para validar esta pagina:

```text
docusaurus build
Generated static files in "build".
```

## Pending risks

- `localStorage` para JWT es suficiente para la prueba tecnica, pero no es la opcion mas robusta para produccion.
- La recuperacion de password requiere configuracion de correo en Laravel.
- La UI soporta sesion web y JWT, pero el producto podria simplificar la experiencia definiendo una sola fuente de autenticacion para usuarios finales.
