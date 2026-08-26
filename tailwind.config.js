    /** @type {import('tailwindcss').Config} */
    module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
        center: true,
        padding: "2rem",
        screens: {
            "2xl": "1400px",
        },
        },
        extend: {
        colors: {
            border: "rgb(var(--color-border) / <alpha-value>)", /* #E2E4E8 */
            "border-strong": "rgb(var(--color-border-strong) / <alpha-value>)", /* filete de énfasis */
            input: "rgb(var(--color-input) / <alpha-value>)", /* blanco */
            ring: "rgb(var(--color-ring) / <alpha-value>)", /* azul de marca oscurecido */
            background: "rgb(var(--color-background) / <alpha-value>)", /* blanco */
            foreground: "rgb(var(--color-foreground) / <alpha-value>)", /* #0B0E14 */
            label: "rgb(var(--color-label) / <alpha-value>)", /* grafito de rótulos */
            surface: {
            DEFAULT: "rgb(var(--color-surface) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-surface-foreground) / <alpha-value>)", /* — */
            },
            primary: {
            DEFAULT: "rgb(var(--color-primary) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)", /* — */
            },
            secondary: {
            DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)", /* — */
            },
            destructive: {
            DEFAULT: "rgb(var(--color-destructive) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-destructive-foreground) / <alpha-value>)", /* — */
            },
            muted: {
            DEFAULT: "rgb(var(--color-muted) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-muted-foreground) / <alpha-value>)", /* — */
            },
            accent: {
            DEFAULT: "rgb(var(--color-accent) / <alpha-value>)", /* azul de marca oscurecido - texto/links/CTA */
            foreground: "rgb(var(--color-accent-foreground) / <alpha-value>)", /* blanco */
            /* SOLO gráficos (filetes, barras, fondos de tile). Nunca texto: no
               cumple contraste sobre blanco. Ver la nota en :root de tailwind.css. */
            bright: "rgb(var(--color-accent-bright) / <alpha-value>)",
            hover: "rgb(var(--color-accent-hover) / <alpha-value>)", /* hover del CTA azul */
            secondary: "rgb(var(--color-accent-secondary) / <alpha-value>)", /* violeta del logo oscurecido */
            },
            popover: {
            DEFAULT: "rgb(var(--color-popover) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-popover-foreground) / <alpha-value>)", /* — */
            },
            card: {
            DEFAULT: "rgb(var(--color-card) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-card-foreground) / <alpha-value>)", /* — */
            },
            success: {
            DEFAULT: "rgb(var(--color-success) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-success-foreground) / <alpha-value>)", /* — */
            },
            warning: {
            DEFAULT: "rgb(var(--color-warning) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-warning-foreground) / <alpha-value>)", /* — */
            },
            error: {
            DEFAULT: "rgb(var(--color-error) / <alpha-value>)", /* — */
            foreground: "rgb(var(--color-error-foreground) / <alpha-value>)", /* — */
            },
        },
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        fontFamily: {
            sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            inter: ['var(--font-inter)', 'sans-serif'],
            // Display: Archivo. Se aplica sola a h1..h6 (ver tailwind.css); usar
            // `font-display` a mano sólo para números-héroe y cifras de métricas.
            display: ['var(--font-archivo)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
        },
        boxShadow: {
            /* ⚠️ Era un glow CIAN (`rgba(6,182,212,...)`) del tema oscuro viejo. No se veía
               porque el `.shadow-cta` de `tailwind.css` lo pisa por orden de fuente — o
               sea que quedaba como trampa: el día que alguien borre esa utilidad, vuelve
               un resplandor de color en una marca que no usa resplandores. Igualado al
               valor real. */
            'cta': '0 1px 2px rgba(11, 14, 20, 0.06), 0 8px 24px -8px rgba(11, 14, 20, 0.12)',
        },
        backgroundImage: {
            /* 🚨 rgb() obligatorio: los tokens son CANALES, así que `var(--color-accent)` suelto
               dentro de un gradiente es inválido y el degradado no se dibuja. Hoy sin uso. */
            'gradient-accent': 'linear-gradient(135deg, rgb(var(--color-accent)) 0%, rgb(var(--color-accent-secondary)) 100%)',
        },
        keyframes: {
            "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.3s ease-out",
            "accordion-up": "accordion-up 0.3s ease-out",
        },
        spacing: {
            '18': '4.5rem',
            '88': '22rem',
        },
        zIndex: {
            '100': '100',
            '150': '150',
            '200': '200',
            '300': '300',
        },
        },
    },
    plugins: [],
    }