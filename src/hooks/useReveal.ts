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
            // threshold 0 = revela apenas asoma 1px (no 15%): así no quedan
            // negras las secciones más altas que el viewport.
            { threshold: 0, rootMargin: '0px 0px -10% 0px' }
            );

        const scan = () => {
        document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
            if (seen.has(el)) return;
            seen.add(el);
            if (reduce || !io) {
            el.classList.add('is-visible');
            return;
            }
            // Si el elemento YA está en pantalla o quedó por encima (el usuario
            // scrolleó durante la hidratación, más lenta en prod), lo revelamos
            // al instante: el IntersectionObserver solo dispara al INTERSECAR, así
            // que un elemento ya pasado nunca se revelaría solo → quedaba en negro.
            // Solo observamos (para animar al entrar) lo que sigue debajo del fold.
            if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('is-visible');
            } else {
            io.observe(el);
            }
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
