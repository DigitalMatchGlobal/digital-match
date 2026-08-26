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
    // 🚨 Perfiles REALES, confirmados por el cliente el 2026-08-25. Los que había
    // (`instagram.com/digitalmatch.global` y `linkedin.com/company/digital-match-global`)
    // no existen: eran enlaces rotos en el footer y, peor, en el `sameAs` del JSON-LD y en
    // `llms.txt`, o sea que también le decíamos a Google y a los LLMs que la marca vive en
    // dos perfiles inexistentes. Verificar antes de tocar.
    social: [
        'https://www.instagram.com/digitalmatchglobal/',
        'https://www.linkedin.com/company/digitalmatchglobal/',
    ],
    // Servicios principales (los 4 pilares de ServicesSection) — para JSON-LD y llms.txt.
    services: [
        'Automatización de procesos (RPA)',
        'Inteligencia artificial y agentes',
        'Desarrollo web y de aplicaciones',
        'Consultoría y capacitación',
    ],
} as const;
