import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// robots.txt generado por Next. Permite el rastreo general y, explícitamente,
// a los crawlers de IA (GEO): queremos que DMG aparezca en respuestas de
// ChatGPT, Claude, Perplexity, Gemini, etc. Para bloquear alguno en el futuro,
// poné su user-agent con `disallow: '/'`.
export default function robots(): MetadataRoute.Robots {
    const aiBots = [
        'GPTBot', // OpenAI (entrenamiento/búsqueda)
        'OAI-SearchBot', // OpenAI (ChatGPT Search)
        'ChatGPT-User', // OpenAI (navegación en vivo)
        'ClaudeBot', // Anthropic
        'anthropic-ai', // Anthropic (legacy)
        'Claude-Web', // Anthropic (navegación)
        'PerplexityBot', // Perplexity
        'Google-Extended', // Gemini / Vertex
        'Applebot-Extended', // Apple Intelligence
        'Amazonbot',
        'cohere-ai',
        'Bytespider', // TikTok / Doubao
    ];

    return {
        rules: [
            { userAgent: '*', allow: '/' },
            ...aiBots.map((userAgent) => ({ userAgent, allow: '/' })),
        ],
        sitemap: `${site.url}/sitemap.xml`,
        host: site.url,
    };
}
