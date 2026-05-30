    'use client';

    import { useState, useEffect } from 'react';
    import { useLanguage } from '@/contexts/LanguageContext';

    // Certificaciones oficiales que el equipo posee (ver docs/ESTRATEGIA §6/§8).
    // Solo se listan certificaciones REALES (regla de honestidad del CLAUDE.md).
    // Logos renderizados en blanco monocromático para un "logo wall" cohesivo.
    const CERTS = [
        { src: '/assets/logos/uipath.svg', labelKey: 'certs.uipath' },
        { src: '/assets/logos/rocketbot.png', labelKey: 'certs.rocketbot' },
        { src: '/assets/logos/microsoft.svg', labelKey: 'certs.microsoft' },
        { src: '/assets/logos/ibm.svg', labelKey: 'certs.ibm' },
    ];

    const Certifications = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <section id="certs" className="py-16 bg-background" />;
    }

    return (
        <section id="certs" className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2 reveal">
            {t('certs.title')}
            </p>
            <p className="text-base text-muted-foreground/80 mb-10 reveal" data-delay={1}>
            {t('certs.subtitle')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-8">
            {CERTS.map((cert, i) => (
                <div key={cert.labelKey} className="group flex flex-col items-center gap-3 reveal" data-delay={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={cert.src}
                    alt={t(cert.labelKey)}
                    className="h-9 w-auto object-contain opacity-60 transition-all duration-300 [filter:brightness(0)_invert(1)] group-hover:[filter:none] group-hover:opacity-100 group-hover:scale-110 [@media(hover:none)]:opacity-100 [@media(hover:none)]:[filter:none]"
                />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
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
