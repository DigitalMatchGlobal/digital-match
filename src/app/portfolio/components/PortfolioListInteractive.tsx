    'use client';

    import Header from '@/components/common/Header';
    import Footer from '@/app/landing-page/components/Footer';
    import CTAFloatingButton from '@/components/common/CTAFloatingButton';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { cases } from '@/data/cases';
    import CaseCard from './CaseCard';

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
            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {t('portfolio.title')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('portfolio.subtitle')}
                </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cases.map((item) => (
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
