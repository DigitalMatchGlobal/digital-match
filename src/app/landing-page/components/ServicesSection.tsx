    'use client';

    import { useState, useEffect, useMemo } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';

    interface Service {
    id: string;
    title: string;
    icon: string;
    headline: string;
    description: string;
    features: string[];
    caseStudyLink: string;
    }

    interface ServicesSectionProps {
    onCaseStudyClick: (serviceId: string) => void;
    }

    const ServicesSection = ({ onCaseStudyClick }: ServicesSectionProps) => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const { t } = useLanguage();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Usamos useMemo para que las traducciones se actualicen al cambiar el idioma
    const services: Service[] = useMemo(() => [
        {
        id: 'automation',
        title: t('services.auto.title'),
        icon: 'BoltIcon',
        headline: t('services.auto.headline'),
        description: t('services.auto.desc'),
        features: [
            t('services.auto.f1'),
            t('services.auto.f2'),
            t('services.auto.f3'),
            t('services.auto.f4')
        ],
        caseStudyLink: '#case-study-automation'
        },
        {
        id: 'ai-assistants',
        title: t('services.ai.title'),
        icon: 'ChatBubbleLeftRightIcon',
        headline: t('services.ai.headline'),
        description: t('services.ai.desc'),
        features: [
            t('services.ai.f1'),
            t('services.ai.f2'),
            t('services.ai.f3'),
            t('services.ai.f4')
        ],
        caseStudyLink: '#case-study-ai'
        },
        {
        id: 'web-products',
        title: t('services.web.title'),
        icon: 'RocketLaunchIcon',
        headline: t('services.web.headline'),
        description: t('services.web.desc'),
        features: [
            t('services.web.f1'),
            t('services.web.f2'),
            t('services.web.f3'),
            t('services.web.f4')
        ],
        caseStudyLink: '#case-study-web'
        }
    ], [t]);

    if (!isHydrated) {
        return (
        <section id="services" className="py-24 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Skeleton simple */}
            </div>
        </section>
        );
    }

    return (
        <section id="services" className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('services.main_title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('services.main_subtitle')}
            </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
                <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`bg-surface border rounded-2xl p-8 transition-smooth cursor-pointer ${
                    hoveredCard === service.id
                    ? 'border-accent shadow-cta transform -translate-y-2'
                    : 'border-border hover:border-accent/50'
                }`}
                >
                <div className={`w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-6 transition-smooth ${
                    hoveredCard === service.id ? 'scale-110' : ''
                }`}>
                    <Icon name={service.icon as any} size={24} className="text-accent-foreground" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">
                    {service.title}
                </h3>

                <p className="text-lg font-semibold text-accent mb-4">
                    {service.headline}
                </p>

                <p className="text-muted-foreground mb-6">
                    {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="CheckIcon" size={12} className="text-accent" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                    </li>
                    ))}
                </ul>

                <button
                    // onClick={() => onCaseStudyClick(service.id)} <--- DESACTIVADO
                    onClick={() => { console.log("Botón desactivado por ahora") }}
                    className="flex items-center space-x-2 text-accent font-semibold transition-smooth hover:text-accent-secondary cursor-default opacity-80"
                    title="Próximamente" 
                >
                    <span>{t('services.cta_button')}</span>
                    <Icon name="ArrowRightIcon" size={16} />
                </button>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    };

    export default ServicesSection;