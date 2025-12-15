    'use client';

    import { useState, useEffect, useMemo } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext'; // <--- Importamos el hook

    interface Capability {
    id: string;
    title: string;
    icon: string;
    description: string;
    outcomes: string[];
    roi: string; // Mantenemos el nombre 'roi' internamente, pero el contenido será el "Impacto"
    }

    const TechnicalShowcase = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [activeTab, setActiveTab] = useState('automation');
    const { t } = useLanguage(); // <--- Usamos el hook

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Usamos useMemo para que las capacidades se actualicen al cambiar el idioma
    const capabilities: Capability[] = useMemo(() => [
        {
        id: 'automation',
        title: t('technical.auto.title'),
        icon: 'CogIcon',
        description: t('technical.auto.desc'),
        outcomes: [
            t('technical.auto.out1'),
            t('technical.auto.out2'),
            t('technical.auto.out3'),
            t('technical.auto.out4')
        ],
        roi: t('technical.auto.impact') // <--- Aquí va el nuevo texto de Impacto
        },
        {
        id: 'ai',
        title: t('technical.ai.title'),
        icon: 'SparklesIcon',
        description: t('technical.ai.desc'),
        outcomes: [
            t('technical.ai.out1'),
            t('technical.ai.out2'),
            t('technical.ai.out3'),
            t('technical.ai.out4')
        ],
        roi: t('technical.ai.impact')
        },
        {
        id: 'web',
        title: t('technical.web.title'),
        icon: 'GlobeAltIcon',
        description: t('technical.web.desc'),
        outcomes: [
            t('technical.web.out1'),
            t('technical.web.out2'),
            t('technical.web.out3'),
            t('technical.web.out4')
        ],
        roi: t('technical.web.impact')
        }
    ], [t]);

    const activeCapability = capabilities.find(c => c.id === activeTab) || capabilities[0];

    if (!isHydrated) {
        return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Skeleton loader simple */}
            </div>
        </section>
        );
    }

    return (
        <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('technical.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('technical.subtitle')}
            </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 transition-smooth hover:border-accent/30">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {capabilities.map((capability) => (
                <button
                    key={capability.id}
                    onClick={() => setActiveTab(capability.id)}
                    className={`flex-1 px-6 py-4 text-left rounded-lg transition-smooth ${
                    activeTab === capability.id
                        ? 'bg-gradient-accent text-accent-foreground shadow-cta'
                        : 'bg-secondary border border-border hover:border-accent/50'
                    }`}
                >
                    <div className="flex items-center space-x-3 mb-2">
                    <Icon name={capability.icon as any} size={24} />
                    <div className="text-lg font-semibold">
                        {capability.title}
                    </div>
                    </div>
                </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                    {activeCapability.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                    {activeCapability.description}
                </p>
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-success/20 border border-success/30">
                    <Icon name="ChartBarIcon" size={16} className="text-emerald-400" />
                    {/* CAMBIO AQUÍ: Usamos text-emerald-400 para asegurar visibilidad sobre fondo oscuro */}
                    <span className="text-sm font-semibold text-emerald-400">
                    {activeCapability.roi}
                    </span>
                </div>
                </div>

                <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                    {t('technical.outcomes_title')}
                </h4>
                <div className="space-y-3">
                    {activeCapability.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="CheckIcon" size={16} className="text-accent" />
                        </div>
                        <span className="text-foreground">{outcome}</span>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
    };

    export default TechnicalShowcase;