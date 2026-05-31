import { site } from '@/data/site';

// Datos estructurados (Schema.org) en JSON-LD para SEO y motores generativos (GEO).
// Se renderiza en SSR dentro de la home (page.tsx), que es la página-entidad del sitio.
// Las preguntas reflejan `faq.q1..q6` (ES) de LanguageContext — mantener en sync si cambian.

const abs = (path: string) => `${site.url}${path.startsWith('/') ? path : `/${path}`}`;

const faq: { q: string; a: string }[] = [
    {
        q: '¿Cuánto tiempo toma entregar un proyecto?',
        a: 'Depende de la complejidad: la mayoría de los proyectos empieza a entregarse a partir de 7-14 días desde el inicio. Seguimos una metodología ágil con actualizaciones diarias; en proyectos más grandes, la primera versión funcional llega en pocas semanas.',
    },
    {
        q: '¿Cuál es su proceso de trabajo?',
        a: 'Comenzamos con una llamada estratégica, seguida de una especificación técnica. Desarrollamos en sprints con comunicación diaria. Tendrás acceso a un entorno de pruebas y la entrega final incluye documentación y capacitación.',
    },
    {
        q: '¿Ofrecen soporte post-entrega?',
        a: '¡Sí! Cada proyecto incluye 30 días de soporte gratuito. Después, ofrecemos planes de mantenimiento flexibles desde USD 15/mes. También entregamos documentación completa para que puedas gestionar el sistema independientemente.',
    },
    {
        q: '¿Qué necesito para empezar?',
        a: 'Solo tres cosas: un problema de negocio claro que quieras resolver, acceso a los sistemas existentes (si aplica) y disponibilidad para una llamada de inicio de 30 minutos. Nosotros nos encargamos del resto.',
    },
    {
        q: '¿Quiénes son sus clientes típicos?',
        a: 'Trabajamos con startups y PyMEs ambiciosas en LATAM y EE.UU. Clientes que buscan escalar eficientemente, valoran la experiencia técnica y necesitan sistemas documentados y mantenibles.',
    },
    {
        q: '¿Cómo manejan la seguridad y los datos?',
        a: 'Con prácticas security-first y experiencia real en entornos de alto cumplimiento: trabajamos bajo gestión de calidad ISO 9001 y con compliance PCI-DSS en pagos. Aplicamos cifrado, principio de mínimo privilegio y sistemas documentados y mantenibles que podés auditar.',
    },
];

export default function SiteJsonLd() {
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${site.url}/#organization`,
                name: site.name,
                url: site.url,
                logo: abs(site.logo),
                image: abs(site.logo),
                description: site.description,
                email: site.email,
                telephone: site.phone,
                foundingDate: site.foundingYear,
                areaServed: site.areaServed,
                sameAs: site.social,
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'sales',
                    email: site.email,
                    telephone: site.phone,
                    availableLanguage: ['es', 'en'],
                },
            },
            {
                '@type': 'WebSite',
                '@id': `${site.url}/#website`,
                name: site.name,
                url: site.url,
                inLanguage: 'es',
                publisher: { '@id': `${site.url}/#organization` },
            },
            {
                '@type': 'ProfessionalService',
                '@id': `${site.url}/#service`,
                name: site.name,
                url: site.url,
                image: abs(site.logo),
                description: site.description,
                email: site.email,
                telephone: site.phone,
                areaServed: site.areaServed,
                provider: { '@id': `${site.url}/#organization` },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Servicios',
                    itemListElement: site.services.map((s) => ({
                        '@type': 'Offer',
                        itemOffered: { '@type': 'Service', name: s },
                    })),
                },
            },
            {
                '@type': 'FAQPage',
                '@id': `${site.url}/#faq`,
                mainEntity: faq.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}
