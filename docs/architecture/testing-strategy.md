# Estrategia de pruebas

## Objetivo

Validar que las funcionalidades críticas de la prueba técnica funcionen de forma repetible en entorno local y Docker.

## Alcance de pruebas backend

### Feature tests

- Registro de usuario.
- Login exitoso con `JWT`.
- Login fallido.
- Acceso rechazado a endpoints protegidos sin token.
- Listado de noticias con al menos 5 elementos sembrados.
- Detalle de noticia existente.
- Respuesta `404` para noticia inexistente.
- Recomendaciones con al menos 3 noticias relacionadas.
- Listado de categorías.

### Unit tests

- Servicio o action de recomendaciones.
- Reglas de selección por categoría.
- Exclusión de la noticia actual.

## Alcance de pruebas frontend

Con React Testing Library:

- Render de página de listado.
- Render de detalle.
- Render de recomendaciones.
- Estados vacíos o de error cuando corresponda.

## Datos de prueba

- Usar factories para `User`, `Category` y `News`.
- Evitar depender de datos externos.
- Usar base de datos de testing aislada.

## Criterio mínimo de calidad

- Las pruebas críticas deben pasar antes de considerar completa una tarea.
- Los tests deben poder ejecutarse dentro del entorno Docker.
- La documentación QA debe registrar comandos ejecutados y resultado.

