import type { Metadata } from 'next';
import LandingPageInteractive from './landing-page/components/LandingPageInteractive';
import SiteJsonLd from '@/components/seo/JsonLd';

const title = 'Digital Match Global | Automatización, IA y software';
const socialTitle = 'Digital Match Global — Automatización, IA y software a medida';
const description =
  'Automatizamos procesos, integramos IA y desarrollamos software a medida para PYMEs y startups en LATAM y EE.UU. Entregas desde 7-14 días.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Digital Match Global',
    title: socialTitle,
    description,
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: socialTitle,
    description,
  },
};

export default function HomePage() {
  return (
    <>
      <SiteJsonLd />
      <LandingPageInteractive />
    </>
  );
}
