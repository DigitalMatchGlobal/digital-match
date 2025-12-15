    'use client';

    import { useState, useEffect } from 'react';
    import { useLanguage } from '@/contexts/LanguageContext';

    interface HeroSectionProps {
    onBookingClick: () => void;
    onViewWorkClick: () => void;
    }

    const HeroSection = ({ onBookingClick, onViewWorkClick }: HeroSectionProps) => {
    const [isHydrated, setIsHydrated] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] pt-16">
            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold opacity-0">Loading...</h1>
            </div>
        </section>
        );
    }

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] pt-16">
        
        {/* --- FONDO SUTIL (Ambient Glow) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Luz cenital suave: Se ubica arriba al centro, muy difuminada y con baja opacidad */}
            <div 
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-40 animate-pulse-slow"
            />
            
            {/* Un toque de luz secundaria abajo para equilibrar, casi invisible */}
            <div 
            className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-secondary/10 rounded-full blur-[100px] opacity-20"
            />
        </div>
        
        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Badge: Diseño minimalista con borde fino */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm hover:border-white/20 transition-colors cursor-default">
            <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm font-medium text-gray-300 tracking-wide">
                {t('hero.badge')}
            </span>
            </div>

            {/* Título: Alto contraste, limpio */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            {t('hero.title.part1')}
            <br />
            {/* Gradiente sutil en el texto destacado */}
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {t('hero.title.highlight')}
            </span>{' '}
            {t('hero.title.part2')}
            </h1>

            {/* Subtítulo: Gris suave para no competir con el título */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto px-4 leading-relaxed font-light">
            {t('hero.subtitle')}
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <button
                onClick={onBookingClick}
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white text-black rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
            >
                {t('hero.cta.book')}
            </button>
            <button
                onClick={onViewWorkClick}
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white border border-white/10 bg-white/5 rounded-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
            >
                {t('hero.cta.work')}
            </button>
            </div>
        </div>

        <style jsx>{`
            .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: translate(-50%, 0) scale(1); }
            50% { opacity: 0.25; transform: translate(-50%, 0) scale(1.1); }
            }
        `}</style>
        </section>
    );
    };

    export default HeroSection;