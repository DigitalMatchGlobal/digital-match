    /** @type {import('next').NextConfig} */
    const nextConfig = {
    productionBrowserSourceMaps: false,
    distDir: process.env.DIST_DIR || '.next',  typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
        },
        {
            protocol: 'https',
            hostname: 'images.pexels.com',
        },
        {
            protocol: 'https',
            hostname: 'images.pixabay.com',
        },
        ],
    },
    async redirects() {
        return [
        {
            source: '/landing-page',
            destination: '/',
            permanent: true,
        },
        // URLs legales legacy (.html) → rutas actuales. Evita 404 en enlaces viejos
        // (p. ej. los configurados en el panel de Meta antes de la migración a Next).
        {
            source: '/privacy-policy.html',
            destination: '/privacy',
            permanent: true,
        },
        {
            source: '/terms.html',
            destination: '/terms',
            permanent: true,
        },
        {
            source: '/data-deletion.html',
            destination: '/data-deletion',
            permanent: true,
        },
        ];
    },
    };

    export default nextConfig;
