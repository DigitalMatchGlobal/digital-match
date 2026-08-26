    'use client';

    import { useState, useEffect, useRef } from 'react';
    import { useLanguage } from '@/contexts/LanguageContext'; // <--- IMPORTAMOS HOOK

    // Valores finales reales: se renderizan en SSR (visibles sin JS, buenos para SEO)
    // y la animación de conteo arranca sólo al entrar en viewport (cliente).
    const FINAL = { years: 14, projects: 144, delivery: 14 };

    // La tercera métrica es un RANGO ("7-14 días"), no un número suelto: se anima el
    // extremo superior desde el inferior, así se lee "7-7 → 7-8 → … → 7-14" y nunca
    // muestra un rango inválido. (Antes el "7-" era fijo y el otro extremo contaba
    // desde 0: se veía "7-0", "7-1"… y parecía roto.)
    const DELIVERY_MIN = 7;

    const desde = { years: 0, projects: 0, delivery: DELIVERY_MIN };

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

            setCounts(desde); // arrancar el conteo
            let currentStep = 0;
            const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setCounts({
                years: Math.floor(FINAL.years * progress),
                projects: Math.floor(FINAL.projects * progress),
                delivery: DELIVERY_MIN + Math.floor((FINAL.delivery - DELIVERY_MIN) * progress),
            });
            if (currentStep >= steps) {
                clearInterval(timer);
                setCounts(FINAL);
            }
            }, interval);
        },
        // Se dispara ANTES de que la sección entre en pantalla (mismo criterio que el
        // scroll-reveal). Si esperás a que esté visible, el usuario ve primero el valor
        // final del SSR y después el salto al valor inicial: parece un glitch.
        { threshold: 0, rootMargin: '0px 0px 250px 0px' }
        );

        if (sectionRef.current) {
        observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-14 sm:py-16 section-raised">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            {/* Retícula de hairlines en vez de 3 columnas flotando con gap-8: las cifras
                se leen como una sola tabla de prueba, no como tres cards sueltas.
                Las cifras van en NEUTRO (blanco) y el color queda para el rótulo: el
                degradado azul sobre "+144" competía con los CTA por la misma atención. */}
            <div className="reveal lattice grid grid-cols-1 sm:grid-cols-3">
            {[
                { value: `+${counts.years}`, label: t('proof.m1.label'), delay: 0 },
                { value: `+${counts.projects}`, label: t('proof.m2.label'), delay: 1 },
                { value: `${DELIVERY_MIN}-${counts.delivery}`, label: t('proof.m3.label'), delay: 2 },
            ].map((metric) => (
                <div key={metric.label} className="px-6 py-8 sm:px-8">
                <div className="font-display text-4xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
                    {metric.value}
                </div>
                <div className="mt-3 text-[11px] font-bold uppercase leading-4 tracking-[0.16em] text-muted-foreground">
                    {metric.label}
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    };

    export default ProofStrip;