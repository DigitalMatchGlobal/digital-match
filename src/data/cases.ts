// Fuente única de los casos del portfolio.
// Reglas (ver CLAUDE.md): anónimos por rubro (sin nombres/logos de clientes),
// bilingüe ES/EN siempre, sin métricas inventadas (`result` solo si es real).
//
// ⚠️ MÉTRICAS (`metrics`): los valores actuales son EJEMPLOS / PLACEHOLDER para
// definir el formato visual de la card. Reemplazar `value` por el dato real de
// cada caso ANTES de mergear a producción (no romper la regla "no inventar métricas").
// Las etiquetas (`label`) ya están redactadas y son bilingües; normalmente solo
// hay que ajustar el número en `value`.
//
// SISTEMA DE COLOR (decidido): un único arco de marca azul → violeta (del logo).
// Los casos están ordenados a lo largo de ese espectro (cyan-azul → púrpura) para
// que al navegar de uno a otro se sienta el flujo del degradado del logo, sin
// romper la identidad. Acentos globales: ver src/styles/tailwind.css.

export type LocalizedText = { es: string; en: string };

// Una métrica de resultado: `value` es el dato (número/símbolo, idealmente lo
// único a editar), `label` describe qué mide (bilingüe).
export type CaseMetric = { value: string; label: LocalizedText };

// Cita anónima (rol, nunca nombre). OPCIONAL — usar solo con testimonios reales.
export type CaseQuote = { text: LocalizedText; author: LocalizedText };

// Segmento del caso. Separa DOS tipos de trabajo que no se comparan entre sí:
//  - 'client'     → proyectos entregados a clientes (default si se omite).
//  - 'enterprise' → soluciones de ingeniería construidas para operaciones
//                   corporativas (entorno Microsoft: Azure DevOps, SharePoint,
//                   SQL Server). Herramientas internas a medida, en uso real.
// Se muestran en una banda propia del portfolio y llevan badge en la card.
export type CaseSegment = 'client' | 'enterprise';

export type Case = {
    slug: string;
    segment?: CaseSegment; // omitido = 'client'
    icon: string; // nombre válido de Heroicons v2 (ver AppIcon)
    accent: string; // sobrescribe --color-accent en la página del caso (matiz del arco de marca)
    accentSecondary: string; // sobrescribe --color-accent-secondary
    watermark: string; // palabra grande de fondo (anónima: rubro, no cliente)
    complexity: number; // 1–5 — para rankear y elegir destacados (ver ranking en chat / featured)
    rubro: LocalizedText;
    tag: LocalizedText; // chip corto: TIPO de proyecto (ej. "Tienda online + pagos")
    headline: LocalizedText; // titular del caso (estilo "Introducing...")
    challenge: LocalizedText;
    solution: LocalizedText;
    services: LocalizedText[];
    metrics?: CaseMetric[]; // 3 recomendadas — el "héroe" visual de la card (ver ⚠️ arriba)
    image?: string; // OPCIONAL — ruta a screenshot/mockup real (public/...). Si falta, se usa el ícono.
    quote?: CaseQuote; // OPCIONAL — cita anónima real (no inventar)
    result?: LocalizedText; // OPCIONAL — solo con un dato verdadero/defendible
};

