    'use client';

    import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

    type Language = 'es' | 'en';

    interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    }

    const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

    const translations = {
    es: {
        // Header & Navigation
        'nav.services': 'Servicios',
        'nav.results': 'Resultados',
        'nav.process': 'Proceso',
        'nav.contact': 'Contacto',
        'nav.menu': 'Menú',
        'nav.book': 'Agendar Consulta',
        'nav.tooltips.services': 'Explora soluciones de automatización',
        'nav.tooltips.results': 'Ver resultados de clientes',
        'nav.tooltips.process': 'Entender nuestra metodología',
        'nav.tooltips.contact': 'Agendar consulta',
        
        // Hero Section
        'hero.badge': 'Transformación digital • Automatización • IA',
        'hero.title.part1': 'Construí sistemas que',
        'hero.title.highlight': 'hacen escalar',
        'hero.title.part2': 'tu negocio',
        'hero.subtitle': 'Del cuello de botella al crecimiento en 7-14 días',
        'hero.cta.book': 'Agendar Llamada Estratégica',
        'hero.cta.work': 'Ver Nuestro Trabajo',
        
        // Floating Keywords
        'keywords.ml': 'Aprendizaje Automático',
        'keywords.automation': 'Automatización de Procesos',
        'keywords.api': 'Integración de APIs',
        'keywords.cloud': 'Infraestructura en la Nube',
        'keywords.analytics': 'Análisis de Datos',
        'keywords.ai': 'Soluciones IA',
        
        // Proof Strip
        'proof.clients': '50+ clientes en LATAM y EE.UU.',
        'proof.automation': '80% reducción en tareas manuales',
        'proof.delivery': '7-14 días de entrega',
        'proof.support': 'Soporte 24/7',
        
        // Services Section
        'services.title': 'Soluciones que Transforman',
        'services.subtitle': 'Servicios especializados para automatización y escalamiento empresarial',
        
        // FAQ Section
        'faq.title': 'Preguntas Frecuentes',
        
        // Contact Section
        'contact.title': 'Comencemos Tu Transformación',
        'contact.subtitle': 'Agenda una consulta gratuita de 30 minutos',
        
        // Footer
        'footer.rights': 'Todos los derechos reservados',
        'footer.privacy': 'Privacidad',
        'footer.terms': 'Términos',
    },
    en: {
        // Header & Navigation
        'nav.services': 'Services',
        'nav.results': 'Results',
        'nav.process': 'Process',
        'nav.contact': 'Contact',
        'nav.menu': 'Menu',
        'nav.book': 'Book Consultation',
        'nav.tooltips.services': 'Explore automation solutions',
        'nav.tooltips.results': 'See client results',
        'nav.tooltips.process': 'Understand our methodology',
        'nav.tooltips.contact': 'Book consultation',
        
        // Hero Section
        'hero.badge': 'Digital transformation • Automation • AI',
        'hero.title.part1': 'Build systems that',
        'hero.title.highlight': 'scale',
        'hero.title.part2': 'your business',
        'hero.subtitle': 'From bottleneck to breakthrough in 7-14 days',
        'hero.cta.book': 'Book Strategy Call',
        'hero.cta.work': 'View Our Work',
        
        // Floating Keywords
        'keywords.ml': 'Machine Learning',
        'keywords.automation': 'Process Automation',
        'keywords.api': 'API Integration',
        'keywords.cloud': 'Cloud Infrastructure',
        'keywords.analytics': 'Data Analytics',
        'keywords.ai': 'AI Solutions',
        
        // Proof Strip
        'proof.clients': '50+ clients in LATAM and US',
        'proof.automation': '80% reduction in manual tasks',
        'proof.delivery': '7-14 days delivery',
        'proof.support': '24/7 support',
        
        // Services Section
        'services.title': 'Solutions that Transform',
        'services.subtitle': 'Specialized services for business automation and scaling',
        
        // FAQ Section
        'faq.title': 'Frequently Asked Questions',
        
        // Contact Section
        'contact.title': "Let\'s Start Your Transformation",
        'contact.subtitle': 'Schedule a free 30-minute consultation',
        
        // Footer
        'footer.rights': 'All rights reserved',
        'footer.privacy': 'Privacy',
        'footer.terms': 'Terms',
    },
    };

    export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('es');

    useEffect(() => {
        const savedLang = localStorage.getItem('preferred-language') as Language;
        if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
        setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('preferred-language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.es] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
        {children}
        </LanguageContext.Provider>
    );
    };

    export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
    };