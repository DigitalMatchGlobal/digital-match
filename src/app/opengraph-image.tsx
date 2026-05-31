import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

// Genera la imagen de previsualización social (WhatsApp, X, LinkedIn, etc.).
// On-brand: fondo oscuro con glow azul→violeta del logo + monograma DM real.
export const runtime = 'nodejs';
export const alt = 'Digital Match Global — Automatización, IA y desarrollo a medida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    const logo = readFileSync(join(process.cwd(), 'public/assets/images/Logo.png'));
    const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#0B0D14',
                    padding: '72px 80px',
                    position: 'relative',
                }}
            >
                {/* Glow de marca (azul→violeta) */}
                <div
                    style={{
                        position: 'absolute',
                        top: -260,
                        right: -200,
                        width: 760,
                        height: 760,
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(109,93,254,0.55) 0%, rgba(76,142,255,0.18) 45%, rgba(11,13,20,0) 70%)',
                        display: 'flex',
                    }}
                />

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logoSrc} width={132} height={132} alt="" style={{ objectFit: 'contain' }} />
                </div>

                {/* Texto principal */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            fontSize: 68,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            lineHeight: 1.05,
                            letterSpacing: -1.5,
                            maxWidth: 980,
                        }}
                    >
                        Automatización, IA y desarrollo a medida
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            color: '#A9B0C2',
                            marginTop: 28,
                            maxWidth: 920,
                            lineHeight: 1.35,
                        }}
                    >
                        Recuperá las horas que hoy se pierden en tareas manuales. Entregas desde 7-14 días.
                    </div>
                </div>

                {/* Pie: barra de acento + dominio */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: 64,
                            height: 6,
                            borderRadius: 999,
                            background: 'linear-gradient(90deg, #4C8EFF 0%, #6D5DFE 100%)',
                            display: 'flex',
                        }}
                    />
                    <div style={{ fontSize: 26, color: '#FFFFFF', fontWeight: 600, marginLeft: 24 }}>
                        digitalmatchglobal.com
                    </div>
                </div>
            </div>
        ),
        { ...size },
    );
}
