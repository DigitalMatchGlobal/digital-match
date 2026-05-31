# ROADMAP & Estado — Digital Match Global

Documento para retomar el trabajo entre sesiones. Última actualización: **2026-05-30**.
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
- **Fase 1: MERGEADA a `main`** (rama `feat/url-raiz-y-fixes` ya borrada).
- **Fase 2: MERGEADA a `main` y EN PRODUCCIÓN** (commit `9e65cc6`). `main`, `origin/main` y `feat/portfolio` apuntan al mismo commit. La rama `feat/portfolio` se conserva (no borrar).
- Local: `npm install && npm run dev` → http://localhost:4028. Verificación: `npx tsc --noEmit` + `npm run build` (⚠️ NO correr `build` con `dev` vivo: corrompe `.next`).

---

## ✅ FASE 1 — COMPLETADA y MERGEADA a `main`

Cambios hechos y verificados (build + tsc OK, probado en runtime):
- **Landing en la raíz:** `src/app/page.tsx` (nuevo) sirve la landing; se borró `src/app/landing-page/page.tsx`. En `next.config.mjs` el redirect ahora es `/landing-page → /` (301). Verificado: `/` = 200, `/landing-page` = 308 → `/`.
- **`lang="es"`** en `src/app/layout.tsx`.
- **Bug footer:** `Footer.tsx` — el link roto `#faq` ahora es `#process` y se quitó el duplicado.
- **Bug botón:** se quitó el botón muerto "Ver Caso de Éxito" en `ServicesSection.tsx` (se reactiva en Fase 2 → `/portfolio`).
- **Perf quick wins** (`next.config.mjs` + `AppImage.tsx`): `productionBrowserSourceMaps: false`; `images.formats: ['image/avif','image/webp']`; se quitó `unoptimized: true` de imágenes locales.

**Fase 1 cerrada:** mergeada a `main` el 2026-05-29 (deploy en producción).

---

## ✅ FASE 2 — Casos, identidad, servicios y UX (MERGEADA a `main` + EN PRODUCCIÓN)
Terminó siendo mucho más que la sección de casos. Todo verificado (`tsc` + `build` OK, runtime probado). Resumen:

**1. Portfolio / Casos (núcleo, estilo Houlak)**
- `src/data/cases.ts`: fuente única, **6 casos reales anónimos por rubro**, ES/EN, sin métricas inventadas. Fuentes→rubro: `sitio-evolucion-antoniana`→ONG; `Matukana`→wellness; `BPORT`→logística; `POVSTOREUY`→e-commerce; `VC FIT`→preparación física; `DMGFit`→gestión de gimnasio.
- Listado `src/app/portfolio/page.tsx` + detalle `src/app/portfolio/[slug]/page.tsx` (estilo Houlak: eyebrow, headline, watermark, secciones numeradas 01/02/03, prev/next, CTA) con **color propio por caso** (override de `--color-accent`/`--color-accent-secondary`), `generateStaticParams` + `generateMetadata` (SSG, los 6 prerenderizados).
- Home: `CasesSection.tsx` (preview 3 + CTA). "Casos" en Header (ruta) y Footer. Botones del hero y de Servicios → `/portfolio`.

**2. Identidad alineada al logo**
- Paleta global unificada al **azul→violeta del logo** (`--color-accent #4C8EFF`, `--color-accent-secondary #6D5DFE`, foreground blanco), reemplazó el cian/fucsia que choqueaba. Los 6 casos recorren ese mismo arco (cyan-azul → púrpura) para que "fluyan".

**3. Servicios (QUÉ) diferenciado de "Cómo lo hacemos" (CÓMO)**
- `ServicesSection`: **4 pilares** — Automatización de Procesos **(RPA)** explícito (UiPath·Rocketbot·Power Automate), IA, Desarrollo Web, **Consultoría y Capacitación** (nuevo).
- Nueva franja **"Cómo podés contratarnos"** (`ContractModels.tsx`): por proyecto · por hora · consultoría · jornadas de capacitación — con **efecto dock por proximidad**.
- `TechnicalShowcase` reenfocada a "Cómo lo hacemos" (estándares + resultados), ya no duplica Servicios.

**4. Certificaciones (`Certifications.tsx`)** — franja con **logos oficiales** (UiPath, Rocketbot, Microsoft, IBM) monocromo→color al hover. En `public/assets/logos/`.

**5. Stack tecnológico** — de 21 pills planas a **6 categorías** (RPA, IA & Datos, Desarrollo, Cloud, BD, Integraciones) en un panel con filas.

**6. Seguridad / compliance** — diferencial nuevo: **experiencia ISO 9001 + PCI-DSS** (framing "experiencia", NO certificación de la empresa; sin logos ISO/PCI). En Nosotros (diferencial escudo), FAQ ("¿Cómo manejan la seguridad y los datos?") y footer.

**7. Tiempos de entrega** — matizado en todo el sitio a **"desde 7-14 días según complejidad"** (antes era fijo).

**8. UX / movimiento (anti-"boxiness")** — sistema de diseño nuevo en `tailwind.css`: `.glass-panel` (borde casi invisible, glow al hover), `.hairline`, `.glow-radial`/`.glow-violet`, `.reveal` (scroll-reveal con stagger vía hook `src/hooks/useReveal.ts` — 1 IntersectionObserver + MutationObserver), `.tab-fade`. Se aplanaron las secciones más "cuadradas" (diferenciales, stack, FAQ con `grid-rows`, ContractModels), se quitaron los `border-y` full-bleed, y se sumaron glows + masks (Hero, CircuitFlow). **Guard global `prefers-reduced-motion`.**
- Efectos "vivos": `CircuitFlow.tsx` (canvas, paquetes de datos viajando por trazas) en Servicios y "Cómo lo hacemos"; dock de proximidad en modelos; logo-wall monocromo→color.

