    'use client';

    import { useState, useEffect } from 'react';
    import Link from 'next/link';
    import Image from 'next/image';
    import { usePathname } from 'next/navigation';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import LanguageToggle from './LanguageToggle';

    interface HeaderProps {
    className?: string;
    }

    interface NavigationItem {
    labelKey: string;
    anchor: string;
    icon: string;
    tooltipKey: string;
    route?: string; // si está presente, es una ruta (Link) en lugar de un ancla con scroll
    }

    const Header = ({ className = '' }: HeaderProps) => {
    const [activeSection, setActiveSection] = useState<string>('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const { t } = useLanguage();
    const pathname = usePathname();
    const isHome = pathname === '/';

    const navigationItems: NavigationItem[] = [
        {
        labelKey: 'nav.about',
        anchor: '#about',
        icon: 'UserGroupIcon',
        tooltipKey: 'nav.tooltips.about'
        },
        {
        labelKey: 'nav.services',
        anchor: '#services',
        icon: 'CogIcon',
        tooltipKey: 'nav.tooltips.services'
        },
        {
        labelKey: 'nav.cases',
        anchor: '/portfolio',
        route: '/portfolio',
        icon: 'BriefcaseIcon',
        tooltipKey: 'nav.tooltips.cases'
        },
        {
        labelKey: 'nav.process',
        anchor: '#process',
        icon: 'ClipboardDocumentListIcon',
        tooltipKey: 'nav.tooltips.process'
        },
        {
        labelKey: 'nav.contact',
        anchor: '#contact',
        icon: 'ChatBubbleLeftRightIcon',
        tooltipKey: 'nav.tooltips.contact'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 20);

        const sections = navigationItems.map(item => item.anchor.substring(1));
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(`#${section}`);
                break;
            }
            }
        }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (anchor: string) => {
        // Si no estamos en la home, los anclas (#about) navegan a la home con el hash.
        if (!isHome) {
        window.location.href = `/${anchor}`;
        return;
        }
        const element = document.querySelector(anchor);
        if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
        <header
            className={`fixed top-0 left-0 right-0 z-100 transition-smooth ${
            scrolled ? 'backdrop-blur-nav bg-background/80' : 'bg-transparent'
            } ${className}`}
        >
            <nav className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            
            {/* LOGO + TEXTO CON ANIMACIÓN DINÁMICA */}
            <Link href="/" className="flex items-center gap-3">
                <Image 
                src="/assets/images/Logo.png" 
                alt="Logo DM"
                width={0}
                height={0}
                sizes="100vw"
                className="hidden sm:block h-10 w-auto object-contain" 
                priority
                />

                <span 
                className="text-base sm:text-lg font-bold bg-gradient-to-r from-[#2563EB] via-[#6D5DFE] to-[#2563EB] bg-clip-text text-transparent animate-gradient-x-header"
                >
                Digital Match Global
                </span>
            </Link>
            {/* FIN LOGO */}

            <div className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item) => {
                if (item.route) {
                    const active = pathname.startsWith(item.route);
                    return (
                    <Link
                        key={item.anchor}
                        href={item.route}
                        className={`group relative px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-smooth ${
                        active
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        title={t(item.tooltipKey)}
                    >
                        {t(item.labelKey)}
                        {active && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-accent" />
                        )}
                    </Link>
                    );
                }
                return (
                    <button
                    key={item.anchor}
                    onClick={() => handleNavClick(item.anchor)}
                    className={`group relative px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-smooth ${
                        isHome && activeSection === item.anchor
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title={t(item.tooltipKey)}
                    >
                    {t(item.labelKey)}
                    {isHome && activeSection === item.anchor && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-accent" />
                    )}
                    </button>
                );
                })}
            </div>

            <div className="hidden lg:flex items-center space-x-3">
                <LanguageToggle />
                <Link
                href="#contact"
                onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                }}
                className="px-4 xl:px-6 py-2 xl:py-2.5 text-sm xl:text-base font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta transition-smooth hover:scale-105 hover:shadow-xl whitespace-nowrap"
                >
                {t('nav.book')}
                </Link>
            </div>

            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-foreground hover:text-accent transition-smooth"
                aria-label="Toggle menu"
            >
                <Icon name={mobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
            </nav>
        </header>

        {mobileMenuOpen && (
            <div className="fixed inset-0 z-200 lg:hidden">
            <div
                className="absolute inset-0 bg-background/95 backdrop-blur-nav"
                onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-secondary/95 backdrop-blur-nav shadow-2xl overflow-y-auto">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
                <span className="text-base sm:text-lg font-bold text-foreground">{t('nav.menu')}</span>
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-foreground hover:text-accent transition-smooth"
                    aria-label="Close menu"
                >
                    <Icon name="XMarkIcon" size={24} />
                </button>
                </div>

                <div className="flex flex-col p-4 sm:p-6 space-y-2">
                <div className="mb-4">
                    <LanguageToggle />
                </div>
                
                {navigationItems.map((item) => {
                    const className = `flex items-center space-x-3 px-4 py-3 sm:py-4 text-left text-sm sm:text-base font-semibold rounded-lg transition-smooth ${
                    (item.route ? pathname.startsWith(item.route) : isHome && activeSection === item.anchor)
                        ? 'bg-accent/10 text-accent border border-accent/30' :'text-muted-foreground hover:text-foreground hover:bg-surface'
                    }`;
                    const inner = (
                    <>
                        <Icon name={item.icon as any} size={20} />
                        <div className="flex-1">
                        <div>{t(item.labelKey)}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{t(item.tooltipKey)}</div>
                        </div>
                    </>
                    );
                    if (item.route) {
                    return (
                        <Link
                        key={item.anchor}
                        href={item.route}
                        onClick={() => setMobileMenuOpen(false)}
                        className={className}
                        >
                        {inner}
                        </Link>
                    );
                    }
                    return (
                    <button
                        key={item.anchor}
                        onClick={() => handleNavClick(item.anchor)}
                        className={className}
                    >
                        {inner}
                    </button>
                    );
                })}

                <div className="pt-4 mt-4 border-t border-border">
                    <Link
                    href="#contact"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('#contact');
                    }}
                    className="flex items-center justify-center w-full px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta transition-smooth hover:scale-105"
                    >
                    {t('nav.book')}
                    </Link>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* --- ESTILOS DE LA ANIMACIÓN --- */}
        <style jsx>{`
            @keyframes gradient-x-header {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
            }
            .animate-gradient-x-header {
            background-size: 200% auto;
            animation: gradient-x-header 3s linear infinite;
            }
        `}</style>
        </>
    );
    };

    export default Header;