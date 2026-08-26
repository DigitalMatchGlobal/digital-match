/**
 * '#4C8EFF' → '76 142 255'
 *
 * 🚨 Los tokens de color del proyecto son CANALES RGB, no colores completos, porque el
 * config los envuelve en `rgb(var(--x) / <alpha-value>)` — es la única forma de que
 * Tailwind pueda inyectarles alfa (ver la nota en `:root` de `tailwind.css`).
 *
 * Consecuencia: cualquier color que venga de datos (los `accent` por caso de
 * `cases.ts`, que están en hex) tiene que pasar por acá antes de inyectarse en una
 * custom property. Si se inyecta el hex crudo, **todo uso del token falla en silencio**:
 * `rgb(#4C8EFF / 0.1)` es inválido, así que la propiedad cae a su valor de respaldo y el
 * color simplemente no aparece. Pasó en `CaseCard`: `.icon-tile` quedaba con la tinta
 * negra y fondo transparente, los chips caían a los grises por defecto y el CTA "Ver
 * caso" salía negro — la sección entera se veía en blanco y negro y parecía una decisión
 * de diseño.
 */
export function hexToChannels(hex: string): string {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const n = parseInt(full, 16);
    return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}
