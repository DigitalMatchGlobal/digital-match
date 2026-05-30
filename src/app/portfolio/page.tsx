    import type { Metadata } from 'next';
    import PortfolioListInteractive from './components/PortfolioListInteractive';

    export const metadata: Metadata = {
    title: 'Casos y proyectos | Digital Match Global',
    description: 'Una selección de proyectos reales que entregamos —automatización, IA, e-commerce, plataformas web y landings— presentados de forma anónima por rubro.',
    };

    export default function PortfolioPage() {
    return <PortfolioListInteractive />;
    }
