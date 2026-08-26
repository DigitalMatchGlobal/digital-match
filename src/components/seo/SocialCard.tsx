import { readFileSync } from 'fs';
import { join } from 'path';

type SocialCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  accentSecondary?: string;
};

// Componente exclusivo de ImageResponse. Replica la identidad CLARA de la marca madre:
// aire, grafito, superficies neutras y el arco azul→violeta sólo como acento gráfico.
// Los cuerpos están calibrados para seguir legibles cuando WhatsApp reduce la tarjeta
// de 1200 px a ~650 px de ancho: titular 30–36 px y bajada 14–15 px efectivos.
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
        color: '#0B0E14',
        backgroundColor: '#FFFFFF',
        padding: '62px 72px 58px',
        position: 'relative',
      }}
    >
      {/* Satori (el renderer de ImageResponse) necesita al menos un hijo en flujo para
          conservar el alto completo cuando el titular ocupa una sola línea. Sin este
          sizing box, las piezas cortas podían perder cabecera y pie al rasterizarse. */}
      <div
        aria-hidden="true"
        style={{ width: '100%', height: '100%', display: 'flex', flexShrink: 0 }}
      />

      {/* Retícula editorial: las guías del sitio llevadas a una pieza estática. */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 212,
          height: '100%',
          backgroundColor: '#F2F4F7',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 211,
          width: 1,
          height: '100%',
          background: '#E2E4E8',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 154,
          left: 72,
          right: 72,
          height: 1,
          background: '#E2E4E8',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: 8,
          background: `linear-gradient(90deg, ${accent}, ${accentSecondary})`,
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
        <img src={logoSrc} width={80} height={59} alt="" style={{ objectFit: 'contain' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 20,
            lineHeight: 1,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: 0.4 }}>DIGITAL MATCH</span>
          <span style={{ fontSize: 13, color: '#4A5567', letterSpacing: 5.4, marginTop: 8 }}>
            GLOBAL
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            color: '#3A4252',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          CONSULTORÍA · PRODUCTO · INGENIERÍA
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 205,
          left: 72,
          right: 250,
          maxWidth: 878,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#3A4252',
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: 2.1,
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 42,
              height: 3,
              marginRight: 16,
              background: `linear-gradient(90deg, ${accent}, ${accentSecondary})`,
              display: 'flex',
            }}
          />
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: title.length > 48 ? 54 : 62,
            fontWeight: 750,
            lineHeight: 1.04,
            letterSpacing: -1.6,
            marginTop: 22,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 25,
            lineHeight: 1.34,
            color: '#4A5567',
            marginTop: 24,
            maxWidth: 850,
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
          right: 250,
          bottom: 50,
          borderTop: '1px solid #E2E4E8',
          paddingTop: 20,
        }}
      >
        <span style={{ fontSize: 19, color: '#0B0E14', fontWeight: 700 }}>
          digitalmatchglobal.com
        </span>
        <span style={{ fontSize: 15, color: '#4A5567', letterSpacing: 1.1 }}>
          URUGUAY · LATAM · EE.UU.
        </span>
      </div>

      {/* Acento editorial lateral: conserva la retícula sin sumar mensajes redundantes. */}
      <div
        style={{
          position: 'absolute',
          right: 38,
          top: 204,
          width: 136,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span
          style={{
            width: 72,
            height: 4,
            background: `linear-gradient(90deg, ${accent}, ${accentSecondary})`,
            display: 'flex',
          }}
        />
        <span
          style={{
            width: 24,
            height: 24,
            border: '2px solid #D7DBE2',
            borderRadius: 12,
            display: 'flex',
            marginTop: 20,
          }}
        />
      </div>
    </div>
  );
}
