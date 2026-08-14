    import React from 'react';
    import { Inter } from 'next/font/google';
    import '../styles/index.css'; // Mantenemos tu importación de estilos original
    import { LanguageProvider } from '@/contexts/LanguageContext'; // <--- IMPORTANTE
    import RevealBootstrap from '@/components/common/RevealBootstrap';

    // Fuente autoalojada por Next (sin @import bloqueante a Google Fonts).
    // Expone --font-inter, que tailwind.css usa en body y headings.
    const inter = Inter({
        subsets: ['latin'],
        weight: ['400', '500', '600', '700'],
        display: 'swap',
        variable: '--font-inter',
    });

    export const viewport = {
    width: 'device-width',
    initialScale: 1,
    };

    export const metadata = {
    metadataBase: new URL('https://www.digitalmatchglobal.com'),
    title: {
        default: 'Digital Match Global',
        template: '%s · Digital Match Global',
    },
    description: 'Automatización de procesos, IA y desarrollo de software a medida para PYMEs y startups en LATAM y EE.UU.',
    icons: {
        icon: [
        { url: '/favicon.ico', type: 'image/x-icon' }
        ],
    },
    };

    export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="es" className={inter.variable}>
        <body>
            {/* PRIMER hijo del body a propósito: arranca el scroll-reveal durante el
                parseo del HTML, sin esperar a que React hidrate. Ver RevealBootstrap. */}
            <RevealBootstrap />
            {/* Envolvemos TODO en el LanguageProvider */}
            <LanguageProvider>
            {children}
            </LanguageProvider>
        </body>
        </html>
    );
    }