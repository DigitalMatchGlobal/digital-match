    'use client';

    import { useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { useReveal } from '@/hooks/useReveal';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { scrollToAnchor, HEADER_OFFSET } from '@/lib/anchor';
    import { waLink } from '@/lib/whatsapp';
    import Header from '@/components/common/Header';
    import SectionSeam from '@/components/common/SectionSeam';
    import ScrollProgressIndicator from '@/components/common/ScrollProgressIndicator';
    import FloatingActions from '@/components/common/FloatingActions';
    import HeroSection from './HeroSection';
    import ProofStrip from './ProofStrip';
    import AboutSection from './AboutSection';
    import Certifications from './Certifications';
    import ProcessSection from './ProcessSection';
    import ServicesSection from './ServicesSection';
    import SolutionsSection from './SolutionsSection';
    import CasesSection from './CasesSection';
    //import TestimonialsSection from './TestimonialsSection';
    import FAQSection from './FAQSection';
    //import TrustIndicators from './TrustIndicators';*/}
    import ContactSection from './ContactSection';
    import Footer from './Footer';

    const LandingPageInteractive = () => {
    const router = useRouter();
    const { t } = useLanguage();
    useReveal();

    const scrollToSection = (sectionId: string) => {
        scrollToAnchor(sectionId);
    };

    // Al llegar desde otra página con hash (ej. /#contact desde el detalle de un caso),
    // el browser puede no enganchar el scroll si el layout todavía se está asentando
    // (fuentes/imágenes cargando empujan el destino). Por eso esperamos a que la posición
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
                    window.scrollTo({ top: top - HEADER_OFFSET, behavior: 'smooth' });
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
        // Mensaje prellenado: el botón abría un chat VACÍO (ver `@/lib/whatsapp`).
        window.open(waLink(t('wa.default')), '_blank', 'noopener,noreferrer');
    };

    // Separador entre secciones. Al entrar en viewport, dos pulsos SALEN de la diagonal
    // hacia los extremos (ver `.rule-*` en `tailwind.css`, que explica por qué cada mitad
    // se desvanece sólo hacia afuera).
    //
    // 🚨 Va SÓLO entre secciones que COMPARTEN FONDO. Si el fondo cambia
    // (blanco ↔ `.section-raised`), el cambio de suelo ya separa y el separador encima
    // queda como una línea perdida: peor, el separador no tiene fondo propio, así que en
    // un límite blanco→gris dibujaba una FRANJA BLANCA entre la sección gris y la línea.
    // Estaban puestos en los 9 límites; 5 eran de esos. La regla que queda es legible:
    // **misma tierra + filete = otra sección del mismo bloque; cambio de tierra = bloque
    // nuevo**. Antes de agregar uno, mirar el fondo de las dos secciones que separa.

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
            {/* 🚨 ÚNICO límite sin costura: el hero ya cierra con su propia banda de
                capacidades, que tiene filete superior y divisores verticales. Una costura
                acá sumaría una tercera línea a 80px de las otras dos. */}
            <ProofStrip />
            <SectionSeam />
            <AboutSection />
            <SectionSeam />
            <Certifications />
            <SectionSeam />
            <ServicesSection onCaseStudyClick={handleCaseStudyClick} />
            <SectionSeam />
            {/* La cartera de soluciones propias va DESPUÉS de las capacidades (qué
                sabemos hacer) y ANTES de los casos (qué entregamos): primero la casa,
                después sus productos, después la prueba. */}
            <SolutionsSection />
            <SectionSeam />
            {/* El proceso va antes de los casos: primero cómo trabajamos, después la
                prueba de que funciona. Es la sección que el nav prometía y no existía.
                Ocupa el lugar del ex-`TechnicalShowcase`, que decía lo mismo que
                Servicios con otras palabras (y con otra cifra) — ver CLAUDE.md §8. */}
            <ProcessSection />
            <SectionSeam />
            <CasesSection />
            {/*<TestimonialsSection />*/}
            <SectionSeam />
            <FAQSection />
            {/*<TrustIndicators />*/}
            <SectionSeam />
            <ContactSection />
        </main>
        <Footer />
        <FloatingActions
            onBookingClick={handleBookingClick}
            onWhatsAppClick={handleWhatsAppClick}
        />
        </div>
    );

    // NOTA: Ya no envolvemos en <LanguageProvider> porque está en el RootLayout
    return content;
    };

    export default LandingPageInteractive;