// Fuente única de los casos del portfolio.
// Reglas (ver CLAUDE.md): anónimos por rubro (sin nombres/logos de clientes),
// bilingüe ES/EN siempre, sin métricas inventadas (`result` solo si es real).
//
// SISTEMA DE COLOR (decidido): un único arco de marca azul → violeta (del logo).
// Los casos están ordenados a lo largo de ese espectro (cyan-azul → púrpura) para
// que al navegar de uno a otro se sienta el flujo del degradado del logo, sin
// romper la identidad. Acentos globales: ver src/styles/tailwind.css.

export type LocalizedText = { es: string; en: string };

export type Case = {
    slug: string;
    icon: string; // nombre válido de Heroicons v2 (ver AppIcon)
    accent: string; // sobrescribe --color-accent en la página del caso (matiz del arco de marca)
    accentSecondary: string; // sobrescribe --color-accent-secondary
    watermark: string; // palabra grande de fondo (anónima: rubro, no cliente)
    rubro: LocalizedText;
    headline: LocalizedText; // titular del caso (estilo "Introducing...")
    challenge: LocalizedText;
    solution: LocalizedText;
    services: LocalizedText[];
    result?: LocalizedText; // OPCIONAL — solo con un dato verdadero/defendible
};

export const cases: Case[] = [
    {
        slug: 'logistica-courier',
        icon: 'TruckIcon',
        accent: '#38BDF8',
        accentSecondary: '#4C8EFF',
        watermark: 'Logística',
        rubro: {
            es: 'Logística y courier (B2B)',
            en: 'Logistics & courier (B2B)',
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
    },
    {
        slug: 'ecommerce-electronica',
        icon: 'ShoppingBagIcon',
        accent: '#3B82F6',
        accentSecondary: '#6366F1',
        watermark: 'Retail',
        rubro: {
            es: 'E-commerce de electrónica',
            en: 'Electronics e-commerce',
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
    },
    {
        slug: 'fundacion-educativa-deportiva',
        icon: 'BuildingLibraryIcon',
        accent: '#4C8EFF',
        accentSecondary: '#6D5DFE',
        watermark: 'Fundación',
        rubro: {
            es: 'ONG / Fundación educativa y deportiva',
            en: 'Nonprofit / Educational & sports foundation',
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
    },
    {
        slug: 'gestion-de-gimnasio',
        icon: 'ChartBarIcon',
        accent: '#6366F1',
        accentSecondary: '#8B5CF6',
        watermark: 'Gym OS',
        rubro: {
            es: 'Plataforma de gestión de gimnasio',
            en: 'Gym management platform',
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
    },
    {
        slug: 'marca-de-wellness',
        icon: 'SparklesIcon',
        accent: '#6D5DFE',
        accentSecondary: '#8B5CF6',
        watermark: 'Wellness',
        rubro: {
            es: 'Marca de wellness y salud natural',
            en: 'Wellness & natural health brand',
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
    },
    {
        slug: 'preparacion-fisica-alto-rendimiento',
        icon: 'BoltIcon',
        accent: '#8B5CF6',
        accentSecondary: '#A78BFA',
        watermark: 'Performance',
        rubro: {
            es: 'Preparación física de alto rendimiento',
            en: 'High-performance physical training',
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
    },
];

export const getCase = (slug: string): Case | undefined =>
    cases.find((c) => c.slug === slug);
