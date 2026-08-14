# CLAUDE.md — Digital Match Global

Guía para trabajar en el sitio de **Digital Match Global**. Léela completa antes de tocar contenido o código.
Para el detalle de estrategia, auditoría y hallazgos, ver [`docs/ESTRATEGIA-Y-HALLAZGOS.md`](docs/ESTRATEGIA-Y-HALLAZGOS.md).
**Estado del trabajo y próximos pasos (leer al retomar): [`docs/ROADMAP.md`](docs/ROADMAP.md).**

---

## 1. Qué es

Landing page de **Digital Match Global**, una consultora de automatización, IA y desarrollo de software.
Público objetivo: **startups y PYMEs en LATAM (Uruguay/Argentina) y EE.UU.**
Objetivo del sitio: que el visitante **agende una llamada** (CTA principal → sección Contacto / Calendly / WhatsApp).

> ⚠️ **Repo correcto:** `DigitalMatchGlobal/digital-match` (org de la empresa) es el sitio REAL y en producción.
> Migrado en 2026-05 desde `contisola/digital-match` (cuenta personal); ese repo queda como `contisola-backup`.
> Está OBSOLETO y NO se usa: `DigitalMatchGlobal/digitalmatchglobal-web` (sitio viejo estático/Hostinger) y la carpeta `DIGITAL-MATCH-GLOBAL/public_html`.

---

## 2. Stack y arquitectura

- **Next.js 14.2** (App Router) + **React** + **TypeScript** + **Tailwind CSS**.
- Código en `src/`.
- Entrada de la landing: `src/app/page.tsx` (raíz, define el `<metadata>` SEO) → renderiza `LandingPageInteractive`. Los componentes de la landing siguen en `src/app/landing-page/components/`.
- `/landing-page` **redirige** a `/` (301, ver `next.config.mjs`).
- **Casos/Portfolio:** `/portfolio` (listado) y `/portfolio/[slug]` (detalle estático con color propio por caso). Fuente de datos: `src/data/cases.ts` (anónimos por rubro, bilingüe).
- **SEO / GEO (Fase 4):** config central en `src/data/site.ts` (URL, nombre, contacto, redes, servicios) — **reutilizar, no duplicar** esos datos. Rutas generadas por Next: `src/app/robots.ts` (permite bots de IA), `src/app/sitemap.ts`, `src/app/manifest.ts`. Datos estructurados en `src/components/seo/JsonLd.tsx` (montado en la home). Índice para LLMs en `public/llms.txt`. La metadata OG/`canonical` por página vive en cada `page.tsx`/`generateMetadata`; la imagen OG global es `src/app/opengraph-image.tsx` (Fase 3).
- Iconos: `src/components/ui/AppIcon.tsx`, wrapper de **Heroicons v2** (`@heroicons/react/24/outline` por defecto). Usar nombres válidos de Heroicons (ej. `Cog6ToothIcon`, `SparklesIcon`); si el nombre no existe, cae a un `QuestionMarkCircleIcon`.

### Secciones de la landing
Orden actual en `src/app/landing-page/components/LandingPageInteractive.tsx`:

`Header` → `HeroSection` → `ProofStrip` → `AboutSection` (Nosotros + stack por categorías) → `Certifications` → `ServicesSection` (4 pilares + `ContractModels`) → `TechnicalShowcase` ("Cómo lo hacemos") → `CasesSection` → `FAQSection` → `ContactSection` → `Footer` (+ `CTAFloatingButton`).

