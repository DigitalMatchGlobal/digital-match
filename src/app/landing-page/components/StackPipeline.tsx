    'use client';

    import { useState } from 'react';
    import { useLanguage } from '@/contexts/LanguageContext';

    /**
     * Stack tecnológico como DIAGRAMA DE ARQUITECTURA: capas apiladas que se leen de
     * ABAJO HACIA ARRIBA — abajo el cimiento (infraestructura), arriba el proceso
     * automatizado que el cliente usa.
     *
     * Historia, para que no vuelva atrás:
     *  1. Tabla de seis filas `icono + nombre + pastillas`. Las pastillas alternaban la
     *     esquina por índice (`i % 2 ? rounded-full : rounded-md`): ornamento sin
     *     significado. Las 19 tecnologías con el mismo peso, sin recorrido.
     *  2. Seis COLUMNAS con las tecnologías en texto plano. Falló porque cambiaba el
     *     maquetado sin cambiar la idea: una lista rotada 90° sigue siendo una lista. Y
     *     con columnas de altura fija, la capa de 2 items dejaba media columna en
     *     blanco — el bloque se leía sin terminar.
     *  3. Esto. La diferencia no es gráfica, es de vocabulario: un diagrama de capas es
     *     lo que un ingeniero en sistemas dibuja en un whiteboard, y es lo que ninguna
     *     plantilla hace (todas listan alfabéticamente).
     *
     * 🚨 Dos invariantes que sostienen el efecto y no son estéticas:
     *
     *  a) **Las celdas de cada banda son `flex-1`.** Así CADA capa ocupa el ancho
     *     completo, subdividido según cuántos componentes tenga: la de 2 tecnologías
     *     tiene 2 celdas anchas y la de 4 tiene 4 angostas. Es lo que elimina el espacio
     *     muerto del intento anterior, y es exactamente cómo se dibuja un stack real.
     *     Si se les pone ancho fijo, vuelven las bandas cortas con hueco a la derecha.
     *  b) **El pulso del riel recorre DE ABAJO HACIA ARRIBA** (`animationDelay` invertido
     *     respecto del orden del DOM). El diagrama se recorre desde el cimiento, como se
     *     recorre un sistema. Al derecho, la animación contradice lo que el dibujo dice.
     *     (Hubo también un `.reveal` escalonado por banda; se quitó porque en una celda
     *     de `.lattice` expone el fondo del contenedor como una plancha gris.)
     *
     * 🚨 `LAYERS` está en ORDEN VISUAL (de arriba hacia abajo), y el numeral va al
     * revés: `01` es la capa de ABAJO. Eso es a propósito — en un diagrama de
     * arquitectura la capa 1 es el cimiento, no la primera que se lee. El orden es
     * CONTENIDO: si se ordena alfabéticamente o por cantidad de items, vuelve a ser una
     * lista con bordes.
     */
    /**
     * 🚨 ESTA LISTA SE DERIVÓ DE LOS REPOS, NO DE LA MEMORIA (auditoría 2026-08-25).
     * Se recorrieron los 22 proyectos de `~/Documents/dev`: `package.json` de los 17 que
     * tienen uno, más grep de endpoints en el código de las edge functions (que importan
     * por URL y no figuran en ningún manifiesto). Para reproducirla, contar en cuántos
     * proyectos aparece cada dependencia y verificar que el match sea USO y no mención.
     *
     * Lo que la verificación DESCARTÓ, y que un grep ingenuo habría publicado:
     *  - **Stripe**: `MONETIZACION.md` dice "Stripe descartado (UY no soportado)".
     *  - **n8n / Zapier / Make**: aparecen en el análisis competitivo como huecos, no como
     *    integraciones propias.
     *  - **pgvector / embeddings**: el único match era la frase "embedding de Supabase"
     *    en un doc, hablando de una consulta embebida. No hay búsqueda vectorial.
     *  - **MongoDB**: su ÚNICA aparición en los 22 proyectos era esta misma lista. Estuvo
     *    publicado sin respaldo; se sacó.
     *  - **Google Cloud**: los matches eran `fonts.googleapis.com` (Google Fonts). No hay
     *    SDK ni proyecto en GCP. Lo de Google que sí es real es **Gemini**, que es un
     *    proveedor de modelos y por eso vive en la capa de IA, no en la de infra.
     *
     * Quedan afuera a propósito las librerías de utilería (`clsx`, `tailwind-merge`,
     * `date-fns`…): nadie compra eso y llenan el diagrama de ruido.
     *
     * 🚨 ORDEN VISUAL (arriba→abajo) y numeral INVERTIDO: `01` es la capa de ABAJO. En un
     * diagrama de arquitectura la capa 1 es el cimiento, no la primera que se lee.
     */
    const LAYERS = [
        // Certificaciones del equipo (UiPath, Rocketbot) + Power Platform.
        { key: 'stack.rpa', items: ['UiPath', 'Power Automate', 'Rocketbot'] },

        // `WhatsAppBot_Rocket/supabase/functions/_shared/aiProvider.ts` abstrae CUATRO
        // proveedores con failover (Groq en producción). Modelos referenciados:
        // gpt-oss-120b/20b, llama-3.3-70b-versatile, claude-sonnet-5.
        // Python y Power BI vienen del lado de datos (ver `Enterprise/trazabilidad-poc`).
        { key: 'stack.ai', items: ['Groq', 'OpenAI', 'Anthropic', 'Google Gemini', 'Llama', 'Python', 'Power BI'] },

        // WhatsApp Cloud API + Instagram Messaging: edge functions `instagram-connect`,
        // `whatsapp-webhook` (Rocket). Meta Marketing API: `meta-ads-autopilot`.
        // Alexa: `ask-sdk-core` (CuidarTec). Cobros: MercadoPago + Paddle (Rocket, prod).
        // Twilio: dependencia de CuidarTec. Resend y SendGrid: envío en 3 proyectos.
        // SharePoint: `Enterprise/trazabilidad-poc/sharepointService.js`.
        { key: 'stack.integrations', items: ['WhatsApp Cloud API', 'Instagram Messaging', 'Meta Marketing API', 'Alexa Skills', 'MercadoPago', 'Paddle', 'Twilio', 'Resend', 'SendGrid', 'SharePoint'] },

        // Alcance real medido: React 16 proyectos, Tailwind 15, TypeScript 12, Next 10,
        // Vite 7, Framer Motion 9, Radix 7, Vitest 5, Express 2, Playwright 2.
        { key: 'stack.dev', items: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Express', 'Zod', 'Playwright', 'Vitest'] },

        // Supabase en 8 proyectos. SQL Server: `Enterprise/mi-app-sql` (mssql).
        // DynamoDB: CuidarTec. Redis: Upstash en POVSTOREUY. Turso/libSQL + Prisma:
        // Enterprise. Drizzle: activate-entrenamiento.
        { key: 'stack.data', items: ['PostgreSQL', 'Supabase', 'SQL Server', 'DynamoDB', 'Redis', 'Turso', 'Prisma', 'Drizzle ORM'] },

        // Vercel (este sitio y varios más), AWS (aws-sdk en CuidarTec, SST en Enterprise),
        // Azure (Enterprise: DevOps + SQL), Cloudflare Workers (wrangler en
        // activate-entrenamiento), Netlify (POVSTOREUY).
        { key: 'stack.cloud', items: ['Vercel', 'AWS', 'Azure', 'Cloudflare Workers', 'Netlify', 'SST'] },
    ];

    const TOTAL = LAYERS.reduce((n, layer) => n + layer.items.length, 0);

    /** Punta de flecha del rótulo de borde. Ojo: una `L` de `border-r + border-t`
     *  apunta arriba-derecha, así que ABAJO es 135° y ARRIBA es -45°. `rotate-45`
     *  apunta a la derecha, y `rotate-135` no existe en Tailwind por defecto. */
    const Tip = ({ dir }: { dir: 'up' | 'down' }) => (
        <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 border-r border-t border-accent ${
            dir === 'down' ? 'rotate-[135deg]' : '-rotate-45'
        }`}
        />
    );

    const EdgeLabel = ({ text, dir }: { text: string; dir: 'up' | 'down' }) => (
        <span className="flex items-center gap-2">
        <Tip dir={dir} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-label">
            {text}
        </span>
        </span>
    );

    /**
     * Marcas de profundidad: UNA por tecnología. El largo de la barra ES el conteo, así
     * que en estado cerrado se ve de un vistazo qué capa es la más gruesa sin leer un
     * solo nombre. No es adorno: es el único dato que el diagrama no podía mostrar
     * cuando todo estaba desplegado, porque con 46 celdas abiertas la comparación entre
     * capas se perdía en el ruido.
     */
    const DepthTicks = ({ n, on }: { n: number; on: boolean }) => (
        <span aria-hidden="true" className="flex items-center gap-[2px]">
        {Array.from({ length: n }).map((_, i) => (
            <span
            key={i}
            className={`h-2.5 w-[3px] transition-colors ${on ? 'bg-accent' : 'bg-border-strong'}`}
            />
        ))}
        </span>
    );

    const StackPipeline = () => {
    const { t } = useLanguage();

    // Acordeón de UNA capa abierta a la vez. Es lo que garantiza que el bloque mida
    // siempre parecido: seis cabeceras + el contenido de una sola capa. Si se permitieran
    // varias abiertas, volvería a crecer hasta los ~1500px que tenía desplegado.
    // Arranca con la capa de arriba abierta: cerrado del todo, el bloque no enseña la
    // interacción y se lee como una lista de títulos muertos.
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="mt-16 reveal">
        <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="slash slash-sm text-accent" />
            <p className="eyebrow">{t('about.tools_label')}</p>
        </div>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t('stack.subtitle')}</p>

        {/* 🚨 Los rótulos de borde van DENTRO del marco, como franja de cabecera y de
            pie del mismo bloque. Sueltos afuera flotaban sin anclaje y se leían como
            epígrafes olvidados; adentro son ESTRUCTURA del diagrama. */}
        <div className="mt-9 max-w-5xl border border-border">
            <div className="border-b border-border px-5 py-3">
            <EdgeLabel text={t('stack.top')} dir="down" />
            </div>

            <ol className="lattice">
            {LAYERS.map((layer, index) => {
                // Invertido respecto del DOM: el cimiento arranca primero en el pulso
                // del riel, así el diagrama se recorre desde abajo, como se recorre un
                // sistema. (El `.reveal` por banda se sacó: en una celda de `.lattice`
                // deja ver el fondo del contenedor como una plancha gris — ver la regla
                // en CLAUDE.md. Ahora revela el bloque entero, de una.)
                const fromBottom = LAYERS.length - 1 - index;
                const isOpen = open === index;
                const panelId = `stack-${layer.key.replace('.', '-')}`;

                return (
                <li
                    key={layer.key}
                    /* 🚨 Filete REFORZADO entre capas: el corte de capa tiene que pesar
                       más que el corte de fila, o las seis capas dejan de leerse como
                       capas y el bloque se ve como una planilla. */
                    className={`relative ${index > 0 ? 'border-t border-border-strong' : ''}`}
                >
                    {/* Riel: se enciende en secuencia de abajo hacia arriba. Ver
                        `.stack-rail` en tailwind.css. */}
                    <span
                    aria-hidden="true"
                    className="stack-rail absolute left-0 top-0 z-10 h-full w-[3px]"
                    style={{ animationDelay: `${fromBottom * 0.16}s` }}
                    />

                    <h3 className="text-inherit">
                    <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted lg:py-5"
                    >
                        <span className="flex items-baseline gap-3 lg:w-80 lg:shrink-0">
                        <span className="font-mono text-[11px] font-semibold text-accent">
                            0{LAYERS.length - index}
                        </span>
                        <span className="font-display text-[13px] font-bold uppercase leading-tight tracking-[0.1em] text-foreground">
                            {t(layer.key)}
                        </span>
                        </span>

                        {/* Las marcas arrancan todas en la MISMA vertical (después de la
                            columna de rótulos): es lo que hace comparable el largo de una
                            capa contra otra de un vistazo. El chevron se va al borde
                            derecho —y no pegado al contador— porque si no el grupo queda
                            flotando en el medio con medio ancho vacío a la derecha. */}
                        <span className="ml-auto flex items-center gap-3 sm:gap-4 lg:ml-0 lg:flex-1">
                        <DepthTicks n={layer.items.length} on={isOpen} />
                        <span className="w-6 shrink-0 text-right font-mono text-[11px] text-muted-foreground">
                            {layer.items.length}
                        </span>
                        <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 shrink-0 border-r border-t border-accent transition-transform duration-300 lg:ml-auto ${
                            isOpen ? '-rotate-45' : 'rotate-[135deg]'
                            }`}
                        />
                        </span>
                    </button>
                    </h3>

                    {/* El panel queda SIEMPRE en el HTML (`hidden`, no desmontado): lo
                        que Google y los LLMs leen es el markup, y todo el stack tiene
                        que seguir siendo indexable con las capas cerradas. */}
                    <div id={panelId} hidden={!isOpen}>
                    {/* Celdas: `grow` + `basis-[24%]` con wrap. Máximo 4 por fila, y la
                        última fila CRECE para llenar el ancho, así nunca queda hueco
                        con cantidades impares. */}
                    <ul className="lattice grid grid-cols-2 border-t border-border lg:flex lg:flex-wrap">
                        {layer.items.map((item, i) => {
                        // 🚨 En móvil la grilla es de 2 columnas: con un número IMPAR de
                        // tecnologías, la última fila quedaba con una celda sola y al
                        // lado un hueco GRIS (el fondo de `.lattice` asomando donde no
                        // hay celda). La última celda de una capa impar ocupa las dos
                        // columnas. `col-span-2` es inerte en el flex de `lg`.
                        const spanFull = layer.items.length % 2 === 1 && i === layer.items.length - 1;
                        return (
                            <li
                            key={item}
                            className={`flex min-w-0 items-center px-5 py-3.5 text-[13px] font-medium leading-snug text-foreground lg:grow lg:basis-[24%] lg:px-5 lg:py-4 ${
                                spanFull ? 'col-span-2' : ''
                            }`}
                            >
                            {item}
                            </li>
                        );
                        })}
                    </ul>
                    </div>
                </li>
                );
            })}
            </ol>

            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-border px-5 py-3">
            <EdgeLabel text={t('stack.base')} dir="up" />
            <span className="font-mono text-[11px] text-muted-foreground">
                {t('stack.count').replace('{tools}', String(TOTAL))}
            </span>
            </div>
        </div>
        </div>
    );
    };

    export default StackPipeline;
