import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// Web App Manifest (PWA básica): nombre, colores de marca y display.
// Nota: faltan iconos cuadrados 192/512 maskable (el logo no es cuadrado) →
// pendiente cuando haya un asset cuadrado del diseñador para instalabilidad completa.
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: site.name,
        short_name: site.shortName,
        description: site.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#0B0D14',
        theme_color: '#0B0D14',
        lang: 'es',
        icons: [
            { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
            { src: site.logo, sizes: '512x375', type: 'image/png' },
        ],
    };
}
