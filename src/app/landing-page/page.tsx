
    import type { Metadata } from 'next';
    import LandingPageInteractive from './components/LandingPageInteractive';

    export const metadata: Metadata = {
    title: 'Digital Match Global - Scale Your Business with Automation & AI',
    description: 'Transform your business operations in 7-14 days with premium automation, AI assistants, and web development solutions. Trusted by 50+ LATAM and US startups.',
    };

    export default function LandingPage() {
    return <LandingPageInteractive />;
    }