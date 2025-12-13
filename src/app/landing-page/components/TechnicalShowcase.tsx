    'use client';

    import { useState, useEffect } from 'react';
    import Icon from '@/components/ui/AppIcon';

    interface Capability {
    id: string;
    title: string;
    icon: string;
    description: string;
    outcomes: string[];
    roi: string;
    }

    const TechnicalShowcase = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [activeTab, setActiveTab] = useState('automation');

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const capabilities: Capability[] = [
        {
        id: 'automation',
        title: 'Process Automation',
        icon: 'CogIcon',
        description: 'Eliminate repetitive tasks and streamline operations with intelligent automation systems',
        outcomes: [
            'Reduce manual data entry by 90%',
            'Cut processing time from hours to minutes',
            'Eliminate human error in routine tasks',
            'Free up team for strategic work'
        ],
        roi: '300-500% ROI in first year'
        },
        {
        id: 'ai',
        title: 'AI Assistants',
        icon: 'SparklesIcon',
        description: 'Deploy intelligent chatbots and virtual assistants for 24/7 customer engagement',
        outcomes: [
            'Handle 80% of customer inquiries automatically',
            'Reduce response time from hours to seconds',
            'Scale support without hiring',
            'Improve customer satisfaction scores'
        ],
        roi: '200-400% ROI in first year'
        },
        {
        id: 'web',
        title: 'Web Products',
        icon: 'GlobeAltIcon',
        description: 'Build revenue-generating platforms and internal tools that drive business growth',
        outcomes: [
            'Launch MVP in 7-14 days',
            'Scale to thousands of users',
            'Integrate with existing systems',
            'Mobile-optimized and secure'
        ],
        roi: '400-600% ROI in first year'
        }
    ];

    const activeCapability = capabilities.find(c => c.id === activeTab) || capabilities[0];

    if (!isHydrated) {
        return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Technical Capabilities
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive solutions designed to scale your business operations
                </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                {capabilities.map((capability) => (
                    <button
                    key={capability.id}
                    className="flex-1 px-6 py-4 text-left rounded-lg bg-secondary border border-border"
                    >
                    <div className="text-lg font-semibold text-foreground">
                        {capability.title}
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
                </div>
                <div>
                    <div className="space-y-3">
                    {activeCapability.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5" />
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
    }

    return (
        <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Technical Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive solutions designed to scale your business operations
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
                    <Icon name="ChartBarIcon" size={16} />
                    <span className="text-sm font-semibold text-success-foreground">
                    {activeCapability.roi}
                    </span>
                </div>
                </div>

                <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                    Typical Outcomes
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