    'use client';

    import { useState, useEffect, useRef } from 'react';

    interface ProofMetric {
    value: number;
    suffix: string;
    label: string;
    }

    const ProofStrip = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({ startups: 0, reduction: 0, delivery: 0 });
    const sectionRef = useRef<HTMLDivElement>(null);

    const metrics: ProofMetric[] = [
        { value: 50, suffix: '+', label: 'startups scaled' },
        { value: 40, suffix: '%', label: 'average cost reduction' },
        { value: 7, suffix: '-day', label: 'average delivery' }
    ];

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
            setIsVisible(true);
            }
        },
        { threshold: 0.3 }
        );

        if (sectionRef.current) {
        observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [isHydrated]);

    useEffect(() => {
        if (!isVisible || !isHydrated) return;

        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts({
            startups: Math.floor(50 * progress),
            reduction: Math.floor(40 * progress),
            delivery: Math.floor(7 * progress)
        });

        if (currentStep >= steps) {
            clearInterval(timer);
            setCounts({ startups: 50, reduction: 40, delivery: 7 });
        }
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible, isHydrated]);

    if (!isHydrated) {
        return (
        <section className="py-12 bg-secondary/50 border-y border-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {metric.value}
                    {metric.suffix}
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {metric.label}
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-12 bg-secondary/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {counts.startups}+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                startups scaled
                </div>
            </div>

            <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-2">
                {counts.reduction}%
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                average cost reduction
                </div>
            </div>

            <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {counts.delivery}-day
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                average delivery
                </div>
            </div>
            </div>
        </div>
        </section>
    );
    };

    export default ProofStrip;