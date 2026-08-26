    'use client';

    import { useLanguage } from '@/contexts/LanguageContext';
    import Icon from '@/components/ui/AppIcon';
    import AnchorLink from '@/components/common/AnchorLink';
    import { WhatsAppGlyph } from '@/components/ui/BrandGlyphs';
    import SectionIntro from '@/components/common/SectionIntro';

    /**
     * Banda de SOLUCIONES: la cartera de productos propios bajo el paraguas.
     *
     * Existe porque el sitio no tenía dónde vivieran las soluciones propias: MatchBot
     * estaba como un panel pegado adentro de `ServicesSection`, lo que lo hacía leer
     * como un accesorio del pilar "Asistentes IA" en vez de como un producto de la casa.
     *
     * 🚨 Regla de contenido: acá SOLO van soluciones que existen y están en uso. Hoy es
     * una (MatchBot). La segunda celda NO es un producto fantasma ni un "próximamente":
     * es una invitación a plantear un caso. Cuando haya una segunda solución real, se
     * agrega al array y la invitación pasa al final.
     */
    const SolutionsSection = () => {
    const { t } = useLanguage();

    return (
        <section id="solutions" className="relative py-20 sm:py-24 section-raised">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionIntro
            className="mb-14"
            eyebrow={t('solutions.eyebrow')}
            title={t('solutions.title')}
            body={t('solutions.subtitle')}
            />

            <div className="reveal lattice grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">

            {/* ---------- MatchBot: la solución en producción ---------- */}
            <a
                href="https://matchbot.digitalmatchglobal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-7 transition-colors hover:!bg-muted sm:p-9"
            >
                <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#25D366]/25 bg-[#25D366]/[0.08]">
                    <WhatsAppGlyph className="h-7 w-7" />
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 border border-border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {t('solutions.status.live')}
                </span>
                </div>

                <p className="eyebrow mt-7">{t('solutions.matchbot.category')}</p>
                <h3 className="mt-3 text-2xl font-bold text-foreground sm:text-[1.75rem]">MatchBot</h3>
                <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted-foreground">
                {t('solutions.matchbot.desc')}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Icon name="CheckBadgeIcon" size={14} className="text-accent" />
                    Meta Tech Provider
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3 sm:ml-auto">
                    {t('solutions.matchbot.cta')}
                    <Icon name="ArrowTopRightOnSquareIcon" size={15} />
                </span>
                </div>
            </a>

            {/* ---------- La invitación (no es un producto) ---------- */}
            <div className="flex flex-col justify-between p-7 sm:p-9">
                <div>
                <span className="icon-tile">
                    <Icon name="PuzzlePieceIcon" size={22} />
                </span>
                <h3 className="mt-7 text-xl font-bold leading-snug text-foreground">
                    {t('solutions.next.title')}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">
                    {t('solutions.next.desc')}
                </p>
                </div>
                <AnchorLink
                to="#contact"
                className="mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-accent transition-all hover:gap-3"
                >
                {t('solutions.next.cta')}
                <Icon name="ArrowRightIcon" size={15} />
                </AnchorLink>
            </div>

            </div>
        </div>
        </section>
    );
    };

    export default SolutionsSection;
