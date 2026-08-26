    'use client';

    import { useState, useMemo } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import SectionIntro from '@/components/common/SectionIntro';
    import ContractModels from './ContractModels';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { serviceDomId } from '@/data/capabilities';
    import type { CapabilityId } from '@/data/capabilities';

    interface Service {
    /** 🚨 Tipado como unión a propósito: es lo que ata esta tarjeta con la celda de la
        banda del hero. Un typo acá rompe el build en vez de dejar un link muerto. */
    id: CapabilityId;
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
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const { t } = useLanguage();

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
        },
        {
        id: 'consulting',
        title: t('services.consulting.title'),
        icon: 'AcademicCapIcon',
        headline: t('services.consulting.headline'),
        description: t('services.consulting.desc'),
        features: [
            t('services.consulting.f1'),
            t('services.consulting.f2'),
            t('services.consulting.f3'),
            t('services.consulting.f4')
        ],
        caseStudyLink: '#case-study-consulting'
        }
    ], [t]);


    return (
        <section id="services" className="relative py-24 bg-background overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <SectionIntro
            className="mb-14"
            eyebrow={t('services.eyebrow')}
            title={t('services.main_title')}
            body={t('services.main_subtitle')}
            />

            {/* Retícula de hairlines en vez de 4 cards redondeadas con gap-8: los cuatro
                pilares se leen como un solo bloque. El hover ya no levanta la card
                (`-translate-y-2` desalineaba la retícula): enciende el borde y el fondo. */}
            <div className="reveal lattice grid md:grid-cols-2">
            {services.map((service, index) => (
                <div
                key={service.id}
                // Destino del link de la banda del hero. Ver `@/data/capabilities`.
                id={serviceDomId(service.id)}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`cursor-pointer p-7 transition-smooth sm:p-8 ${
                    hoveredCard === service.id ? '!bg-muted' : ''
                }`}
                >
                <div className={`icon-tile mb-6 transition-smooth ${
                    hoveredCard === service.id ? 'scale-105' : ''
                }`}>
                    <Icon name={service.icon as any} size={22} />
                </div>

                {/* El claim pasó a EYEBROW arriba del título: abajo competía en azul
                    con el link "Ver caso de éxito" por la misma atención. */}
                {/* tracking mas corto que el .eyebrow de seccion: estos claims son
                    frases largas y con 0.22em ocupaban todo el ancho de la celda. */}
                <p className="eyebrow tracking-[0.12em]">{service.headline}</p>

                <h3 className="mt-3 text-xl font-bold leading-tight text-foreground sm:text-2xl">
                    {service.title}
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                    {service.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                    {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        {/* `text-success`, no `emerald-400`: el emerald claro es para fondo oscuro. */}
                        <Icon name="CheckIcon" size={15} className="mt-1 flex-shrink-0 text-success" />
                        <span className="text-sm text-foreground/90">{feature}</span>
                    </li>
                    ))}
                </ul>

                <button
                    onClick={() => onCaseStudyClick(service.id)}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3"
                >
                    {t('services.cta_button')}
                    <Icon name="ArrowRightIcon" size={16} />
                </button>
                </div>
            ))}
            </div>

            {/* Modelos de contratación (con efecto de proximidad) */}
            <ContractModels />
        </div>
        </section>
    );
    };

    export default ServicesSection;