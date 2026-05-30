    'use client';

    import { useState, useEffect } from 'react';
    import Link from 'next/link';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { casesByComplexity } from '@/data/cases';
    import CaseCard from '@/app/portfolio/components/CaseCard';

    const CasesSection = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return (
        <section id="cases" className="py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Skeleton simple */}
            </div>
        </section>
        );
    }

    const preview = casesByComplexity.slice(0, 3);

    return (
        <section id="cases" className="relative overflow-hidden py-24">
        <div className="glow-violet pointer-events-none absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('portfolio.home.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('portfolio.home.subtitle')}
            </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
            {preview.map((item, i) => (
                <div key={item.slug} className="reveal" data-delay={i}>
                <CaseCard item={item} />
                </div>
            ))}
            </div>

            <div className="text-center reveal">
            <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta transition-smooth hover:scale-105"
            >
                {t('portfolio.home.cta')}
                <Icon name="ArrowRightIcon" size={20} />
            </Link>
            </div>
        </div>
        </section>
    );
    };

    export default CasesSection;
