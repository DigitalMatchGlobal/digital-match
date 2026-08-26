'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import AnchorLink from './AnchorLink';
import { scrollToAnchor } from '@/lib/anchor';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  labelKey: string;
  anchor: string;
  icon: string;
  tooltipKey: string;
  route?: string; // si está presente, es una ruta (Link) en lugar de un ancla con scroll
}

const Header = ({ className = '' }: HeaderProps) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const navigationItems: NavigationItem[] = [
    {
      labelKey: 'nav.about',
      anchor: '#about',
      icon: 'UserGroupIcon',
      tooltipKey: 'nav.tooltips.about',
    },
    {
      labelKey: 'nav.services',
      anchor: '#services',
      icon: 'CogIcon',
      tooltipKey: 'nav.tooltips.services',
    },
    {
      labelKey: 'nav.solutions',
      anchor: '#solutions',
      icon: 'CubeIcon',
      tooltipKey: 'nav.tooltips.solutions',
    },
    {
      labelKey: 'nav.cases',
      anchor: '/portfolio',
      route: '/portfolio',
      icon: 'BriefcaseIcon',
      tooltipKey: 'nav.tooltips.cases',
    },
    {
      labelKey: 'nav.process',
      anchor: '#process',
      icon: 'ClipboardDocumentListIcon',
      tooltipKey: 'nav.tooltips.process',
    },
    {
      labelKey: 'nav.contact',
      anchor: '#contact',
      icon: 'ChatBubbleLeftRightIcon',
      tooltipKey: 'nav.tooltips.contact',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navigationItems.map((item) => item.anchor.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // El scroll y el offset del header viven en `@/lib/anchor` (un solo lugar para el
  // `HEADER_OFFSET`, que antes estaba escrito a mano como `- 80` en tres archivos).
  const handleNavClick = (anchor: string) => {
    // Si no estamos en la home, el ancla navega a la home con el hash; al llegar,
    // `LandingPageInteractive` scrollea y BORRA el hash de la URL.
    if (!isHome) {
      window.location.href = `/${anchor}`;
      return;
    }
    scrollToAnchor(anchor);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-100 transition-smooth ${
          // 🚨 TRANSPARENTE arriba de la página, no `bg-background`: con la barra
          // blanca sobre el hero blanco, el circuito del hero se cortaba en una franja
          // muerta de 64px y la página entera se leía como una sola plancha blanca.
          // Al scrollear sí se vuelve sólida (con blur y filete), que es cuando pasa a
          // haber contenido por debajo que necesita separación.
          scrolled ? 'backdrop-blur-nav bg-background/90 border-b border-border' : 'bg-transparent'
        } ${className}`}
      >
        <nav className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* LOGO + TEXTO CON ANIMACIÓN DINÁMICA */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            {/* El isologo se mostraba `hidden sm:block`: en móvil la marca quedaba
                    representada sólo por el wordmark de texto. El isologo es la parte
                    reconocible de la firma, así que va SIEMPRE — más chico en móvil. */}
            <Image
              src="/assets/images/Logo.png"
              alt="Logo DM"
              width={0}
              height={0}
              sizes="100vw"
              className="h-8 w-auto object-contain sm:h-10"
              priority
            />

            {/* Wordmark en color plano. Antes era texto con degradado ANIMADO:
                    en una marca paraguas eso lee a startup, y el degradado en texto es
                    justo lo que esta línea visual no usa. */}
            <span className="font-display text-base font-bold tracking-[-0.02em] text-accent sm:text-lg">
              Digital Match Global
            </span>
          </Link>
          {/* FIN LOGO */}

          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              if (item.route) {
                const active = pathname.startsWith(item.route);
                return (
                  <Link
                    key={item.anchor}
                    href={item.route}
                    className={`group relative px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-smooth ${
                      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title={t(item.tooltipKey)}
                  >
                    {t(item.labelKey)}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                    )}
                  </Link>
                );
              }
              return (
                <a
                  key={item.anchor}
                  href={isHome ? item.anchor : `/${item.anchor}`}
                  onClick={(event) => {
                    if (!isHome) return;
                    event.preventDefault();
                    handleNavClick(item.anchor);
                  }}
                  className={`group relative px-3 xl:px-4 py-2 text-sm xl:text-base font-semibold transition-smooth ${
                    isHome && activeSection === item.anchor
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={t(item.tooltipKey)}
                >
                  {t(item.labelKey)}
                  {isHome && activeSection === item.anchor && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <LanguageToggle />
            <AnchorLink
              to="#contact"
              className="whitespace-nowrap bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent-hover xl:px-6 xl:text-base"
            >
              {t('nav.book')}
            </AnchorLink>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-smooth"
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-200 lg:hidden">
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-nav"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <span className="text-base sm:text-lg font-bold text-foreground">
                {t('nav.menu')}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-foreground hover:text-accent transition-smooth"
                aria-label="Close menu"
              >
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            <div className="flex flex-col p-4 sm:p-6 space-y-2">
              <div className="mb-4">
                <LanguageToggle />
              </div>

              {navigationItems.map((item) => {
                const className = `flex items-center space-x-3 px-4 py-3 sm:py-4 text-left text-sm sm:text-base font-semibold rounded-lg transition-smooth ${
                  (
                    item.route
                      ? pathname.startsWith(item.route)
                      : isHome && activeSection === item.anchor
                  )
                    ? 'bg-accent/[0.07] text-accent border border-accent/25'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`;
                const inner = (
                  <>
                    <Icon name={item.icon as any} size={20} />
                    <div className="flex-1">
                      <div>{t(item.labelKey)}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {t(item.tooltipKey)}
                      </div>
                    </div>
                  </>
                );
                if (item.route) {
                  return (
                    <Link
                      key={item.anchor}
                      href={item.route}
                      onClick={() => setMobileMenuOpen(false)}
                      className={className}
                    >
                      {inner}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.anchor}
                    href={isHome ? item.anchor : `/${item.anchor}`}
                    onClick={(event) => {
                      if (isHome) {
                        event.preventDefault();
                        handleNavClick(item.anchor);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={className}
                  >
                    {inner}
                  </a>
                );
              })}

              <div className="pt-4 mt-4 border-t border-border">
                <AnchorLink
                  to="#contact"
                  // 🚨 Sin esto el panel del menú quedaba abierto tapando el formulario
                  // al que acababa de scrollear: tocabas "Agendar" y no pasaba nada.
                  onNavigate={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent-hover sm:py-4 sm:text-base"
                >
                  {t('nav.book')}
                </AnchorLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ESTILOS DE LA ANIMACIÓN --- */}
    </>
  );
};

export default Header;
