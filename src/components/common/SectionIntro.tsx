    import type { ReactNode } from 'react';

    /**
     * Encabezado estándar de sección: EYEBROW → titular → bajada.
     *
     * Existe para que las secciones dejen de repetir el par "badge pill + titular-etiqueta"
     * y compartan una sola gramática:
     *   - `eyebrow`: de qué va la sección (rótulo, versalitas, acento).
     *   - `title`:   qué AFIRMAMOS. Una frase con sujeto y verbo, en mayúscula de oración
     *                (español: "Nuestros servicios", no "Nuestros Servicios").
     *   - `body`:    una o dos líneas que sostienen la afirmación.
     *
     * `align` por defecto es `left`: la landing tenía las 10 secciones centradas y sin
     * asimetría no hay ritmo. Centrar es la excepción, para secciones-bisagra.
     */
    interface SectionIntroProps {
    eyebrow: string;
    title: ReactNode;
    body?: ReactNode;
    align?: 'left' | 'center';
    className?: string;
    }

    const SectionIntro = ({
    eyebrow,
    title,
    body,
    align = 'left',
    className = '',
    }: SectionIntroProps) => {
    const centered = align === 'center';

    return (
        <div
        className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}
        >
        {/* El tick diagonal del isologo encabeza TODAS las secciones: es lo que hace
            que el recurso sea un sistema y no un adorno del hero. `justify-center`
            cuando la intro va centrada, para que la diagonal no quede colgada. */}
        <div className={`reveal flex items-center gap-2.5 ${centered ? 'justify-center' : ''}`}>
            <span aria-hidden="true" className="slash slash-sm text-accent" />
            <p className="eyebrow">{eyebrow}</p>
        </div>
        <h2 className="reveal mt-5 text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-[2.75rem]" data-delay="1">
            {title}
        </h2>
        {body && (
            <p className="reveal mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8" data-delay="2">
            {body}
            </p>
        )}
        </div>
    );
    };

    export default SectionIntro;
