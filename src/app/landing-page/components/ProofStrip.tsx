    'use client';

    import { useState, useEffect, useRef } from 'react';
    import { useLanguage } from '@/contexts/LanguageContext'; // <--- IMPORTAMOS HOOK

    const ProofStrip = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({ years: 0, projects: 0, delivery: 0 }); // Métricas reales
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
            years: Math.floor(14 * progress), // Meta: 14 años combinados
            projects: Math.floor(5 * progress), // Meta: 5 proyectos entregados
            delivery: Math.floor(14 * progress) // Meta: 14 días
        });

        if (currentStep >= steps) {
            clearInterval(timer);
            setCounts({ years: 14, projects: 5, delivery: 14 });
        }
        }, interval);

        return () => clearInterval(timer);
    }, [isVisible, isHydrated]);

    if (!isHydrated) {
        return (
        <section className="py-12 bg-secondary/50">
            {/* Skeleton simple */}
        </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-12 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* MÉTRICA 1: Años de experiencia combinada */}
            <div className="text-center reveal" data-delay={0}>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                +{counts.years}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t('proof.m1.label')}
                </div>
            </div>

            {/* MÉTRICA 2: Proyectos entregados */}
            <div className="text-center reveal" data-delay={1}>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-2">
                +{counts.projects}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t('proof.m2.label')}
                </div>
            </div>

            {/* MÉTRICA 3: Días de entrega */}
            <div className="text-center reveal" data-delay={2}>
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