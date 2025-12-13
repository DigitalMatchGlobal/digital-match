    'use client';

    import { useState, useEffect } from 'react';
    import Link from 'next/link';
    import Icon from '@/components/ui/AppIcon';

    interface FooterLink {
    label: string;
    href: string;
    }

    interface SocialLink {
    name: string;
    icon: string;
    href: string;
    }

    const Footer = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [currentYear, setCurrentYear] = useState(2025);

    useEffect(() => {
        setIsHydrated(true);
        setCurrentYear(new Date().getFullYear());
    }, []);

    const serviceLinks: FooterLink[] = [
        { label: 'Process Automation', href: '#services' },
        { label: 'AI Assistants', href: '#services' },
        { label: 'Web Products', href: '#services' },
        { label: 'Consulting', href: '#contact' }
    ];

    const legalLinks: FooterLink[] = [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Policy', href: '#cookies' }
    ];

    const socialLinks: SocialLink[] = [
        { name: 'LinkedIn', icon: 'LinkIcon', href: '#linkedin' },
        { name: 'Twitter', icon: 'AtSymbolIcon', href: '#twitter' },
        { name: 'GitHub', icon: 'CodeBracketIcon', href: '#github' }
    ];

    if (!isHydrated) {
        return (
        <footer className="bg-secondary/50 border-t border-border py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
                <div>
                <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-accent">
                    <span className="text-xl font-bold text-black">DM</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">
                    Digital Match Global
                    </span>
                </div>
                <p className="text-muted-foreground mb-6">
                    Building systems that scale your business through automation, AI, and web development
                </p>
                </div>

                <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Services</h3>
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
                <h3 className="text-lg font-bold text-foreground mb-4">Legal</h3>
                <ul className="space-y-3">
                    {legalLinks.map((link) => (
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
            </div>

            <div className="border-t border-border pt-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <p className="text-sm text-muted-foreground">
                    © {currentYear} Digital Match Global. All rights reserved.
                </p>
                </div>
            </div>
            </div>
        </footer>
        );
    }

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
                <p className="text-muted-foreground mb-6">
                Building systems that scale your business through automation, AI, and web development
                </p>
                <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                    <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center transition-smooth hover:border-accent hover:bg-accent/10"
                    aria-label={social.name}
                    >
                    <Icon name={social.icon as any} size={20} />
                    </a>
                ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Services</h3>
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
                <h3 className="text-lg font-bold text-foreground mb-4">Legal</h3>
                <ul className="space-y-3 mb-6">
                {legalLinks.map((link) => (
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
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MapPinIcon" size={16} />
                <span>Based in Uruguay</span>
                </div>
            </div>
            </div>

            <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <p className="text-sm text-muted-foreground">
                © {currentYear} Digital Match Global. All rights reserved.
                </p>
                <div className="flex items-center space-x-2">
                <Icon name="ShieldCheckIcon" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">
                    Security-first • Documented • Maintainable
                </span>
                </div>
            </div>
            </div>
        </div>
        </footer>
    );
    };

    export default Footer;