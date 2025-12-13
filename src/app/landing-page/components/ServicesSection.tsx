    'use client';

    import { useState, useEffect } from 'react';
    import Icon from '@/components/ui/AppIcon';

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

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const services: Service[] = [
        {
        id: 'automation',
        title: 'Process Automation',
        icon: 'BoltIcon',
        headline: 'Eliminate 80% manual tasks',
        description: 'Transform repetitive workflows into automated systems that run 24/7 without human intervention',
        features: [
            'Custom workflow automation',
            'Data integration & synchronization',
            'Email & notification automation',
            'Report generation systems'
        ],
        caseStudyLink: '#case-study-automation'
        },
        {
        id: 'ai-assistants',
        title: 'AI Assistants',
        icon: 'ChatBubbleLeftRightIcon',
        headline: '24/7 customer support automation',
        description: 'Deploy intelligent chatbots that handle customer inquiries, bookings, and support tickets automatically',
        features: [
            'Natural language processing',
            'Multi-channel integration',
            'Custom training on your data',
            'Analytics & insights dashboard'
        ],
        caseStudyLink: '#case-study-ai'
        },
        {
        id: 'web-products',
        title: 'Web Products',
        icon: 'RocketLaunchIcon',
        headline: 'Revenue-generating platforms',
        description: 'Build scalable web applications and internal tools that drive business growth and efficiency',
        features: [
            'MVP development (7-14 days)',
            'Mobile-responsive design',
            'API & third-party integrations',
            'Security & compliance built-in'
        ],
        caseStudyLink: '#case-study-web'
        }
    ];

    if (!isHydrated) {
        return (
        <section id="services" className="py-24 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Services
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive solutions to scale your business operations
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service) => (
                <div
                    key={service.id}
                    className="bg-surface border border-border rounded-2xl p-8"
                >
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-6" />
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
                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    }

    return (
        <section id="services" className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive solutions to scale your business operations
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
                    onClick={() => onCaseStudyClick(service.id)}
                    className="flex items-center space-x-2 text-accent font-semibold transition-smooth hover:text-accent-secondary"
                >
                    <span>View Case Study</span>
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