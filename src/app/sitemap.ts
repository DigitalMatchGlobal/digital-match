import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { cases } from '@/data/cases';

// sitemap.xml generado por Next. Sólo rutas que queremos posicionar: las legales
// permanecen públicas pero llevan noindex y por eso no deben aparecer acá.
// (Tampoco se incluye /landing-page: redirige 301 a /.)
export default function sitemap(): MetadataRoute.Sitemap {
  // Fecha de la última revisión integral del contenido y la metadata.
  const lastModified = new Date('2026-08-25T00:00:00.000Z');
  const routes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/portfolio`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${site.url}/portfolio/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...caseRoutes];
}
