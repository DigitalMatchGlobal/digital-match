import type { Metadata } from 'next';
import PortfolioListInteractive from './components/PortfolioListInteractive';
import { PortfolioJsonLd } from '@/components/seo/JsonLd';
import { cases } from '@/data/cases';

const title = 'Casos y proyectos';
const socialTitle = 'Casos y proyectos · Digital Match Global';
const description =
  'Una selección de proyectos reales que entregamos —automatización, IA, e-commerce, plataformas web y landings— presentados de forma anónima por rubro.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/portfolio' },
  openGraph: {
    type: 'website',
    url: '/portfolio',
    siteName: 'Digital Match Global',
    title: socialTitle,
    description,
    locale: 'es_ES',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Digital Match Global — Automatización, IA y desarrollo a medida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: socialTitle,
    description,
    images: ['/twitter-image'],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioJsonLd items={cases} />
      <PortfolioListInteractive />
    </>
  );
}
