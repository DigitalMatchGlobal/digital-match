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
            border: "var(--color-border)", /* white with 10% opacity */
            input: "var(--color-input)", /* white with 10% opacity */
            ring: "var(--color-ring)", /* cyan-500 */
            background: "var(--color-background)", /* black */
            foreground: "var(--color-foreground)", /* white with 95% opacity */
            surface: {
            DEFAULT: "var(--color-surface)", /* white with 5% opacity */
            foreground: "var(--color-surface-foreground)", /* white with 95% opacity */
            },
            primary: {
            DEFAULT: "var(--color-primary)", /* black */
            foreground: "var(--color-primary-foreground)", /* white with 95% opacity */
            },
            secondary: {
            DEFAULT: "var(--color-secondary)", /* gray-950 */
            foreground: "var(--color-secondary-foreground)", /* white with 95% opacity */
            },
            destructive: {
            DEFAULT: "var(--color-destructive)", /* red-500 */
            foreground: "var(--color-destructive-foreground)", /* white with 95% opacity */
            },
            muted: {
            DEFAULT: "var(--color-muted)", /* white with 10% opacity */
            foreground: "var(--color-muted-foreground)", /* white with 70% opacity */
            },
            accent: {
            DEFAULT: "var(--color-accent)", /* cyan-500 */
            foreground: "var(--color-accent-foreground)", /* black */
            secondary: "var(--color-accent-secondary)", /* fuchsia-500 */
            },
            popover: {
            DEFAULT: "var(--color-popover)", /* gray-950 */
            foreground: "var(--color-popover-foreground)", /* white with 95% opacity */
            },
            card: {
            DEFAULT: "var(--color-card)", /* white with 5% opacity */
            foreground: "var(--color-card-foreground)", /* white with 95% opacity */
            },
            success: {
            DEFAULT: "var(--color-success)", /* green-500 */
            foreground: "var(--color-success-foreground)", /* black */
            },
            warning: {
            DEFAULT: "var(--color-warning)", /* amber-500 */
            foreground: "var(--color-warning-foreground)", /* black */
            },
            error: {
            DEFAULT: "var(--color-error)", /* red-500 */
            foreground: "var(--color-error-foreground)", /* white with 95% opacity */
            },
        },
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            inter: ['Inter', 'sans-serif'],
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
        boxShadow: {
            'cta': '0 20px 25px -5px rgba(6, 182, 212, 0.1), 0 10px 10px -5px rgba(6, 182, 212, 0.04)',
        },
        backgroundImage: {
            'gradient-accent': 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-secondary) 100%)',
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