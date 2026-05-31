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

## ✅ FASE 3 — Performance & SEO + social (HECHA en rama `feat/perf`, sin mergear)
Verificada con `tsc --noEmit` + `npm run build` (19 páginas estáticas OK). **Falta correr Lighthouse en el preview de Vercel y mergear.**

- **SSR real:** se quitaron los guards `if (!isHydrated) return <skeleton/>` de las 9 secciones activas (`HeroSection`, `ProofStrip`, `AboutSection`, `Certifications`, `ServicesSection`, `TechnicalShowcase`, `CasesSection`, `FAQSection`, `ContactSection`) + el `isHydrated` muerto de `LandingPageInteractive`. Ahora renderizan contenido real en SSR (idioma `es`; el switch a `en` ocurre post-montaje, sin mismatch). `ProofStrip`: el estado arranca en los valores FINALES (14/144/14) — visibles en SSR sin JS — y la animación de conteo corre desde 0 sólo al entrar en viewport (queda bajo el hero, sin flash). Verificado: HTML del servidor trae los textos y números reales, 0 skeletons.
- **Fuentes:** migrado `@import` de Google Fonts → `next/font/google` (Inter) en `layout.tsx` (variable `--font-inter`, autoalojada). `tailwind.css` (body/headings) y `tailwind.config.js` (`font-sans`/`font-inter`) usan la variable. 0 requests a `fonts.googleapis`.
- **Social / OG (faltaba; arreglaba el preview feo en WhatsApp):** `metadataBase` en `layout.tsx`; `openGraph` + `twitter` + `canonical` en `page.tsx`, todo **en español** (antes el título/descr salían en inglés). Imagen generada dinámicamente con `next/og`: `src/app/opengraph-image.tsx` (1200×630 on-brand, glow azul→violeta + monograma DM real leído de `Logo.png`); `twitter-image.tsx` la reutiliza. Heredada por `/portfolio` y `/portfolio/[slug]`.
- **Limpieza:** quitado el webpack loader `@dhiwise/component-tagger` (`next.config.mjs`), su dependencia en `package.json` (–97 paquetes transitivos) y los 2 `<script>` de `rocket.new` en `layout.tsx`. **HTML de la home: 404 KB → 115 KB** (los `data-component-*` que inyectaba dhiwise en cada elemento desaparecieron).
- **Logo:** NO se tocó el fuente. Se confirmó que `next/image` (con `formats: ['avif','webp']`) ya sirve el logo como **AVIF de ~3.3 KB** al tamaño mostrado; el PNG de 54 KB nunca llega crudo al cliente. Optimizar el fuente es marginal y sin un SVG vectorial original arriesgaría calidad de marca.
- **Opcional pendiente:** idioma vía cookie leída en server (SSR ya en el idioma correcto, sin flash es→en).

---

## 🎯 Próximos pasos para dejar el sitio en un nivel altísimo
Ordenados por impacto. Cada uno en su rama → preview → merge.

**A. Cerrar Fase 2 — ✅ HECHO**
1. ~~Revisar el **preview de Vercel** de `feat/portfolio`.~~
2. ~~**Mergear a `main`** (deploy a producción).~~ **Mergeado a `main` y en producción** (commit `9e65cc6`). Pendiente menor (no bloquea): QA en un **celular real** (los efectos de cursor/dock degradan en touch a propósito).

**B. Fase 3 — Performance & SEO + social — ✅ HECHA (rama `feat/perf`, falta Lighthouse + merge)**
- SSR real (guards `isHydrated` fuera), `next/font`, OG/social con imagen, limpieza de `rocket.new`/`@dhiwise`. Detalle arriba en la sección "✅ FASE 3".

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

## Cómo continuar (quickstart próxima sesión)
1. `cd /Users/gramos/Documents/dev/digital-match`
2. **Fase 3 está en la rama `feat/perf` (sin mergear).** Para retomarla: `git checkout feat/perf`. Falta: revisar el **preview de Vercel** (correr **Lighthouse** ahí, no en dev — dev no minifica), validar el preview social con el [Sharing Debugger de Meta](https://developers.facebook.com/tools/debug/) / WhatsApp, y **mergear a `main`**.
3. `npm install && npm run dev` → http://localhost:4028.
4. Nueva fase: `git checkout main && git checkout -b feat/<nombre>` y seguir "Próximos pasos" de arriba.
5. Verificación por fase: `npx tsc --noEmit`, `npm run build` (con dev **detenido** — corrompe `.next` si está vivo), preview de Vercel, y recién mergear a `main`.
