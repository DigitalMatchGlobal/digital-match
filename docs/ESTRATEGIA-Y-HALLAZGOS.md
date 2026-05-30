# Estrategia, hallazgos y dirección — Digital Match Global

Documento vivo. Resume **qué buscamos transmitir**, la **auditoría honesta** del sitio, lo que **ya se cambió** y lo que **falta**.
Reglas operativas para editar el sitio: ver [`../CLAUDE.md`](../CLAUDE.md).

> 🔒 **Contexto interno — la sección 6 NO se publica en el sitio.**

---

## 1. Qué queremos transmitir

Que detrás de Digital Match Global hay **gente con experiencia real y de alto nivel**, capaz de resolver problemas de negocio con tecnología — y que es **accesible** para startups y PYMEs.

El mensaje en una frase:
> **"El nivel de las grandes empresas, sin su complejidad ni su costo."**

Tres ideas que el visitante debería percibir en segundos:
1. **Saben de verdad** (ingenieros, experiencia enterprise + sector público, certificaciones, stack amplio).
2. **Es para mí** (startups/PYMEs, entrega rápida 7-14 días, sin la burocracia ni el precio de una gran consultora).
3. **Es confiable / sin humo** (datos reales, no promesas infladas).

El gran activo a comunicar es la **combinación poco común de skills** (automatización enterprise + IA + desarrollo + visión de negocio) y la **doble experiencia público/privada**.

Hay una **extensión natural de ese nivel**: además de **ejecutar** (automatización, IA, desarrollo), el equipo puede **asesorar y formar** — consultoría de procesos/IA y jornadas de capacitación a equipos y empresas. Es la misma experiencia enterprise/pública, ahora **transferida** a otros. Refuerza el mensaje "nivel de las grandes empresas" y abre una vía de relación que no depende de un proyecto de software (ver §8).

---

## 2. Decisiones de marca tomadas (con el cliente)

- **Equipo anónimo:** sin nombres ni fotos de los fundadores. No se sienten cómodos exponiéndose; prefieren credibilidad por experiencia, no por figuración.
- **Sin nombrar ex-empleadores:** la experiencia en multinacionales/gobierno se menciona en genérico.
- **Sin métricas infladas:** se eliminaron las inventadas; solo datos defendibles.
- **Clientes anonimizados por rubro** hasta tener permiso para nombrarlos.
- **Tono:** vendible/marketinero pero **sin humo**, hablándole directo al lector.
- **Texto mínimo, mucho visual:** la sección "Nosotros" no debe ser un párrafo largo (se sentía "fantasma"); se resuelve con titular + 1 línea + elementos visuales.
- **Seguridad / compliance = diferencial, comunicado como EXPERIENCIA (no certificación de la empresa):** se dice "experiencia bajo ISO 9001 y con compliance PCI-DSS (pagos)", nunca "somos ISO/PCI certified". **Sin logos de ISO/PCI** (implicarían certificación de la entidad). Aparece en: Nosotros (diferencial "Seguridad y cumplimiento", ícono escudo), FAQ ("¿Cómo manejan la seguridad y los datos?") y footer. Respaldo real: §6 (Perfil B, ISO 9001 + fintech/pagos).

---

## 3. Auditoría honesta del sitio (estado al momento del análisis)

### Lo que está bien ✅
- Diseño moderno y premium (hero oscuro animado, degradados) — transmite "tech serio".
- Posicionamiento afilado y orientado a resultado ("systems that scale", 7-14 días).
- Bilingüe ES/EN con persistencia.
- Servicios claros (3 pilares) + `TechnicalShowcase` con detalle.
- FAQ que maneja objeciones reales (tiempos, proceso, soporte, precio).
- Formulario de contacto **funcional** (FormSubmit.co) + WhatsApp.
- Footer con año dinámico y links legales.
- Buen criterio previo: testimonios y trust-indicators de relleno ya estaban comentados.

### Lo que estaba mal ❌ (y el problema de fondo)
- **Credibilidad inflada:** "50+ clientes", "100% satisfacción", "95% retención", "50+ proyectos" — no verificables para una empresa fundada en 2025. Un decisor (sobre todo de EE.UU.) las descuenta. **Restaban más de lo que sumaban.**
- **El mejor activo escondido:** no se comunicaba la experiencia real del equipo.
- **Sin prueba de trabajo:** botón "Ver Caso de Éxito" desactivado; "Ver Nuestro Trabajo" lleva a Servicios, no a casos; no había casos reales.
- **Repetición:** "Nosotros" (versión intermedia) listaba capacidades que duplicaban Servicios y Capacidades Técnicas.

### Interpretación del visitante (antes de los cambios)
> "Se ve moderno y profesional, pero ¿quiénes son? No hay casos, el botón de caso no hace nada, y los números suenan a plantilla. ¿Equipo con trayectoria o freelancer con buen template?"
> **Diseño alto, confianza a medias.**

