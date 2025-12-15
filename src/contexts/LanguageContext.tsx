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
        // ... (MANTENER LO ANTERIOR: nav, hero, keywords, proof, services, faq, contact, footer) ...
        // Solo pego aquí lo nuevo o lo que necesitamos que contexto tenga para no borrarte lo otro si copias todo
        // ASEGÚRATE DE MANTENER LAS OTRAS SECCIONES QUE YA TENÍAS (nav, hero, etc.)
        
        // --- PEGAR ESTO DENTRO DE 'es' ---
        'technical.title': 'Capacidades Técnicas',
        'technical.subtitle': 'Soluciones integrales diseñadas para escalar tus operaciones',
        'technical.outcomes_title': 'Resultados Típicos',
        
        // Automation
        'technical.auto.title': 'Automatización de Procesos',
        'technical.auto.desc': 'Elimina tareas repetitivas y optimiza operaciones con sistemas inteligentes.',
        'technical.auto.impact': 'Máxima Eficiencia Operativa', // Reemplazo de ROI
        'technical.auto.out1': 'Reduce la entrada manual de datos en un 90%',
        'technical.auto.out2': 'Corta tiempos de proceso de horas a minutos',
        'technical.auto.out3': 'Elimina el error humano en tareas de rutina',
        'technical.auto.out4': 'Libera a tu equipo para trabajo estratégico',

        // AI
        'technical.ai.title': 'Asistentes IA',
        'technical.ai.desc': 'Implementa chatbots inteligentes y asistentes virtuales para atención 24/7.',
        'technical.ai.impact': 'Atención 24/7 Garantizada', // Reemplazo de ROI
        'technical.ai.out1': 'Maneja el 80% de consultas automáticamente',
        'technical.ai.out2': 'Reduce el tiempo de respuesta a segundos',
        'technical.ai.out3': 'Escala el soporte sin contratar más personal',
        'technical.ai.out4': 'Mejora la satisfacción del cliente',

        // Web
        'technical.web.title': 'Productos Web',
        'technical.web.desc': 'Construye plataformas y herramientas internas que impulsan el crecimiento.',
        'technical.web.impact': 'Alto Rendimiento y SEO', // Reemplazo de ROI
        'technical.web.out1': 'Lanzamiento de MVP en 7-14 días',
        'technical.web.out2': 'Escalable a miles de usuarios',
        'technical.web.out3': 'Integración con sistemas existentes',
        'technical.web.out4': 'Optimizado para móviles y seguro',

        // ... (Mantener contact, footer, etc.)
        // REPETIR LAS CLAVES ANTERIORES QUE YA TENIAS EN EL ARCHIVO
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
        'hero.badge': 'Transformación digital • Automatización • IA',
        'hero.title.part1': 'Construí sistemas que',
        'hero.title.highlight': 'hacen escalar',
        'hero.title.part2': 'tu negocio',
        'hero.subtitle': 'Del cuello de botella al crecimiento en 7-14 días',
        'hero.cta.book': 'Agendar Llamada Estratégica',
        'hero.cta.work': 'Ver Nuestro Trabajo',
        'keywords.ml': 'Aprendizaje Automático',
        'keywords.automation': 'Automatización de Procesos',
        'keywords.api': 'Integración de APIs',
        'keywords.cloud': 'Infraestructura en la Nube',
        'keywords.analytics': 'Análisis de Datos',
        'keywords.ai': 'Soluciones IA',
        'proof.clients': '50+ clientes en LATAM y EE.UU.',
        'proof.automation': '80% reducción en tareas manuales',
        'proof.delivery': '7-14 días de entrega',
        'proof.support': 'Soporte 24/7',
        'services.title': 'Soluciones que Transforman',
        'services.subtitle': 'Servicios especializados para automatización y escalamiento empresarial',
        'faq.title': 'Preguntas Frecuentes',
        'faq.subtitle': 'Todo lo que necesitas saber sobre cómo trabajamos',
        'faq.q1.question': '¿Cuánto tiempo toma entregar un proyecto?',
        'faq.q1.answer': 'La mayoría de los proyectos se entregan en 7-14 días desde el inicio. Seguimos una metodología ágil con actualizaciones diarias. Para proyectos grandes, la primera versión funcional se entrega en 2 semanas.',
        'faq.q1.stats': 'Entrega promedio: 10 días',
        'faq.q2.question': '¿Cuál es su proceso de trabajo?',
        'faq.q2.answer': 'Comenzamos con una llamada estratégica, seguida de una especificación técnica. Desarrollamos en sprints con comunicación diaria. Tendrás acceso a un entorno de pruebas y la entrega final incluye documentación y capacitación.',
        'faq.q2.stats': '100% tasa de satisfacción',
        'faq.q3.question': '¿Ofrecen soporte post-entrega?',
        'faq.q3.answer': '¡Sí! Cada proyecto incluye 30 días de soporte gratuito. Después, ofrecemos planes de mantenimiento flexibles desde $500/mes. También entregamos documentación completa para que puedas gestionar el sistema independientemente.',
        'faq.q3.stats': '95% tasa de retención',
        'faq.q4.question': '¿Qué necesito para empezar?',
        'faq.q4.answer': 'Solo tres cosas: un problema de negocio claro que quieras resolver, acceso a los sistemas existentes (si aplica) y disponibilidad para una llamada de inicio de 1 hora. Nosotros nos encargamos del resto.',
        'faq.q4.stats': 'Inicio en 24-48 horas',
        'faq.q5.question': '¿Quiénes son sus clientes típicos?',
        'faq.q5.answer': 'Trabajamos con startups y PyMEs ambiciosas en LATAM y EE.UU. con presupuestos de $5K-50K. Clientes que buscan escalar eficientemente, valoran la experiencia técnica y necesitan sistemas documentados y mantenibles.',
        'faq.q5.stats': '50+ startups escaladas',
        'contact.title': '¿Listo para Escalar tu Negocio?',
        'contact.subtitle': 'Agenda una llamada estratégica gratuita y descubre cómo podemos transformar tus operaciones en 7-14 días',
        'contact.feat.response.title': 'Respuesta Rápida',
        'contact.feat.response.desc': 'Te responderemos en 24 horas para agendar tu llamada.',
        'contact.feat.commit.title': 'Sin Compromiso',
        'contact.feat.commit.desc': 'Consulta gratuita sin obligación. Te daremos consejos honestos incluso si no somos la opción ideal.',
        'contact.feat.start.title': 'Inicio Rápido',
        'contact.feat.start.desc': 'Si somos compatibles, podemos iniciar tu proyecto en 24-48 horas.',
        'contact.form.name': 'Nombre Completo',
        'contact.form.name.ph': 'Juan Pérez',
        'contact.form.email': 'Correo Electrónico',
        'contact.form.email.ph': 'juan@empresa.com',
        'contact.form.company': 'Nombre de la Empresa',
        'contact.form.company.ph': 'Tu Empresa',
        'contact.form.phone': 'Número de Teléfono',
        'contact.form.phone.ph': '+598 99 123 456',
        'contact.form.message': 'Cuéntanos sobre tu proyecto',
        'contact.form.message.ph': 'Describe el desafío de tu negocio y qué buscas lograr...',
        'contact.form.submit': 'Agendar Llamada Estratégica',
        'contact.form.sending': 'Enviando...',
        'contact.form.legal': 'Al enviar este formulario, aceptas nuestra política de privacidad y términos de servicio',
        'contact.error.name': 'El nombre es requerido',
        'contact.error.email': 'El correo es requerido',
        'contact.error.email.invalid': 'Formato de correo inválido',
        'contact.error.company': 'El nombre de la empresa es requerido',
        'contact.error.phone': 'El teléfono es requerido',
        'contact.success.title': '¡Mensaje Enviado con Éxito!',
        'contact.success.desc': 'Te contactaremos dentro de las próximas 24 horas para agendar tu llamada estratégica.',
        'contact.success.button': 'Enviar Otro Mensaje',
        'footer.rights': 'Todos los derechos reservados',
        'footer.privacy': 'Política de Privacidad',
        'footer.terms': 'Términos de Servicio',
        'footer.data_deletion': 'Eliminación de Datos',
        'footer.description': 'Construyendo sistemas que escalan tu negocio a través de automatización, IA y desarrollo web.',
        'footer.services.title': 'Servicios',
        'footer.legal.title': 'Legal',
        'footer.location': 'Con base en Uruguay',
        'footer.security': 'Seguridad primero • Documentado • Mantenible',
        'footer.links.automation': 'Automatización de Procesos',
        'footer.links.ai': 'Asistentes IA',
        'footer.links.web': 'Productos Web',
        'footer.links.consulting': 'Consultoría'
    },
    en: {
        // --- PEGAR ESTO DENTRO DE 'en' ---
        'technical.title': 'Technical Capabilities',
        'technical.subtitle': 'Comprehensive solutions designed to scale your business operations',
        'technical.outcomes_title': 'Typical Outcomes',

        // Automation
        'technical.auto.title': 'Process Automation',
        'technical.auto.desc': 'Eliminate repetitive tasks and streamline operations with intelligent automation systems.',
        'technical.auto.impact': 'High Operational Efficiency', // Replacement for ROI
        'technical.auto.out1': 'Reduce manual data entry by 90%',
        'technical.auto.out2': 'Cut processing time from hours to minutes',
        'technical.auto.out3': 'Eliminate human error in routine tasks',
        'technical.auto.out4': 'Free up team for strategic work',

        // AI
        'technical.ai.title': 'AI Assistants',
        'technical.ai.desc': 'Deploy intelligent chatbots and virtual assistants for 24/7 customer engagement.',
        'technical.ai.impact': 'Guaranteed 24/7 Support', // Replacement for ROI
        'technical.ai.out1': 'Handle 80% of customer inquiries automatically',
        'technical.ai.out2': 'Reduce response time from hours to seconds',
        'technical.ai.out3': 'Scale support without hiring',
        'technical.ai.out4': 'Improve customer satisfaction scores',

        // Web
        'technical.web.title': 'Web Products',
        'technical.web.desc': 'Build revenue-generating platforms and internal tools that drive business growth.',
        'technical.web.impact': 'High Performance & SEO', // Replacement for ROI
        'technical.web.out1': 'Launch MVP in 7-14 days',
        'technical.web.out2': 'Scale to thousands of users',
        'technical.web.out3': 'Integrate with existing systems',
        'technical.web.out4': 'Mobile-optimized and secure',

        // ... (Mantener contact, footer, etc.)
        // REPETIR LAS CLAVES ANTERIORES EN INGLÉS
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
        'hero.badge': 'Digital transformation • Automation • AI',
        'hero.title.part1': 'Build systems that',
        'hero.title.highlight': 'scale',
        'hero.title.part2': 'your business',
        'hero.subtitle': 'From bottleneck to breakthrough in 7-14 days',
        'hero.cta.book': 'Book Strategy Call',
        'hero.cta.work': 'View Our Work',
        'keywords.ml': 'Machine Learning',
        'keywords.automation': 'Process Automation',
        'keywords.api': 'API Integration',
        'keywords.cloud': 'Cloud Infrastructure',
        'keywords.analytics': 'Data Analytics',
        'keywords.ai': 'AI Solutions',
        'proof.clients': '50+ clients in LATAM and US',
        'proof.automation': '80% reduction in manual tasks',
        'proof.delivery': '7-14 days delivery',
        'proof.support': '24/7 support',
        'services.title': 'Solutions that Transform',
        'services.subtitle': 'Specialized services for business automation and scaling',
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Everything you need to know about working with us',
        'faq.q1.question': 'How long does it take to deliver a project?',
        'faq.q1.answer': 'Most projects are delivered within 7-14 days from kickoff. We follow an agile methodology with daily updates and iterative releases. For larger projects, we break them into phases with the first working version delivered within 2 weeks.',
        'faq.q1.stats': 'Average delivery: 10 days',
        'faq.q2.question': 'What is your work process?',
        'faq.q2.answer': 'We start with a strategy call to understand your needs, then create a detailed technical specification. Development happens in sprints with daily updates via Slack/WhatsApp. You get access to a staging environment to test features as they are built. Final delivery includes complete documentation, training, and 30 days of support.',
        'faq.q2.stats': '100% client satisfaction rate',
        'faq.q3.question': 'Do you provide post-delivery support?',
        'faq.q3.answer': 'Yes! Every project includes 30 days of free support and bug fixes. After that, we offer flexible maintenance plans starting at $500/month. We also provide training for your team and comprehensive documentation so you can manage the system independently if needed.',
        'faq.q3.stats': '95% client retention rate',
        'faq.q4.question': 'What do I need to get started?',
        'faq.q4.answer': 'Just three things: a clear business problem you want to solve, access to any existing systems we need to integrate with, and availability for a 1-hour kickoff call. We handle everything else including project management, design, development, testing, and deployment.',
        'faq.q4.stats': 'Start in 24-48 hours',
        'faq.q5.question': 'Who are your typical clients?',
        'faq.q5.answer': 'We work with ambitious startups and SMEs in LATAM and US markets with $5K-50K budgets. Our clients are typically experiencing operational bottlenecks, looking to scale efficiently, and value technical expertise over cheap alternatives. They need fast implementation with documented, maintainable systems.',
        'faq.q5.stats': '50+ startups scaled',
        'contact.title': "Ready to Scale Your Business?",
        'contact.subtitle': 'Book a free strategy call and discover how we can transform your operations in 7-14 days',
        'contact.feat.response.title': 'Fast Response',
        'contact.feat.response.desc': "We'll get back to you within 24 hours to schedule your strategy call",
        'contact.feat.commit.title': 'No Commitment',
        'contact.feat.commit.desc': "Free consultation with no obligation. We'll provide honest advice even if we're not the right fit",
        'contact.feat.start.title': 'Quick Start',
        'contact.feat.start.desc': "If we're a good match, we can start your project within 24-48 hours",
        'contact.form.name': 'Full Name',
        'contact.form.name.ph': 'John Doe',
        'contact.form.email': 'Email',
        'contact.form.email.ph': 'john@company.com',
        'contact.form.company': 'Company Name',
        'contact.form.company.ph': 'Your Company',
        'contact.form.phone': 'Phone Number',
        'contact.form.phone.ph': '+1 (555) 000-0000',
        'contact.form.message': 'Tell us about your project',
        'contact.form.message.ph': "Describe your business challenge and what you're looking to achieve...",
        'contact.form.submit': 'Book Strategy Call',
        'contact.form.sending': 'Sending...',
        'contact.form.legal': 'By submitting this form, you agree to our privacy policy and terms of service',
        'contact.error.name': 'Name is required',
        'contact.error.email': 'Email is required',
        'contact.error.email.invalid': 'Invalid email format',
        'contact.error.company': 'Company name is required',
        'contact.error.phone': 'Phone number is required',
        'contact.success.title': 'Message Sent Successfully!',
        'contact.success.desc': "We'll get back to you within 24 hours to schedule your strategy call",
        'contact.success.button': 'Send Another Message',
        'footer.rights': 'All rights reserved',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.data_deletion': 'Data Deletion',
        'footer.description': 'Building systems that scale your business through automation, AI, and web development',
        'footer.services.title': 'Services',
        'footer.legal.title': 'Legal',
        'footer.location': 'Based in Uruguay',
        'footer.security': 'Security-first • Documented • Maintainable',
        'footer.links.automation': 'Process Automation',
        'footer.links.ai': 'AI Assistants',
        'footer.links.web': 'Web Products',
        'footer.links.consulting': 'Consulting'
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