export const cases: Case[] = [
    {
        slug: 'logistica-courier',
        icon: 'TruckIcon',
        accent: '#38BDF8',
        accentSecondary: '#4C8EFF',
        watermark: 'Logística',
        complexity: 2,
        rubro: {
            es: 'Logística y courier (B2B)',
            en: 'Logistics & courier (B2B)',
        },
        tag: {
            es: 'Landing corporativa bilingüe',
            en: 'Bilingual corporate landing',
        },
        headline: {
            es: 'Logística que se mueve a otra velocidad.',
            en: 'Logistics that moves at another speed.',
        },
        challenge: {
            es: 'Necesitaban una presencia digital profesional y bilingüe que comunicara con claridad sus servicios de logística y distribución a clientes corporativos.',
            en: 'They needed a professional, bilingual digital presence that clearly communicated their logistics and distribution services to corporate clients.',
        },
        solution: {
            es: 'Landing corporativa bilingüe con un recorrido visual de la operación logística, secciones de servicios y un formulario de contacto que enruta las consultas directo al equipo comercial.',
            en: 'A bilingual corporate landing with a visual walkthrough of the logistics operation, service sections, and a contact form routing inquiries straight to the sales team.',
        },
        services: [
            { es: 'Landing corporativa', en: 'Corporate landing' },
            { es: 'Diseño bilingüe (ES/EN)', en: 'Bilingual design (ES/EN)' },
            { es: 'Animaciones e identidad visual', en: 'Animations & visual identity' },
            { es: 'Formulario de contacto', en: 'Contact form' },
        ],
        metrics: [
            { value: '3×', label: { es: 'consultas comerciales', en: 'sales inquiries' } },
            { value: 'ES/EN', label: { es: 'sitio bilingüe', en: 'bilingual site' } },
            { value: '7 días', label: { es: 'a producción', en: 'to production' } },
        ],
    },
    {
        slug: 'ecommerce-electronica',
        icon: 'ShoppingBagIcon',
        accent: '#3B82F6',
        accentSecondary: '#6366F1',
        watermark: 'Retail',
        complexity: 4,
        rubro: {
            es: 'E-commerce de electrónica',
            en: 'Electronics e-commerce',
        },
        tag: {
            es: 'Tienda online + pagos',
            en: 'Online store + payments',
        },
        headline: {
            es: 'Una tienda online lista para vender.',
            en: 'An online store ready to sell.',
        },
        challenge: {
            es: 'Vender productos y kits combinados online exigía un checkout con pagos, control de stock en tiempo real y una forma de gestionar y conciliar las órdenes.',
            en: 'Selling products and bundled kits online required checkout with payments, real-time stock control, and a way to manage and reconcile orders.',
        },
        solution: {
            es: 'Tienda online con catálogo de productos y kits, checkout con pasarela de pagos y transferencia, carrito persistente, control de stock en tiempo real y un panel para gestionar órdenes y conciliar pagos.',
            en: 'An online store with a product and bundle catalog, checkout with a payment gateway and bank transfer, a persistent cart, real-time stock control, and a panel to manage orders and reconcile payments.',
        },
        services: [
            { es: 'Tienda online (e-commerce)', en: 'Online store (e-commerce)' },
            { es: 'Integración de pagos', en: 'Payment integration' },
            { es: 'Gestión de stock y órdenes', en: 'Stock & order management' },
            { es: 'Panel de administración', en: 'Admin dashboard' },
        ],
        metrics: [
            { value: '+45%', label: { es: 'conversión a compra', en: 'purchase conversion' } },
            { value: 'Tiempo real', label: { es: 'control de stock', en: 'stock control' } },
            { value: '3 pasos', label: { es: 'checkout', en: 'checkout' } },
        ],
    },
    {
        slug: 'fundacion-educativa-deportiva',
        icon: 'BuildingLibraryIcon',
        accent: '#4C8EFF',
        accentSecondary: '#6D5DFE',
        watermark: 'Fundación',
        complexity: 5,
        rubro: {
            es: 'ONG / Fundación educativa y deportiva',
            en: 'Nonprofit / Educational & sports foundation',
        },
        tag: {
            es: 'Plataforma de socios',
            en: 'Member platform',
        },
        headline: {
            es: 'Una plataforma a la altura de una fundación que educa y transforma.',
            en: 'A platform worthy of a foundation that educates and transforms.',
        },
        challenge: {
            es: 'Gestionaban inscripciones a actividades, membresías y donaciones de forma manual y dispersa, sin un portal único para socios ni visibilidad de los registros.',
            en: 'They managed activity sign-ups, memberships and donations manually and scattered, with no single member portal or visibility into registrations.',
        },
        solution: {
            es: 'Plataforma web con registro de socios, inscripción a actividades educativas y deportivas, membresías con donaciones online y un panel de administración para gestionar actividades, novedades y alianzas.',
            en: 'A web platform with member sign-up, enrollment in educational and sports activities, memberships with online donations, and an admin panel to manage activities, news and partnerships.',
        },
        services: [
            { es: 'Desarrollo web a medida', en: 'Custom web development' },
            { es: 'Portal de socios y autenticación', en: 'Member portal & authentication' },
            { es: 'Pagos y donaciones online', en: 'Online payments & donations' },
            { es: 'Panel de administración', en: 'Admin dashboard' },
        ],
        metrics: [
            { value: '−70%', label: { es: 'gestión manual', en: 'manual work' } },
            { value: '1 portal', label: { es: 'socios y donaciones', en: 'members & donations' } },
            { value: 'Online', label: { es: 'inscripciones y pagos', en: 'sign-ups & payments' } },
        ],
    },
    {
        slug: 'gestion-de-gimnasio',
        icon: 'ChartBarIcon',
        accent: '#6366F1',
        accentSecondary: '#8B5CF6',
        watermark: 'Gym OS',
        complexity: 5,
        rubro: {
            es: 'Plataforma de gestión de gimnasio',
            en: 'Gym management platform',
        },
        tag: {
            es: 'SaaS de gestión',
            en: 'Management SaaS',
        },
        headline: {
            es: 'El sistema operativo de un gimnasio moderno.',
            en: 'The operating system of a modern gym.',
        },
        challenge: {
            es: 'Gestionar atletas, clases, accesos y pagos en planillas no escalaba ni daba visibilidad del progreso de cada atleta.',
            en: 'Managing athletes, classes, access and payments in spreadsheets did not scale or give visibility into each athlete’s progress.',
        },
        solution: {
            es: 'Plataforma web con check-in por kiosco, gestión de atletas y entrenadores, programación de clases y planes de pago, análisis de rendimiento por atleta y exportación de reportes en PDF.',
            en: 'A web platform with kiosk check-in, athlete and coach management, class and payment-plan scheduling, per-athlete performance analytics, and PDF report exports.',
        },
        services: [
            { es: 'Aplicación web (SaaS)', en: 'Web application (SaaS)' },
            { es: 'Control de acceso / check-in', en: 'Access control / check-in' },
            { es: 'Dashboards y analítica', en: 'Dashboards & analytics' },
            { es: 'Reportes en PDF', en: 'PDF reports' },
        ],
        metrics: [
            { value: '−80%', label: { es: 'tiempo en planillas', en: 'time on spreadsheets' } },
            { value: 'x atleta', label: { es: 'analítica de progreso', en: 'progress analytics' } },
            { value: 'PDF', label: { es: 'reportes automáticos', en: 'automated reports' } },
        ],
    },
    {
        slug: 'marca-de-wellness',
        icon: 'SparklesIcon',
        accent: '#6D5DFE',
        accentSecondary: '#8B5CF6',
        watermark: 'Wellness',
        complexity: 3,
        rubro: {
            es: 'Marca de wellness y salud natural',
            en: 'Wellness & natural health brand',
        },
        tag: {
            es: 'Catálogo + reservas',
            en: 'Catalog + bookings',
        },
        headline: {
            es: 'Bienestar natural, ahora también online.',
            en: 'Natural wellness, now online too.',
        },
        challenge: {
            es: 'La marca dependía de mensajes manuales para coordinar turnos y no tenía dónde mostrar su catálogo de productos y terapias de forma profesional.',
            en: 'The brand relied on manual messaging to coordinate appointments and had nowhere to showcase its product and therapy catalog professionally.',
        },
        solution: {
            es: 'Sitio con catálogo de productos y terapias, reserva de turnos integrada con WhatsApp y un panel de administración para que el equipo actualice contenido, productos y testimonios sin tocar código.',
            en: 'A site with a product and therapy catalog, WhatsApp-integrated appointment booking, and an admin panel so the team can update content, products and testimonials without touching code.',
        },
        services: [
            { es: 'Sitio web + catálogo', en: 'Website + catalog' },
            { es: 'Reserva de turnos por WhatsApp', en: 'WhatsApp appointment booking' },
            { es: 'CMS / panel autogestionable', en: 'Self-managed CMS' },
            { es: 'SEO', en: 'SEO' },
        ],
        metrics: [
            { value: '−60%', label: { es: 'coordinación manual', en: 'manual coordination' } },
            { value: '24/7', label: { es: 'reservas por WhatsApp', en: 'WhatsApp bookings' } },
            { value: 'CMS', label: { es: 'autogestionable', en: 'self-managed' } },
        ],
    },
    {
        slug: 'preparacion-fisica-alto-rendimiento',
        icon: 'BoltIcon',
        accent: '#8B5CF6',
        accentSecondary: '#A78BFA',
        watermark: 'Performance',
        complexity: 1,
        rubro: {
            es: 'Preparación física de alto rendimiento',
            en: 'High-performance physical training',
        },
        tag: {
            es: 'Landing de conversión',
            en: 'Conversion landing',
        },
        headline: {
            es: 'Entrenamiento de alto rendimiento, basado en datos.',
            en: 'High-performance training, driven by data.',
        },
        challenge: {
            es: 'Un preparador físico necesitaba diferenciar su método —entrenamiento personalizado basado en datos— de las rutinas genéricas, con una presencia digital a la altura.',
            en: 'A strength coach needed to set his method —data-driven personalized training— apart from generic routines, with a digital presence to match.',
        },
        solution: {
            es: 'Landing de alto impacto que comunica el método de evaluación y planificación basado en datos, orientada a convertir visitantes en consultas.',
            en: 'A high-impact landing that communicates the data-driven assessment and planning method, designed to turn visitors into inquiries.',
        },
        services: [
            { es: 'Landing de conversión', en: 'Conversion landing' },
            { es: 'Identidad visual', en: 'Visual identity' },
            { es: 'Diseño responsive', en: 'Responsive design' },
            { es: 'Optimización de performance', en: 'Performance optimization' },
        ],
        metrics: [
            { value: '2×', label: { es: 'consultas calificadas', en: 'qualified inquiries' } },
            { value: 'Data', label: { es: 'método diferenciado', en: 'differentiated method' } },
            { value: '<1s', label: { es: 'carga de la landing', en: 'landing load time' } },
        ],
    },
    {
        slug: 'plataforma-whatsapp',
        icon: 'ChatBubbleLeftRightIcon',
        accent: '#5B7CF0',
        accentSecondary: '#7C6FF5',
        watermark: 'WhatsApp',
        complexity: 4,
        rubro: {
            es: 'Plataforma SaaS de automatización (WhatsApp)',
            en: 'WhatsApp automation SaaS platform',
        },
        tag: {
            es: 'SaaS multi-tenant + IA',
            en: 'Multi-tenant SaaS + AI',
        },
        headline: {
            es: 'Conversaciones de WhatsApp en piloto automático.',
            en: 'WhatsApp conversations on autopilot.',
        },
        challenge: {
            es: 'Atender clientes por WhatsApp a mano no escalaba: respuestas lentas, equipos sin una bandeja común y cero forma de automatizar sin perder el toque humano.',
            en: 'Handling WhatsApp customers by hand did not scale: slow replies, teams without a shared inbox, and no way to automate without losing the human touch.',
        },
        solution: {
            es: 'Plataforma SaaS multi-tenant que conecta canales de WhatsApp Business vía Meta, automatiza conversaciones con flujos por reglas e IA, suma una bandeja de agentes para la intervención humana y un panel con métricas y sincronización de plantillas.',
            en: 'A multi-tenant SaaS platform that connects WhatsApp Business channels via Meta, automates conversations with rule-based flows and AI, adds an agent inbox for human handoff, and a dashboard with metrics and template sync.',
        },
        services: [
            { es: 'Plataforma SaaS multi-tenant', en: 'Multi-tenant SaaS platform' },
            { es: 'Integración WhatsApp Business API', en: 'WhatsApp Business API integration' },
            { es: 'Bot conversacional + IA', en: 'Conversational bot + AI' },
            { es: 'Bandeja de agentes y métricas', en: 'Agent inbox & analytics' },
        ],
        metrics: [
            { value: '24/7', label: { es: 'atención automatizada', en: 'automated support' } },
            { value: '−65%', label: { es: 'tiempo de respuesta', en: 'response time' } },
            { value: 'IA', label: { es: 'respuestas asistidas', en: 'AI-assisted replies' } },
        ],
    },
    {
        slug: 'diplomado-online',
        icon: 'AcademicCapIcon',
        accent: '#8B5CF6',
        accentSecondary: '#A78BFA',
        watermark: 'Academia',
        complexity: 1,
        rubro: {
            es: 'Formación profesional online (EdTech)',
            en: 'Online professional education (EdTech)',
        },
        tag: {
            es: 'Landing de programa educativo',
            en: 'Education program landing',
        },
        headline: {
            es: 'Un diplomado online que profesionaliza todo un sector.',
            en: 'An online diploma that professionalizes an entire sector.',
        },
        challenge: {
            es: 'Lanzar un diplomado online y llenarlo exigía comunicar con claridad el programa, transmitir autoridad y convertir interesados en inscriptos, con una presencia a la altura.',
            en: 'Launching an online diploma and filling it required clearly communicating the program, conveying authority and turning interest into enrollments, with a presence to match.',
        },
        solution: {
            es: 'Landing de alta conversión que presenta el currículum por módulos, el cuerpo docente y las preguntas frecuentes, con un embudo de inscripción medido por analítica e integrado al ecosistema de aulas y formularios.',
            en: 'A high-conversion landing presenting the modular curriculum, faculty and FAQ, with an analytics-tracked enrollment funnel integrated into the classroom and forms ecosystem.',
        },
        services: [
            { es: 'Landing de conversión', en: 'Conversion landing' },
            { es: 'Estructura del programa (currículum)', en: 'Program structure (curriculum)' },
            { es: 'Embudo de inscripción + analítica', en: 'Enrollment funnel + analytics' },
            { es: 'Integración con aulas y formularios', en: 'Classroom & forms integration' },
        ],
        metrics: [
            { value: '12 semanas', label: { es: 'programa estructurado', en: 'structured program' } },
            { value: 'Online', label: { es: 'inscripción y cursado', en: 'enrollment & learning' } },
            { value: 'Tracking', label: { es: 'embudo medido', en: 'measured funnel' } },
        ],
    },
    {
        slug: 'cuidado-asistencia-voz',
        icon: 'MicrophoneIcon',
        accent: '#4C8EFF',
        accentSecondary: '#6366F1',
        watermark: 'Cuidado',
        complexity: 4,
        rubro: {
            es: 'Salud y cuidado de personas (asistencia por voz)',
            en: 'Health & personal care (voice assistance)',
        },
        tag: {
            es: 'App web + skill de voz (Alexa)',
            en: 'Web app + voice skill (Alexa)',
        },
        headline: {
            es: 'Pedir ayuda, con solo la voz.',
            en: 'Calling for help, with just your voice.',
        },
        challenge: {
            es: 'Las personas mayores o en situación de riesgo pueden no manejar bien un celular en una emergencia. Hacía falta una forma simple, sin manos, de avisar al instante a sus contactos.',
            en: 'Elderly or at-risk people may struggle with a phone during an emergency. They needed a simple, hands-free way to alert their contacts instantly.',
        },
        solution: {
            es: 'Plataforma full-stack: un panel web para gestionar contactos de emergencia y una skill de voz para Alexa (bilingüe) que, con un solo comando, dispara alertas por SMS y llamada vía Twilio. Login con Amazon y backend serverless en AWS.',
            en: 'A full-stack platform: a web panel to manage emergency contacts and a bilingual Alexa voice skill that, with a single command, triggers SMS and call alerts via Twilio. Amazon login and a serverless AWS backend.',
        },
        services: [
            { es: 'App web + API REST', en: 'Web app + REST API' },
            { es: 'Skill de voz para Alexa (ES/EN)', en: 'Alexa voice skill (ES/EN)' },
            { es: 'Alertas por SMS y llamada (Twilio)', en: 'SMS & call alerts (Twilio)' },
            { es: 'Arquitectura serverless en AWS', en: 'Serverless architecture on AWS' },
        ],
        metrics: [
            { value: 'Voz', label: { es: 'activación sin manos', en: 'hands-free trigger' } },
            { value: 'Al instante', label: { es: 'alerta a contactos', en: 'alert to contacts' } },
            { value: 'ES/EN', label: { es: 'skill bilingüe', en: 'bilingual skill' } },
        ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SEGMENTO ENTERPRISE
    // Soluciones de ingeniería para operaciones corporativas sobre stack
    // Microsoft. Son herramientas internas a medida, construidas por el equipo
    // y EN USO REAL — no encargos de cliente. Por eso se redactan como CLASE DE
    // PROBLEMA (el dolor se repite en cualquier organización con ese stack), no
    // como un encargo puntual: no se afirma ninguna contratación que no existió.
    //
    // ⚠️ Anonimato reforzado (CLAUDE.md §7): sin sector, sin volúmenes de
    // negocio, sin nombres de sistemas internos. Nunca capturas ni código.
    //
    // ⚠️ MÉTRICAS: acá los valores SÍ son reales y contados del proyecto (no
    // placeholder). Cada una lleva de dónde sale, para poder defenderla en una
    // llamada. Miden LA HERRAMIENTA, nunca el negocio de un tercero.
    // ─────────────────────────────────────────────────────────────────────────
    {
        slug: 'trazabilidad-documental',
        segment: 'enterprise',
        icon: 'DocumentMagnifyingGlassIcon',
        accent: '#0EA5E9',
        accentSecondary: '#3B82F6',
        watermark: 'Trazabilidad',
        complexity: 5,
        rubro: {
            es: 'Gobernanza documental (entorno Microsoft)',
            en: 'Document governance (Microsoft stack)',
        },
        tag: {
            es: 'Herramienta interna a medida',
            en: 'Custom internal tool',
        },
        headline: {
            es: 'La matriz de trazabilidad que nadie quería armar a mano.',
            en: 'The traceability matrix nobody wanted to build by hand.',
        },
        challenge: {
            es: 'En organizaciones que llevan los requerimientos en Azure DevOps y la documentación en SharePoint, cruzar ambos mundos es trabajo manual: alguien arma la matriz de trazabilidad en una planilla y al día siguiente ya quedó vieja. Nadie sabe qué documento falta, cuál está desactualizado ni qué se está desarrollando sin especificación aprobada.',
            en: 'In organizations that track requirements in Azure DevOps and documentation in SharePoint, cross-checking the two is manual work: someone builds the traceability matrix in a spreadsheet and it is outdated the next day. Nobody knows which document is missing, which one is stale, or what is being built without an approved spec.',
        },
        solution: {
            es: 'Antes de escribir código mapeamos la operativa real: cómo se nombran los documentos, qué versiona cada área y en qué momento del ciclo se aprueban. Sobre ese análisis construimos un motor que inventaría SharePoint, clasifica cada documento por tipo (negocio, funcional, técnico, testing) con reglas de nombre y contexto, recorre el árbol completo de work items de Azure DevOps y los cruza en ambas direcciones. El resultado es una matriz viva con score de cobertura, más un reporte que señala documentos referenciados que no existen, versiones desactualizadas y archivos huérfanos.',
            en: 'Before writing code we mapped the real process: how documents get named, what each area versions, and when in the cycle they are approved. On top of that analysis we built an engine that inventories SharePoint, classifies each document by type (business, functional, technical, testing) using name and context rules, walks the full Azure DevOps work-item tree and cross-checks both directions. The output is a living matrix with a coverage score, plus a report flagging referenced documents that do not exist, stale versions and orphan files.',
        },
        services: [
            { es: 'Análisis y reingeniería de procesos', en: 'Process analysis & reengineering' },
            { es: 'Integración Azure DevOps + SharePoint', en: 'Azure DevOps + SharePoint integration' },
            { es: 'Motor de clasificación y matcheo', en: 'Classification & matching engine' },
            { es: 'Reportes y tablero de control', en: 'Reporting & control dashboard' },
        ],
        metrics: [
            // 688 = suma de work items de los 15 árboles de épica procesados.
            { value: '688', label: { es: 'work items cruzados', en: 'work items cross-checked' } },
            // Azure DevOps + SharePoint, conectados por API.
            { value: '2 sistemas', label: { es: 'conectados por API', en: 'connected via API' } },
            // 20 = brechas del reporte de un solo proyecto (faltantes + desactualizados + huérfanos).
            { value: '20', label: { es: 'brechas detectadas', en: 'gaps detected' } },
        ],
        result: {
            es: 'Brechas de documentación que antes no se revisaban, ahora detectadas en minutos y con evidencia.',
            en: 'Documentation gaps that used to go unreviewed are now detected in minutes, with evidence.',
        },
    },
    {
        slug: 'operaciones-base-datos',
        segment: 'enterprise',
        icon: 'CircleStackIcon',
        accent: '#4F46E5',
        accentSecondary: '#6D5DFE',
        watermark: 'Operaciones',
        complexity: 5,
        rubro: {
            es: 'Operaciones sobre bases de datos críticas',
            en: 'Critical database operations',
        },
        tag: {
            es: 'Herramienta interna a medida',
            en: 'Custom internal tool',
        },
        headline: {
            es: 'Tocar producción sin cruzar los dedos.',
            en: 'Touching production without crossing your fingers.',
        },
        challenge: {
            es: 'Las tareas de mantenimiento sobre bases críticas se resolvían a mano: conectarse con credenciales compartidas, correr procedimientos sueltos y confiar en que el resultado fuera el esperado. Sin simulación previa, sin forma de comparar el antes y el después, y sin registro de quién ejecutó qué. Un error no se detectaba hasta que alguien lo reportaba.',
            en: 'Maintenance on critical databases was handled by hand: connect with shared credentials, run loose procedures and hope the result was the expected one. No dry run, no way to compare before and after, and no record of who ran what. A mistake went unnoticed until someone reported it.',
        },
        solution: {
            es: 'Primero desarmamos el procedimiento operativo para entender qué se ejecutaba, en qué orden y qué se validaba en cada paso. Con eso rediseñamos el flujo en una aplicación web: sesión con credenciales propias de cada operador, configurador que arma la corrida, ejecución en modo simulación (dry-run) antes de confirmar, snapshots del estado previo y posterior con comparador lado a lado, y un registro de auditoría que guarda cada ejecución con su autor, sus parámetros, su duración y su resultado.',
            en: 'We first took the operating procedure apart to understand what ran, in what order and what was validated at each step. Then we redesigned the flow as a web application: per-operator credentialed sessions, a configurator that assembles the run, dry-run execution before committing, before/after snapshots with a side-by-side comparator, and an audit log that stores every execution with its author, parameters, duration and outcome.',
        },
        services: [
            { es: 'Análisis y reingeniería de procesos', en: 'Process analysis & reengineering' },
            { es: 'Orquestación de procedimientos', en: 'Procedure orchestration' },
            { es: 'Auditoría y trazabilidad', en: 'Audit trail & traceability' },
            { es: 'Control de acceso por operador', en: 'Per-operator access control' },
        ],
        metrics: [
            // Toda ejecución escribe su registro de auditoría: no hay corrida sin log.
            { value: '100%', label: { es: 'ejecuciones auditadas', en: 'executions audited' } },
            // Modo simulación disponible antes de confirmar cualquier cambio.
            { value: 'Dry-run', label: { es: 'antes de confirmar', en: 'before committing' } },
            // Snapshots del estado previo y posterior, comparables lado a lado.
            { value: 'Antes/después', label: { es: 'estado comparable', en: 'comparable state' } },
        ],
        result: {
            es: 'Cada cambio queda registrado con autor, parámetros y resultado: el historial existe aunque nadie lo pida.',
            en: 'Every change is logged with author, parameters and outcome: the history exists even when nobody asks for it.',
        },
    },
    {
        slug: 'portal-documentacion-api',
        segment: 'enterprise',
        icon: 'BookOpenIcon',
        accent: '#6366F1',
        accentSecondary: '#8B5CF6',
        watermark: 'Developers',
        complexity: 4,
        rubro: {
            es: 'Portal de desarrolladores (documentación de APIs)',
            en: 'Developer portal (API documentation)',
        },
        tag: {
            es: 'Portal de documentación',
            en: 'Documentation portal',
        },
        headline: {
            es: 'Documentación que se genera sola desde la API.',
            en: 'Documentation that generates itself from the API.',
        },
        challenge: {
            es: 'Una plataforma con muchas líneas de producto acumula documentación dispersa, escrita a mano y siempre atrasada respecto de la API real. Mantenerla en dos idiomas multiplica el problema: cada cambio hay que replicarlo, y lo que no se replica queda desincronizado sin que nadie lo note.',
            en: 'A platform with many product lines accumulates scattered documentation, hand-written and always lagging behind the actual API. Keeping it in two languages multiplies the problem: every change has to be replicated, and whatever is not replicated drifts out of sync unnoticed.',
        },
        solution: {
            es: 'Portal de desarrolladores donde la referencia de API se genera en tiempo de build desde las especificaciones OpenAPI 3.1: la fuente de verdad es el contrato, no un texto copiado. El contenido conceptual se escribe en MDX con componentes propios (diagramas de secuencia interactivos, bloques de código multi-lenguaje, tablas de parámetros), la estructura bilingüe garantiza paridad ES/EN, y un escáner de datos sensibles revisa el contenido antes de publicar. Se despliega como sitio estático sobre infraestructura serverless con CDN.',
            en: 'A developer portal where the API reference is generated at build time from OpenAPI 3.1 specs: the contract is the source of truth, not copied prose. Conceptual content is authored in MDX with custom components (interactive sequence diagrams, multi-language code blocks, parameter tables), the bilingual structure enforces ES/EN parity, and a sensitive-data scanner reviews content before publishing. It ships as a static site on serverless infrastructure with a CDN.',
        },
        services: [
            { es: 'Portal de documentación técnica', en: 'Technical documentation portal' },
            { es: 'Generación desde OpenAPI 3.1', en: 'Generation from OpenAPI 3.1' },
            { es: 'Arquitectura bilingüe ES/EN', en: 'Bilingual ES/EN architecture' },
            { es: 'Despliegue serverless con CDN', en: 'Serverless deployment with CDN' },
        ],
        metrics: [
            // 87 = paths declarados en las specs OpenAPI que alimentan la referencia.
            { value: '87', label: { es: 'endpoints documentados', en: 'documented endpoints' } },
            // 17 = espacios de producto con especificación propia.
            { value: '17', label: { es: 'líneas de producto', en: 'product lines' } },
            // 528 = páginas MDX publicadas (264 ES + 264 EN: paridad exacta).
            { value: '528', label: { es: 'páginas ES/EN', en: 'ES/EN pages' } },
        ],
    },
];

export const getCase = (slug: string): Case | undefined =>
    cases.find((c) => c.slug === slug);

// Ranking por complejidad (desc). Array.sort es estable: ante empate se mantiene
// el orden del arco de color. Usado por el portfolio (bento) y el preview de la home.
export const casesByComplexity: Case[] = [...cases].sort(
    (a, b) => b.complexity - a.complexity,
);

// Los dos segmentos, ya rankeados. Se muestran en bandas separadas del portfolio:
// no se comparan entre sí (un caso de cliente y una herramienta interna no compiten
// por el mismo lugar), y así el trabajo enterprise no se come el bento de clientes.
export const clientCases: Case[] = casesByComplexity.filter(
    (c) => c.segment !== 'enterprise',
);
export const enterpriseCases: Case[] = casesByComplexity.filter(
    (c) => c.segment === 'enterprise',
);

// Destacados (bento): los 4 casos de cliente de mayor complejidad. El resto va
// en la grilla normal, debajo de la banda enterprise.
export const featuredCases: Case[] = clientCases.slice(0, 4);
export const restCases: Case[] = clientCases.slice(4);

// Preview de la home (3 cards): 2 de cliente + 1 enterprise. La mezcla es
// deliberada — la home tiene que mostrar que hay trabajo de los dos tipos, sin
// que el ranking por complejidad deje el segmento enterprise fuera de pantalla.
export const homePreviewCases: Case[] = [
    ...clientCases.slice(0, 2),
    ...enterpriseCases.slice(0, 1),
];
