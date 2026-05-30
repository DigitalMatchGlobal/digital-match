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
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] pt-16">
            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold opacity-0">Loading...</h1>
            </div>
        </section>
        );
    }

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] pt-16">
        
        {/* --- FONDO ANIMADO (Orbes de Luz con colores fijos para visibilidad garantizada) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            
            {/* Orbe 1: Púrpura (Arriba Izquierda) */}
            <div 
            className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-purple-600/40 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"
            />
            
            {/* Orbe 2: Azul (Arriba Derecha) */}
            <div 
            className="absolute top-[10%] -right-[10%] w-[500px] h-[500px] bg-blue-600/40 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"
            />
            
            {/* Orbe 3: Cian/Rosa (Abajo Centro) */}
            <div 
            className="absolute -bottom-[20%] left-[20%] w-[700px] h-[700px] bg-indigo-600/40 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob animation-delay-4000"
            />
            
            {/* Trama de cuadrícula sutil para efecto 'Tech' (se disuelve en los bordes) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)] [-webkit-mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />
        </div>
        
        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Badge superior */}
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.7)]" />
            <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wide">
                {t('hero.badge')}
            </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            {t('hero.title.part1')}
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent animate-gradient-x">
                {t('hero.title.highlight')}
            </span>{' '}
            {t('hero.title.part2')}
            </h1>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto px-4 leading-relaxed">
            {t('hero.subtitle')}
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <button
                onClick={onBookingClick}
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white text-black rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform hover:scale-105 active:scale-95"
            >
                {t('hero.cta.book')}
            </button>
            <button
                onClick={onViewWorkClick}
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white border border-white/20 bg-white/5 rounded-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
            >
                {t('hero.cta.work')}
            </button>
            </div>
        </div>

        {/* Fade de salida hacia ProofStrip (sin corte seco) */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#030712] pointer-events-none" />

        {/* Estilos CSS en línea para las animaciones */}
        <style jsx>{`
            @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob {
            animation: blob 10s infinite ease-in-out;
            }
            .animation-delay-2000 {
            animation-delay: 2s;
            }
            .animation-delay-4000 {
            animation-delay: 4s;
            }
            @keyframes gradient-x {
            0%, 100% { background-size: 200% 200%; background-position: left center; }
            50% { background-size: 200% 200%; background-position: right center; }
            }
            .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
            }
        `}</style>
        </section>
    );
    };

    export default HeroSection;