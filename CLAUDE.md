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
- Iconos: `src/components/ui/AppIcon.tsx`, wrapper de **Heroicons v2** (`@heroicons/react/24/outline` por defecto). Usar nombres válidos de Heroicons (ej. `Cog6ToothIcon`, `SparklesIcon`); si el nombre no existe, cae a un `QuestionMarkCircleIcon`.

### Secciones de la landing
Orden actual en `src/app/landing-page/components/LandingPageInteractive.tsx`:

`Header` → `HeroSection` → `ProofStrip` → `AboutSection` (Nosotros + stack por categorías) → `Certifications` → `ServicesSection` (4 pilares + `ContractModels`) → `TechnicalShowcase` ("Cómo lo hacemos") → `CasesSection` → `FAQSection` → `ContactSection` → `Footer` (+ `CTAFloatingButton`).

- `TestimonialsSection` y `TrustIndicators` existen pero están **comentados** (relleno). No reactivar hasta tener prueba social real.
- Cada sección vive en `src/app/landing-page/components/`. `Header` está en `src/components/common/`.
- El formulario de contacto (`ContactSection`) envía vía **FormSubmit.co** a `info@digitalmatchglobal.com`.
- **Componentes nuevos a conocer:** `Certifications` (logo-wall, logos en `public/assets/logos/`), `ContractModels` (modelos de contratación con efecto dock por proximidad), `CircuitFlow` (fondo canvas de "datos" en Servicios y Technical), `CaseCard` (en `src/app/portfolio/components/`, usado por listado y home).

### Sistema de diseño (IMPORTANTE — usar, no reinventar)
Definido en `src/styles/tailwind.css` (`@layer utilities`). Para mantener cohesión y evitar "muro de cards":
- **Marca:** acentos alineados al logo, azul→violeta (`--color-accent #4C8EFF`, `--color-accent-secondary #6D5DFE`, foreground blanco). `bg-gradient-accent`, `shadow-cta` (glow azul). NO usar cian/fucsia/colores fuera del arco de marca.
- **`.glass-panel`**: superficie de card estándar (borde casi invisible; enciende acento + glow al hover). Usarla en cards nuevas en vez de `bg-surface border border-border`.
- **`.reveal`** (+ `data-delay="1..5"`): scroll-reveal. Lo activa el hook `src/hooks/useReveal.ts` (montado 1 vez en `LandingPageInteractive`). Agregar `className="reveal"` a lo que deba aparecer al hacer scroll. ⚠️ No combinar `.reveal` con `transform` propio en el MISMO elemento (usar wrapper).
- **`.hairline`** (separador en gradiente, no full-bleed), **`.glow-radial`/`.glow-violet`** (profundidad de fondo; requieren `relative overflow-hidden` en la `<section>`).
- **Movimiento:** `prefers-reduced-motion` tiene **guard global** en `tailwind.css` — toda animación nueva debe quedar cubierta por él.

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
- Componentes con animación/estado usan el patrón `isHydrated` (un `useState(false)` + `useEffect` que lo pone en `true`) para evitar mismatch de hidratación. Mantenerlo en componentes nuevos que dependan del cliente.
- Estilos con clases Tailwind + tokens del theme (`bg-surface`, `text-foreground`, `text-muted-foreground`, `bg-accent`, `border-border`, `bg-gradient-accent`, etc.). Reutilizar esos tokens, no hardcodear colores salvo casos puntuales.

---

## 6. Marca y posicionamiento — qué queremos transmitir

**Promesa central:** el nivel y los estándares de las grandes empresas, **sin su complejidad ni su costo**, con entrega rápida (7-14 días).

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
  - **DNS** → administrado por Hostinger (nameservers `dns-parking.com`), pero el registro `www` apunta a **Vercel** por CNAME.
  - **Hosting del sitio** → **Vercel** (sirve el Next.js de este repo). Hostinger **ya no hostea** el sitio.
  - Para publicar cambios del sitio: push a este repo (Vercel despliega). Hostinger solo importa para tocar dominio/DNS.
- El viejo deploy por Hostinger del repo estático `DigitalMatchGlobal/digitalmatchglobal-web` quedó **obsoleto**.

---

## 10. Estado / pendientes

Estado completo y próximos pasos en [`docs/ROADMAP.md`](docs/ROADMAP.md). Hecho en `feat/portfolio` (Fase 2): casos `/portfolio`, repaleta a la marca, Servicios 4 pilares + modelos, Certificaciones con logos, stack por categorías, seguridad/compliance, tiempos "desde 7-14 días", y overhaul de UX/movimiento (glass-panel + scroll-reveal + CircuitFlow).

**Pendientes (resumen — detalle en ROADMAP):**
- [ ] **Mergear `feat/portfolio` a `main`** tras revisar preview de Vercel (incluye repaleta global → mirar antes).
- [ ] **Fase 3 — Performance/SEO:** quitar guards `isHydrated` (SSR real), `next/font`, optimizar `Logo.png`, limpiar `rocket.new`.
- [ ] **Contenido:** instancias reales de consultoría/capacitación (ESTRATEGIA §8), testimonios reales, `result` real por caso, (opcional) logos en el stack.
- [ ] **Conversión/SEO:** analytics + tracking de CTAs, OG/sitemap/JSON-LD, pasada de accesibilidad + Lighthouse.
- [ ] Confirmar wording exacto de PCI-DSS; QA en celular real.
