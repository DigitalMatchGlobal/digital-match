// FUENTE ÚNICA de las preguntas frecuentes.
//
// 🚨 Antes vivían DOS VECES: como claves `faq.qN.*` en `LanguageContext` (para la
// sección) y copiadas a mano en `src/components/seo/JsonLd.tsx` (para el FAQPage
// de Schema.org), con un comentario que pedía "mantener en sync". Editar el copy
// obligaba a acordarse de dos archivos, y el JSON-LD es justamente lo que leen
// Google y los LLMs: si driftea, el sitio le dice una cosa al visitante y otra al
// buscador. Ahora las dos lo consumen de acá.
//
// Reglas al editar:
//  - Bilingüe SIEMPRE (regla §4 del CLAUDE.md). Nada de una entrada en un idioma.
//  - `stats` es el dato corto que la sección muestra al costado de la respuesta;
//    el JSON-LD no lo usa (`acceptedAnswer` sólo lleva la respuesta).
//  - Sólo afirmaciones defendibles (§7): nada de métricas inventadas.
//  - ⚠️ NO agregar una pregunta "¿cuál es su proceso?": eso lo cuenta la sección
//    Proceso (`ProcessSection`). Había una acá y describía CINCO pasos con otros
//    nombres que las CUATRO etapas de la sección — el sitio se contradecía solo.

export interface FaqEntry {
    /** id estable para el `key` de React y para anclas futuras */
    id: string;
    question: { es: string; en: string };
    answer: { es: string; en: string };
    /** dato corto de apoyo que se muestra en la sección (no va al JSON-LD) */
    stats: { es: string; en: string };
}

export const faqEntries: FaqEntry[] = [
    {
        id: 'plazos',
        question: {
            es: '¿Cuánto tiempo toma entregar un proyecto?',
            en: 'How long does it take to deliver a project?',
        },
        answer: {
            es: 'Depende de la complejidad: la mayoría de los proyectos empieza a entregarse a partir de 7-14 días desde el inicio. Seguimos una metodología ágil con actualizaciones diarias; en proyectos más grandes, la primera versión funcional llega en pocas semanas.',
            en: 'It depends on complexity: most projects start being delivered from 7-14 days after kickoff. We follow an agile methodology with daily updates; on larger projects, the first working version arrives within a few weeks.',
        },
        stats: { es: 'Primer MVP: desde 7-14 días', en: 'First MVP: from 7-14 days' },
    },
    {
        // Reemplazó a "¿cuál es su proceso de trabajo?", que competía con la sección
        // Proceso y la contradecía. Esta responde lo que la sección NO dice: cómo es
        // el día a día mientras se construye.
        id: 'comunicacion',
        question: {
            es: '¿Cómo es la comunicación mientras se construye?',
            en: 'What is communication like while you build?',
        },
        answer: {
            es: 'Entregas parciales y comunicación diaria por el canal que ya uses, con acceso a un entorno de pruebas para ver cada avance antes de que esté terminado. Las cuatro etapas del trabajo están detalladas más arriba, en Proceso.',
            en: 'Partial deliveries and daily communication over whichever channel you already use, with access to a staging environment so you can see each increment before it is finished. The four stages of the work are detailed above, in Process.',
        },
        stats: { es: 'Comunicación diaria durante el proyecto', en: 'Daily communication during the project' },
    },
    {
        id: 'soporte',
        question: {
            es: '¿Ofrecen soporte post-entrega?',
            en: 'Do you provide post-delivery support?',
        },
        answer: {
            es: 'Sí. Cada proyecto incluye 30 días de soporte, y después hay planes de mantenimiento flexibles desde USD 15/mes. También entregamos la documentación completa para que puedas gestionar el sistema sin depender de nosotros.',
            en: 'Yes. Every project includes 30 days of support, and after that there are flexible maintenance plans from USD 15/month. We also hand over full documentation so you can run the system without depending on us.',
        },
        stats: { es: '30 días de soporte incluido', en: '30 days of support included' },
    },
    {
        id: 'arranque',
        question: {
            es: '¿Qué necesito para empezar?',
            en: 'What do I need to get started?',
        },
        answer: {
            es: 'Solo tres cosas: un problema de negocio claro que quieras resolver, acceso a los sistemas existentes (si aplica) y disponibilidad para una llamada de inicio de 30 minutos. Nosotros nos encargamos del resto.',
            en: 'Just three things: a clear business problem you want to solve, access to the existing systems (if any) and availability for a 30-minute kickoff call. We handle the rest.',
        },
        stats: { es: 'Inicio en 24-48 horas', en: 'Start in 24-48 hours' },
    },
    {
        id: 'clientes',
        question: {
            es: '¿Quiénes son sus clientes típicos?',
            en: 'Who are your typical clients?',
        },
        answer: {
            es: 'Trabajamos con startups y PyMEs ambiciosas en LATAM y EE.UU. Clientes que buscan escalar eficientemente, valoran la experiencia técnica y necesitan sistemas documentados y mantenibles.',
            en: 'We work with ambitious startups and SMEs across LATAM and the US. Clients looking to scale efficiently, who value technical expertise and need documented, maintainable systems.',
        },
        stats: { es: 'Clientes en Uruguay y Argentina', en: 'Clients in Uruguay and Argentina' },
    },
    {
        id: 'seguridad',
        question: {
            es: '¿Cómo manejan la seguridad y los datos?',
            en: 'How do you handle security and data?',
        },
        answer: {
            es: 'Con prácticas security-first y experiencia real en entornos de alto cumplimiento: trabajamos bajo gestión de calidad ISO 9001 y con compliance PCI-DSS en pagos. Aplicamos cifrado, principio de mínimo privilegio y sistemas documentados y mantenibles que podés auditar.',
            en: 'With security-first practices and real experience in high-compliance environments: we have worked under ISO 9001 quality management and with PCI-DSS compliance in payments. We apply encryption, least-privilege access and documented, maintainable systems you can audit.',
        },
        stats: { es: 'Experiencia ISO 9001 · PCI-DSS', en: 'Experience: ISO 9001 · PCI-DSS' },
    },
];
