    'use client';

    import { useEffect, useState } from 'react';
    import { useLanguage } from '@/contexts/LanguageContext';

    /**
     * Kicker del hero: `╱ PROCESO  <proceso que rota>  ──▶  AUTOMATIZADO`
     *
     * Reemplaza al eyebrow plano que había antes ("Automatización · Inteligencia
     * artificial · Desarrollo a medida"), que era una lista con puntos medios y no
     * decía nada que el titular no dijera ya. Esto MUESTRA la transformación que vende
     * la casa, con procesos reales rotando — el equivalente honesto, para una
     * consultora, del "WhatsApp → Instagram → Tu equipo" de MatchBot.
     *
     * Dos decisiones que no son estéticas:
     *
     *  1. **Cero salto de layout.** Los procesos se apilan TODOS en la misma celda de
     *     grid y sólo cambia la opacidad. Así la celda mide siempre lo del texto más
     *     largo y la flecha nunca se mueve. Con un solo nodo de texto cambiando de
     *     contenido, cada rotación empujaría la línea entera.
     *  2. **`prefers-reduced-motion` corta la rotación**, no la disimula: se queda en el
     *     primer proceso y no hay intervalo corriendo. El guard global de `tailwind.css`
     *     cubre animaciones CSS, no un `setInterval`.
     *  3. **La transformación se MUESTRA, no se enuncia.** El riel entre el proceso y
     *     AUTOMATIZADO era una línea muerta: el kicker nombraba una transformación sin
     *     que pasara nada. Ahora, en cada rotación, un pulso recorre el riel, enciende la
     *     punta de flecha al llegar y prende AUTOMATIZADO en azul. Las tres animaciones
     *     viven en `tailwind.css` (`.kicker-pulse`, `.kicker-tip`, `.kicker-arrive`) y se
     *     reinician por `key={index}`: el remonte las pone de nuevo en cero, que es lo que
     *     las mantiene EN FASE con el cambio de palabra (un loop CSS de 2.6s driftearía
     *     contra el `setInterval`). Verificado: la animación vuelve a ~0ms exactamente
     *     cuando cambia la palabra.
     *  4. **En móvil son DOS líneas explícitas**, no un `flex-wrap` que corta donde cae.
     *     Con wrap automático la línea cortaba ENTRE el proceso y su flecha, así que
     *     "atención de consultas" quedaba arriba y "──▶ AUTOMATIZADO" abajo, sueltos:
     *     se perdía justo lo que el kicker muestra, que es la transformación. Ahora el
     *     rótulo `PROCESO` se va solo a la primera línea (es una etiqueta, no parte de
     *     la frase) y `<proceso> ▸ AUTOMATIZADO` queda ENTERO en la segunda.
     *     🚨 Por eso la regla horizontal se oculta en móvil: con ella, el proceso más
     *     largo ("integración entre sistemas") no entra en 360px y volvía a cortar.
     */
    const ROTATION_MS = 2600;

    const ProcessKicker = ({ className = '' }: { className?: string }) => {
    const { t } = useLanguage();
    const [index, setIndex] = useState(0);

    const processes = [
        t('hero.kicker.p1'),
        t('hero.kicker.p2'),
        t('hero.kicker.p3'),
        t('hero.kicker.p4'),
        t('hero.kicker.p5'),
    ];

    useEffect(() => {
        const reduced =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return undefined;

        const id = setInterval(() => {
        setIndex((i) => (i + 1) % processes.length);
        }, ROTATION_MS);
        return () => clearInterval(id);
        // processes.length es estable (5 claves fijas); el idioma no lo cambia.
    }, [processes.length]);

    return (
        // 🚨 PLACA OPACA, no un bloque suelto de texto.
        //
        // Dos problemas de un solo movimiento. El primero es de render: el circuito del
        // hero (`CircuitFlow`) pasa por DETRÁS de esta zona y en móvil, donde no hay
        // columna central que vaciar, las trazas y los paquetes le cruzaban por encima
        // justo a lo que el cliente lee en los primeros segundos. Con `bg-background` el
        // módulo ocluye la placa: no hace falta ninguna máscara y no puede volver a pasar.
        //
        // El segundo es de lenguaje: el fondo del hero es una PLACA y esto es una cadena
        // de señal. Encerrarlo en un filete lo convierte en un componente montado sobre la
        // placa — el rótulo arriba a la izquierda, el indicador de paso arriba a la
        // derecha, y abajo la señal entrando por un pad y saliendo por la flecha. Es la
        // misma gramática que ya usan el diagrama del stack y la banda de capacidades.
        //
        // 🚨 `inline-flex` SÓLO desde `sm`. Desde ahí la placa abraza su contenido (puede
        // hacerlo porque la celda del proceso mide siempre lo del texto MÁS LARGO, así que
        // el ancho no salta al rotar). En móvil va a todo el ancho, y no es estética: una
        // caja `inline-flex` se dimensiona por su CONTENIDO, así que no le queda holgura
        // para repartir y el `flex-1` del riel se resolvía en **0px** — el riel no existía
        // y el pulso no tenía por dónde viajar. Medido: 0px de ancho.
        <div className={`flex w-full max-w-full flex-col gap-2.5 border border-border bg-background px-4 py-3 sm:inline-flex sm:w-auto sm:px-5 ${className}`}>

        {/* Fila 1 — rótulo + instrumentación */}
        <span className="flex items-center gap-4">
            <span className="flex items-center gap-3">
            <span aria-hidden="true" className="slash text-accent" />
            <span className="eyebrow">{t('hero.kicker.label')}</span>
            </span>

            {/* Indicador de paso: una marca por proceso, la activa encendida. Dice, sin
                una palabra, que lo que rota son EJEMPLOS de una lista y cuántos hay. Es
                el mismo recurso que los `DepthTicks` del diagrama del stack. */}
            <span aria-hidden="true" className="ml-auto flex items-center gap-1">
            {processes.map((process, i) => (
                <span
                key={process}
                className={`h-[3px] w-2 transition-colors duration-300 ${
                    i === index ? 'bg-accent' : 'bg-border-strong'
                }`}
                />
            ))}
            </span>
        </span>

        {/* Fila 2 — la señal: pad → proceso → riel → flecha → resultado.
            🚨 Si se parte, se parte DONDE NOSOTROS DECIMOS. En móvil el módulo (con su
            filete y su padding) no deja lugar para la señal en una línea: medido, se
            desbordaban 24px a 320px, y a 393 entraba pero dejaba el riel en 12px, o sea un
            muñón sin recorrido para el pulso. El corte va DESPUÉS del nombre del proceso,
            nunca entre el proceso y su flecha — que era el corte malo del diseño anterior,
            porque dejaba "AUTOMATIZADO" suelto y se perdía justo lo que el kicker muestra.
            Bajando el grupo entero, el riel se queda con ~190px y el pulso se ve viajar. */}
        <span className="flex w-full flex-wrap items-center gap-x-1.5 gap-y-2 sm:gap-x-3">
            {/* Pad de entrada: el cuadradito hueco de una placa, el punto por donde la
                señal ENTRA. Cierra la lectura del módulo. */}
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 border border-accent" />

            {/* Celda de alto y ancho fijos: todos los procesos apilados, uno visible */}
            <span className="grid">
            {processes.map((process, i) => (
                <span
                key={process}
                aria-hidden={i !== index}
                className={`col-start-1 row-start-1 whitespace-nowrap font-display text-[13px] font-bold tracking-[-0.01em] text-foreground transition-all duration-300 ease-out sm:text-sm ${
                    i === index
                    ? 'translate-y-0 opacity-100 blur-0'
                    : 'pointer-events-none translate-y-[3px] opacity-0 blur-[1px]'
                }`}
                >
                {process}
                </span>
            ))}
            </span>

            {/* 🚨 El riel es `flex-1` en móvil y fijo desde `sm`. La celda del proceso mide
                siempre lo del texto MÁS LARGO (es lo que evita el salto de layout), así que
                con un proceso corto quedaba un hueco muerto entre la palabra y la flecha y
                la línea se leía partida en dos pedazos sueltos. Estirando el riel, el
                recorrido entrada → conector → salida queda continuo a cualquier ancho, y en
                320px colapsa a 0 sin desbordar. */}
            {/* Riel + flecha + resultado viajan como un solo grupo: es lo que garantiza
                que el corte de línea caiga antes y no en medio de la transformación. */}
            <span className="flex w-full items-center gap-1.5 sm:w-auto sm:gap-3">
            <span aria-hidden="true" className="relative h-px min-w-0 flex-1 bg-border-strong sm:w-16 sm:flex-none">
                {/* `key={index}`: el remonte reinicia la animación en cada rotación, que es
                    lo que mantiene al pulso en fase con el cambio de palabra. */}
                <span key={index} className="kicker-pulse" />
            </span>
            <span
                aria-hidden="true"
                key={`tip-${index}`}
                className="kicker-tip h-1.5 w-1.5 shrink-0 border-r border-t border-accent"
            />
            {/* 🚨 Acá había un `text-accent` MUERTO: `.eyebrow` se declara después de las
                utilidades generadas dentro del mismo `@layer utilities`, así que ganaba
                por orden de fuente y la palabra salía en grafito. El encendido lo hace
                `.kicker-arrive`, que al ser animación gana por origen. */}
            <span
                key={`res-${index}`}
                className="kicker-arrive eyebrow whitespace-nowrap !tracking-[0.12em] sm:!tracking-[0.22em]"
            >
            {t('hero.kicker.result')}
            </span>
            </span>
        </span>
        </div>
    );
    };

    export default ProcessKicker;