---

## 4. Cambios ya aplicados

- ➕ **Nueva sección `AboutSection` ("Nosotros")**, anónima, enfocada en **diferencial** (no servicios):
  - Titular: *"El nivel de las grandes empresas, sin su complejidad ni su costo."*
  - 4 tarjetas: **+14 años combinados** (destacada) · Empresas y gobierno · Estándares enterprise · Certificados (UiPath, Microsoft, IBM).
  - Fila de **stack tecnológico** (21 tecnologías) como señal de profundidad.
- 🔁 **Stats reales** en `ProofStrip`: `+14` años de experiencia combinada · `+5` proyectos entregados · `7-14` días de entrega.
- 🔁 **FAQ:** se quitaron "100% satisfacción", "95% retención", "50+ proyectos" → reemplazados por hechos ("comunicación diaria", "30 días de soporte incluido", "clientes en Uruguay y Argentina").
- 🔁 **`<meta>` SEO:** se quitó "Trusted by 50+ startups" → ahora describe la experiencia real.
- ➕ **Nav:** se agregó "Nosotros / About" → `#about`.

---

## 5. Roadmap / pendientes

**Hecho (Fase 2 — rama `feat/portfolio`):**
- ✅ **Sección de Casos** (`/portfolio` + `/portfolio/[slug]`, estilo Houlak, 6 casos anónimos por rubro, color propio). Fuente: `src/data/cases.ts`.
- ✅ **Identidad alineada al logo** (azul→violeta) en todo el sitio; los casos recorren ese arco de marca.
- ✅ **Servicios = 4 pilares** (RPA explícito, IA, Web, **Consultoría y Capacitación**) + franja **"Cómo podés contratarnos"** (por proyecto/hora/consultoría/jornadas). Diferenciado de "Cómo lo hacemos".
- ✅ **Certificaciones** con logos (UiPath, Rocketbot, Microsoft, IBM).
- ✅ **Stack** reorganizado en 6 categorías (cobertura full-stack).
- ✅ **Seguridad/compliance** (ISO 9001 + PCI-DSS, como experiencia) en Nosotros/FAQ/footer — ver §2 y §8.
- ✅ **Tiempos** matizados a "desde 7-14 días según complejidad".
- ✅ **Overhaul de UX/movimiento** (anti-"boxiness"): sistema `glass-panel` + scroll-reveal + glows + `CircuitFlow` + dock de proximidad. Detalle técnico en `ROADMAP.md`.

**Pendiente:** ver lista priorizada en [`ROADMAP.md`](ROADMAP.md) → "Próximos pasos". Lo más relevante de contenido:
- **(A futuro)** Testimonios reales para reactivar prueba social.
- **(A futuro)** `result` real por caso en `cases.ts` (hoy omitido para no inventar métricas).
- **(A futuro)** Casos de consultoría/capacitación en `/portfolio` cuando haya material confirmado (ver §8).
- Confirmar wording exacto de PCI-DSS (¿entorno que cumplía vs. implementación de controles?).

---

## 6. 🔒 Contexto interno (NO publicar en el sitio)

> Esta info es para entender el respaldo real y redactar copy con fundamento. **Nunca** va al sitio con nombres.

**Fundadores:** dos co-fundadores, ingenieros en sistemas (UTN).
- Perfil A: ~7 años en automatización de procesos (RPA) en entornos enterprise de multinacionales (incl. una química global y una Big Four), referente técnica/mentora, hoy con foco en IA (Máster en curso). Stack: UiPath, Blue Prism, Python, Azure, SQL.
- Perfil B: ~7 años combinando automatización, datos y visión de negocio; experiencia en fintech/pagos (privado) y en **sector público** (organismo estatal en Salta, AR); lideró equipos (+30 personas), ISO 9001, BPMN. Stack: UiPath, Rocketbot, Power Automate, Node.js, Supabase, AWS, Python, Power BI. Funda y dirige una ONG.

Juntos cubren: **ingeniería de automatización enterprise + IA + desarrollo full-cycle + visión de negocio + experiencia público/privada.** Eso es el diferencial.

---

## 7. Proyectos reales (para la sección de Casos — anonimizar por rubro)

> Confirmar permiso antes de publicar cualquier nombre. Mientras tanto, describir por rubro.

Estos 6 ya están publicados como casos en `/portfolio` (slug entre paréntesis):

