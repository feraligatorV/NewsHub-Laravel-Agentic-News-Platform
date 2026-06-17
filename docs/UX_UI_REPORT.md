# Reporte UX/UI

## 1. Objetivo de diseno

El objetivo fue elevar la experiencia visual de NewsHub hacia un portal de noticias profesional, corporativo y regional. La direccion visual toma inspiracion general de sitios institucionales de tono empresarial, sin copiar marca, textos, activos, logotipos ni estructura propietaria.

La propuesta prioriza:

- Jerarquia clara para noticias destacadas y noticias recientes.
- Navegacion simple para categorias y autenticacion.
- Lectura comoda en detalle de noticia.
- Espacios publicitarios visibles sin afectar la legibilidad.
- Uso consistente de Material UI dentro de Laravel + Inertia.js.

## 2. Paleta de color utilizada

| Uso | Color |
| --- | --- |
| Azul institucional principal | `#0b4f8a` |
| Azul profundo para header y hero | `#062544` |
| Azul oscuro secundario | `#073763` |
| Cian de acento | `#00a8cc` |
| Teal de apoyo | `#0f8f7a` |
| Fondo general | `#f3f6fa` |
| Superficies | `#ffffff` |
| Texto principal | `#102033` |
| Texto secundario | `#5b6778` |

La paleta mantiene contraste alto, tono empresarial y superficies limpias para favorecer lectura y escaneo rapido.

## 3. Mejoras de layout

### Home news page

Se agrego una seccion hero con tono corporativo, CTAs hacia noticias recientes y categorias, bloque de estadisticas y un espacio publicitario integrado. Debajo se reorganizo la experiencia en:

- Buscador destacado.
- Navegacion por categorias con `Chip`.
- Area de noticia destacada.
- Grid de noticias recientes.
- Sidebar con `AdSlot` y CTA de newsletter.

### News detail page

El detalle ahora usa un layout de lectura con:

- Boton de regreso.
- Cabecera de articulo con categoria, titulo, fecha y fuente.
- Imagen principal.
- Metadata del articulo en sidebar.
- Espacio publicitario horizontal entre imagen y contenido.
- Espacio publicitario lateral.
- Seccion de noticias recomendadas.

### Categories page

La pagina de categorias ahora presenta:

- Hero institucional.
- Filtro lateral de categorias con cards.
- Estado visual para categoria seleccionada.
- Grid de noticias por categoria.
- Espacio publicitario lateral.

## 4. Componentes creados o actualizados

| Componente | Ubicacion | Cambio |
| --- | --- | --- |
| `AdSlot` | `backend/resources/js/Components/Advertising/AdSlot.tsx` | Nuevo placeholder reutilizable para espacios publicitarios. |
| `AppShell` | `backend/resources/js/Components/Layout/AppShell.tsx` | Header corporativo, links de auth por estado y footer estructurado. |
| `NewsCard` | `backend/resources/js/Components/News/NewsCard.tsx` | Variante `featured` para noticia principal y mejoras visuales de cards. |
| `News/Index` | `backend/resources/js/Pages/News/Index.tsx` | Hero, featured news, latest grid, categorias, ads y newsletter CTA. |
| `News/Show` | `backend/resources/js/Pages/News/Show.tsx` | Layout editorial, metadata, back navigation, ads y recomendaciones. |
| `Categories/Index` | `backend/resources/js/Pages/Categories/Index.tsx` | Hero, filtro por categoria, cards y ads. |
| `app.tsx` | `backend/resources/js/app.tsx` | Tema Material UI actualizado con paleta corporativa y radios consistentes. |

## 5. Espacios publicitarios agregados

Se creo `AdSlot` con etiqueta accesible y texto visible `Espacio publicitario`.

Ubicaciones:

- Hero/sidebar de Home.
- Sidebar de Home.
- Entre imagen y contenido en News detail.
- Sidebar de News detail.
- Sidebar de Categories.

Los espacios usan borde punteado, color suave y altura estable para reservar layout sin desplazar contenido de forma inesperada.

## 6. Comportamiento responsive

La interfaz usa grids responsivos de Material UI:

- En mobile, las columnas se apilan en una sola columna.
- En desktop, Home y News detail usan contenido principal + sidebar.
- Los botones del navbar permiten wrap en pantallas pequenas.
- Los cards mantienen ancho completo en mobile y grid en tablet/desktop.
- No se agrego scroll horizontal intencional.

## 7. Consideraciones de accesibilidad

- `AdSlot` incluye `aria-label`.
- Las imagenes de noticias usan `alt` con el titulo de la noticia.
- Los botones usan texto visible e iconos complementarios.
- La jerarquia de headings usa `h1`, `h2` y variantes MUI de forma consistente.
- El contraste entre azul profundo, blanco y cian se mantiene alto para lectura.

## 8. Resultado de build

Comando ejecutado en `backend`:

```bash
npm run build
```

Resultado:

```text
tsc && vite build
built in 1.29s
```

El build finalizo correctamente. La salida tambien mostro un aviso externo del perfil local de PowerShell sobre `Start-SshAgent`, pero no afecto TypeScript ni Vite.

## 9. Riesgos pendientes

- No se ejecuto validacion visual automatizada con screenshots en desktop/mobile.
- Los espacios publicitarios son placeholders; la integracion real con un proveedor de ads queda pendiente.
- El CTA de newsletter es visual y no envia datos a un backend.
- La experiencia de login convive con JWT API y sesion web Breeze/Inertia; si el producto crece conviene definir una fuente unica de autenticacion para usuarios finales.
