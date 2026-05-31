    import type { Metadata } from 'next';
    import LandingPageInteractive from './landing-page/components/LandingPageInteractive';

    const title = 'Digital Match Global — Automatización, IA y desarrollo a medida';
    const description =
        'Recuperá las horas que hoy se pierden en tareas manuales. Automatización de procesos (RPA), asistentes de IA y desarrollo web, con entregas desde 7-14 días. Ingenieros en sistemas con +14 años de experiencia en el sector privado y público.';

    export const metadata: Metadata = {
    title: { absolute: title },
    description,
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        url: '/',
        siteName: 'Digital Match Global',
        title,
        description,
        locale: 'es_ES',
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
    },
    };

    export default function HomePage() {
    return <LandingPageInteractive />;
    }
