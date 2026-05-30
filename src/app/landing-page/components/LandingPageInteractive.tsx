    'use client';

    import { useState, useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { useReveal } from '@/hooks/useReveal';
    import Header from '@/components/common/Header';
    import ScrollProgressIndicator from '@/components/common/ScrollProgressIndicator';
    import CTAFloatingButton from '@/components/common/CTAFloatingButton';
    import HeroSection from './HeroSection';
    import ProofStrip from './ProofStrip';
    import AboutSection from './AboutSection';
    import Certifications from './Certifications';
    import TechnicalShowcase from './TechnicalShowcase';
    import ServicesSection from './ServicesSection';
    import CasesSection from './CasesSection';
    //import TestimonialsSection from './TestimonialsSection';
    import FAQSection from './FAQSection';
    //import TrustIndicators from './TrustIndicators';*/}
    import ContactSection from './ContactSection';
    import Footer from './Footer';

    const LandingPageInteractive = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const router = useRouter();
    useReveal();

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

    // Al llegar desde otra página con hash (ej. /#contact desde el detalle de un caso),
    // el browser no engancha el scroll: las secciones de arriba arrancan en skeleton
    // (guard isHydrated) y, al hidratarse, crecen y empujan el destino. Si scrolleamos
    // temprano, aterrizamos en el lugar equivocado. Por eso esperamos a que la posición
    // del destino se ESTABILICE (el layout dejó de moverse) y recién ahí scrolleamos.
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        let attempts = 0;
        let lastTop = -1;
        let stableCount = 0;

        const tryScroll = () => {
            const element = document.querySelector(hash);
            if (element) {
                const top = element.getBoundingClientRect().top + window.scrollY;
                // Misma medición dos veces seguidas = layout asentado.
                if (top > 0 && top === lastTop) {
                    stableCount++;
                } else {
                    stableCount = 0;
                }
                lastTop = top;

                if (stableCount >= 2) {
                    window.scrollTo({ top: top - 80, behavior: 'smooth' });
                    // Limpiamos el hash de la URL (deja /#contact como / ) sin recargar ni re-scrollear.
                    window.history.replaceState(null, '', window.location.pathname);
                    return;
                }
            }
            if (attempts++ < 40) {
                setTimeout(tryScroll, 100);
            }
        };
        tryScroll();
    }, []);

    const handleBookingClick = () => {
        scrollToSection('#contact');
    };

    const handleViewWorkClick = () => {
        router.push('/portfolio');
    };

    const handleCaseStudyClick = (serviceId: string) => {
        router.push('/portfolio');
    };

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/+59893892924', '_blank');
    };

    // Separador sutil entre secciones (línea en degradado, no full-bleed).
    // Refuerza el límite entre secciones, sobre todo cuando comparten fondo.
    const SectionDivider = () => (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="hairline" />
        </div>
    );

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
            <SectionDivider />
            <AboutSection />
            <SectionDivider />
            <Certifications />
            <SectionDivider />
            <ServicesSection onCaseStudyClick={handleCaseStudyClick} />
            <SectionDivider />
            <TechnicalShowcase />
            <SectionDivider />
            <CasesSection />
            {/*<TestimonialsSection />*/}
            <SectionDivider />
            <FAQSection />
            {/*<TrustIndicators />*/}
            <SectionDivider />
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