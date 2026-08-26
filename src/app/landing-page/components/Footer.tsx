    'use client';

    import { useState, useEffect, useMemo } from 'react';
    import Link from 'next/link';
    import Image from 'next/image';
    import { usePathname } from 'next/navigation';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { site } from '@/data/site';
    import { WhatsAppIcon, InstagramIcon, LinkedInIcon } from '@/components/common/BrandIcons';
    import { waLink } from '@/lib/whatsapp';


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
        { label: t('nav.solutions'), href: '#solutions' },
        { label: t('nav.cases'), href: '/portfolio' },
        { label: t('faq.nav'), href: '#faq' },
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

    // Redes sociales. Contacto y redes salen de `site.ts` (fuente única, ver CLAUDE.md §2).
    const socialLinks = [
        { name: 'WhatsApp', href: waLink(t('wa.default')), icon: WhatsAppIcon },
        { name: 'Instagram', href: site.social[0], icon: InstagramIcon },
        { name: 'LinkedIn', href: site.social[1], icon: LinkedInIcon },
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
        {/* 🚨 El `pb` móvil bajó de `pb-44` (176px, un vacío enorme al final) a `pb-24`.
            Se pudo porque `FloatingActions` esconde el CTA cuando el footer entra en
            pantalla: queda un solo botón flotante, así que alcanza con despejar 96px en
            vez de los dos. Si algún día vuelven los dos botones acá, hay que subirlo. */}
        <footer className="bg-background border-t border-border px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-10">
            <div className="max-w-7xl mx-auto">
            {/* La marca ocupa 2 de las 4 columnas: antes la grilla declaraba 4 con solo
                3 hijos y quedaba una columna vacía en desktop. */}
            {/* 🚨 DOS columnas ya en móvil, no una. Apiladas, los tres grupos de enlaces
                sumaban ~600px de scroll de puro listado y el footer se hacía interminable
                justo donde el visitante ya decidió. Menú y Legal entran cómodos lado a
                lado (son enlaces de una línea); la marca y Contacto ocupan el ancho
                completo porque llevan texto largo y direcciones. */}
            <div className="mb-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:mb-16 lg:grid-cols-5 lg:gap-12">

                {/* COLUMNA 1-2: Marca */}
                <div className="col-span-2 space-y-6 lg:col-span-2">
                <Link href="/" className="flex items-center gap-3">
                    {/* Decorativo: el nombre va como texto al lado, no hay que duplicarlo
                        en el alt (si no, los lectores de pantalla lo leen dos veces). */}
                    <Image
                    src="/assets/images/Logo.png"
                    alt=""
                    aria-hidden="true"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-10 w-auto object-contain"
                    />

                    <span className="font-display text-lg font-bold tracking-[-0.02em] text-accent">
                    Digital Match Global
                    </span>
                </Link>

                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    {t('footer.description')}
                </p>

                <div className="flex items-center space-x-4">
                    {socialLinks.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-border p-2 text-muted-foreground transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                        aria-label={`${t('footer.social.follow')} ${social.name}`}
                    >
                        <social.icon size={20} />
                    </a>
                    ))}
                </div>
                </div>

                {/* COLUMNA 3: Navegación */}
                <div>
                <h3 className="text-base font-bold text-foreground mb-4">{t('nav.menu')}</h3>
                <ul className="space-y-3">
                    {footerLinks.map((link) => (
                    <li key={link.label}>
                        {renderFooterLink(link)}
                    </li>
                    ))}
                </ul>
                </div>

                {/* COLUMNA 4: Legal */}
                <div>
                <h3 className="text-base font-bold text-foreground mb-4">{t('footer.legal.title')}</h3>
                <ul className="space-y-3">
                    {legalLinks.map((link) => (
                    <li key={link.label}>
                        {renderFooterLink(link)}
                    </li>
                    ))}
                </ul>
                </div>

                {/* COLUMNA 5: Contacto — el sitio existe para que te escriban, faltaba. */}
                <div className="col-span-2 lg:col-span-1">
                <h3 className="text-base font-bold text-foreground mb-4">{t('footer.contact.title')}</h3>
                <ul className="space-y-3">
                    <li>
                    <a
                        href={`mailto:${site.email}`}
                        className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                        <Icon name="EnvelopeIcon" size={16} className="mt-0.5 shrink-0" />
                        <span className="break-all">{site.email}</span>
                    </a>
                    </li>
                    <li>
                    <a
                        href={waLink(t('wa.default'))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                        {/* Glifo real de WhatsApp: era un globo de diálogo genérico de
                            Heroicons, que no dice "WhatsApp" sino "mensaje". */}
                        <WhatsAppIcon size={16} className="shrink-0" />
                        <span>{t('footer.contact.whatsapp')}</span>
                    </a>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="MapPinIcon" size={16} className="shrink-0" />
                    <span>{t('footer.location')}</span>
                    </li>
                </ul>
                </div>
            </div>

            {/* BARRA INFERIOR: copyright · seguridad · firma */}
            <div className="border-t border-border pt-8">
                <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-4">
                <p className="order-2 text-center text-sm text-muted-foreground lg:order-1 lg:text-left">
                    © {currentYear} Digital Match Global. {t('footer.rights')}.
                </p>

                {/* 🚨 El escudo va INLINE, dentro del párrafo, no como hermano flex.
                    Como flex y sin ancho máximo, la caja ocupaba todo el ancho de la
                    pantalla: el escudo quedaba pegado al borde izquierdo y el texto
                    centrado en el medio, como dos elementos sueltos que no se saludan.
                    Metido en el flujo del texto, envuelve con él y el bloque se lee como
                    una sola cosa centrada, sin depender de acertarle a un `max-w`. */}
                <p className="order-1 max-w-md text-center text-sm text-muted-foreground lg:order-2">
                    <Icon
                    name="ShieldCheckIcon"
                    size={16}
                    className="mr-2 inline-block shrink-0 align-[-3px] text-success"
                    />
                    {t('footer.security')}
                </p>

                {/* FIRMA DIGITAL MATCH GLOBAL — la misma que dejamos en los sitios de
                    clientes. Acá apunta al portfolio (enlazar a la home sería un
                    autoenlace sin valor para el usuario ni para SEO). */}
                <Link
                    href="/portfolio"
                    className="group relative order-3 flex items-center gap-2 overflow-hidden rounded-full border border-border bg-muted px-4 py-2 transition-all duration-500 hover:border-accent/50 lg:order-3"
                >
                    <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-accent/20 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                    {t('footer.signature.madeBy')}
                    </span>
                    <span className="bg-gradient-to-r from-[#2563EB] to-[#6D5DFE] bg-clip-text text-xs font-bold text-transparent transition-all duration-300 group-hover:brightness-125">
                    DigitalMatchGlobal
                    </span>
                    <Icon name="BoltIcon" variant="solid" size={12} className="text-muted-foreground transition-colors group-hover:text-accent-secondary" />
                </Link>
                </div>
            </div>
            </div>
        </footer>

        {/* --- ESTILOS PARA LA ANIMACIÓN DEL DEGRADADO --- */}
        </>
    );
    };

    export default Footer;