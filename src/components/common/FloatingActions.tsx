    'use client';

    import { useState, useEffect } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { WhatsAppIcon } from '@/components/common/BrandIcons';

    interface FloatingActionsProps {
    className?: string;
    onBookingClick?: () => void;
    onWhatsAppClick?: () => void;
    }

    /**
     * Riel de acciones flotantes: "volver arriba" + el CTA.
     *
     * 🚨 Los dos botones viven en UN SOLO contenedor `fixed` con `flex-col`, no en dos
     * `fixed` con offsets distintos. Es lo que hace que estén alineados por construcción:
     * con dos posiciones absolutas hay que mantener a mano un `bottom` que dependa del alto
     * del otro botón, y en cuanto uno de los dos se oculta —que pasa, porque aparecen con
     * umbrales de scroll DISTINTOS— queda un hueco flotando o, peor, se superponen.
     *
     * Jerarquía por relleno, no por tamaño: el CTA va lleno de azul y el de volver arriba
     * va con filete, que es la regla de la marca para primario/secundario. Mismo diámetro
     * en los dos para que el riel se lea como una columna y no como un escaloncito.
     *
     * Umbrales distintos a propósito:
     *  · el CTA aparece pasada media altura del hero (y cambia a WhatsApp más abajo, cuando
     *    ya leíste lo suficiente como para que escribir tenga sentido);
     *  · "volver arriba" aparece recién pasada UNA pantalla completa: antes de eso el botón
     *    de subir no resuelve nada, el usuario llega igual con dos gestos.
     */
    const FloatingActions = ({
    className = '',
    onBookingClick,
    onWhatsAppClick,
    }: FloatingActionsProps) => {
    const { t } = useLanguage();
    const [showCta, setShowCta] = useState<boolean>(false);
    const [showWhatsApp, setShowWhatsApp] = useState<boolean>(false);
    const [showTop, setShowTop] = useState<boolean>(false);
    // 🚨 Con el footer a la vista se esconde EL CTA, no el riel entero. El CTA ahí es
    // redundante (el mail, el WhatsApp y el formulario ya están en pantalla), pero
    // "volver arriba" es justo donde MÁS se usa: al final de la página. Escondiendo el
    // riel completo lo perdíamos exactamente en el momento en que hace falta.
    // Además, con un solo botón el footer necesita mucho menos aire inferior para que
    // nada se le monte encima.
    const [atFooter, setAtFooter] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
        const hero = document.querySelector('#hero');
        const y = window.scrollY;

        if (hero) {
            const heroHeight = hero.clientHeight;
            setShowCta(y > heroHeight * 0.5);
            setShowWhatsApp(y > heroHeight * 1.5);
        }
        setShowTop(y > window.innerHeight);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        const footer = document.querySelector('footer');
        const observer = footer
        ? new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting), { threshold: 0 })
        : undefined;
        if (footer && observer) observer.observe(footer);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        observer?.disconnect();
        };
    }, []);

    const handleCtaClick = () => {
        if (showWhatsApp && onWhatsAppClick) {
        onWhatsAppClick();
        return;
        }
        if (onBookingClick) {
        onBookingClick();
        return;
        }
        const contact = document.querySelector('#contact');
        if (contact) {
        window.scrollTo({ top: contact.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
    };

    const ctaVisible = showCta && !atFooter;
    if (!ctaVisible && !showTop) return null;

    return (
        <div
        className={`fixed bottom-6 right-6 z-150 flex flex-col items-end gap-3 ${className}`}
        >
        {showTop && (
            <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t('float.top')}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-background text-foreground shadow-cta transition-colors hover:bg-muted"
            >
            <Icon name="ArrowUpIcon" size={22} />
            </button>
        )}

        {ctaVisible && (
            <button
            type="button"
            onClick={handleCtaClick}
            aria-label={t(showWhatsApp ? 'float.whatsapp' : 'float.book')}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-cta transition-colors hover:bg-accent-hover"
            >
            {/* Glifo REAL de WhatsApp cuando el botón lleva a WhatsApp: con el globo de
                diálogo genérico de Heroicons no había forma de saber a dónde llevaba. */}
            {showWhatsApp ? <WhatsAppIcon size={24} /> : <Icon name="CalendarIcon" size={24} />}
            </button>
        )}
        </div>
    );
    };

    export default FloatingActions;
