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
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold opacity-0">Loading...</h1>
            </div>
        </section>
        );
    }

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
        
        {/* --- NUEVO FONDO ANIMADO (Orbes de Luz) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Orbe 1 (Color principal) */}
            <div 
            className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob"
            />
            
            {/* Orbe 2 (Color secundario) */}
            <div 
            className="absolute top-1/3 -right-1/4 w-[400px] h-[400px] bg-accent-secondary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000"
            />
            
            {/* Orbe 3 (Color principal, más abajo) */}
            <div 
            className="absolute -bottom-1/4 left-1/3 w-[600px] h-[600px] bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-4000"
            />
            
            {/* Capa sutil de ruido/trama para dar textura tech (opcional) */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" />
        </div>
        
        {/* CONTENIDO PRINCIPAL (Sin cambios, solo asegurando que esté encima con z-10) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full bg-surface border border-border mb-6 sm:mb-8 shadow-lg backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                {t('hero.badge')}
            </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            {t('hero.title.part1')}
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                {t('hero.title.highlight')}
            </span>{' '}
            {t('hero.title.part2')}
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <button
                onClick={onBookingClick}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta transition-smooth hover:scale-105 hover:shadow-xl"
            >
                {t('hero.cta.book')}
            </button>
            <button
                onClick={onViewWorkClick}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-foreground border border-border rounded-lg transition-smooth hover:bg-surface hover:border-accent"
            >
                {t('hero.cta.work')}
            </button>
            </div>
        </div>

        {/* Nuevas animaciones CSS para los orbes */}
        <style jsx>{`
            @keyframes blob {
            0% {
                transform: translate(0px, 0px) scale(1);
            }
            33% {
                transform: translate(30px, -50px) scale(1.1);
            }
            66% {
                transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
                transform: translate(0px, 0px) scale(1);
            }
            }
            .animate-blob {
            animation: blob 15s infinite ease-in-out;
            }
            .animation-delay-2000 {
            animation-delay: 2s;
            }
            .animation-delay-4000 {
            animation-delay: 4s;
            }
        `}</style>
        </section>
    );
    };

    export default HeroSection;