import type { Metadata } from 'next';

const title = 'Eliminación de datos de usuario';
const description =
  'Instrucciones para solicitar la eliminación de datos personales procesados por Digital Match Global.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/data-deletion' },
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    url: '/data-deletion',
    title: `${title} · Digital Match Global`,
    description,
    locale: 'es_ES',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/twitter-image'] },
};

export default function DataDeletionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
