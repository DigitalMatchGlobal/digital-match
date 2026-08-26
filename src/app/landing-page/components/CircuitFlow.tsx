    'use client';

    import { useEffect, useRef } from 'react';

    // Circuito (PCB) con "paquetes de datos" que viajan por las trazas. Canvas para tener
    // cola y halo reales. On-brand (azul→violeta), sutil pero con vida. DPR-aware, cancela
    // RAF, respeta prefers-reduced-motion y sólo anima cuando está en viewport.
    //
    // 🚨 Los colores se LEEN de las custom properties, no van hardcodeados. Este componente
    // se escribió para el tema OSCURO: las trazas eran `rgba(255,255,255,0.06)`, o sea
    // literalmente invisibles sobre blanco, y los paquetes usaban el #4C8EFF del logo, que
    // sobre blanco se lava. Al invertir la paleta quedó huérfano (cero usos) y nadie lo
    // notó. Leyendo los tokens, si la paleta vuelve a moverse el circuito la sigue.

    const VW = 1440, VH = 600;

    // Trazas tipo placa (coords virtuales 1440x600). Cada una es una polilínea.
    const TRACES: number[][][] = [
        [[-20, 90], [300, 90], [300, 230], [560, 230]],
        [[1460, 70], [1120, 70], [1120, 210], [940, 210]],
        [[-20, 470], [260, 470], [260, 330], [520, 330], [520, 410], [760, 410]],
        [[1460, 520], [1180, 520], [1180, 380], [980, 380]],
        [[720, -20], [720, 120], [560, 120], [560, 230]],
        [[860, 620], [860, 480], [1040, 480], [1040, 360], [980, 360]],
        [[380, 620], [380, 520], [640, 520], [640, 410]],
        [[1120, 210], [1240, 210], [1240, 330]],
    ];

    const NODES: number[][] = [
        [300, 230], [560, 230], [940, 210], [1120, 210], [520, 330],
        [760, 410], [980, 380], [1040, 360], [640, 410], [1240, 210],
    ];

    // Canales del token (`"31 81 196"`) → lista para `rgba()` (`"31, 81, 196"`).
    const readChannels = (name: string, fallback: string) => {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        return raw ? raw.split(/\s+/).join(', ') : fallback;
    };

    interface CircuitFlowProps {
    className?: string;
    }

    const CircuitFlow = ({ className = '' }: CircuitFlowProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const parent = canvas.parentElement as HTMLElement;

        // Mismo arco que el remate del titular: los tonos OSCURECIDOS, no los del logo.
        const BLUE = readChannels('--color-accent', '31, 81, 196');
        const VIOLET = readChannels('--color-accent-secondary', '75, 63, 212');
        const INK = readChannels('--color-primary', '11, 14, 20');

        let width = 0, height = 0, scale = 1, offX = 0, offY = 0;
        // trazas escaladas a px + longitudes acumuladas
        let traces: { pts: { x: number; y: number }[]; cum: number[]; total: number }[] = [];
        let nodes: { x: number; y: number }[] = [];
        let packets: { ti: number; d: number; speed: number; color: string }[] = [];
        let raf = 0;

        const build = () => {
        const rect = parent.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // cover (como preserveAspectRatio slice)
        scale = Math.max(width / VW, height / VH);
        offX = (width - VW * scale) / 2;
        offY = (height - VH * scale) / 2;
        const T = (p: number[]) => ({ x: p[0] * scale + offX, y: p[1] * scale + offY });

        traces = TRACES.map((poly) => {
            const pts = poly.map(T);
            const cum = [0];
            let total = 0;
            for (let i = 1; i < pts.length; i++) {
            total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
            cum.push(total);
            }
            return { pts, cum, total };
        });
        nodes = NODES.map(T);

        packets = traces.map((tr, i) => ({
            ti: i,
            d: (i / traces.length) * tr.total,    // arranque desfasado
            speed: 1.1 + (i % 3) * 0.35,
            color: i % 2 === 0 ? BLUE : VIOLET,
        }));
        };

        const pointAt = (tr: typeof traces[number], d: number) => {
        const dist = ((d % tr.total) + tr.total) % tr.total;
        for (let i = 1; i < tr.cum.length; i++) {
            if (dist <= tr.cum[i]) {
            const seg = tr.cum[i] - tr.cum[i - 1] || 1;
            const f = (dist - tr.cum[i - 1]) / seg;
            const a = tr.pts[i - 1], b = tr.pts[i];
            return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
        }
        }
        return tr.pts[tr.pts.length - 1];
        };

        const drawStatic = () => {
        // Trazas tenues. Sobre blanco el filete tiene que ser OSCURO: con tinta al 7% se
        // lee como una placa impresa y no compite con nada.
        ctx.lineWidth = 1.2;
        for (const tr of traces) {
            // Más tenue en móvil: ahí el circuito pasa POR DETRÁS del texto (no hay
            // columna central que vaciar), así que la traza tiene que ser textura y no
            // subrayado accidental. En desktop vive en los márgenes y aguanta más.
            ctx.strokeStyle = `rgba(${INK}, ${width >= 768 ? 0.13 : 0.085})`;
            ctx.beginPath();
            ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
            for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
            ctx.stroke();
        }
        };

        const drawNodes = (ts: number) => {
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const pulse = 0.22 + 0.28 * (0.5 + 0.5 * Math.sin(ts / 700 + i));
            ctx.fillStyle = `rgba(${BLUE}, ${pulse})`;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        };

        const draw = (ts: number) => {
        ctx.clearRect(0, 0, width, height);
        drawStatic();
        drawNodes(ts);

        for (const pk of packets) {
            const tr = traces[pk.ti];
            pk.d += pk.speed;
            // cola (varios puntos detrás, alpha/tamaño decreciente)
            for (let s = 6; s >= 1; s--) {
            const p = pointAt(tr, pk.d - s * 7);
            const a = (1 - s / 7) * 0.55;
            ctx.fillStyle = `rgba(${pk.color}, ${a})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.1 * (1 - s / 9), 0, Math.PI * 2);
            ctx.fill();
            }
            // cabeza con glow
            const head = pointAt(tr, pk.d);
            ctx.save();
            // Halo corto y tenue: sobre blanco un `shadowBlur` grande de un color oscuro
            // no brilla, ensucia — se ve una manchita gris alrededor del punto.
            ctx.shadowColor = `rgba(${pk.color}, 0.4)`;
            ctx.shadowBlur = 9;
            ctx.fillStyle = `rgba(${pk.color}, 1)`;
            ctx.beginPath();
            ctx.arc(head.x, head.y, 3.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        raf = requestAnimationFrame(draw);
        };

        const start = () => { if (!reduced && !raf) raf = requestAnimationFrame(draw); };
        const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

        build();
        if (reduced) {
        ctx.clearRect(0, 0, width, height);
        drawStatic();
        drawNodes(0);
        }

        const ro = new ResizeObserver(build);
        ro.observe(parent);

        // Anima SOLO cuando la sección está (cerca de) visible: con varias instancias
        // en la página, evita N loops de RAF corriendo fuera de pantalla.
        const io = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) start(); else stop(); },
        { rootMargin: '200px' },
        );
        io.observe(parent);

        return () => {
        stop();
        ro.disconnect();
        io.disconnect();
        };
    }, []);

    // DOS máscaras ANIDADAS, no una compuesta: en secciones altas el canvas se escala
    // por `cover` y las trazas quedan enormes, cruzando titulares y párrafos (se veían
    // rectángulos sobre el texto). La externa funde arriba/abajo; la interna vacía la
    // COLUMNA CENTRAL, que es donde vive el contenido → el circuito queda como textura
    // de márgenes. Anidadas y no `mask-composite: intersect` porque eso último es
    // frágil en WebKit, que es el motor real de iOS (ver CLAUDE.md §2).
    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] ${className}`}>
        {/* La máscara que VACÍA LA COLUMNA CENTRAL va sólo desde `md`: en móvil no hay
            columna central que vaciar (el texto ocupa todo el ancho), así que dejarla
            borraba el circuito entero y no se veía nada. En móvil el circuito pasa por
            detrás del texto — a esta opacidad es textura, no ruido. */}
        <div className="h-full w-full opacity-90 md:[mask-image:linear-gradient(to_right,black,transparent_26%,transparent_74%,black)] md:[-webkit-mask-image:linear-gradient(to_right,black,transparent_26%,transparent_74%,black)]">
            <canvas ref={canvasRef} className="h-full w-full" />
        </div>
        </div>
    );
    };

    export default CircuitFlow;
