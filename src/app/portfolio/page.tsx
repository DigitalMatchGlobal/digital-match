    import type { Metadata } from 'next';
    import PortfolioListInteractive from './components/PortfolioListInteractive';

    const title = 'Casos y proyectos | Digital Match Global';
    const description = 'Una selección de proyectos reales que entregamos —automatización, IA, e-commerce, plataformas web y landings— presentados de forma anónima por rubro.';

    export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: '/portfolio' },
    openGraph: {
        type: 'website',
        url: '/portfolio',
        siteName: 'Digital Match Global',
        title,
        description,
        locale: 'es_ES',
    },
    twitter: { card: 'summary_large_image', title, description },
    };

    export default function PortfolioPage() {
    return <PortfolioListInteractive />;
    }
