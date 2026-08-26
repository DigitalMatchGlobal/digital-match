import type { Metadata } from 'next';

const title = 'Política de privacidad';
const description =
  'Cómo Digital Match Global recopila, utiliza, almacena y protege los datos personales.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/privacy' },
  // Debe seguir pública por cumplimiento, pero no competir con las páginas
  // comerciales ni ocupar un sitelink de la búsqueda de marca.
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    url: '/privacy',
    title: `${title} · Digital Match Global`,
    description,
    locale: 'es_ES',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/twitter-image'] },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