- `TestimonialsSection` y `TrustIndicators` existen pero están **comentados** (relleno). No reactivar hasta tener prueba social real.
- Cada sección vive en `src/app/landing-page/components/`. `Header` está en `src/components/common/`.
- El formulario de contacto (`ContactSection`) envía vía **FormSubmit.co** a `info@digitalmatchglobal.com`.
- **Componentes nuevos a conocer:** `Certifications` (**banner/marquee** infinito de logos — gris→color al hover/touch, pausa al hover; logos en `public/assets/logos/`), `ContractModels` (modelos de contratación con efecto dock por proximidad), `CircuitFlow` (fondo canvas de "datos"; ahora en **7 secciones de la landing + `/portfolio` + `/portfolio/[slug]`**, con pausa por `IntersectionObserver` cuando está fuera de pantalla), `CaseCard` (en `src/app/portfolio/components/`, usado por listado y home).
- **`CaseCard` (modelo Problema→Resultado):** chip de tipo → rubro → problema (1-2 líneas) → **métricas (héroe)** → stack → CTA "Ver caso". Variante `featured` (más aire, ring de acento, eyebrow) para el bento. Fuente: `cases.ts`.
- **`cases.ts` — campos del caso:** `tag`, `metrics` (⚠️ valores PLACEHOLDER, reemplazar por reales), `complexity` (1-5), opcionales `image`/`quote`. Helpers: `casesByComplexity`, `featuredCases` (top 4 por complejidad → bento), `restCases`. La home muestra el top-3 por complejidad.

### Sistema de diseño (IMPORTANTE — usar, no reinventar)
Definido en `src/styles/tailwind.css` (`@layer utilities`). Para mantener cohesión y evitar "muro de cards":
- **Marca:** acentos alineados al logo, azul→violeta (`--color-accent #4C8EFF`, `--color-accent-secondary #6D5DFE`, foreground blanco). `bg-gradient-accent`, `shadow-cta` (glow azul). NO usar cian/fucsia/colores fuera del arco de marca.
- **`.glass-panel`**: superficie de card estándar (borde casi invisible; enciende acento + glow al hover). Usarla en cards nuevas en vez de `bg-surface border border-border`.
- **`.reveal`** (+ `data-delay="1..5"`): scroll-reveal. Agregar `className="reveal"` a lo que deba aparecer al hacer scroll. ⚠️ No combinar `.reveal` con `transform` propio en el MISMO elemento (usar wrapper).
  - 🚨 **Regla que no se negocia:** el estado oculto (`opacity: 0`) cuelga de **`html.reveal-js`**, clase que agrega el script inline de `src/components/common/RevealBootstrap.tsx` (primer hijo del `<body>` en el RootLayout). Ese script corre **durante el parseo del HTML** y monta ahí mismo el IntersectionObserver, sin esperar a que React hidrate. **Nunca** mover `opacity: 0` a `.reveal` a secas: si el JS tarda, falla o no carga, la página entera se ve NEGRA (pasó en producción, ver §10). El bootstrap además tiene red de seguridad: ante un error de JS no capturado, muestra todo.
  - `src/hooks/useReveal.ts` quedó como un simple empujón (`window.__dmgReveal()`) para el contenido que aparece recién en cliente. No reimplementar observers ahí.
