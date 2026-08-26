    'use client';

    import { useEffect, useRef, useState } from 'react';

    /**
     * Costura entre secciones: el filete que se monta sobre el límite, con dos pulsos que
     * SALEN de la diagonal hacia los extremos y la diagonal encendiéndose al arrancar.
     *
     * Historia, para que no vuelva atrás:
     *  1. Separador en flujo de 13px, sólo en algunos límites. Los suelos alternaban de a
     *     pares y el filete iba adentro de cada par: no era un sistema, no se entendía.
     *     Además, sin fondo propio, entre dos secciones grises dibujaba una franja BLANCA
     *     de 13px.
     *  2. Alto cero montado sobre el límite, en todos los límites, con la animación
     *     colgando de `.is-visible` (la clase del scroll-reveal). **No se percibía**, y la
     *     causa no era que fuera sutil: el observer del reveal usa `rootMargin` inferior
     *     de +500px a propósito (revela ANTES de entrar en pantalla para que la transición
     *     ya haya terminado cuando lo ves). O sea que el pulso corría entero 500px por
     *     debajo del fold y terminaba antes de que la costura llegara a ser visible.
     *  3. Esto. Observer PROPIO con `rootMargin: 0` — dispara cuando la costura está de
     *     verdad en pantalla — y el pulso en LOOP mientras siga visible.
     *
     * 🚨 El loop se apaga al salir de pantalla (`is-live` se saca). Con 8 costuras, dejar
     * 8 animaciones corriendo fuera de vista es trabajo de composición tirado a la basura
     * en cada frame, y en un teléfono eso se paga en batería.
     *
     * 🚨 `h-0`: la costura no ocupa alto, se monta ENCIMA del límite. Por eso no necesita
     * saber el suelo de sus vecinas (ver el punto 1). El `z-10` es necesario porque la
     * sección siguiente es `relative` y, al venir después en el DOM, la taparía.
     *
     * ⚠️ El `-translate-y-1/2` va en un wrapper aparte del `.reveal`: combinar `.reveal`
     * con un `transform` propio en el MISMO elemento se pisan (ver CLAUDE.md §2).
     */
    const SectionSeam = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [live, setLive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') return undefined;

        const observer = new IntersectionObserver(
        ([entry]) => setLive(entry.isIntersecting),
        // Sin margen: acá queremos el momento REAL en el que la costura entra en pantalla,
        // justo lo contrario del reveal, que se adelanta a propósito.
        { threshold: 0 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="relative z-10 h-0">
        <div className="absolute inset-x-0 top-0 -translate-y-1/2">
            <div className={`reveal mx-auto max-w-7xl px-6 lg:px-8 ${live ? 'is-live' : ''}`}>
            <div className="flex items-center gap-3">
                <div className="rule-l relative flex-1">
                <span aria-hidden="true" className="rule-pulse rule-pulse-l" />
                </div>
                {/* La diagonal remata la costura y es de donde salen los pulsos: el mismo
                    recurso del kicker y de los eyebrows. */}
                <span aria-hidden="true" className="slash slash-sm rule-slash text-border-strong" />
                <div className="rule-r relative flex-1">
                <span aria-hidden="true" className="rule-pulse rule-pulse-r" />
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default SectionSeam;
