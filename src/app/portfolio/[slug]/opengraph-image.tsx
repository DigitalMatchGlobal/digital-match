import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import SocialCard from '@/components/seo/SocialCard';
import { getCase } from '@/data/cases';

export const runtime = 'nodejs';
export const alt = 'Caso de Digital Match Global';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image({ params }: { params: { slug: string } }) {
  const item = getCase(params.slug);
  if (!item) notFound();

  return new ImageResponse(
    <SocialCard
      eyebrow={item.tag.es}
      title={item.rubro.es}
      description={item.headline.es}
      accent={item.accent}
      accentSecondary={item.accentSecondary}
    />,
    { ...size }
  );
}