- **`.hairline`** (separador en gradiente, no full-bleed; se usa como divisor **entre secciones** en `LandingPageInteractive`), **`.glow-radial`/`.glow-violet`** (profundidad de fondo; requieren `relative overflow-hidden` en la `<section>`).
- **Separación de secciones:** `--color-surface-1` (#0C0E16, dark con leve tinte de marca) + utilidad **`.section-raised`** para las secciones "alternas" (Proof/Servicios/FAQ/Contacto). Alterna con el negro base (`bg-background`) para que se note el cambio de sección sin "cajas". Ajustable con un solo valor (ver comentario en `tailwind.css`).
- **Verde = color semántico de "resultado/impacto"** (`text-emerald-400`, NO es color de marca). Único uso permitido fuera del arco azul→violeta. Aparece en los impactos de "Cómo lo hacemos" y en las métricas/Resultado del detalle de casos. No usarlo para identidad/UI.
- **`.marquee`** (`.animate-marquee` + `.marquee-mask`): banner infinito; el track va DUPLICADO (dos copias) y `-50%` = loop sin saltos. Pausa con `hover:[animation-play-state:paused]`.
- **Movimiento:** `prefers-reduced-motion` tiene **guard global** en `tailwind.css` — toda animación nueva debe quedar cubierta por él (ya cubre `.animate-marquee`; `CircuitFlow` lo respeta vía JS).

---

## 3. Cómo correr local

```bash
npm install
npm run dev      # Next.js dev en http://localhost:4028
```

- `npm run dev` y `npm run start` corren **dev** en el puerto **4028**. `npm run serve` corre el build de producción.
- `npm run build` para compilar; `npm run type-check` (`tsc --noEmit`) para chequear tipos.
- ⚠️ En `next.config.mjs`, `typescript.ignoreBuildErrors` y `eslint.ignoreDuringBuilds` están en `true`: el build NO falla por errores de tipo. **Siempre correr `npx tsc --noEmit` manualmente** para verificar.

---

## 4. Internacionalización (i18n) — REGLA IMPORTANTE

- Todo el texto visible sale de `src/contexts/LanguageContext.tsx`, que tiene dos diccionarios: `translations.es` y `translations.en`.
- En los componentes se usa `const { t } = useLanguage();` y luego `t('clave')`.
- Idioma por defecto: **español**. Se persiste en `localStorage` (`preferred-language`). Toggle: `LanguageToggle`.

> ✅ **REGLA:** todo texto nuevo o modificado se agrega/edita **en ES y en EN a la vez**. Nunca dejar una clave en un solo idioma (si falta, `t()` devuelve la clave cruda y se ve feo).

---

## 5. Convenciones de código

- Los archivos `.tsx` usan una **indentación inicial inusual (~4 espacios)**. Respetar el estilo del archivo que estás editando para que el diff sea limpio.
- **SSR real (Fase 3):** las secciones de la landing **ya NO** usan el patrón `if (!isHydrated) return <skeleton/>` — renderizan contenido real en SSR (mejor LCP/SEO). El `LanguageProvider` arranca en `es` en server y cliente (el switch a `en` ocurre en `useEffect`, sin mismatch). Para componentes nuevos: **NO** envolver todo en un guard `isHydrated`; renderizá real en SSR y usá `useEffect`/refs sólo para lo client-only (observers, animaciones, acceso a `window`). Patrón de contadores: estado inicial = valor final (visible en SSR) y animar desde 0 al entrar en viewport (ver `ProofStrip.tsx`).
- Estilos con clases Tailwind + tokens del theme (`bg-surface`, `text-foreground`, `text-muted-foreground`, `bg-accent`, `border-border`, `bg-gradient-accent`, etc.). Reutilizar esos tokens, no hardcodear colores salvo casos puntuales.

---

## 6. Marca y posicionamiento — qué queremos transmitir

**Promesa central (líder = beneficio operativo):** recuperar las horas que hoy se pierden en **tareas manuales** — ingeniería aplicada al día a día (automatizar procesos, conectar sistemas, construir herramientas) para que tu equipo trabaje con menos fricción, con entrega rápida (7-14 días).

**Reason to believe (soporte, no titular):** el nivel y los estándares de las grandes empresas, **sin su complejidad ni su costo**. La pedigree enterprise/pública ya no encabeza el mensaje: respalda la promesa de eficiencia, no la lidera.

**Diferencial real (lo que nos hace difíciles de replicar):** un equipo de **ingenieros en sistemas** con experiencia comprobada en el **sector privado (multinacionales) y público**, +14 años combinados, certificaciones (UiPath, Microsoft, IBM) y un stack técnico amplio (del bot RPA a la nube).

**Capacidades a destacar (en tendencia):** agentes de IA, chatbots/asistentes, automatización (RPA), desarrollo web/apps, integraciones, datos, pagos, consultoría.

---

## 7. Reglas de contenido (qué SÍ / qué NO)

**SÍ:**
- Tono **vendible/marketinero pero SIN humo**: concreto, orientado a beneficios reales, hablándole **directo al lector** (segunda persona: "tu negocio", "tus procesos").
- Solo datos **verdaderos y defendibles**.
- Bilingüe siempre (ver §4).

**NO (líneas rojas):**
- ❌ **Nunca** nombres ni fotos de los fundadores en el sitio. El equipo se presenta **anónimo** ("ingenieros en sistemas", "el equipo detrás de DMG"). *(Contexto del por qué en `docs/`.)*
- ❌ **No** nombrar a las empresas donde trabajaron (ex-empleadores). Decir "multinacionales", "grandes empresas", "gobierno" — en genérico.
- ❌ **No** inventar métricas. Quedan PROHIBIDAS frases tipo "50+ clientes", "100% de satisfacción", "95% de retención" (estaban en el sitio y se eliminaron por no ser verificables para una empresa fundada en 2025).
- ❌ Nombres de clientes: por ahora **anonimizados por rubro** hasta tener permiso explícito de cada uno.
- ❌ **Seguridad/compliance:** se comunica como **experiencia** ("experiencia bajo ISO 9001 y con compliance PCI-DSS"), **nunca** "somos ISO/PCI certified" ni con logos de ISO/PCI (implicarían certificación de la empresa). Solo certificaciones reales del equipo llevan logo (UiPath, Rocketbot, Microsoft, IBM).

---

## 8. Roles de cada sección (evitar repetición)

Cada sección responde **una** pregunta distinta. No repetir contenido entre ellas:

| Sección | Pregunta que responde |
|---|---|
| Hero | El gancho / la promesa |
| ProofStrip | Métricas clave (reales) |
| **AboutSection ("Nosotros")** | **QUIÉNES somos y POR QUÉ confiar** (diferenciales + stack por categorías, NO servicios) |
| **Certifications** | Aval (certificaciones reales con logo) |
| **ServicesSection** | **QUÉ se contrata** (4 pilares: RPA, IA, Web, Consultoría/Capacitación) + **cómo** (modelos: por proyecto/hora/consultoría/jornadas) |
| **TechnicalShowcase ("Cómo lo hacemos")** | **CÓMO** lo hacemos (estándares + resultados típicos) — NO repetir el menú de Servicios |
| CasesSection | Prueba social (preview → `/portfolio`) |
| FAQSection | Objeciones (incluye seguridad/datos) |
| ContactSection | Conversión |

> ⚠️ "Nosotros" **no** debe listar servicios (eso duplica Servicios). Muestra diferenciales: experiencia, sectores, **seguridad/compliance**, certificaciones, stack.
> ⚠️ Servicios (QUÉ) y "Cómo lo hacemos" (CÓMO) están **deliberadamente diferenciados** — no volver a hacerlos decir lo mismo.

---

## 9. Deploy (IMPORTANTE)

- **Producción:** `digitalmatchglobal.com` se sirve desde **Vercel** (verificado: headers `server: Vercel`).
- Vercel está conectado **directo a este repo** (`DigitalMatchGlobal/digital-match`) por su integración de GitHub — no hay `vercel.json` ni GitHub Actions.
- ⚠️ **Push a `main` = deploy a producción automático.** Para cambios no triviales: trabajar en una **rama** y abrir **PR** (Vercel crea un *preview deploy* por rama/PR); recién mergear a `main` cuando esté aprobado.
- **Ojo con la confusión Hostinger vs Vercel** (son capas distintas):
  - **Dominio** (registro de `digitalmatchglobal.com`) → sigue en **Hostinger**.
  - **DNS** → administrado por Hostinger (nameservers `dns-parking.com`). Apex (`ALIAS @`) y `www` (`CNAME`) apuntan a **Vercel**, ambos al target propio del proyecto: **`e414dbd59da2a284.vercel-dns-017.com`** (alternativa: `A` a `216.198.79.1` + `64.29.17.1`). El apex responde `307` a `www`, que es el canónico.
  - **Hosting del sitio** → **Vercel** (sirve el Next.js de este repo). Hostinger **ya no hostea** el sitio.
  - **Correo SÍ sigue en Hostinger:** los registros `MX`, `SPF`, `DKIM`, `DMARC`, `autodiscover` y `autoconfig` son suyos. Al tocar DNS, **no tocar esos**.
  - Para publicar cambios del sitio: push a este repo (Vercel despliega). Hostinger solo importa para tocar dominio/DNS.
- 🚨 **Verificar el DNS antes de dar por buena cualquier validación en producción.** En 2026-08 la zona volvió a los valores por defecto de Hostinger y el dominio sirvió el **sitio estático viejo durante ~6 meses**, con el certificado TLS vencido (26-feb-2026), mientras Vercel seguía sano pero sin tráfico. Chequeo rápido:
  ```bash
  dig +short digitalmatchglobal.com          # debe dar IPs de Vercel, no de Hostinger
  curl -sI https://www.digitalmatchglobal.com | grep -i server   # debe decir "Vercel", no "hcdn"
  ```
  ⚠️ **Nunca usar el botón "Restablecer registros DNS"** del panel de Hostinger: devuelve todo a Hostinger y es la causa más probable de aquel incidente.
- El viejo deploy por Hostinger del repo estático `DigitalMatchGlobal/digitalmatchglobal-web` quedó **obsoleto**.

---

## 10. Estado / pendientes

> **Incidente 2026-08-14 (resuelto).** El dominio resolvía a Hostinger y sirvió el **sitio estático viejo ~6 meses** con el **certificado TLS vencido** (26-feb-2026), mientras el Next.js seguía sano en Vercel sin recibir tráfico. La "pantalla negra al scrollear" que se reportaba era el **AOS del sitio viejo** (25 de 30 elementos quedaban en `opacity: 0`). Se restauró el DNS (ver §9) y se blindó el scroll-reveal propio, que tenía la misma fragilidad latente (ver §2 y `RevealBootstrap.tsx`). **Secuela para el futuro: verificar el header `server:` de producción antes de dar por válida cualquier prueba.**

Estado completo y próximos pasos en [`docs/ROADMAP.md`](docs/ROADMAP.md). **Fases 1, 2, 3 y 4 ya están en `main` y EN PRODUCCIÓN.** Fase 2 (commit `9e65cc6`): casos `/portfolio`, repaleta a la marca, Servicios 4 pilares + modelos, Certificaciones, stack por categorías, seguridad/compliance, tiempos "desde 7-14 días", overhaul de UX. Fase 3 (PR #1, `b8c7a68`): performance + preview social. Fase 4 (PR #2, `b556a95`): SEO técnico + GEO. Ramas `feat/portfolio`, `feat/perf` y `feat/seo-geo` se conservan (no borrar).

**En curso (rama `feat/portfolio-casos-v2`, sin mergear):** overhaul del portfolio (CaseCard modelo Problema→Resultado, métricas, ranking por complejidad + bento de destacados, 3 casos nuevos → 9), Certificaciones como marquee, diferenciales de "Nosotros" unificados, contraste/separadores entre secciones, verde semántico de resultado, y CircuitFlow extendido a toda la experiencia.

**Pendientes (resumen — detalle en ROADMAP):**
- [ ] **⚠️ Métricas reales:** los `metrics` de `cases.ts` son PLACEHOLDER — reemplazar `value` por datos reales ANTES de mergear `feat/portfolio-casos-v2` a `main`.
- [x] **Fase 3 — Performance/SEO + social: EN PRODUCCIÓN** (PR #1, `b8c7a68`) — SSR real sin guards `isHydrated`, `next/font`, OG/social con imagen `next/og` en español, limpieza de `rocket.new`/`@dhiwise` → HTML 404KB→115KB. Preview social de WhatsApp validado. Logo: `next/image` ya lo entrega como AVIF ~3.3KB (no se tocó el fuente). Falta menor: Lighthouse en producción.
- [ ] **Contenido:** instancias reales de consultoría/capacitación (ESTRATEGIA §8), testimonios reales (cargar en `quote` de `cases.ts`), `result` real por caso, screenshots reales por caso (campo `image`), (opcional) logos en el stack.
- [x] **SEO técnico + GEO: EN PRODUCCIÓN (Fase 4, PR #2, `b556a95`)** — `robots.ts` (permite bots de IA: GPTBot/ClaudeBot/PerplexityBot/Google-Extended…), `sitemap.ts` (14 URLs), JSON-LD `@graph` (Organization/WebSite/ProfessionalService/FAQPage) en `src/components/seo/JsonLd.tsx`, OG/canonical por página en portfolio, `public/llms.txt`, `manifest.ts`, config central `src/data/site.ts`. Validado: Rich Results = 5 elementos válidos + sitemap "Correcto" en Search Console (14 páginas). Mejora opcional: `address.addressCountry: "UY"` para limpiar el aviso no crítico del LocalBusiness.
- [ ] **Fase 5 (candidata):** analytics + tracking de conversión en CTAs (Calendly/WhatsApp). Accesibilidad: pasada de focus/`aria`/contraste + Lighthouse en producción.
- [ ] Confirmar wording exacto de PCI-DSS; QA en celular real.
