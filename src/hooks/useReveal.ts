    'use client';

    import { useEffect } from 'react';

    // Scroll-reveal global: un único IntersectionObserver revela los elementos con
    // clase `.reveal` al entrar en viewport (con stagger vía data-delay en CSS).
    // Usa MutationObserver porque las secciones montan su contenido después (patrón
    // isHydrated), así que hay nodos `.reveal` que aparecen luego del primer scan.
    // Respeta prefers-reduced-motion (muestra todo al instante).
    export function useReveal() {
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const seen = new WeakSet<Element>();

        const io = reduce
        ? null
        : new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    io!.unobserve(e.target);
                }
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
            );

        const scan = () => {
        document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
            if (seen.has(el)) return;
            seen.add(el);
            if (reduce || !io) el.classList.add('is-visible');
            else io.observe(el);
        });
        };

        scan();
        const mo = new MutationObserver(scan);
        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
        io?.disconnect();
        mo.disconnect();
        };
    }, []);
    }
