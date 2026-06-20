    'use client';

    import { useState, useEffect, useMemo } from 'react';
    import Link from 'next/link';
    import Image from 'next/image';
    import { usePathname } from 'next/navigation';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';

    // --- ICONOS SOCIALES SVG ---

    interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    }

    const WhatsappSVG = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="currentColor"><path d="M12.0007 2.0022C6.48422 2.0022 2.0022 6.48422 2.0022 12.0007C2.0022 14.1973 2.70014 16.2088 3.89662 17.8483L2.05118 22.0007L6.20358 20.1553C7.84307 21.3517 9.85461 22.0497 12.0007 22.0497C17.5147 22.0497 21.9992 17.5183 21.9992 12.0007C21.9992 6.48522 17.5147 2.0022 12.0007 2.0022ZM12.0007 20.2972C10.2787 20.2972 8.65761 19.8052 7.27663 18.9482L6.85563 18.6857L4.25367 19.6647L5.23265 17.1517L4.95765 16.6972C4.01368 15.1972 3.5187 13.5657 3.5187 12.0007C3.5187 7.24773 7.31915 3.38221 12.0007 3.38221C16.6802 3.38221 20.4827 7.24773 20.4827 12.0007C20.4827 16.7537 16.6802 20.2972 12.0007 20.2972ZM16.3276 14.4742C16.1426 14.3782 15.2286 13.9112 15.0607 13.8442C14.8917 13.7772 14.7677 13.7432 14.6437 13.9302C14.5197 14.1142 14.1627 14.5322 14.0537 14.6652C13.9457 14.7982 13.8357 14.8152 13.6507 14.7212C13.4657 14.6272 12.8687 14.4232 12.1627 13.7722C11.5947 13.2482 11.2117 12.6022 11.1027 12.4172C10.9937 12.2312 11.0917 12.1262 11.1837 12.0312C11.2667 11.9462 11.3667 11.8102 11.4597 11.7012C11.5527 11.5932 11.5837 11.5162 11.6457 11.3912C11.7077 11.2662 11.6767 11.1572 11.6297 11.0652C11.5837 10.9722 11.2117 10.0242 11.0557 9.64823C10.9087 9.28974 10.7517 9.32724 10.6357 9.32724C10.5267 9.32424 10.4027 9.32424 10.2787 9.32424C10.1547 9.32424 9.95368 9.37124 9.78269 9.56024C9.61269 9.74924 9.13171 10.2182 9.13171 11.1732C9.13171 12.1282 9.81468 13.0512 9.90768 13.1762C10.0007 13.3002 11.2297 15.2672 13.1976 16.0822C14.8216 16.7542 15.1587 16.6372 15.5147 16.6042C15.9107 16.5682 16.7316 16.1112 16.9016 15.6262C17.0716 15.1412 17.0716 14.7242 17.0256 14.6482C16.9796 14.5722 16.8546 14.5252 16.6696 14.4322H16.3276V14.4742Z" /></svg>
    );

    const InstagramSVG = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    );

    const LinkedInSVG = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    );

    // --- FIN ICONOS SOCIALES ---

    interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
    }

    const Footer = () => {
    const { t, language } = useLanguage();
    const pathname = usePathname();
    const isHome = pathname === '/';
    const currentYear = new Date().getFullYear();

    // Enlaces de navegación
    const footerLinks: FooterLink[] = [
        { label: t('nav.services'), href: '#services' },
        { label: t('nav.cases'), href: '/portfolio' },
        { label: t('faq.title'), href: '#process' }, // sección FAQ tiene id="process"
        { label: t('nav.contact'), href: '#contact' },
        // Producto propio (SaaS, Tech Provider de Meta) — link externo a la plataforma.
        { label: t('footer.matchbot'), href: 'https://matchbot.digitalmatchglobal.com', external: true },
    ];

    // Enlaces legales
    const legalLinks: FooterLink[] = [
        { label: t('footer.privacy'), href: '/privacy' }, // <--- CAMBIO: Usamos las claves que ya tienes
        { label: t('footer.terms'), href: '/terms' },
        { label: t('footer.data_deletion'), href: '/data-deletion' },
    ];

    // Redes sociales
    const socialLinks = [
        { 
        name: 'WhatsApp', 
        href: 'https://wa.me/+59893892924', 
        icon: WhatsappSVG 
        },
        { 
        name: 'Instagram', 
        href: 'https://instagram.com/digitalmatch.global', 
        icon: InstagramSVG 
        },
        { 
        name: 'LinkedIn', 
        href: 'https://linkedin.com/company/digital-match-global', 
        icon: LinkedInSVG 
        },
    ];

    const renderFooterLink = (link: FooterLink) => {
        if (link.external) {
        return (
            <a 
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
            {link.label}
            </a>
        );
        }
        
        // Si es un ancla (#): en la home hacemos scroll suave; fuera de la home
        // (ej. /portfolio) navegamos a la home con el hash.
        if (link.href.startsWith('#')) {
        if (!isHome) {
            return (
            <Link
                href={`/${link.href}`}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
                {link.label}
            </Link>
            );
        }
        return (
            <a
            href={link.href}
            onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(link.href);
                if (element) {
                const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }}
            className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
            >
            {link.label}
            </a>
        );
        }

        // Si es una ruta interna (/privacy), usamos Link de Next.js
        return (
        <Link 
            href={link.href}
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
        >
            {link.label}
        </Link>
        );
    };

    return (
        <>
        <footer className="bg-background border-t border-border pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* COLUMNA 1: Info de la empresa (LOGO + TEXTO ACTUALIZADO) */}
                <div className="space-y-6">
                <Link href="/" className="flex items-center gap-3">
                    {/* Logo Imagen */}
                    <Image 
                    src="/assets/images/Logo.png" 
                    alt="Logo DM"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-10 w-auto object-contain" 
                    />
                    
                    {/* Texto Digital Match Global con Degradado Animado */}
                    <span className="text-lg font-bold bg-gradient-to-r from-[#2563EB] via-[#6D5DFE] to-[#2563EB] bg-clip-text text-transparent animate-gradient-x-header">
                    Digital Match Global
                    </span>
                </Link>

                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {t('hero.subtitle')}
                </p>
                
                <div className="flex items-center space-x-4">
                    {socialLinks.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                        aria-label={`Follow us on ${social.name}`}
                    >
                        <social.icon size={20} />
                    </a>
                    ))}
                </div>
                </div>

                {/* COLUMNA 2: Navegación */}
                <div>
                <h3 className="text-lg font-bold text-foreground mb-4">{t('nav.menu')}</h3>
                <ul className="space-y-3">
                    {footerLinks.map((link) => (
                    <li key={link.label}>
                        {renderFooterLink(link)}
                    </li>
                    ))}
                </ul>
                </div>

                {/* COLUMNA 3: Legal y Ubicación */}
                <div>
                <h3 className="text-lg font-bold text-foreground mb-4">{t('footer.legal.title')}</h3>
                <ul className="space-y-3 mb-6">
                    {legalLinks.map((link) => (
                    <li key={link.label}>
                        {renderFooterLink(link)}
                    </li>
                    ))}
                </ul>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="MapPinIcon" size={16} /> 
                    <span>{t('footer.location')}</span>
                </div>
                </div>
            </div>

            {/* BARRA INFERIOR: Copyright */}
            <div className="border-t border-border pt-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <p className="text-sm text-muted-foreground">
                    © {currentYear} Digital Match Global. {t('footer.rights')}.
                </p>
                <div className="flex items-center space-x-2">
                    <Icon name="ShieldCheckIcon" size={16} className="text-success" />
                    <span className="text-sm text-muted-foreground">
                    {t('footer.security')}
                    </span>
                </div>
                </div>
            </div>
            </div>
        </footer>

        {/* --- ESTILOS PARA LA ANIMACIÓN DEL DEGRADADO --- */}
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

    export default Footer;