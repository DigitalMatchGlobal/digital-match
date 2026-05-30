    'use client';

    import { CSSProperties } from 'react';
    import Link from 'next/link';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import type { Case } from '@/data/cases';

    interface CaseCardProps {
    item: Case;
    featured?: boolean; // variante "destacado" (bento): más aire, ring de acento y eyebrow
    }

    // Tarjeta de caso (modelo Problema → Resultado): superficie glass común (sistema)
    // + glow del color PROPIO del caso al hover (lee "galería", no "otra fila igual").
    // Jerarquía: chip de tipo → rubro → problema (1 línea) → MÉTRICAS (héroe) → stack → CTA.
    const CaseCard = ({ item, featured = false }: CaseCardProps) => {
    const { t, language } = useLanguage();

    const accentStyle = {
        '--color-accent': item.accent,
        '--color-accent-secondary': item.accentSecondary,
    } as CSSProperties;

    return (
        <Link
        href={`/portfolio/${item.slug}`}
        style={accentStyle}
        aria-label={`${t('case.view')}: ${item.rubro[language]}`}
        className={`group relative flex h-full flex-col overflow-hidden glass-panel transition-smooth hover:-translate-y-2 hover:shadow-cta hover:ring-1 hover:ring-accent/40 ${
            featured ? 'p-8 md:p-10 ring-1 ring-accent/20' : 'p-8'
        }`}
        >
        {/* glow del color del caso (en destacados, sutil siempre; en el resto, al hover) */}
        <span
            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-100 ${
            featured ? 'opacity-60' : 'opacity-0'
            }`}
            style={{ background: `radial-gradient(120% 80% at 50% 0%, ${item.accent}22, transparent 70%)` }}
        />

        <div className="relative z-10 flex h-full flex-col">
            {/* fila superior: ícono + chip de tipo de proyecto */}
            <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-accent transition-transform duration-300 group-hover:scale-110">
                <Icon name={item.icon as any} size={24} className="text-accent-foreground" />
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {item.tag[language]}
            </span>
            </div>

            {featured && (
            <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                {t('case.featured')}
            </span>
            )}

            <h3 className={`mb-3 font-bold text-foreground ${featured ? 'text-2xl md:text-3xl' : 'text-2xl'}`}>
            {item.rubro[language]}
            </h3>

            <p className="mb-6 text-muted-foreground line-clamp-2">
            {item.challenge[language]}
            </p>

            {/* MÉTRICAS — el dato que respalda (héroe visual de la card) */}
            {item.metrics && item.metrics.length > 0 && (
            <div className="mb-6 flex divide-x divide-white/10 overflow-hidden rounded-xl border border-white/10">
                {item.metrics.map((m, i) => (
                <div key={i} className="flex-1 px-2 py-3 text-center">
                    <div className="mb-1 text-lg font-bold leading-none text-foreground sm:text-xl">
                    {m.value}
                    </div>
                    <div className="text-[11px] leading-tight text-muted-foreground">
                    {m.label[language]}
                    </div>
                </div>
                ))}
            </div>
            )}

            {/* stack (chips) */}
            <div className="mb-6 flex flex-wrap gap-1.5">
            {item.services.slice(0, 3).map((service, i) => (
                <span
                key={i}
                className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-white/70"
                >
                {service[language]}
                </span>
            ))}
            </div>

            {/* cita anónima opcional (solo si es real — ver cases.ts) */}
            {item.quote && (
            <p className="mb-6 border-l-2 border-accent/40 pl-3 text-sm italic text-white/70">
                “{item.quote.text[language]}”
                <span className="mt-1 block text-xs not-italic text-muted-foreground">
                — {item.quote.author[language]}
                </span>
            </p>
            )}

            {/* CTA anclado abajo: lleva al caso, no a contacto */}
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent">
            {t('case.view')}
            <Icon name="ArrowRightIcon" size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
        </div>
        </Link>
    );
    };

    export default CaseCard;
