    'use client';

    import { useState, useEffect, useMemo } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';

    // Stack tecnológico agrupado por disciplina (muestra cobertura full-stack,
    // que es el diferencial). Microsoft/IBM viven en la franja de Certificaciones.
    const STACK = [
        { key: 'stack.rpa', icon: 'BoltIcon', items: ['UiPath', 'Power Automate', 'Rocketbot'] },
        { key: 'stack.ai', icon: 'SparklesIcon', items: ['Python', 'Power BI'] },
        { key: 'stack.dev', icon: 'CodeBracketIcon', items: ['Node.js', 'TypeScript', 'Next.js', 'React'] },
        { key: 'stack.cloud', icon: 'CloudIcon', items: ['AWS', 'Azure', 'Google Cloud', 'Vercel'] },
        { key: 'stack.data', icon: 'CircleStackIcon', items: ['PostgreSQL', 'Supabase', 'MongoDB'] },
        { key: 'stack.integrations', icon: 'PuzzlePieceIcon', items: ['WhatsApp Cloud API', 'Alexa Skills', 'MercadoPago'] },
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
        <section id="about" className="relative overflow-hidden py-24 bg-background">
        <div className="glow-radial pointer-events-none absolute inset-x-0 top-0 h-2/3" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">

            {/* Titular + 1 línea (texto mínimo, vendible) */}
            <div className="reveal">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium text-accent mb-6">
                {t('about.eyebrow')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.subtitle')}
            </p>
            </div>

            {/* Diferenciales (abiertos, sin caja — el aire y la jerarquía separan) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-14">
            {differentiators.map((diff, index) => (
                <div key={index} className="reveal px-2 text-center" data-delay={index}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                    diff.highlight ? 'bg-gradient-accent shadow-cta' : 'bg-accent/10'
                }`}>
                    <Icon name={diff.icon} size={26} className={diff.highlight ? 'text-accent-foreground' : 'text-accent'} />
                </div>
                <h3 className={`font-bold text-lg mb-2 leading-tight ${diff.highlight ? 'text-accent' : 'text-foreground'}`}>
                    {diff.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {diff.desc}
                </p>
                </div>
            ))}
            </div>

            {/* Stack tecnológico: un solo panel con filas por disciplina (no 6 cajas) */}
            <div className="mt-16 reveal">
            <p className="text-sm uppercase tracking-wider text-accent mb-2">
                {t('about.tools_label')}
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('stack.subtitle')}
            </p>
            <div className="glass-panel max-w-3xl mx-auto p-6 md:p-8 text-left divide-y divide-border/60">
                {STACK.map((cat) => (
                <div key={cat.key} className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3 sm:w-52 shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={cat.icon} size={18} className="text-accent" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{t(cat.key)}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, i) => (
                        <span
                        key={item}
                        className={`px-3 py-1 bg-secondary/60 border border-border/60 text-sm text-muted-foreground ${i % 2 === 0 ? 'rounded-full' : 'rounded-md'}`}
                        >
                        {item}
                        </span>
                    ))}
                    </div>
                </div>
                ))}
            </div>
            </div>

        </div>
        </section>
    );
    };

    export default AboutSection;
