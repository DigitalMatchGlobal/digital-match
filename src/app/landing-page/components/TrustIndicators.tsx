    'use client';

    import { useState, useEffect } from 'react';
    import AppImage from '@/components/ui/AppImage';
    import Icon from '@/components/ui/AppIcon';

    interface Client {
    id: string;
    name: string;
    logo: string;
    alt: string;
    outcome: string;
    }

    interface Certification {
    id: string;
    name: string;
    icon: string;
    description: string;
    }

    const TrustIndicators = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [hoveredClient, setHoveredClient] = useState<string | null>(null);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const clients: Client[] = [
    {
        id: '1',
        name: 'TechStart LATAM',
        logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9d64359-1764654562173.png",
        alt: 'Modern tech startup office with glass walls and collaborative workspace',
        outcome: '85% reduction in processing time'
    },
    {
        id: '2',
        name: 'ScaleUp Solutions',
        logo: "https://img.rocket.new/generatedImages/rocket_gen_img_17a80e87c-1764706018049.png",
        alt: 'Professional business team collaborating in modern conference room',
        outcome: '300% increase in customer satisfaction'
    },
    {
        id: '3',
        name: 'InnovateLab',
        logo: "https://img.rocket.new/generatedImages/rocket_gen_img_10dbd7105-1764654562894.png",
        alt: 'Innovation hub with creative workspace and technology displays',
        outcome: 'Scaled to 10K users in 3 months'
    },
    {
        id: '4',
        name: 'DataFlow Systems',
        logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7085398-1764660533982.png",
        alt: 'Data analytics company office with multiple monitors and dashboards',
        outcome: '$200K revenue in first quarter'
    }];


    const certifications: Certification[] = [
    {
        id: '1',
        name: 'ISO 27001',
        icon: 'ShieldCheckIcon',
        description: 'Information security management certified'
    },
    {
        id: '2',
        name: 'SOC 2',
        icon: 'LockClosedIcon',
        description: 'Data protection and privacy compliance'
    },
    {
        id: '3',
        name: 'LATAM + US Ready',
        icon: 'GlobeAltIcon',
        description: 'Based in Uruguay, serving international markets'
    }];


    if (!isHydrated) {
        return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Trusted by Leading Companies
                </h2>
                <p className="text-xl text-muted-foreground">
                Join 50+ startups and SMEs that scaled with us
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {clients.map((client) =>
                <div
                key={client.id}
                className="aspect-video rounded-sm overflow-hidden bg-surface border border-border">

                    <AppImage
                    src={client.logo}
                    alt={client.alt}
                    className="w-full h-full object-cover opacity-60" />

                </div>
                )}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {certifications.map((cert) =>
                <div
                key={cert.id}
                className="bg-surface border border-border rounded-sm p-6 text-center">

                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">
                    {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                    {cert.description}
                    </p>
                </div>
                )}
            </div>
            </div>
        </section>);

    }

    return (
        <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Trusted by Leading Companies
            </h2>
            <p className="text-xl text-muted-foreground">
                Join 50+ startups and SMEs that scaled with us
            </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {clients.map((client) =>
            <div
                key={client.id}
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
                className="relative aspect-video rounded-sm overflow-hidden bg-surface border border-border transition-smooth hover:border-accent cursor-pointer group">

                <AppImage
                src={client.logo}
                alt={client.alt}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-smooth" />

                {hoveredClient === client.id &&
                <div className="absolute inset-0 bg-primary/90 flex items-center justify-center p-4">
                    <p className="text-sm font-semibold text-primary-foreground text-center">
                        {client.outcome}
                    </p>
                    </div>
                }
                </div>
            )}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert) =>
            <div
                key={cert.id}
                className="bg-surface border border-border rounded-sm p-6 text-center transition-smooth hover:border-accent hover:shadow-cta">

                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Icon name={cert.icon as any} size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                    {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {cert.description}
                </p>
                </div>
            )}
            </div>

            <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-surface border border-border">
                <Icon name="CheckBadgeIcon" size={20} className="text-success" />
                <span className="text-sm font-semibold text-foreground">
                Security-first • Documented • Maintainable
                </span>
            </div>
            </div>
        </div>
        </section>);

    };

    export default TrustIndicators;