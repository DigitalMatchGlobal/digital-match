    'use client';

    import { useState, useEffect } from 'react';
    import Header from '@/components/common/Header';
    import ScrollProgressIndicator from '@/components/common/ScrollProgressIndicator';
    import CTAFloatingButton from '@/components/common/CTAFloatingButton';
    import HeroSection from './HeroSection';
    import ProofStrip from './ProofStrip';
    import AboutSection from './AboutSection';
    import TechnicalShowcase from './TechnicalShowcase';
    import ServicesSection from './ServicesSection';
    //import TestimonialsSection from './TestimonialsSection';
    import FAQSection from './FAQSection';
    //import TrustIndicators from './TrustIndicators';*/}
    import ContactSection from './ContactSection';
    import Footer from './Footer';

    const LandingPageInteractive = () => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.querySelector(sectionId);
        if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        }
    };

    const handleBookingClick = () => {
        scrollToSection('#contact');
    };

    const handleViewWorkClick = () => {
        scrollToSection('#services');
    };

    const handleCaseStudyClick = (serviceId: string) => {
        console.log(`Opening case study for: ${serviceId}`);
    };

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/+59893892924', '_blank');
    };

    // Contenido principal (reutilizable para hidratado y no hidratado)
    const content = (
        <div className="min-h-screen bg-background">
        <Header />
        <ScrollProgressIndicator />
        <main>
            <HeroSection
            onBookingClick={handleBookingClick}
            onViewWorkClick={handleViewWorkClick}
            />
            <ProofStrip />
            <AboutSection />
            <TechnicalShowcase />
            <ServicesSection onCaseStudyClick={handleCaseStudyClick} />
            {/*<TestimonialsSection />*/}
            <FAQSection />
            {/*<TrustIndicators />*/}
            <ContactSection />
        </main>
        <Footer />
        <CTAFloatingButton
            onBookingClick={handleBookingClick}
            onWhatsAppClick={handleWhatsAppClick}
        />
        </div>
    );

    // NOTA: Ya no envolvemos en <LanguageProvider> porque está en el RootLayout
    return content;
    };

    export default LandingPageInteractive;