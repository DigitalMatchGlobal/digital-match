import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cases, getCase } from '@/data/cases';
import CaseDetailInteractive from './components/CaseDetailInteractive';
import { CaseJsonLd } from '@/components/seo/JsonLd';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getCase(params.slug);
  if (!item) {
    return { title: 'Caso no encontrado | Digital Match Global' };
  }
  const title = `${item.rubro.es} — caso de éxito`;
  const socialTitle = `${item.rubro.es} · Digital Match Global`;
  const description = item.solution.es;
  const url = `/portfolio/${item.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: 'Digital Match Global',
      title: socialTitle,
      description,
      locale: 'es_ES',
    },
    twitter: { card: 'summary_large_image', title: socialTitle, description },
  };
}

export default function CasePage({ params }: PageProps) {
  const item = getCase(params.slug);
  if (!item) {
    notFound();
  }
  return (
    <>
      <CaseJsonLd item={item} />
      <CaseDetailInteractive item={item} />
    </>
  );
}
