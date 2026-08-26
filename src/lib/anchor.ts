// Navegación a secciones de la home DEJANDO LA URL LIMPIA.
//
// 🚨 Regla del sitio: la barra de direcciones nunca debe quedar con `#seccion`.
// Un `<a href="#services">` pelado se lo escribe, y encima queda pegado en el
// historial: el botón "atrás" del browser recorre anclas en vez de páginas.
// Por eso TODO enlace interno a una sección usa `<AnchorLink>`
// (`src/components/common/AnchorLink.tsx`), que intercepta el click y llama acá.
//
// El `href` real se conserva a propósito: sin JS el link sigue funcionando, el
// browser muestra el destino al hacer hover y es navegable por teclado. Lo que se
// evita es el efecto colateral en la URL, no el link.

/** Alto del header fijo. Único lugar donde vive este número. */
export const HEADER_OFFSET = 80;

/**
 * Scrollea suave hasta `anchor` (con `#`). Devuelve false si la sección no está en
 * esta página — el llamador decide si navega a la home.
 */
export function scrollToAnchor(anchor: string): boolean {
    const el = document.querySelector<HTMLElement>(anchor);
    if (!el) return false;

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    flashTarget(el);
    return true;
}

let flashTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Marca el destino por un momento (filete interno que se apaga).
 *
 * Hace falta desde que la banda del hero dejó de llevar a la sección entera y pasa a
 * llevar a UNA tarjeta: aterrizar en medio de una retícula de cuatro celdas iguales, sin
 * ninguna señal de cuál era el destino, deja al usuario buscando qué pasó. Con anclas
 * reales esto lo daría `:target`, pero acá la URL se mantiene limpia a propósito (ver
 * arriba), así que `:target` nunca se activa y hay que marcarlo a mano.
 *
 * 🚨 Va como ATRIBUTO `data-targeted`, no como clase. Los destinos son nodos renderizados
 * por React y su `className` sale del JSX: en el primer re-render (basta con que cambie
 * cualquier estado del árbol) React reescribe el atributo y se lleva puesta la clase que
 * agregamos desde afuera. Medido: el destello se apagaba solo a los ~600ms de los 2000
 * previstos. Un `data-*` que React no renderiza no lo toca nadie.
 */
function flashTarget(el: HTMLElement): void {
    document.querySelectorAll('[data-targeted]').forEach((n) => n.removeAttribute('data-targeted'));
    if (flashTimer) clearTimeout(flashTimer);

    // Reinicio forzado: si se vuelve a hacer clic en el mismo destino, sin sacar y volver
    // a poner el atributo en dos frames distintos el navegador no reinicia la animación.
    requestAnimationFrame(() => {
        el.setAttribute('data-targeted', '');
        flashTimer = setTimeout(() => el.removeAttribute('data-targeted'), 2000);
    });
}

/**
 * Igual que `scrollToAnchor`, pero si la sección no existe acá (estamos en
 * /portfolio, por ejemplo) navega a la home con el hash. Al llegar,
 * `LandingPageInteractive` scrollea y BORRA el hash de la URL.
 */
export function goToAnchor(anchor: string): void {
    if (!scrollToAnchor(anchor)) {
        window.location.href = `/${anchor}`;
    }
}
