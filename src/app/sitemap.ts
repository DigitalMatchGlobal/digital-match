import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { cases } from '@/data/cases';

// sitemap.xml generado por Next. Rutas estáticas + un entry por caso del portfolio.
// (No se incluye /landing-page: redirige 301 a /.)
export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [
        { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 },
        { url: `${site.url}/portfolio`, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${site.url}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${site.url}/terms`, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${site.url}/data-deletion`, changeFrequency: 'yearly', priority: 0.3 },
    ];

    const caseRoutes: MetadataRoute.Sitemap = cases.map((c) => ({
        url: `${site.url}/portfolio/${c.slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    return [...routes, ...caseRoutes];
}
