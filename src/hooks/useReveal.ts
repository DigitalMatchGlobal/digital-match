    'use client';

    import { useEffect } from 'react';

    // El scroll-reveal lo maneja el script inline de `RevealBootstrap` (montado en el
    // RootLayout como primer hijo del <body>), que ya observa el DOM desde el parseo:
    // IntersectionObserver + MutationObserver + red de seguridad ante errores de JS.
    //
    // Este hook solo le da un empujón al terminar de montar el árbol de React, para que
    // el contenido que aparece recién en cliente (cambio de idioma, tabs, navegación
    // con next/link) se evalúe en el mismo frame en vez de esperar al próximo scroll.
    export function useReveal() {
    useEffect(() => {
        (window as any).__dmgReveal?.();
    }, []);
    }
