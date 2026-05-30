    'use client';

    import { CSSProperties } from 'react';
    import Link from 'next/link';
    import Header from '@/components/common/Header';
    import Footer from '@/app/landing-page/components/Footer';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { cases } from '@/data/cases';
    import type { Case } from '@/data/cases';

    interface CaseDetailInteractiveProps {
    item: Case;
    }

    const CaseDetailInteractive = ({ item }: CaseDetailInteractiveProps) => {
    const { t, language } = useLanguage();

    // Color propio del caso: sobrescribe las variables CSS de accent + tiñe el fondo.
    const pageStyle = {
        '--color-accent': item.accent,
        '--color-accent-secondary': item.accentSecondary,
        background: `radial-gradient(60% 50% at 50% 0%, ${item.accent}2E 0%, transparent 70%), radial-gradient(55% 45% at 85% 8%, ${item.accentSecondary}24 0%, transparent 60%), #05070f`,
    } as CSSProperties;

    const idx = cases.findIndex((c) => c.slug === item.slug);
    const prev = cases[(idx - 1 + cases.length) % cases.length];
    const next = cases[(idx + 1) % cases.length];

    const numbered = [
        { n: '01', label: t('case.challenge'), body: item.challenge[language] },
        { n: '02', label: t('case.solution'), body: item.solution[language] },
    ];

    return (
        <div style={pageStyle} className="min-h-screen">
        <Header />
        <main>

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden pt-36 pb-16 px-4 sm:px-6 lg:px-8">
            {/* watermark gigante (anónimo: palabra del rubro) */}
            <div className="absolute inset-x-0 top-24 flex justify-center pointer-events-none select-none">
                <span className="font-black tracking-tight text-white/[0.05] leading-none whitespace-nowrap text-[24vw] lg:text-[18vw]">
                {item.watermark}
                </span>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 hover:text-accent transition-smooth mb-8"
                >
                <Icon name="ArrowLeftIcon" size={14} />
                {t('case.back')}
                </Link>

                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-accent mb-5">
                {t('case.eyebrow')}
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-8 max-w-3xl mx-auto">
                {item.headline[language]}
                </h1>

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-sm text-white/80 backdrop-blur-sm">
                <span className="uppercase text-[10px] tracking-wider text-white/50">{t('case.client')}</span>
                {item.rubro[language]}
                </span>

                {/* tarjeta-objeto del hero (preview estilizado, sin imágenes reales) */}
                <div className="mt-14 max-w-md mx-auto">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 shadow-2xl">
                    <div className="flex items-center gap-1.5 mb-6">
                    <span className="w-3 h-3 rounded-full bg-white/20" />
                    <span className="w-3 h-3 rounded-full bg-white/20" />
                    <span className="w-3 h-3 rounded-full bg-white/20" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center mb-5 mx-auto">
                    <Icon name={item.icon as any} size={32} className="text-accent-foreground" />
                    </div>
                    {item.metrics && item.metrics.length > 0 && (
                    <div className="mb-5 flex divide-x divide-white/10 overflow-hidden rounded-xl border border-white/10">
                        {item.metrics.map((m, i) => (
                        <div key={i} className="flex-1 px-2 py-3 text-center">
                            {/* verde = color semántico de "resultado/impacto" (ver TechnicalShowcase) */}
                            <div className="mb-1 text-lg font-bold leading-none text-emerald-400">{m.value}</div>
                            <div className="text-[11px] leading-tight text-white/55">{m.label[language]}</div>
                        </div>
                        ))}
                    </div>
                    )}
                    <div className="flex flex-wrap justify-center gap-2">
                    {item.services.map((service, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-medium text-white/85">
                        {service[language]}
                        </span>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </section>

            {/* ===== SECCIONES NUMERADAS ===== */}
            <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {numbered.map((row) => (
                <div
                key={row.n}
                className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-white/10"
                >
                <div className="md:col-span-5">
                    <span className="block text-sm font-mono text-accent mb-3">{row.n}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{row.label}</h2>
                </div>
                <div className="md:col-span-7">
                    <p className="text-lg text-white/70 leading-relaxed">{row.body}</p>
                </div>
                </div>
            ))}

            {/* 03 · Servicios */}
            <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-white/10">
                <div className="md:col-span-5">
                <span className="block text-sm font-mono text-accent mb-3">03</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{t('case.services')}</h2>
                </div>
                <div className="md:col-span-7">
                <div className="flex flex-wrap gap-3">
                    {item.services.map((service, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium text-white/90"
                    >
                        {service[language]}
                    </span>
                    ))}
                </div>
                </div>
            </div>

            {/* 04 · Resultado (opcional) */}
            {item.result && (
                <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-white/10">
                <div className="md:col-span-5">
                    <span className="block text-sm font-mono text-accent mb-3">04</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{t('case.result')}</h2>
                </div>
                <div className="md:col-span-7">
                    <p className="text-2xl font-semibold text-emerald-400">{item.result[language]}</p>
                </div>
                </div>
            )}
            </section>

            {/* ===== PREV / NEXT ===== */}
            <nav className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
            <div className="flex items-center justify-between gap-4">
                <Link href={`/portfolio/${prev.slug}`} className="group text-left max-w-[45%]">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-2">
                    <Icon name="ArrowLeftIcon" size={14} className="transition-transform group-hover:-translate-x-1" />
                    {t('case.prev')}
                </span>
                <span className="block text-sm sm:text-base font-bold text-white group-hover:text-accent transition-smooth truncate">
                    {prev.rubro[language]}
                </span>
                </Link>
                <Link href={`/portfolio/${next.slug}`} className="group text-right max-w-[45%]">
                <span className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-2">
                    {t('case.next')}
                    <Icon name="ArrowRightIcon" size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="block text-sm sm:text-base font-bold text-white group-hover:text-accent transition-smooth truncate">
                    {next.rubro[language]}
                </span>
                </Link>
            </div>
            </nav>

            {/* ===== CONTACTO ===== */}
            <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-8">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md text-center px-6 py-16">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
                {t('case.contact.eyebrow')}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('case.contact.title')}
                </h2>
                <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
                {t('case.contact.subtitle')}
                </p>
                <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta transition-smooth hover:scale-105"
                >
                {t('case.contact.cta')}
                </Link>
            </div>
            </section>

        </main>
        <Footer />
        </div>
    );
    };

    export default CaseDetailInteractive;
