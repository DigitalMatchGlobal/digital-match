// Config central del sitio: una sola fuente para URL, identidad, contacto y redes.
// La usan metadata, robots.ts, sitemap.ts, el JSON-LD y llms.txt — no duplicar estos datos.

export const site = {
    name: 'Digital Match Global',
    shortName: 'DMG',
    url: 'https://www.digitalmatchglobal.com',
    // Promesa central (ver CLAUDE.md §6) — en español, alineada al resto del sitio.
    description:
        'Automatización de procesos (RPA), IA y desarrollo de software a medida para PYMEs y startups en LATAM y EE.UU. Recuperá las horas que hoy se pierden en tareas manuales, con entregas desde 7-14 días.',
    locale: 'es_ES',
    foundingYear: '2025',
    logo: '/assets/images/Logo.png',
    email: 'info@digitalmatchglobal.com',
    // E.164 (sin espacios) para tel:/JSON-LD.
    phone: '+59893892924',
    areaServed: ['UY', 'AR', 'US', 'LATAM'],
    social: [
        'https://instagram.com/digitalmatch.global',
        'https://linkedin.com/company/digital-match-global',
    ],
    // Servicios principales (los 4 pilares de ServicesSection) — para JSON-LD y llms.txt.
    services: [
        'Automatización de procesos (RPA)',
        'Inteligencia artificial y agentes',
        'Desarrollo web y de aplicaciones',
        'Consultoría y capacitación',
    ],
} as const;
