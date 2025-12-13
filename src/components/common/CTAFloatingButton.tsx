    'use client';

    import { useState, useEffect } from 'react';
    import Icon from '@/components/ui/AppIcon';

    interface CTAFloatingButtonProps {
    className?: string;
    onBookingClick?: () => void;
    onWhatsAppClick?: () => void;
    }

    const CTAFloatingButton = ({
    className = '',
    onBookingClick,
    onWhatsAppClick
    }: CTAFloatingButtonProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showWhatsApp, setShowWhatsApp] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
        const heroSection = document.querySelector('#hero');
        const scrollDepth = window.scrollY;

        if (heroSection) {
            const heroHeight = heroSection.clientHeight;
            setIsVisible(scrollDepth > heroHeight * 0.5);
            setShowWhatsApp(scrollDepth > heroHeight * 1.5);
        }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        if (showWhatsApp && onWhatsAppClick) {
        onWhatsAppClick();
        } else if (onBookingClick) {
        onBookingClick();
        } else {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const offsetTop = contactSection.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
            });
        }
        }
    };

    if (!isVisible) return null;

    return (
        <button
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-150 flex items-center justify-center w-14 h-14 bg-gradient-accent text-accent-foreground rounded-full shadow-cta transition-smooth hover:scale-110 hover:shadow-xl animate-pulse ${className}`}
        aria-label={showWhatsApp ? 'Contact via WhatsApp' : 'Book consultation'}
        >
        <Icon
            name={showWhatsApp ? 'ChatBubbleLeftRightIcon' : 'CalendarIcon'}
            size={24}
        />
        </button>
    );
    };

    export default CTAFloatingButton;