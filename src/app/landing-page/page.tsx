
    import type { Metadata } from 'next';
    import LandingPageInteractive from './components/LandingPageInteractive';

    export const metadata: Metadata = {
    title: 'Digital Match Global - Scale Your Business with Automation & AI',
    description: 'Transform your business operations in 7-14 days with automation, AI assistants, and web development. Led by systems engineers with 14+ years of combined experience across the private and public sectors. Based in Uruguay, serving LATAM and the US.',
    };

    export default function LandingPage() {
    return <LandingPageInteractive />;
    }