**Pendiente de Fase 2 (menor, NO bloquea — ya está en prod):** confirmar wording exacto de PCI-DSS (¿"trabajé en entorno PCI" vs "implementé controles PCI"?); completar instancias concretas de consultoría/capacitación en `ESTRATEGIA §8`; QA en dispositivo móvil real.

---

## ⏳ FASE 3 — Performance profunda (PENDIENTE)
Rama sugerida: `feat/perf`. Mayor impacto en LCP/SEO.

- **Render en servidor (lo más importante):** quitar los guards `if (!isHydrated) return <skeleton/>` de las secciones (`HeroSection`, `AboutSection`, `ProofStrip`, `TechnicalShowcase`, `ServicesSection`, `FAQSection`, `ContactSection`) para que rendericen contenido real en SSR (idioma inicial `es`; el cambio a `en` ocurre tras montar, sin mismatch). Contadores de `ProofStrip`: render del número final en SSR + animar en cliente. **Verificar warnings de hydration.**
- **Fuentes:** migrar Google Fonts `@import` (`src/styles/tailwind.css:1`) → `next/font/google` (Inter) en `layout.tsx`.
- **Assets:** optimizar `public/assets/images/Logo.png` (53KB → WebP/SVG).
- **Limpieza (verificar antes):** evaluar quitar el webpack loader `@dhiwise/component-tagger` y los scripts de `rocket.new` en `layout.tsx` si no se usan.
- **Opcional:** idioma vía cookie leída en server (SSR ya en el idioma correcto, sin flash es→en).

---

## 🎯 Próximos pasos para dejar el sitio en un nivel altísimo
Ordenados por impacto. Cada uno en su rama → preview → merge.

**A. Cerrar Fase 2 — ✅ HECHO**
1. ~~Revisar el **preview de Vercel** de `feat/portfolio`.~~
2. ~~**Mergear a `main`** (deploy a producción).~~ **Mergeado a `main` y en producción** (commit `9e65cc6`). Pendiente menor (no bloquea): QA en un **celular real** (los efectos de cursor/dock degradan en touch a propósito).

**B. Fase 3 — Performance & SEO profundo** (mayor impacto en LCP/SEO, ver detalle abajo)
- Quitar los guards `isHydrated` para render real en SSR; `next/font`; optimizar `Logo.png`; limpiar scripts `rocket.new`/`@dhiwise/component-tagger` si no se usan.

**C. Contenido que falta para "prueba social" completa**
- **Instancias reales de consultoría/capacitación** (completar `ESTRATEGIA §8`) → posible caso/testimonio.
- **Testimonios reales** (reactivar `TestimonialsSection`, hoy comentada) cuando haya permiso.
- **Resultados reales por caso** (`result` en `cases.ts`, hoy omitido para no inventar métricas).
- (Opcional) **logos en las categorías del stack** (como las certs).

**D. Confianza & conversión**
- **Analytics + tracking de conversión** en CTAs / Calendly / WhatsApp.
- **SEO técnico:** OG images por página, `sitemap.xml`, `robots.txt`, datos estructurados (JSON-LD Organization/Service).
- **Accesibilidad:** pasada de focus states, `aria`, contraste; correr **Lighthouse**.
- Confirmar wording PCI-DSS (ver Fase 2 pendiente) para no overclaim.

**E. Housekeeping**
- `.env` al `.gitignore`; BIMI svg; revisar `typescript.ignoreBuildErrors`/`eslint.ignoreDuringBuilds` (hoy en `true` — correr `tsc`/lint a mano siempre).

---

## ⏳ FASE 3 — Performance profunda (PENDIENTE)
Rama sugerida: `feat/perf`. Mayor impacto en LCP/SEO.

- **Render en servidor (lo más importante):** quitar los guards `if (!isHydrated) return <skeleton/>` de las secciones para que rendericen contenido real en SSR (idioma inicial `es`; el cambio a `en` ocurre tras montar). Contadores de `ProofStrip`: número final en SSR + animar en cliente. **Verificar warnings de hydration.** *(Nota: el scroll-reveal `.reveal` ya tolera SSR — useReveal revela todo igual; pero hoy las secciones igual dependen de JS por `isHydrated`.)*
- **Fuentes:** migrar Google Fonts `@import` (`src/styles/tailwind.css:1`) → `next/font/google` (Inter) en `layout.tsx`.
- **Assets:** optimizar `public/assets/images/Logo.png` (53KB → WebP/SVG).
- **Limpieza (verificar antes):** evaluar quitar el webpack loader `@dhiwise/component-tagger` y los scripts de `rocket.new` en `layout.tsx` si no se usan.
- **Opcional:** idioma vía cookie leída en server (SSR ya en el idioma correcto, sin flash es→en).

---

## Cómo continuar (quickstart próxima sesión)
1. `cd /Users/gramos/Documents/dev/digital-match`
2. `git checkout main && git pull` (Fase 1 y Fase 2 ya están en `main` y en producción).
3. `npm install && npm run dev` → http://localhost:4028.
4. Nueva fase: `git checkout -b feat/<nombre>` y seguir "Próximos pasos" de arriba.
5. Verificación por fase: `npx tsc --noEmit`, `npm run build` (con dev **detenido**), preview de Vercel, y recién mergear a `main`.
