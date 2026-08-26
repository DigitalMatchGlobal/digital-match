    'use client';

    import { useLanguage } from '@/contexts/LanguageContext';
    import Icon from '@/components/ui/AppIcon';
    import ProcessKicker from '@/components/common/ProcessKicker';
    import CircuitFlow from './CircuitFlow';
    import AnchorLink from '@/components/common/AnchorLink';
    import { CAPABILITIES, serviceAnchor } from '@/data/capabilities';

    interface HeroSectionProps {
    onBookingClick: () => void;
    onViewWorkClick: () => void;
    }

    /**
     * Hero TIPOGRÁFICO a todo el ancho.
     *
     * Historia, para que no vuelva atrás:
     *  1. Póster centrado (titular + 2 botones) con orbes animados, `min-h-screen` y
     *     degradado en el texto. Dejaba ~250px de vacío y no decía qué hacemos.
     *  2. Panel de producto a la derecha ("así entra un proceso", con píldora de "en
     *     curso"). Descartado: un mockup de dashboard es vocabulario de PRODUCTO, y
     *     Digital Match Global es la casa que construye los productos.
     *  3. Dos columnas con un índice de capacidades plano a la derecha. Correcto pero
     *     previsible: la solución que sale por defecto.
     *  4. El titular manda a escala grande ocupando el ancho, y las capacidades bajan a
     *     una BANDA al borde inferior del hero. El aire de arriba y el filete de abajo
     *     son la composición; no hay relleno decorativo.
     *  5. Esto. La 4 era correcta pero se leía PLANA: tipografía negra sobre blanco y
     *     nada más. Se le sumaron las dos únicas cosas que esta marca tiene permitidas
     *     para dar profundidad (ver la nota de los glows retirados en `tailwind.css`):
     *       · **Jerarquía de color en el titular** — el arranque en tinta plena, el remate
     *         en el arco del logo (azul → violeta, `.text-brand-arc`). Neutro → marca es
     *         la transición que la frase nombra.
     *         ⚠️ Probado antes con el arranque en GRAFITO y el remate en tinta: al lado de
     *         un color saturado, el grafito se lee como texto deshabilitado. Con el remate
     *         en color, el arranque va en tinta.
     *       · **Guías de columna** (`.hero-guide`) — los filetes divisores de la banda
     *         suben atravesando el hero y se disuelven antes del titular. El blanco pasa
     *         a tener estructura sin un solo adorno.
     *     Lo que NO se hizo: nada de resplandor azul detrás del titular — los glows están
     *     retirados a propósito en esta marca (ver `tailwind.css`).
     *     ⚠️ El degradado del remate es una **decisión del cliente (2026-08-25)** tomada
     *     sobre la reserva anotada: el degradado en texto se había descartado dos veces en
     *     este proyecto por leer a startup en una marca madre (ver el comentario del
     *     `Header`). Si vuelve a incomodar, se saca `.text-brand-arc` y el remate queda en
     *     tinta; no hay nada más que deshacer.
     *
     * ⚠️ Esta composición exige copy corto. El titular está calibrado para caer en dos
     * líneas a 1440px y tres en móvil: si crece, baja el `clamp()` antes de dejar que sea
     * una línea más. Lleva `text-balance` para que no quede una palabra huérfana en la
     * última línea (sin él, en móvil "sistema." caía sola).
     */
    const HeroSection = ({ onBookingClick, onViewWorkClick }: HeroSectionProps) => {
    const { t } = useLanguage();

    // 🚨 La banda es un ÍNDICE, no un adorno: cada celda lleva a SU pilar dentro de
    // Servicios, no a la sección entera. Antes las cuatro apuntaban a `#services`, así que
    // hicieras clic donde hicieras clic caías en el mismo lugar — y ahí sí era repetir el
    // contenido de Servicios sin agregar nada. La lista y los nombres salen de
    // `@/data/capabilities`, la misma fuente que consume `ServicesSection`.
    const capabilities = CAPABILITIES.map((cap) => ({
        name: t(cap.titleKey),
        to: serviceAnchor(cap.id),
    }));

    return (
        <section id="hero" className="relative bg-background">

        {/* 🚨 El padding vertical vive ACÁ, no en la `<section>`. Dos razones y las dos son
            de composición, no de gusto:
              · el `pb` es lo que hace que las guías lleguen EXACTAMENTE al filete superior
                de la banda (si volviera a ser `mt` de la banda, quedaría un hueco);
              · el `pt` acá adentro hace que el `inset-0` del circuito cubra TAMBIÉN la
                franja del header. Con el padding en la `<section>`, el canvas arrancaba
                144px más abajo y los primeros 144px de la página quedaban en blanco pelado
                — justo la franja que se ve primero. */}
        <div className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36">

            {/* Circuito de placa con paquetes viajando. Estaba en el repo y había quedado
                HUÉRFANO (cero usos) desde el rediseño del hero: se reinstala acá, retuneado
                para la paleta clara (ver el encabezado de `CircuitFlow`). Es lo que le da
                movimiento al hero en los primeros segundos; las guías dan la estructura y
                el circuito, la vida. */}
            <CircuitFlow />

            {/* Guías de columna. Sólo desde `md`, que es donde la banda tiene divisores
                verticales que continuar: en móvil la banda es de una columna y unas guías
                sin nada abajo que las justifique serían adorno. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="mx-auto h-full max-w-7xl px-6 lg:px-8">
                <div className="grid h-full grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={i === 0 ? '' : 'hero-guide justify-self-start'} />
                ))}
                </div>
            </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

            <ProcessKicker className="reveal" />

            {/* El titular a escala. `max-w-6xl` y no el ancho completo: una medida de
                línea infinita no se lee, por más grande que sea el cuerpo. */}
            <h1
            className="reveal mt-9 max-w-6xl text-balance text-[clamp(2.15rem,7vw,4.75rem)] leading-[1.04] sm:mt-11"
            data-delay="1"
            >
                <span className="text-foreground">{t('hero.title.lead')}</span>{' '}
                <span className="text-brand-arc">{t('hero.title.payoff')}</span>
            </h1>

            {/* 🚨 Bajada y botones APILADOS, sobre el mismo eje. Antes eran dos columnas
                (`lg:grid-cols-[minmax(0,1fr)_auto]`) con los botones justificados al borde
                derecho: quedaban a ~600px de la bajada, flotando solos, y el ojo tenía que
                saltar de un lado al otro de la pantalla para pasar de leer a actuar.
                Peor: rompían el eje tipográfico, que es lo único que ordena este hero — el
                kicker, el titular, la bajada y la celda 01 de la banda de capacidades
                comparten la misma x (por eso esa celda no lleva padding izquierdo). Los
                botones eran el único elemento fuera de esa línea.
                El aire de la derecha no es un hueco a llenar: es donde vive el circuito. */}
            <p className="reveal mt-10 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8" data-delay="2">
                {t('hero.subtitle')}
            </p>

            <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" data-delay="3">
                <button
                onClick={onBookingClick}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 bg-accent px-7 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent-hover sm:text-base"
                >
                {t('hero.cta.book')}
                <Icon name="ArrowRightIcon" size={18} />
                </button>
                {/* 🚨 `bg-background` explícito: el botón secundario era transparente
                    (sobre blanco daba lo mismo), pero con el circuito detrás las trazas y
                    los paquetes se veían ADENTRO del botón, y eso no lee como textura sino
                    como un error de render. */}
                <button
                onClick={onViewWorkClick}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 border border-border-strong bg-background px-7 text-sm font-bold text-foreground transition-colors hover:bg-muted sm:text-base"
                >
                {t('hero.cta.work')}
                </button>
            </div>

            {/* 🚨 ACÁ NO VA UNA LISTA DE PROMESAS. Hubo tres chips, después dos, después
                uno, y al final ninguno. Los dos primeros salieron por repetir algo que ya
                tenía su casa ("+14 años" es la primera métrica del ProofStrip;
                "Documentado y transferible" lo explica entero `process.s4`). El último
                salió por una razón más importante, y es la que hay que recordar:
                **"Automatizamos sobre los sistemas que ya tenés" es una promesa universal
                sobre algo que depende del cliente.** Si el prospecto no tiene sistema, la
                frase lo deja afuera; si tiene uno que no se puede automatizar, promete lo
                que no se puede cumplir. Una frase que puede prendernos fuego vale menos
                que el espacio vacío.
                Si alguna vez vuelve una línea acá, tiene que ser CONDICIONAL ("cuando ya
                hay un sistema…"), no una capacidad garantizada. */}
            </div>
        </div>

        {/* ---------- BANDA DE CAPACIDADES: cierra el hero ---------- */}
        <div className="relative border-t border-border">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* 1 columna en móvil y 4 desde `md`: el estado intermedio de 2 columnas
                obligaba a bordes condicionales por índice para las celdas que
                envuelven, y no aportaba nada. Así los bordes son declarativos. */}
            <ul className="grid grid-cols-1 md:grid-cols-4">
                {capabilities.map((cap, index) => (
                <li
                    key={cap.to}
                    className="border-t border-border first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0"
                >
                    {/* 🚨 El padding lateral se decide por `index`, NO con la variante
                        `first:`. Estaba como `md:first:pl-0` sobre el <a> y el <a> es
                        SIEMPRE el primer hijo de su <li>: la variante aplicaba a las
                        cuatro celdas y las cuatro perdían el padding izquierdo, así que
                        los numerales quedaban pegados al filete divisor con todo el aire
                        acumulado a la derecha. La celda 1 no lleva padding a propósito:
                        alinea con el titular y con la bajada (el eje tipográfico de la
                        página); las otras respiran de su filete. */}
                    <AnchorLink
                    to={cap.to}
                    className={`group flex h-full items-start gap-4 py-6 transition-colors hover:bg-muted md:py-7 ${
                        index === 0 ? 'md:pr-6 lg:pr-7' : 'md:px-6 lg:px-7'
                    }`}
                    >
                    <span className="font-mono text-[11px] font-semibold leading-5 text-accent">
                        0{index + 1}
                    </span>
                    <span className="font-display flex-1 text-[15px] font-bold leading-snug text-foreground">
                        {cap.name}
                    </span>
                    {/* La diagonal se corre al hover: el mismo recurso del kicker */}
                    <span
                        aria-hidden="true"
                        className="slash slash-sm mt-0.5 text-border-strong transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    />
                    </AnchorLink>
                </li>
                ))}
            </ul>
            </div>
        </div>
        </section>
    );
    };

    export default HeroSection;
