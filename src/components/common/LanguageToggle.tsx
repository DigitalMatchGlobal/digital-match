    'use client';

    import { useLanguage } from '@/contexts/LanguageContext';

    const OPTIONS = [
    { code: 'es' as const, label: 'ES', name: 'Español' },
    { code: 'en' as const, label: 'EN', name: 'English' },
    ];

    /**
     * Selector de idioma: control SEGMENTADO con las dos opciones a la vista.
     *
     * Antes era un botón que alternaba, con el icono `LanguageIcon` de Heroicons (el
     * glifo 文A), la sigla del idioma actual y dos puntitos de paginado. Tres problemas:
     *
     *  1. **El icono no significaba lo que parecía.** Un ideograma chino junto a "ES" no
     *     comunica "cambiar idioma": comunica chino. Y no había forma de saber a qué
     *     idioma se iba a cambiar.
     *  2. **"ES" solo es ambiguo.** ¿Es el idioma en el que estoy o el que voy a poner?
     *     Es la duda clásica de los selectores de un solo estado.
     *  3. Los dos puntitos parecían un carrusel, no un estado.
     *
     * Con las dos siglas visibles y una marcada no hay nada que adivinar: se ve dónde
     * estás y qué te falta tocar. Es lo que se espera de un sitio de dos idiomas.
     *
     * ⚠️ Nada de banderas: el idioma no es un país (el español no es España, el inglés no
     * es el Reino Unido) y en un sitio que apunta a LATAM y EE.UU. elegir una bandera es
     * elegir mal.
     *
     * El activo se marca con TINTA sobre blanco, no con azul: el azul de la marca vive en
     * el logo, el CTA y los numerales, y este control está pegado al CTA del header —
     * dos azules ahí al lado se pelean por la misma atención.
     */
    const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div
        role="radiogroup"
        aria-label="Idioma / Language"
        className="inline-flex items-center gap-0.5 rounded-sm border border-border bg-muted p-0.5"
        >
        {OPTIONS.map((opt) => {
            const active = language === opt.code;
            return (
            <button
                key={opt.code}
                type="button"
                role="radio"
                aria-checked={active}
                // `lang` para que un lector de pantalla pronuncie cada sigla en su idioma
                // y no lea "EN" con fonética española.
                lang={opt.code}
                aria-label={opt.name}
                onClick={() => setLanguage(opt.code)}
                className={`rounded-[2px] px-2.5 py-1 text-xs font-bold leading-5 transition-colors ${
                active
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
            >
                {opt.label}
            </button>
            );
        })}
        </div>
    );
    };

    export default LanguageToggle;
