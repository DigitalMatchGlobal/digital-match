    'use client';

    import { useEffect, useMemo, useRef } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';

    // Franja "Cómo podés contratarnos" con efecto de proximidad (dock):
    // las tarjetas escalan según la distancia del cursor a su centro (no hover binario).
    // Implementación performante: nodos cacheados, rAF, distancia 2D, reset y reduced-motion.

    const RADIUS = 260; // px de influencia del cursor
    const MAX_SCALE = 0.14; // +14% como máximo (suave, evita superposición)

    const ContractModels = () => {
    const { t } = useLanguage();
    const gridRef = useRef<HTMLDivElement>(null);

    const models = useMemo(() => [
        { icon: 'CubeIcon', title: t('services.models.project.title'), desc: t('services.models.project.desc') },
        { icon: 'ClockIcon', title: t('services.models.hourly.title'), desc: t('services.models.hourly.desc') },
        { icon: 'LightBulbIcon', title: t('services.models.consulting.title'), desc: t('services.models.consulting.desc') },
        { icon: 'AcademicCapIcon', title: t('services.models.training.title'), desc: t('services.models.training.desc') }
    ], [t]);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const items = Array.from(grid.querySelectorAll<HTMLElement>('[data-dock]'));
        let raf = 0;
        let mx = 0, my = 0, active = false;

        const update = () => {
        raf = 0;
        for (const el of items) {
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const d = Math.hypot(mx - cx, my - cy);
            const tt = active ? Math.max(0, 1 - d / RADIUS) : 0;
            el.style.transform = `scale(${1 + tt * MAX_SCALE})`;
            el.style.zIndex = tt > 0.05 ? '1' : '0';
        }
        };
        const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
        const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; active = true; schedule(); };
        const onLeave = () => { active = false; schedule(); };

        grid.addEventListener('pointermove', onMove);
        grid.addEventListener('pointerleave', onLeave);
        return () => {
        grid.removeEventListener('pointermove', onMove);
        grid.removeEventListener('pointerleave', onLeave);
        cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="mt-20">
        <div className="mb-10">
            <div className="reveal flex items-center gap-2.5">
            <span aria-hidden="true" className="slash slash-sm text-accent" />
            <p className="eyebrow">{t('services.models.eyebrow')}</p>
            </div>
            <h3 className="reveal mt-4 text-2xl text-foreground md:text-3xl" data-delay="1">
            {t('services.models.title')}
            </h3>
            <p className="reveal mt-3 max-w-2xl text-muted-foreground" data-delay="2">
            {t('services.models.subtitle')}
            </p>
        </div>
        <div ref={gridRef} className="lattice grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((model) => (
            <div
                key={model.title}
                data-dock
                className="p-6 will-change-transform [transform-origin:center] [transition:transform_120ms_ease-out,background-color_250ms_ease-out] hover:!bg-muted"
            >
                <div className="icon-tile mb-5">
                <Icon name={model.icon as any} size={20} />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{model.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{model.desc}</p>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default ContractModels;
