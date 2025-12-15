    'use client';

    import { useState, useEffect, useMemo } from 'react';
    import Link from 'next/link';
    import Icon from '@/components/ui/AppIcon'; 
    import { useLanguage } from '@/contexts/LanguageContext'; // <--- 1. Importamos el hook

    // ... (El código de los iconos SVG se mantiene igual, lo omito aquí para ahorrar espacio, PERO DÉJALO EN TU ARCHIVO) ...
    // PEGAR AQUÍ LOS COMPONENTES WhatsappSVG, LinkedInSVG, InstagramSVG E INTERFACES COMO ESTABAN ANTES

    interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    }

    // ... (Pega aquí tus definiciones de SVG: WhatsappSVG, LinkedInSVG, InstagramSVG, etc.) ...
    // Si quieres, puedo pasarte el archivo COMPLETO sin cortes si te resulta más fácil, avísame.
    // A efectos prácticos, asumo que mantienes los SVGs de tu archivo original.

    const WhatsappSVG = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="currentColor"><path d="M12.0007 2.0022C6.48422 2.0022 2.0022 6.48422 2.0022 12.0007C2.0022 14.1973 2.70014 16.2088 3.89662 17.8483L2.05118 22.0007L6.20358 20.1553C7.84307 21.3517 9.85461 22.0497 12.0007 22.0497C17.5171 22.0497 22.0007 17.5676 22.0007 12.0007C22.0007 6.48422 17.5171 2.0022 12.0007 2.0022ZM16.6347 15.6559C16.4897 15.9399 15.2227 16.5134 14.9352 16.6026C14.6477 16.6919 14.4442 16.6394 14.1612 16.4944C13.8782 16.3494 13.0645 16.0969 12.0638 15.7277C10.7497 15.234 9.8703 14.1166 9.57018 13.7291C9.27006 13.3415 8.78441 12.6345 8.78441 11.9275C8.78441 11.2205 9.28456 10.5135 9.38799 10.3872C9.49142 10.2609 9.59485 10.1616 9.72111 10.0353C9.84736 9.90897 10.0216 9.81639 10.1834 9.61286C10.3396 9.40933 10.392 9.27633 10.5956 9.0305C10.7991 8.78466 10.9026 8.8282 11.1061 9.31976C11.3096 9.81132 11.8961 11.2323 11.8961 11.4509C11.8961 11.6695 11.8284 11.9079 11.7508 11.9756C11.6732 12.0433 11.6055 12.111 11.4312 12.2852C11.2569 12.4594 10.9859 12.8088 11.286 13.3101C11.5861 13.8114 12.339 14.9757 13.3912 15.4673C14.1818 15.8202 14.6733 15.9892 14.881 16.0844C15.1764 16.2052 15.656 15.9961 15.8242 15.7554C16.0049 15.5147 16.2759 15.4054 16.4897 15.5471C16.6347 15.6364 16.7865 15.7981 16.6347 15.9724L16.6347 15.6559Z" /></svg>
    );
    const LinkedInSVG = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
    );
    const InstagramSVG = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.5" y1="6.5" y2="6.5" /></svg>
    );

    interface FooterLink {
    label: string;
    href: string;
    }

    interface SocialLink {
    name: 'WhatsApp' | 'LinkedIn' | 'Instagram';
    icon: 'WhatsappIcon' | 'LinkedInIcon' | 'InstagramIcon';
    href: string;
    }

    const SocialIconRenderer = ({ name, size }: { name: SocialLink['name'], size: number }) => {
    switch (name) {
        case 'WhatsApp': return <WhatsappSVG size={size} />;
        case 'LinkedIn': return <LinkedInSVG size={size} />;
        case 'Instagram': return <InstagramSVG size={size} />;
        default: return <span style={{ fontSize: `${size}px` }}>?</span>;
    }
    };

    const renderLegalLink = (link: FooterLink) => (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-smooth">
        {link.label}
    </a>
    );

    const Footer = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [currentYear, setCurrentYear] = useState(2025);
    const { t } = useLanguage(); // <--- 2. USAMOS EL HOOK

    useEffect(() => {
        setIsHydrated(true);
        setCurrentYear(new Date().getFullYear());
    }, []);

    // <--- 3. MODIFICAMOS useMemo PARA INCLUIR [t] COMO DEPENDENCIA
    const serviceLinks: FooterLink[] = useMemo(() => ([
        { label: t('footer.links.automation'), href: '#services' },
        { label: t('footer.links.ai'), href: '#services' },
        { label: t('footer.links.web'), href: '#services' },
        { label: t('footer.links.consulting'), href: '#contact' }
    ]), [t]); // IMPORTANTE: [t] hace que se recalcule al cambiar idioma

    const legalLinks: FooterLink[] = useMemo(() => ([
        { label: t('footer.privacy'), href: 'https://digitalmatchglobal.com/privacy' },
        { label: t('footer.terms'), href: 'https://digitalmatchglobal.com/terms' },
        { label: t('footer.cookies'), href: 'https://digitalmatchglobal.com/cookies' }
    ]), [t]);

    const socialLinks: SocialLink[] = useMemo(() => ([
        { name: 'WhatsApp', icon: 'WhatsappIcon', href: 'https://wa.me/59893892924' },
        { name: 'LinkedIn', icon: 'LinkedInIcon', href: 'https://linkedin.com/company/digitalmatchglobal' },
        { name: 'Instagram', icon: 'InstagramIcon', href: 'https://instagram.com/digitalmatchglobal' }
    ]), []);

    // --- MODO NO HIDRATADO (Renderiza texto por defecto, idealmente en inglés o español fijo) ---
    if (!isHydrated) {
        return (
        <footer className="bg-secondary/50 border-t border-border py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* ... Contenido estático ... */}
                <p>Loading...</p> 
            </div>
        </footer>
        );
    }

    // --- RENDERIZADO PRINCIPAL CON TRADUCCIONES ---
    return (
        <footer className="bg-secondary/50 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
                <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-accent">
                    <span className="text-xl font-bold text-black">DM</span>
                </div>
                <span className="text-lg font-bold text-foreground">
                    Digital Match Global
                </span>
                </Link>
                {/* USAMOS t() AQUI */}
                <p className="text-muted-foreground mb-6">
                {t('footer.description')} 
                </p>
                <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                    <a
                    key={social.name}
                    href={social.href}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center transition-smooth hover:border-accent hover:bg-accent/10"
                    aria-label={social.name}
                    >
                    <SocialIconRenderer name={social.name} size={20} />
                    </a>
                ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-foreground mb-4">{t('footer.services.title')}</h3>
                <ul className="space-y-3">
                {serviceLinks.map((link) => (
                    <li key={link.label}>
                    <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-smooth"
                    >
                        {link.label}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-bold text-foreground mb-4">{t('footer.legal.title')}</h3>
                <ul className="space-y-3 mb-6">
                {legalLinks.map((link) => (
                    <li key={link.label}>
                    {renderLegalLink(link)}
                    </li>
                ))}
                </ul>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MapPinIcon" size={16} /> 
                <span>{t('footer.location')}</span>
                </div>
            </div>
            </div>

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
    );
    };

    export default Footer;