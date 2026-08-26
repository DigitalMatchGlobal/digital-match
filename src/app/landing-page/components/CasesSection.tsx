    'use client';

    import Link from 'next/link';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { homePreviewCases } from '@/data/cases';
    import CaseCard from '@/app/portfolio/components/CaseCard';
    import SectionIntro from '@/components/common/SectionIntro';

    const CasesSection = () => {
    const { t } = useLanguage();

    // 2 casos de cliente + 1 enterprise (ver homePreviewCases en cases.ts).
    const preview = homePreviewCases;

    return (
        <section id="cases" className="relative overflow-hidden section-raised py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Centrada a propósito: es la sección-bisagra (la prueba), y el contraste
                con las intros alineadas a la izquierda es lo que le da ritmo a la página. */}
            <SectionIntro
            align="center"
            className="mb-16"
            eyebrow={t('portfolio.home.eyebrow')}
            title={t('portfolio.home.title')}
            body={t('portfolio.home.subtitle')}
            />

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
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-accent text-accent-foreground transition-colors hover:bg-accent-hover"
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
