    'use client';

    import { CSSProperties } from 'react';
    import Link from 'next/link';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import type { Case } from '@/data/cases';

    interface CaseCardProps {
    item: Case;
    }

    // Tarjeta de caso: superficie glass común (sistema) + un glow del color PROPIO
    // del caso que se enciende al hover (lee "galería", no "otra fila igual").
    const CaseCard = ({ item }: CaseCardProps) => {
    const { t, language } = useLanguage();

    const accentStyle = {
        '--color-accent': item.accent,
        '--color-accent-secondary': item.accentSecondary,
    } as CSSProperties;

    return (
        <Link
        href={`/portfolio/${item.slug}`}
        style={accentStyle}
        className="group relative block h-full overflow-hidden glass-panel p-8 transition-smooth hover:-translate-y-2 hover:shadow-cta hover:ring-1 hover:ring-accent/40"
        >
        {/* glow del color del caso (solo al hover) */}
        <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `radial-gradient(120% 80% at 50% 0%, ${item.accent}22, transparent 70%)` }}
        />

        <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-accent flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
            <Icon name={item.icon as any} size={24} className="text-accent-foreground" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-3">
            {item.rubro[language]}
            </h3>

            <p className="text-muted-foreground mb-6 line-clamp-3">
            {item.challenge[language]}
            </p>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            {t('case.cta')}
            <Icon name="ArrowRightIcon" size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
        </div>
        </Link>
    );
    };

    export default CaseCard;
