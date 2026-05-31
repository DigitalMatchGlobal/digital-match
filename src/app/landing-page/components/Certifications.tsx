    'use client';

    import { useLanguage } from '@/contexts/LanguageContext';

    // Certificaciones oficiales que el equipo posee (ver docs/ESTRATEGIA §6/§8).
    // Solo se listan certificaciones REALES (regla de honestidad del CLAUDE.md).
    // Se muestran en un banner/marquee infinito: logos en gris (mono) que toman su
    // color original al pasar por encima (desktop) o al tocar (mobile). El banner
    // se pausa al hacer hover. Mismo comportamiento en mobile y desktop.
    const CERTS = [
        { src: '/assets/logos/uipath.svg', labelKey: 'certs.uipath' },
        { src: '/assets/logos/rocketbot.png', labelKey: 'certs.rocketbot' },
        { src: '/assets/logos/microsoft.svg', labelKey: 'certs.microsoft' },
        { src: '/assets/logos/ibm.svg', labelKey: 'certs.ibm' },
    ];

    // Una "copia" del track: repetimos el set para llenar pantallas anchas sin huecos.
    const TRACK = Array.from({ length: 3 }).flatMap(() => CERTS);

    const Certifications = () => {
    const { t } = useLanguage();

    return (
        <section id="certs" className="py-16 bg-background overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2 reveal">
            {t('certs.title')}
            </p>
            <p className="text-base text-muted-foreground/80 mb-10 reveal" data-delay={1}>
            {t('certs.subtitle')}
            </p>
        </div>

        {/* Lista accesible (lectores de pantalla); el banner visual va aria-hidden */}
        <ul className="sr-only">
            {CERTS.map((cert) => (
            <li key={cert.labelKey}>{t(cert.labelKey)}</li>
            ))}
        </ul>

        {/* Banner / marquee infinito */}
        <div className="marquee-mask relative reveal" data-delay={2} aria-hidden="true">
            {/* track DUPLICADO (dos copias) → -50% en el keyframe = loop sin saltos.
                hover en cualquier parte del track lo pausa (animation-play-state). */}
            <div
            className="flex w-max animate-marquee hover:[animation-play-state:paused]"
            style={{ ['--marquee-duration' as string]: '32s' }}
            >
            {[...TRACK, ...TRACK].map((cert, i) => (
                <div
                key={i}
                className="group flex shrink-0 flex-col items-center gap-3 px-8 sm:px-12"
                >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={cert.src}
                    alt=""
                    className="h-11 sm:h-12 w-auto object-contain opacity-60 transition-all duration-300 [filter:brightness(0)_invert(1)] group-hover:opacity-100 group-hover:scale-110 group-hover:[filter:none] group-active:opacity-100 group-active:[filter:none]"
                />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground whitespace-nowrap transition-colors group-hover:text-foreground group-active:text-foreground">
                    {t(cert.labelKey)}
                </span>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    };

    export default Certifications;
