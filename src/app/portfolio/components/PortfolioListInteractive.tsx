    'use client';

    import Header from '@/components/common/Header';
    import Footer from '@/app/landing-page/components/Footer';
    import CTAFloatingButton from '@/components/common/CTAFloatingButton';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { enterpriseCases, featuredCases, restCases } from '@/data/cases';
    import CaseCard from './CaseCard';
    import CircuitFlow from '@/app/landing-page/components/CircuitFlow';

    const PortfolioListInteractive = () => {
    const { t } = useLanguage();

    const handleBookingClick = () => {
        window.location.href = '/#contact';
    };

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/+59893892924', '_blank');
    };

    return (
        <div className="min-h-screen bg-background">
        <Header />
        <main>
            <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            {/* Circuito acotado a la zona superior (no estirado por toda la lista) */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px]">
                <CircuitFlow />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {t('portfolio.title')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('portfolio.subtitle')}
                </p>
                </div>

                {/* Destacados (bento): los de mayor complejidad, en tarjetas más grandes */}
                <div className="mb-10 flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {t('portfolio.featured')}
                </span>
                <span className="hairline h-px flex-1" />
                </div>

                <div className="grid gap-8 md:grid-cols-2 mb-16">
                {featuredCases.map((item) => (
                    <CaseCard key={item.slug} item={item} featured />
                ))}
                </div>

                {/* Banda ENTERPRISE: segmento propio, con bajada que explica qué son
                    (ingeniería sobre operaciones corporativas, no encargos de cliente). */}
                {enterpriseCases.length > 0 && (
                <div className="mb-16">
                    <div className="mb-4 flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        {t('portfolio.enterprise')}
                    </span>
                    <span className="hairline h-px flex-1" />
                    </div>
                    <p className="mb-10 max-w-3xl text-muted-foreground">
                    {t('portfolio.enterprise.subtitle')}
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {enterpriseCases.map((item) => (
                        <CaseCard key={item.slug} item={item} />
                    ))}
                    </div>
                </div>
                )}

                {/* Resto de proyectos, en grilla normal */}
                <div className="mb-10 flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {t('portfolio.more')}
                </span>
                <span className="hairline h-px flex-1" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restCases.map((item) => (
                    <CaseCard key={item.slug} item={item} />
                ))}
                </div>
            </div>
            </section>
        </main>
        <Footer />
        <CTAFloatingButton
            onBookingClick={handleBookingClick}
            onWhatsAppClick={handleWhatsAppClick}
        />
        </div>
    );
    };

    export default PortfolioListInteractive;
