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

---

## 2. Decisiones de marca tomadas (con el cliente)

- **Equipo anónimo:** sin nombres ni fotos de los fundadores. No se sienten cómodos exponiéndose; prefieren credibilidad por experiencia, no por figuración.
- **Sin nombrar ex-empleadores:** la experiencia en multinacionales/gobierno se menciona en genérico.
- **Sin métricas infladas:** se eliminaron las inventadas; solo datos defendibles.
- **Clientes anonimizados por rubro** hasta tener permiso para nombrarlos.
- **Tono:** vendible/marketinero pero **sin humo**, hablándole directo al lector.
- **Texto mínimo, mucho visual:** la sección "Nosotros" no debe ser un párrafo largo (se sentía "fantasma"); se resuelve con titular + 1 línea + elementos visuales.

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

1. **Sección de Casos (prueba social real).** Anónimos por rubro. Insumos en §7. Darle destino real al botón "Ver Caso de Éxito".
2. **Bug:** footer enlaza `#faq` pero la sección FAQ tiene `id="process"` → corregir.
3. **Bug:** botón "Ver Caso de Éxito" (`ServicesSection.tsx`) desactivado → arreglar o quitar.
4. **(Opcional)** Logos reales del stack en vez de texto (pega más fuerte).
5. **(A futuro)** Testimonios reales de clientes para reactivar prueba social.

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

1. **ONG / fundación** *(proyecto propio)*: presencia digital completa — sitio institucional, panel admin + portal de socios/usuarios, pasarela de pago para donaciones y suscripciones mensuales; integraciones con Google for Nonprofits, TechSoup/Canva, Goodstack, Mercado Libre Solidario; plataforma de clases virtuales con convenio de un Ministerio de Educación provincial (AR).
2. **Preparador físico / gimnasio de alto rendimiento** (Salta, AR): sitio web + sistema de gestión con métricas, analytics y cobro de cuotas (MercadoPago AR y UY).
3. **Marca de wellness / vida saludable** (Salta, AR): presencia digital.
4. **Courier / import-export** (Uruguay): sitio web entregado; sistema de gestión interna en desarrollo.
5. **E-commerce de electrónica** (Uruguay): tienda online completa con pasarela de pago, backend robusto, manejo de stock y de kits de productos, y gestión interna.

Rubros que demuestran versatilidad: ONG, salud/fitness, wellness, logística/comercio exterior, e-commerce.
