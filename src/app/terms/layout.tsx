import type { Metadata } from 'next';

const title = 'Términos y condiciones de uso';
const description =
  'Condiciones que regulan el acceso y uso de los sitios, plataformas y servicios de Digital Match Global.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    url: '/terms',
    title: `${title} · Digital Match Global`,
    description,
    locale: 'es_ES',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/twitter-image'] },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
