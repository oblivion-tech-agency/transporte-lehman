# Transporte Lehman — Landing

Landing page de [Transporte Lehman](https://instagram.com/transportelehman): transporte de cargas generales Buenos Aires – Tierra del Fuego.

Next.js (App Router) + Tailwind CSS v4. Implementada desde el handoff de Claude Design (sistema "Industry").

## Desarrollo

```bash
npm install
npm run dev
```

## Estructura

- `app/` — layout con metadata SEO, `page.tsx` (secciones + JSON-LD), `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.tsx`
- `app/globals.css` — tokens del design system (`@theme`) y clases de componente (`.blueprint`, `.btn`, `.input`, `.seg`…)
- `components/sections/` — una sección por archivo
- `components/QuoteForm.tsx` — formulario de cotización: arma el mensaje y abre WhatsApp
- `components/Motion.tsx` — reveals al hacer scroll y contadores
- `lib/site.ts` — datos de contacto, clientes, paradas de la ruta

## Deploy (Vercel)

Conectado a Vercel; cada push a `main` despliega a producción.

### Dominio propio

Cuando esté comprado `transportelehman.com.ar`:

1. Agregarlo en Vercel → Project → Settings → Domains.
2. Definir `NEXT_PUBLIC_SITE_URL=https://transportelehman.com.ar` en las variables de entorno de Production y redeployar.

Sin esa variable, canonical, sitemap y Open Graph usan la URL de producción de Vercel (`VERCEL_PROJECT_PRODUCTION_URL`).
