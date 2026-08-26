    'use client';

    import type { CSSProperties } from 'react';
    import { useLanguage } from '@/contexts/LanguageContext';
    import Icon from '@/components/ui/AppIcon';
    import SectionIntro from '@/components/common/SectionIntro';

    /**
     * Sección PROCESO, con apilado sticky.
     *
     * Existe por dos razones, y la segunda es la que la justifica:
     *
     *  1. El nav tenía un ítem "Proceso" que caía en el FAQ (`FAQSection` cargaba el
     *     `id="process"`). El sitio prometía un proceso que no existía en ninguna parte.
     *  2. El apilado sólo significa algo si el contenido es una SECUENCIA. Un proceso lo
     *     es: cada etapa se apoya en la anterior, así que las tarjetas acumulándose
     *     narran en vez de decorar. 🚨 No trasladar este efecto a Servicios, Soluciones
     *     ni Casos: esos son bloques PARALELOS y apilarlos sugiere un orden inexistente.
     *
     * El mecanismo está en `.stack` (`tailwind.css`): CSS puro, sin JS. Lo único que
     * pone este componente es el índice `--i` de cada tarjeta.
     */
    const ProcessSection = () => {
    const { t } = useLanguage();

    const stages = [1, 2, 3, 4].map((n) => ({
        n,
        name: t(`process.s${n}.name`),
        lede: t(`process.s${n}.lede`),
        points: [t(`process.s${n}.p1`), t(`process.s${n}.p2`)],
    }));

    // 🚨 Padding inferior MENOR que el de las otras secciones: la `<ol>` del apilado ya
    // aporta su propio recorrido al final (ver el `pb` de la lista), y sumarle los 96px de
    // costumbre dejaba un vacío de más de 300px entre la última tarjeta y la costura. Los
    // dos números se piensan juntos: recorrido + padding ≈ 100px, que es el respiro
    // estándar de la página.
    return (
        <section id="process" className="relative bg-background pt-20 pb-8 sm:pt-24 sm:pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionIntro
            className="mb-14"
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
            body={t('process.subtitle')}
            />

            <ol className="stack mx-auto max-w-4xl">
            {stages.map((stage, index) => (
                <li
                key={stage.n}
                style={{ '--i': index } as CSSProperties}
                className={index > 0 ? 'mt-8 sm:mt-10' : ''}
                >
                <article className="stack-card border border-border">
                    {/* Barra de título: es la parte que queda visible cuando la tarjeta
                        se apila debajo de la siguiente. Su alto = `--stack-step`. */}
                    <div className="stack-bar flex items-center gap-3 border-b border-border px-5 sm:gap-4 sm:px-7">
                    <span aria-hidden="true" className="slash slash-sm text-accent" />
                    <span className="font-mono text-[11px] font-semibold text-accent">
                        0{stage.n}
                    </span>
                    <h3 className="font-display truncate text-[11px] font-bold uppercase tracking-[0.1em] text-foreground sm:text-[13px] sm:tracking-[0.14em]">
                        {stage.name}
                    </h3>
                    </div>

                    <div className="px-5 py-7 sm:px-7 sm:py-8">
                    <p className="max-w-2xl text-base leading-7 text-foreground sm:text-lg sm:leading-8">
                        {stage.lede}
                    </p>
                    <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                        {stage.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                            <Icon name="CheckIcon" size={15} className="mt-0.5 shrink-0 text-success" />
                            <span className="text-[15px] leading-6 text-muted-foreground">{point}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                </article>
                </li>
            ))}

            {/* Cola del apilado. Tiene que ser un ELEMENTO, no el `padding-bottom` que
                había: el `sticky` se recorta contra la caja de CONTENIDO, así que con
                padding el apilado completo duraba 10px de scroll (medido) y el resto era
                aire muerto. Ver `.stack-tail` en `tailwind.css`. */}
            <li aria-hidden="true" className="stack-tail" />
            </ol>
        </div>
        </section>
    );
    };

    export default ProcessSection;