1. **ONG / fundación** *(proyecto propio)* — `fundacion-educativa-deportiva`: presencia digital completa — sitio institucional, panel admin + portal de socios/usuarios, pasarela de pago para donaciones y suscripciones mensuales; integraciones con Google for Nonprofits, TechSoup/Canva, Goodstack, Mercado Libre Solidario; plataforma de clases virtuales con convenio de un Ministerio de Educación provincial (AR).
2. **Preparación física de alto rendimiento** (Salta, AR) — `preparacion-fisica-alto-rendimiento`: sitio web / landing de conversión para un preparador físico, foco en método basado en datos.
3. **Plataforma de gestión de gimnasio** — `gestion-de-gimnasio`: sistema de gestión con check-in, métricas/analytics por atleta, planes y cobro de cuotas (MercadoPago AR y UY), reportes.
4. **Marca de wellness / vida saludable** (Salta, AR) — `marca-de-wellness`: presencia digital, catálogo, turnos por WhatsApp, CMS autogestionable.
5. **Courier / import-export** (Uruguay) — `logistica-courier`: sitio web entregado; sistema de gestión interna en desarrollo.
6. **E-commerce de electrónica** (Uruguay) — `ecommerce-electronica`: tienda online completa con pasarela de pago, backend robusto, manejo de stock y de kits de productos, y gestión interna.

Rubros que demuestran versatilidad: ONG, salud/fitness (×2), wellness, logística/comercio exterior, e-commerce.

---

## 8. Consultoría y capacitación (línea de servicio)

Además de **ejecutar** soluciones, el equipo tiene perfil para **asesorar y formar**: es la misma experiencia enterprise/pública transferida a otros equipos. Es una vía de relación que **no depende de un proyecto de software** y refuerza el posicionamiento "nivel de las grandes empresas". Dos formatos:

- **Consultoría.** Diagnóstico de procesos y oportunidades de automatización/IA; relevamiento y rediseño de procesos (BPMN); arquitectura de soluciones; hoja de ruta de transformación digital; gobierno y aprovechamiento de datos.
- **Capacitación / jornadas.** Formación a equipos y empresas en automatización (RPA/UiPath), **IA aplicada / IA generativa para negocios**, fundamentos de datos y Power BI, y cultura de automatización. **En distintas escalas**: desde una charla/taller puntual hasta un programa a medida; presencial o remoto.

**Respaldo real (ver §6):** mentoría y formación técnica en entornos enterprise, liderazgo de equipos (+30 personas), ISO 9001 / BPMN y experiencia en sector público — base creíble para pararse frente a un equipo.

**Certificaciones reales (publicables — alimentan la franja "Certificaciones" del sitio):**
- **UiPath** — RPA Developer Certification; Automation Project Manager; Introducción a RPA y Automatización.
- **Microsoft** — Azure AI Fundamentals (AI-900).
- **IBM** — Tools for Data Science; IBM Data Science Professional Certificate *(en curso)*.
- **Rocketbot** — Rocketbot Suite (Level 1) — RPA.
- **Otras:** Scrum Foundation (CertiProf); Azure Data Engineer (Udemy); AI for Everyone (Coursera); CCNA (Cisco); DELF A1 (francés).
- **Académico:** Ingenieros en Sistemas de Información (UTN). **En curso:** Máster en IA (VIU), Diplomatura en Data Science (UTN FRBA), Diplomatura en Transformación Digital.

> En el sitio se muestran con logo oficial las marcas reconocibles y on-message (**UiPath, Rocketbot, Microsoft, IBM**), en monocromo blanco que revela su color al hover. El resto (Scrum, Cisco, Coursera, etc.) queda como reserva. Solo se publica lo que es real (línea roja de honestidad).

### 🔒 Tracción honesta (interno — NO publicar)
Se hizo en **distintos momentos y medidas**, con resultados dispares. Esto es contexto para redactar copy con fundamento y para calibrar el posicionamiento — **no** son métricas para el sitio:
- ✅ **Realizadas con éxito:** _(completar con instancias concretas — p. ej. mentoría/formación interna en enterprise, capacitaciones en la ONG/sector público)._
- 🌱 **En gestación:** propuestas y conversaciones en curso que todavía no cerraron.
- ⚠️ **No valoradas / no avanzaron:** algunas no prosperaron porque el **nivel propuesto excedía** lo que el interlocutor estaba dispuesto a pagar o a aprovechar. Lectura: apuntamos alto; el aprendizaje es **calificar mejor al cliente** y **graduar la oferta** (de un taller introductorio a un programa completo), no bajar el nivel.

**Implicancia de posicionamiento:** presentar la consultoría/capacitación con **formatos escalonados** para no dejar afuera a PYMEs, manteniendo el techo alto para quien lo valore. Cuando haya instancias confirmadas (con permiso), pueden volverse casos anónimos en `/portfolio` o testimonios.

> ⚠️ **Pendiente de definición tuya:** confirmá qué consultorías/capacitaciones concretas se hicieron (y cuáles podemos nombrar/anonimizar) para completar el ✅ de arriba y, si querés, sumar la sección "Consultoría" al sitio.
