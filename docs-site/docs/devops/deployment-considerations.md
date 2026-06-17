---
sidebar_position: 4
title: Consideraciones de despliegue
---

# Consideraciones de despliegue

La configuración Docker incluida está orientada a ejecución local profesional y evaluación técnica. Para producción se recomienda endurecerla.

## Secretos

- Generar `APP_KEY` por ambiente.
- Generar `JWT_SECRET` por ambiente.
- No reutilizar credenciales locales de MySQL.
- No versionar `.env` real.

## Laravel

Antes de servir producción:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

También se recomienda ejecutar:

```bash
php artisan migrate --force
```

## Nginx

- Terminar HTTPS con un proxy o balanceador externo.
- Revisar límites de carga según necesidades reales.
- Mantener `public/` como raíz web.

## Base de datos

- Usar backups programados.
- Separar credenciales por ambiente.
- Monitorear almacenamiento del volumen MySQL.

## JWT

- Definir TTL según política de seguridad.
- Revisar manejo de expiración en frontend.
- Rotar secretos si hay exposición.
