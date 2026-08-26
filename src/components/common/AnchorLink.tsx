    'use client';

    import { MouseEvent, ReactNode } from 'react';
    import { goToAnchor } from '@/lib/anchor';

    interface AnchorLinkProps {
    /** ancla de destino, con `#` (ej. `#services`) */
    to: string;
    className?: string;
    children: ReactNode;
    'aria-label'?: string;
    /**
     * Se ejecuta DESPUÉS de disparar la navegación. Existe para cerrar overlays: el CTA
     * del menú móvil scrolleaba al formulario con el panel todavía abierto tapándolo
     * entero, así que el usuario tocaba "Agendar" y no pasaba nada visible.
     */
    onNavigate?: () => void;
    }

    /**
     * Link a una sección de la home que NO deja `#seccion` en la URL.
     *
     * Existe porque el `href="#services"` de la banda del hero sí la dejaba, y encima
     * apilaba entradas en el historial: el "atrás" del browser recorría anclas en vez
     * de páginas. El resto del sitio ya interceptaba sus anclas a mano (el CTA del
     * header lo hacía con un `onClick` con `preventDefault` copiado dos veces); esto lo
     * unifica en un solo lugar.
     *
     * El `href` se mantiene real a propósito: sin JS el link funciona igual, el browser
     * muestra el destino al hover y sigue siendo navegable por teclado.
     */
    const AnchorLink = ({ to, className = '', children, onNavigate, ...rest }: AnchorLinkProps) => (
    <a
        href={to}
        className={className}
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        // Respetamos los modificadores: cmd/ctrl/shift-click y click del medio deben
        // seguir abriendo en otra pestaña, no hacer scroll acá.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        goToAnchor(to);
        onNavigate?.();
        }}
        {...rest}
    >
        {children}
    </a>
    );

    export default AnchorLink;
