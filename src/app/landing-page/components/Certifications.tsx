    'use client';

    import { useLanguage } from '@/contexts/LanguageContext';
    import Icon from '@/components/ui/AppIcon';
    import { WhatsAppGlyph, MetaGlyph } from '@/components/ui/BrandGlyphs';

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
        <section id="certs" className="relative py-16 section-raised overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="reveal flex items-center justify-center gap-2.5">
            <span aria-hidden="true" className="slash slash-sm text-accent" />
            <p className="eyebrow">{t('certs.eyebrow')}</p>
            </div>
            <p className="font-display mt-4 text-xl font-bold tracking-[-0.02em] text-foreground reveal" data-delay={1}>
            {t('certs.title')}
            </p>
            <p className="text-base text-muted-foreground mt-3 mb-10 reveal" data-delay={2}>
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
                className="group flex shrink-0 flex-col items-center gap-3 px-14 sm:px-20"
                >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={cert.src}
                    alt=""
                    className="h-11 sm:h-12 w-auto object-contain opacity-45 transition-all duration-300 [filter:brightness(0)] group-hover:opacity-100 group-hover:scale-110 group-hover:[filter:none] group-active:opacity-100 group-active:[filter:none]"
                />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground whitespace-nowrap transition-colors group-hover:text-foreground group-active:text-foreground">
                    {t(cert.labelKey)}
                </span>
                </div>
            ))}
            </div>
        </div>

        {/* Estado OFICIAL de plataforma — verificado por Meta. Va aparte del marquee
            porque no es una certificación del equipo sino un status de la empresa
            (Tech Provider + App Review aprobado). Claim en texto = dato real y
            defendible (CLAUDE.md §7); logos de marca solo como señal, sin implicar
            partnership/endorsement. */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-12 reveal" data-delay={3}>
            <div className="glass-panel mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-sm px-6 py-5 text-center sm:flex-row sm:text-left">
            <div className="flex shrink-0 items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#25D366]/10 ring-1 ring-[#25D366]/25">
                <WhatsAppGlyph className="h-7 w-7" />
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#0866FF]/10 ring-1 ring-[#0866FF]/25">
                <MetaGlyph className="h-6 w-6" />
                </span>
            </div>
            <div className="hidden h-12 w-px bg-border sm:block" />
            <div className="flex-1">
                <p className="flex items-center justify-center gap-1.5 text-sm font-bold text-foreground sm:justify-start">
                <Icon name="CheckBadgeIcon" size={16} className="text-accent" />
                {t('certs.meta.title')}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{t('certs.meta.subtitle')}</p>
            </div>
            </div>
        </div>
        </section>
    );
    };

    export default Certifications;
