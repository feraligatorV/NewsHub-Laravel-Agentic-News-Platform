---
sidebar_position: 6
title: Reporte UX/UI
---

# Reporte UX/UI

## Objetivo de diseno

NewsHub fue redisenado como portal de noticias profesional con tono corporativo regional. La interfaz toma solo direccion visual general de portales institucionales: estructura clara, secciones organizadas, CTAs visibles, cards redondeadas y espacios de confianza o estadistica.

No se copiaron marcas, logotipos, textos, imagenes ni layouts propietarios.

## Paleta utilizada

| Uso | Color |
| --- | --- |
| Primary | `#0b4f8a` |
| Header y hero | `#062544` |
| Primary dark | `#073763` |
| Accent cyan | `#00a8cc` |
| Accent teal | `#0f8f7a` |
| Background | `#f3f6fa` |
| Surface | `#ffffff` |
| Text primary | `#102033` |
| Text secondary | `#5b6778` |

## Mejoras de layout

### Home

- Hero principal con CTA hacia noticias recientes y categorias.
- Bloque de estadisticas.
- Buscador destacado.
- Navegacion por categorias con `Chip`.
- Noticia destacada con `NewsCard featured`.
- Grid de ultimas noticias.
- Sidebar con publicidad y CTA de newsletter.

### News detail

- Boton de regreso.
- Cabecera editorial con categoria, titulo, fecha y fuente.
- Imagen principal.
- Sidebar con metadata.
- Espacios publicitarios horizontal y lateral.
- Noticias recomendadas al final.

### Categories

- Hero institucional.
- Filtro lateral por categoria.
- Cards de categoria con estado activo.
- Grid de noticias asociadas.
- Espacio publicitario lateral.

## Componentes creados o actualizados

| Componente | Ubicacion |
| --- | --- |
| `AdSlot` | `backend/resources/js/Components/Advertising/AdSlot.tsx` |
| `AppShell` | `backend/resources/js/Components/Layout/AppShell.tsx` |
| `NewsCard` | `backend/resources/js/Components/News/NewsCard.tsx` |
| `News/Index` | `backend/resources/js/Pages/News/Index.tsx` |
| `News/Show` | `backend/resources/js/Pages/News/Show.tsx` |
| `Categories/Index` | `backend/resources/js/Pages/Categories/Index.tsx` |
| `app.tsx` | `backend/resources/js/app.tsx` |

## Espacios publicitarios

Se agrego `AdSlot` como componente reutilizable con el texto `Espacio publicitario`.

Se usa en:

- Home hero.
- Home sidebar.
- News detail entre imagen y contenido.
- News detail sidebar.
- Categories sidebar.

## Responsive behavior

La experiencia usa layouts responsivos:

- Mobile: una columna.
- Tablet: grids de cards en dos columnas cuando hay espacio.
- Desktop: contenido principal con sidebar.
- Navbar con wrap para evitar scroll horizontal.
- Cards con alturas e imagenes controladas.

## Accesibilidad

- `AdSlot` usa `aria-label`.
- Imagenes de noticias usan `alt`.
- Botones tienen texto visible.
- Iconos son complementarios, no sustituyen instrucciones criticas.
- La jerarquia de titulos mantiene estructura semantica.
- La paleta usa contraste alto en header, hero y CTAs.

## Build result

Comando ejecutado:

```bash
npm run build
```

Resultado:

```text
tsc && vite build
built in 1.29s
```

El build fue exitoso. El aviso local de PowerShell sobre `Start-SshAgent` no afecto la compilacion.

## Pending risks

- No se validaron screenshots automatizados en distintos viewports.
- `AdSlot` es solo placeholder y no integra un proveedor de publicidad real.
- El CTA de newsletter no tiene endpoint backend.
- La autenticacion visible convive con JWT API y Breeze/Inertia web auth.
