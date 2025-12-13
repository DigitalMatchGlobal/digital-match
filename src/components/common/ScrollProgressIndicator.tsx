    'use client';

    import { useState, useEffect } from 'react';

    interface ScrollProgressIndicatorProps {
    className?: string;
    }

    const ScrollProgressIndicator = ({ className = '' }: ScrollProgressIndicatorProps) => {
    const [scrollProgress, setScrollProgress] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollableHeight = documentHeight - windowHeight;
        const progress = (scrollTop / scrollableHeight) * 100;

        setScrollProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed top-16 left-0 right-0 z-100 h-0.5 bg-muted ${className}`}>
        <div
            className="h-full bg-gradient-accent transition-smooth"
            style={{ width: `${scrollProgress}%` }}
        />
        </div>
    );
    };

    export default ScrollProgressIndicator;