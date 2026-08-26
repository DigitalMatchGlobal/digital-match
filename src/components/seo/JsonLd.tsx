import { site } from '@/data/site';
import { faqEntries } from '@/data/faq';

// Datos estructurados (Schema.org) en JSON-LD para SEO y motores generativos (GEO).
// Se renderiza en SSR dentro de la home (page.tsx), que es la página-entidad del sitio.
// Las preguntas salen de `src/data/faq.ts`, la MISMA fuente que renderiza la
// sección FAQ. Antes estaban copiadas a mano acá con un comentario que pedía
// "mantener en sync": el JSON-LD es lo que leen Google y los LLMs, así que un
// drift silencioso hacía que el sitio le dijera una cosa al visitante y otra al
// buscador. El JSON-LD va en español (es el idioma por defecto del sitio).

const abs = (path: string) => `${site.url}${path.startsWith('/') ? path : `/${path}`}`;

const faq = faqEntries.map((entry) => ({ q: entry.question.es, a: entry.answer.es }));

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
