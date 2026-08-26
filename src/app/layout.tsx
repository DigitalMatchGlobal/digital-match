import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Archivo } from 'next/font/google';
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

// Fuente de DISPLAY: Archivo. Sólo para titulares y números-héroe (ver `font-display`
// en tailwind.config y la regla de h1..h6 en tailwind.css). Inter sigue siendo la de
// texto corrido: Archivo en párrafos pesa demasiado y baja la legibilidad.
// Es la misma familia que usa la landing de MatchBot → línea visual compartida.
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-archivo',
});

import { site } from '@/data/site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0D14',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: `${site.name} — Automatización, IA y software a medida`,
    template: '%s · Digital Match Global',
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: `${site.name} — Automatización, IA y software a medida`,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Automatización, IA y software a medida`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={site.language} className={`${inter.variable} ${archivo.variable}`}>
      <body>
        {/* PRIMER hijo del body a propósito: arranca el scroll-reveal durante el
                parseo del HTML, sin esperar a que React hidrate. Ver RevealBootstrap. */}
        <RevealBootstrap />
        {/* Envolvemos TODO en el LanguageProvider */}
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
