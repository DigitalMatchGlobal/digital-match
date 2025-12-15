    'use client';

    import { useState, useEffect, useRef } from 'react';
    import { useLanguage } from '@/contexts/LanguageContext'; // <--- IMPORTAMOS HOOK

    const ProofStrip = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({ hours: 0, satisfaction: 0, delivery: 0 }); // Nombres de estado actualizados
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage(); // <--- USAMOS HOOK

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

        // Actualizamos los contadores con los nuevos objetivos
        setCounts({
            hours: Math.floor(2000 * progress), // Meta: 2000 horas
            satisfaction: Math.floor(100 * progress), // Meta: 100%
            delivery: Math.floor(14 * progress) // Meta: 14 días
        });

        if (currentStep >= steps) {
            clearInterval(timer);
            setCounts({ hours: 2000, satisfaction: 100, delivery: 14 });
        }
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible, isHydrated]);

    if (!isHydrated) {
        return (
        <section className="py-12 bg-secondary/50 border-y border-border">
            {/* Skeleton simple */}
        </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-12 bg-secondary/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* MÉTRICA 1: Horas de Desarrollo */}
            <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                +{counts.hours}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t('proof.m1.label')}
                </div>
            </div>

            {/* MÉTRICA 2: Compromiso/Satisfacción */}
            <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-2">
                {counts.satisfaction}%
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t('proof.m2.label')}
                </div>
            </div>

            {/* MÉTRICA 3: Días de entrega */}
            <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                7-{counts.delivery}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t('proof.m3.label')}
                </div>
            </div>
            
            </div>
        </div>
        </section>
    );
    };

    export default ProofStrip;