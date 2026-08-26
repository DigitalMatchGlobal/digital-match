    'use client';

    import { CSSProperties, useEffect, useRef } from 'react';
    import Link from 'next/link';
    import Header from '@/components/common/Header';
    import Footer from '@/app/landing-page/components/Footer';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { cases } from '@/data/cases';
    import type { Case } from '@/data/cases';
    import { hexToChannels } from '@/lib/color';

    interface CaseDetailInteractiveProps {
    item: Case;
    }

    const CaseDetailInteractive = ({ item }: CaseDetailInteractiveProps) => {
    const { t, language } = useLanguage();

    // Color propio del caso: sobrescribe las variables CSS de accent + tiñe el fondo.
    // Identidad por caso SIN romper la paleta clara.
    // 🚨 Los `accent` de `cases.ts` son matices CLAROS (#38BDF8, #8B5CF6…): se eligieron
    // para fondo negro y sobre blanco no llegan a 4.5:1. Por eso NO se inyectan en
    // `--color-accent` (que es texto, links y CTA) sino en `--color-accent-bright`, que
    // por contrato es sólo gráfico. El color del caso vive en el lavado superior; el
    // texto sigue con el azul institucional. Y va en CANALES, no en hex (ver
    // `@/lib/color`, que explica por qué el hex crudo falla en silencio).
    const pageStyle = {
        '--color-accent-bright': hexToChannels(item.accent),
        background: `radial-gradient(65% 40% at 50% 0%, ${item.accent}14 0%, transparent 65%), radial-gradient(50% 35% at 85% 6%, ${item.accentSecondary}0F 0%, transparent 60%), #FFFFFF`,
    } as CSSProperties;

    // En el segmento enterprise no hubo un cliente que encargue el trabajo: son
    // herramientas propias. El hero cambia el rótulo para no afirmar lo que no fue.
    const isEnterprise = item.segment === 'enterprise';

    const idx = cases.findIndex((c) => c.slug === item.slug);
    const prev = cases[(idx - 1 + cases.length) % cases.length];
    const next = cases[(idx + 1) % cases.length];

    // 🚨 El watermark se estira para LLENAR EL ANCHO, con un techo de altura.
    //
    // El cuerpo no puede ser fijo: las palabras van de 6 caracteres ("Gym OS") a 12
    // ("Trazabilidad"), así que un mismo cuerpo deja a unas tocando los bordes y a otras
    // ocupando un tercio de la pantalla. Se calcula, entonces, el cuerpo que hace que la
    // palabra mida exactamente el ancho objetivo — y se le pone un TECHO.
    //
    // El techo no es un gusto: sin él, "Retail" (6 caracteres) necesitaba 490px de cuerpo
    // para llegar a los bordes en un Mac, la palabra pasaba a medir 380px de alto, no le
    // entraba arriba y aparecía **cortada por el header**. Con el techo (96px en móvil,
    // 240px en desktop) la mayoría de los casos llena el 98% del ancho y ninguno se corta.
    //
    // Dos etapas, porque el ancho real de un texto no se puede calcular sin medirlo:
    //   1. **SSR / sin JS** — estimación en CSS: ancho objetivo dividido por el ancho medio
    //      de glifo de la Archivo en peso black (~0.62em). Queda a ~5% del valor real, así
    //      que la palabra ya sale casi al ancho en el primer pintado.
    //   2. **Al montar** — `fit()` mide y corrige exacto: pone un cuerpo testigo de 100px,
    //      lee el ancho natural (la métrica tipográfica es lineal) y saca la regla de tres.
    const watermarkRef = useRef<HTMLSpanElement>(null);

    const watermarkStyle = {
        fontSize: `min(calc(min(98vw, 100rem) / ${(item.watermark.length * 0.62).toFixed(2)}), clamp(6rem, 16vw, 15rem))`,
    } as CSSProperties;

    useEffect(() => {
        const el = watermarkRef.current;
        if (!el) return undefined;

        const fit = () => {
        const vw = document.documentElement.clientWidth;
        const target = Math.min(vw * 0.98, 1600);
        el.style.letterSpacing = '0px';
        el.style.marginLeft = '0px';
        el.style.fontSize = '100px';
        const naturalAt100 = el.getBoundingClientRect().width;
        if (!naturalAt100) return;
        // Mismos números que el `clamp` del estilo SSR: si se cambia uno, cambiar el otro.
        const cap = Math.min(Math.max(96, vw * 0.16), 240);
        el.style.fontSize = `${Math.min((target / naturalAt100) * 100, cap)}px`;

        // Lo que falta para llegar al borde se reparte como TRACKING, no como cuerpo: es
        // la única forma de que las palabras cortas lleguen a los bordes sin crecer tanto
        // que se corten arriba (y sin deformar los glifos, que es lo que haría un
        // `scaleX`). Se reparte entre los huecos ENTRE letras; el `marginRight` negativo
        // compensa el espacio que CSS agrega también después del último glifo, para que la
        // palabra siga quedando centrada.
        const gaps = item.watermark.length - 1;
        const missing = target - el.getBoundingClientRect().width;
        if (missing > 1 && gaps > 0) {
            const tracking = missing / gaps;
            el.style.letterSpacing = `${tracking}px`;
            // CSS agrega el tracking TAMBIÉN después del último glifo, así que la caja del
            // elemento queda `tracking` px más ancha que la palabra visible. Con
            // `left:50% + translateX(-50%)` eso corre la palabra media pisada a la
            // izquierda (se veía la "R" de "Retail" cortada por el borde). `marginLeft`
            // sí desplaza a un absoluto anclado por `left`, y la mitad es lo que compensa.
            el.style.marginLeft = `${tracking / 2}px`;
        }
        };

        // Las webfonts cambian las métricas: si la Archivo llega después del primer
        // pintado, hay que volver a medir o el ajuste queda hecho sobre la fuente de
        // respaldo. `document.fonts.ready` es exactamente ese momento.
        fit();
        document.fonts?.ready.then(fit).catch(() => undefined);

        const observer = new ResizeObserver(fit);
        observer.observe(document.documentElement);
        return () => observer.disconnect();
    }, [item.watermark]);

    const numbered = [
        { n: '01', label: t('case.challenge'), body: item.challenge[language] },
        { n: '02', label: t('case.solution'), body: item.solution[language] },
    ];

    return (
        <div style={pageStyle} className="min-h-screen">
        <Header />
        <main>

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden pt-36 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-smooth mb-8"
                >
                <Icon name="ArrowLeftIcon" size={14} />
                {t('case.back')}
                </Link>

                {/* Bloque del titular CON su watermark detrás. El watermark vivía suelto en
                    un `absolute top-24` de la sección: caía detrás del link de volver (no
                    del titular) y a `24vw` nowrap las palabras largas se salían de pantalla
                    por los dos lados. Ahora va anclado al centro de este bloque, así que
                    siempre acompaña al titular a cualquier ancho. */}
                <div className="relative">
                <span
                    ref={watermarkRef}
                    aria-hidden="true"
                    data-watermark="true"
                    className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display font-black leading-none tracking-tight text-foreground/[0.07]"
                    style={watermarkStyle}
                >
                    {item.watermark}
                </span>

                <p className="relative text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-accent mb-5">
                {t(isEnterprise ? 'case.eyebrow.enterprise' : 'case.eyebrow')}
                </p>

                <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-8 max-w-3xl mx-auto">
                {item.headline[language]}
                </h1>
                </div>

                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm text-foreground/85 backdrop-blur-sm">
                <span className="uppercase text-[10px] tracking-wider text-muted-foreground">
                    {t(isEnterprise ? 'case.context' : 'case.client')}
                </span>
                {item.rubro[language]}
                </span>

                {/* tarjeta-objeto del hero (preview estilizado, sin imágenes reales) */}
                <div className="mt-14 max-w-md mx-auto">
                <div className="rounded-sm border border-border bg-muted backdrop-blur-md p-6 shadow-2xl">
                    <div className="flex items-center gap-1.5 mb-6">
                    <span className="w-3 h-3 rounded-full bg-border-strong" />
                    <span className="w-3 h-3 rounded-full bg-border-strong" />
                    <span className="w-3 h-3 rounded-full bg-border-strong" />
                    </div>
                    {/* 🚨 Antes era `bg-primary` + `text-primary-foreground`: en la paleta
                        oscura original eso era el color de marca, pero al invertir a la
                        paleta clara `--color-primary` pasó a ser la TINTA (casi negro), así
                        que el tile quedó como un cuadrado negro. Va `.icon-tile`, que es el
                        mismo tile de marca que usan las tarjetas del listado. */}
                    <div className="icon-tile mx-auto mb-5 [--tile-size:4rem]">
                    <Icon name={item.icon as any} size={32} />
                    </div>
                    {item.metrics && item.metrics.length > 0 && (
                    <div className="mb-5 flex divide-x divide-border overflow-hidden rounded-sm border border-border">
                        {item.metrics.map((m, i) => (
                        // 🚨 `basis-0 min-w-0` además de `flex-1`: con `flex-1` sólo, el
                        // ancho mínimo automático del contenido gana y la columna de la
                        // cifra más larga ("Antes/después") se comía el espacio de las
                        // otras dos. Los tercios tienen que ser tercios.
                        // Y con tercios iguales la cifra larga necesita `break-words`: el
                        // contenedor tiene `overflow-hidden`, así que sin permiso para
                        // envolver quedaba RECORTADA ("Antes/despu").
                        <div key={i} className="min-w-0 flex-1 basis-0 px-2 py-3 text-center">
                            {/* verde = color semántico de "resultado/impacto" (ver CLAUDE.md).
                                🚨 `text-success` (#0F7B54), NO `emerald-400`: el emerald claro
                                se eligió para fondo negro y sobre blanco queda en 1.9:1. */}
                            <div className="mb-1 break-words text-[13px] font-bold leading-tight text-success sm:text-[15px]">
                                {/* Espacio de ancho cero después de cada `/`: le da al browser
                                    un punto de corte natural. Sin esto, `break-words` cortaba
                                    "Antes/después" en "Antes/despu" + "és". */}
                                {m.value.replace(/\//g, '/\u200B')}
                            </div>
                            <div className="text-[11px] leading-tight text-muted-foreground">{m.label[language]}</div>
                        </div>
                        ))}
                    </div>
                    )}
                    <div className="flex flex-wrap justify-center gap-2">
                    {item.services.map((service, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-medium text-foreground">
                        {service[language]}
                        </span>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </section>

            {/* ===== SECCIONES NUMERADAS ===== */}
            <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {numbered.map((row) => (
                <div
                key={row.n}
                className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-border"
                >
                <div className="md:col-span-5">
                    <span className="block text-sm font-mono text-accent mb-3">{row.n}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">{row.label}</h2>
                </div>
                <div className="md:col-span-7">
                    <p className="text-lg text-muted-foreground leading-relaxed">{row.body}</p>
                </div>
                </div>
            ))}

            {/* 03 · Servicios */}
            <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-border">
                <div className="md:col-span-5">
                <span className="block text-sm font-mono text-accent mb-3">03</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('case.services')}</h2>
                </div>
                <div className="md:col-span-7">
                <div className="flex flex-wrap gap-3">
                    {item.services.map((service, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium text-foreground"
                    >
                        {service[language]}
                    </span>
                    ))}
                </div>
                </div>
            </div>

            {/* 04 · Resultado (opcional) */}
            {item.result && (
                <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t border-border">
                <div className="md:col-span-5">
                    <span className="block text-sm font-mono text-accent mb-3">04</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('case.result')}</h2>
                </div>
                <div className="md:col-span-7">
                    <p className="text-2xl font-semibold text-success">{item.result[language]}</p>
                </div>
                </div>
            )}
            </section>

            {/* ===== PREV / NEXT =====
                🚨 Dos tarjetas en grid, no dos links sueltos en una fila.
                Antes era `flex justify-between` con `max-w-[45%]` y `truncate` en cada
                lado: en móvil eso deja ~160px por link, así que el rótulo "PROYECTO
                ANTERIOR" (uppercase + tracking .2em) partía en dos líneas y el nombre del
                caso se cortaba a media palabra ("Preparación física de …"). Los rubros son
                frases de hasta 47 caracteres, no etiquetas: necesitan ancho completo y
                permiso para envolver. Apiladas en móvil y lado a lado desde `sm`, cada una
                tiene el ancho de una columna entera y ya no se corta nada. */}
            <nav className="relative z-10 mx-auto max-w-5xl border-t border-border px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {[
                { item: prev, dir: 'prev' as const },
                { item: next, dir: 'next' as const },
                ].map(({ item: sibling, dir }) => {
                const isNext = dir === 'next';
                return (
                    <Link
                    key={dir}
                    href={`/portfolio/${sibling.slug}`}
                    className={`group flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-4 transition-colors hover:border-accent/50 ${
                        isNext ? 'flex-row-reverse text-right' : 'text-left'
                    }`}
                    >
                    <Icon
                        name={isNext ? 'ArrowRightIcon' : 'ArrowLeftIcon'}
                        size={16}
                        className={`shrink-0 text-muted-foreground transition-all group-hover:text-accent ${
                        isNext ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'
                        }`}
                    />
                    <span className="min-w-0">
                        {/* El tracking del rótulo se afloja: a 0.2em no entraba en una línea
                            en la tarjeta más angosta. */}
                        <span className="block text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-muted-foreground">
                        {t(isNext ? 'case.next' : 'case.prev')}
                        </span>
                        <span className="mt-1.5 block text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-accent sm:text-base">
                        {sibling.rubro[language]}
                        </span>
                    </span>
                    </Link>
                );
                })}
            </div>
            </nav>

            {/* ===== CONTACTO ===== */}
            <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-8">
            <div className="rounded-3xl border border-border bg-muted backdrop-blur-md text-center px-6 py-16">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
                {t('case.contact.eyebrow')}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('case.contact.title')}
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                {t('case.contact.subtitle')}
                </p>
                <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent text-accent-foreground transition-colors hover:bg-accent-hover"
                >
                {t('case.contact.cta')}
                </Link>
            </div>
            </section>

        </main>
        <Footer />
        </div>
    );
    };

    export default CaseDetailInteractive;
