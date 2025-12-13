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

    const floatingKeywords = [
        { textKey: 'keywords.ml', delay: '0s', duration: '20s' },
        { textKey: 'keywords.automation', delay: '2s', duration: '25s' },
        { textKey: 'keywords.api', delay: '4s', duration: '22s' },
        { textKey: 'keywords.cloud', delay: '1s', duration: '24s' },
        { textKey: 'keywords.analytics', delay: '3s', duration: '23s' },
        { textKey: 'keywords.ai', delay: '5s', duration: '21s' }
    ];

    if (!isHydrated) {
        return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full bg-surface border border-border mb-6 sm:mb-8">
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
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta">
                {t('hero.cta.book')}
                </button>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-foreground border border-border rounded-lg">
                {t('hero.cta.work')}
                </button>
            </div>
            </div>
        </section>
        );
    }

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10 animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-0 bg-gradient-to-tl from-accent-secondary/5 via-transparent to-accent/5 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            
            {floatingKeywords.map((keyword, index) => (
            <div
                key={index}
                className="absolute text-muted-foreground/20 text-xs sm:text-sm font-semibold whitespace-nowrap blur-sm hidden md:block"
                style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                animation: `float ${keyword.duration} ease-in-out infinite`,
                animationDelay: keyword.delay
                }}
            >
                {t(keyword.textKey)}
            </div>
            ))}
        </div>

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

        <style jsx>{`
            @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(20px, -20px) rotate(5deg);
            }
            50% {
                transform: translate(-15px, 15px) rotate(-5deg);
            }
            75% {
                transform: translate(15px, 10px) rotate(3deg);
            }
            }
        `}</style>
        </section>
    );
    };

    export default HeroSection;