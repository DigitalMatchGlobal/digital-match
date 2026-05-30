# ROADMAP & Estado — Digital Match Global

Documento para retomar el trabajo entre sesiones. Última actualización: **2026-05-29**.
Ver también: [`../CLAUDE.md`](../CLAUDE.md) (reglas operativas) y [`ESTRATEGIA-Y-HALLAZGOS.md`](ESTRATEGIA-Y-HALLAZGOS.md) (estrategia, casos reales, contexto interno).

---

## Objetivo general
Llevar el sitio a nivel "profesional" tipo [houlak.com](https://www.houlak.com/our-clients): casos/portfolio con páginas individuales (color propio por caso, formato corto Cliente · Desafío · Solución), URL limpia en la raíz, y un sitio rápido/responsive.

**Decisiones tomadas con el cliente:**
- Casos **anónimos por rubro** (sin nombres/logos de clientes).
- **Paleta de color propia por caso**.
- Ruta **`/portfolio`** (+ `/portfolio/[slug]`).
- Ejecución **por fases**, cada una en su rama + PR → preview de Vercel → merge a `main`.
- Recordá: **push a `main` = deploy a producción** (Vercel). Todo bilingüe ES/EN. Sin nombres/fotos de fundadores, sin métricas infladas.

---

## Estado del repo / deploy
- Repo: `DigitalMatchGlobal/digital-match` (remoto `origin`). Backup: remoto `contisola-backup`.
- Producción: `digitalmatchglobal.com` (Vercel) ← `main`. **Online y funcionando.**
- **Rama de trabajo actual: `feat/url-raiz-y-fixes`** (Fase 1, pusheada, **NO mergeada a main todavía**).
- Local: `npm install && npm run dev` → http://localhost:4028.

---

## ✅ FASE 1 — COMPLETADA (en rama `feat/url-raiz-y-fixes`, pendiente de merge)

Cambios hechos y verificados (build + tsc OK, probado en runtime):
- **Landing en la raíz:** `src/app/page.tsx` (nuevo) sirve la landing; se borró `src/app/landing-page/page.tsx`. En `next.config.mjs` el redirect ahora es `/landing-page → /` (301). Verificado: `/` = 200, `/landing-page` = 308 → `/`.
- **`lang="es"`** en `src/app/layout.tsx`.
- **Bug footer:** `Footer.tsx` — el link roto `#faq` ahora es `#process` y se quitó el duplicado.
- **Bug botón:** se quitó el botón muerto "Ver Caso de Éxito" en `ServicesSection.tsx` (se reactiva en Fase 2 → `/portfolio`).
- **Perf quick wins** (`next.config.mjs` + `AppImage.tsx`): `productionBrowserSourceMaps: false`; `images.formats: ['image/avif','image/webp']`; se quitó `unoptimized: true` de imágenes locales.

**Pendiente de Fase 1:** revisar preview de Vercel de la rama y **mergear a `main`**.

---

## ⏳ FASE 2 — Sección de Casos `/portfolio` (PENDIENTE)
Rama sugerida: `feat/portfolio`. Es el núcleo del pedido (estilo Houlak).

- **Datos:** crear `src/data/cases.ts` (fuente única). Cada caso:
  ```ts
  { slug, icon, accent, accentSecondary,
    rubro: {es,en}, location,
    challenge: {es,en}, solution: {es,en},
    services: string[], result?: {es,en} }
  ```
  Casos iniciales (de `ESTRATEGIA-Y-HALLAZGOS.md`, anónimos por rubro, color propio c/u): ONG/fundación, gimnasio de alto rendimiento, marca de wellness, courier/import-export, e-commerce de electrónica.
- **Listado:** `src/app/portfolio/page.tsx` (server + metadata) + grilla cliente (reusar patrón de tarjetas de `ServicesSection.tsx`/`TrustIndicators.tsx`). Cada tarjeta → `/portfolio/[slug]`.
- **Página de caso:** `src/app/portfolio/[slug]/page.tsx` con `generateStaticParams` (estático = rápido). Color por caso sobrescribiendo variables CSS (`--color-accent`, `--color-accent-secondary`) con `style` inline en el wrapper (el sistema de tokens en `src/styles/tailwind.css` + `tailwind.config.js` ya lo permite). Estructura: Cliente (rubro) · Desafío · Solución · Servicios · Resultado + `Header`/`Footer` + link "Volver".
- **i18n etiquetas:** agregar a `LanguageContext.tsx` (ES/EN): `portfolio.title`, `portfolio.subtitle`, `case.client`, `case.challenge`, `case.solution`, `case.services`, `case.result`, `case.cta`, `case.back`.
- **Integración home/nav:** nueva `CasesSection.tsx` en la landing (preview de 3 casos + CTA a `/portfolio`, donde estaban los testimonios comentados); reactivar el botón de `ServicesSection` y el "Ver Nuestro Trabajo" del hero → `/portfolio`; agregar "Casos" al `Header.tsx` y footer.

---

## ⏳ FASE 3 — Performance profunda (PENDIENTE)
Rama sugerida: `feat/perf`. Mayor impacto en LCP/SEO.

- **Render en servidor (lo más importante):** quitar los guards `if (!isHydrated) return <skeleton/>` de las secciones (`HeroSection`, `AboutSection`, `ProofStrip`, `TechnicalShowcase`, `ServicesSection`, `FAQSection`, `ContactSection`) para que rendericen contenido real en SSR (idioma inicial `es`; el cambio a `en` ocurre tras montar, sin mismatch). Contadores de `ProofStrip`: render del número final en SSR + animar en cliente. **Verificar warnings de hydration.**
- **Fuentes:** migrar Google Fonts `@import` (`src/styles/tailwind.css:1`) → `next/font/google` (Inter) en `layout.tsx`.
- **Assets:** optimizar `public/assets/images/Logo.png` (53KB → WebP/SVG).
- **Limpieza (verificar antes):** evaluar quitar el webpack loader `@dhiwise/component-tagger` y los scripts de `rocket.new` en `layout.tsx` si no se usan.
- **Opcional:** idioma vía cookie leída en server (SSR ya en el idioma correcto, sin flash es→en).

---

## Fuera de alcance / más adelante
- Testimonios reales; logos reales de clientes (requiere permiso); BIMI svg en el sitio nuevo; agregar `.env` al `.gitignore`.

## Cómo continuar (quickstart próxima sesión)
1. `cd /Users/gramos/Documents/dev/digital-match`
2. Si Fase 1 NO está mergeada: `git checkout feat/url-raiz-y-fixes` (revisar/mergear). Si ya está en `main`: `git checkout main && git pull`.
3. `npm install && npm run dev` → http://localhost:4028.
4. Arrancar Fase 2: `git checkout -b feat/portfolio` y seguir la sección "FASE 2" de arriba.
5. Verificación por fase: `npx tsc --noEmit`, `npm run build`, preview de Vercel de la rama, y recién mergear a `main`.
