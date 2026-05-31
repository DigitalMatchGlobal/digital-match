    'use client';

    import { useState, useEffect, useRef } from 'react';
    import { useLanguage } from '@/contexts/LanguageContext'; // <--- IMPORTAMOS HOOK
    import CircuitFlow from './CircuitFlow';

    // Valores finales reales: se renderizan en SSR (visibles sin JS, buenos para SEO)
    // y la animación de conteo arranca desde 0 sólo al entrar en viewport (cliente).
    const FINAL = { years: 14, projects: 144, delivery: 14 };

    const ProofStrip = () => {
    const [counts, setCounts] = useState(FINAL); // SSR/hidratación con el número final
    const sectionRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);
    const { t } = useLanguage(); // <--- USAMOS HOOK

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            if (!entries[0].isIntersecting || hasAnimated.current) return;
            hasAnimated.current = true;

            const duration = 2000;
            const steps = 60;
            const interval = duration / steps;

            setCounts({ years: 0, projects: 0, delivery: 0 }); // arrancar el conteo
            let currentStep = 0;
            const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setCounts({
                years: Math.floor(FINAL.years * progress),
                projects: Math.floor(FINAL.projects * progress),
                delivery: Math.floor(FINAL.delivery * progress),
            });
            if (currentStep >= steps) {
                clearInterval(timer);
                setCounts(FINAL);
            }
            }, interval);
        },
        { threshold: 0.3 }
        );

        if (sectionRef.current) {
        observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-12 section-raised">
        <CircuitFlow />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* MÉTRICA 1: Años de experiencia */}
            <div className="text-center reveal" data-delay={0}>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                +{counts.years}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t('proof.m1.label')}
                </div>
            </div>

            {/* MÉTRICA 2: Procesos automatizados */}
            <div className="text-center reveal" data-delay={1}>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent mb-2">
                +{counts.projects}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t('proof.m2.label')}
                </div>
            </div>

            {/* MÉTRICA 3: Días del diagnóstico a la solución */}
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