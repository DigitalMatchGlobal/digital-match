import { site } from '@/data/site';
import { faqEntries } from '@/data/faq';
import type { Case } from '@/data/cases';

// Datos estructurados (Schema.org) en JSON-LD para SEO y motores generativos (GEO).
// Se renderiza en SSR dentro de la home (page.tsx), que es la página-entidad del sitio.
// Las preguntas salen de `src/data/faq.ts`, la MISMA fuente que renderiza la
// sección FAQ. Antes estaban copiadas a mano acá con un comentario que pedía
// "mantener en sync": el JSON-LD es lo que leen Google y los LLMs, así que un
// drift silencioso hacía que el sitio le dijera una cosa al visitante y otra al
// buscador. El JSON-LD va en español (es el idioma por defecto del sitio).

const abs = (path: string) => `${site.url}${path.startsWith('/') ? path : `/${path}`}`;

const faq = faqEntries.map((entry) => ({ q: entry.question.es, a: entry.answer.es }));

// Evita que una secuencia "</script>" dentro de contenido futuro cierre el tag.
const serialize = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />
  );
}

export default function SiteJsonLd() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.name,
        alternateName: site.shortName,
        legalName: site.name,
        url: site.url,
        logo: abs(site.logo),
        image: abs(site.logo),
        description: site.description,
        email: site.email,
        telephone: site.phone,
        foundingDate: site.foundingYear,
        areaServed: site.areaServed,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.location.city,
          addressCountry: site.location.country,
        },
        knowsAbout: site.expertise,
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
        alternateName: site.shortName,
        url: site.url,
        inLanguage: 'es',
        description: site.description,
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

  return <JsonLd data={graph} />;
}

export function PortfolioJsonLd({ items }: { items: readonly Case[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${site.url}/portfolio/#webpage`,
            url: `${site.url}/portfolio`,
            name: 'Casos y proyectos de Digital Match Global',
            description:
              'Proyectos reales de automatización, inteligencia artificial y desarrollo de software, presentados de forma anónima por rubro.',
            inLanguage: 'es',
            isPartOf: { '@id': `${site.url}/#website` },
            about: { '@id': `${site.url}/#organization` },
            mainEntity: { '@id': `${site.url}/portfolio/#items` },
          },
          {
            '@type': 'ItemList',
            '@id': `${site.url}/portfolio/#items`,
            numberOfItems: items.length,
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.rubro.es,
              url: `${site.url}/portfolio/${item.slug}`,
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: site.url },
              { '@type': 'ListItem', position: 2, name: 'Casos', item: `${site.url}/portfolio` },
            ],
          },
        ],
      }}
    />
  );
}

export function CaseJsonLd({ item }: { item: Case }) {
  const url = `${site.url}/portfolio/${item.slug}`;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${url}/#webpage`,
            url,
            name: `${item.rubro.es} — caso de Digital Match Global`,
            headline: item.headline.es,
            description: item.solution.es,
            inLanguage: 'es',
            isPartOf: { '@id': `${site.url}/#website` },
            about: {
              '@type': 'Service',
              name: item.tag.es,
              provider: { '@id': `${site.url}/#organization` },
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: site.url },
              { '@type': 'ListItem', position: 2, name: 'Casos', item: `${site.url}/portfolio` },
              { '@type': 'ListItem', position: 3, name: item.rubro.es, item: url },
            ],
          },
        ],
      }}
    />
  );
}
