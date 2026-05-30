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
        ];
    },
    webpack(config) {
        config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: [/node_modules/],
        use: [{
            loader: '@dhiwise/component-tagger/nextLoader',
        }],
        });
        return config;
    },
    };

    export default nextConfig;
