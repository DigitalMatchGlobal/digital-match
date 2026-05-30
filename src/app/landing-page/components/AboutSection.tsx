    'use client';

    import { useState, useEffect, useMemo } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';

    // Stack tecnológico real (nombres de marca, iguales en ambos idiomas)
    const TOOLS = [
        'UiPath', 'Power Automate', 'Rocketbot', 'Python', 'Node.js', 'TypeScript',
        'Next.js', 'React', 'AWS', 'Azure', 'Google Cloud', 'Vercel',
        'PostgreSQL', 'Supabase', 'MongoDB', 'Power BI', 'WhatsApp Cloud API',
        'Alexa Skills', 'MercadoPago', 'Microsoft', 'IBM'
    ];

    const AboutSection = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Diferenciales (POR QUÉ confiar) — NO servicios (eso está en Servicios/Capacidades)
    const differentiators = useMemo(() => [
        { icon: 'ClockIcon', title: t('about.diff1.title'), desc: t('about.diff1.desc'), highlight: true },
        { icon: 'BuildingOffice2Icon', title: t('about.diff2.title'), desc: t('about.diff2.desc'), highlight: false },
        { icon: 'ShieldCheckIcon', title: t('about.diff3.title'), desc: t('about.diff3.desc'), highlight: false },
        { icon: 'CheckBadgeIcon', title: t('about.diff4.title'), desc: t('about.diff4.desc'), highlight: false }
    ], [t]);

    if (!isHydrated) {
        return <section id="about" className="py-24 bg-background" />;
    }

    return (
        <section id="about" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">

            {/* Titular + 1 línea (texto mínimo, vendible) */}
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium text-accent mb-6">
            {t('about.eyebrow')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
            </p>

            {/* Tarjetas de DIFERENCIAL (por qué confiar) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {differentiators.map((diff, index) => (
                <div
                key={index}
                className={`rounded-xl p-6 text-center transition-smooth hover:-translate-y-1 ${
                    diff.highlight
                    ? 'bg-accent/10 border border-accent/40'
                    : 'bg-surface border border-border hover:border-accent/50'
                }`}
                >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={diff.icon} size={24} className="text-accent" />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-2 leading-tight">
                    {diff.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {diff.desc}
                </p>
                </div>
            ))}
            </div>

            {/* Stack tecnológico y certificaciones (profundidad, no servicios) */}
            <div className="mt-14">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-5">
                {t('about.tools_label')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
                {TOOLS.map((tool) => (
                <span
                    key={tool}
                    className="px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-foreground"
                >
                    {tool}
                </span>
                ))}
            </div>
            </div>

        </div>
        </section>
    );
    };

    export default AboutSection;
