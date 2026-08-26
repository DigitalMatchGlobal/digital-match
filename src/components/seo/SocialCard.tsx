import { readFileSync } from 'fs';
import { join } from 'path';

type SocialCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  accentSecondary?: string;
};

// Componente exclusivo de ImageResponse. Mantiene la misma composición en la home,
// el portfolio y cada caso para que las previews se reconozcan como una familia.
export default function SocialCard({
  eyebrow,
  title,
  description,
  accent = '#4C8EFF',
  accentSecondary = '#6D5DFE',
}: SocialCardProps) {
  const logo = readFileSync(join(process.cwd(), 'public/assets/images/Logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        color: '#FFFFFF',
        background: '#0B0D14',
        padding: '62px 72px 58px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -330,
          right: -250,
          width: 900,
          height: 900,
          borderRadius: 9999,
          background: `radial-gradient(circle, ${accentSecondary}80 0%, ${accent}2E 44%, rgba(11,13,20,0) 72%)`,
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 12,
          height: '100%',
          background: `linear-gradient(180deg, ${accent}, ${accentSecondary})`,
          display: 'flex',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: 62,
          left: 72,
          right: 72,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={86} height={63} alt="" style={{ objectFit: 'contain' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 22,
            lineHeight: 1,
          }}
        >
          <span style={{ fontSize: 25, fontWeight: 800, letterSpacing: 0.5 }}>DIGITAL MATCH</span>
          <span style={{ fontSize: 14, color: '#9CA6BC', letterSpacing: 5.6, marginTop: 8 }}>
            GLOBAL
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 205,
          left: 72,
          right: 72,
          maxWidth: 1056,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#B9C2D4',
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 2.3,
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 42,
              height: 4,
              marginRight: 16,
              background: `linear-gradient(90deg, ${accent}, ${accentSecondary})`,
              display: 'flex',
            }}
          />
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: title.length > 48 ? 55 : 64,
            fontWeight: 850,
            lineHeight: 1.03,
            letterSpacing: -1.8,
            marginTop: 20,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            lineHeight: 1.35,
            color: '#AEB7C9',
            marginTop: 22,
            maxWidth: 970,
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          left: 72,
          right: 72,
          bottom: 58,
        }}
      >
        <span style={{ fontSize: 19, color: '#D7DCE7', fontWeight: 650 }}>
          digitalmatchglobal.com
        </span>
        <span style={{ fontSize: 16, color: '#7F899E', letterSpacing: 1.2 }}>
          URUGUAY · LATAM · EE.UU.
        </span>
      </div>
    </div>
  );
}
