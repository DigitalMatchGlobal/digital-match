import { ImageResponse } from 'next/og';
import SocialCard from '@/components/seo/SocialCard';

// Genera la imagen de previsualización social (WhatsApp, X, LinkedIn, etc.).
// On-brand: sistema claro institucional compartido con el sitio actual.
export const runtime = 'nodejs';
export const alt = 'Digital Match Global — Automatización, IA y desarrollo a medida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <SocialCard
      eyebrow="AUTOMATIZACIÓN · IA · SOFTWARE"
      title="Lo que hoy tu equipo hace a mano,"
      titleAccent="hecho sistema."
      description="Diagnosticamos dónde se pierde el tiempo y construimos el sistema que lo resuelve."
    />,
    { ...size }
  );
}
