    'use client';

    import { useState } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import { site } from '@/data/site';
    import { waLink } from '@/lib/whatsapp';

    // ────────────────────────────────────────────────────────────────────────────
    // CONTACTO — todo termina en MatchBot, sin terceros.
    //
    // Historia de esta sección, para no repetir errores:
    //  1. Posteaba a FormSubmit.co (tercero gratuito) que reenviaba un mail. Los
    //     datos del prospecto pasaban por un servicio ajeno, y una consultora que
    //     vende automatización tomaba sus leads a mano.
    //  2. Se reemplazó por un formulario que abría WhatsApp. Correcto en el
    //     principio, malo en la ergonomía: le cobraba al visitante dos veces la
    //     misma acción (4 campos + apretar enviar en el chat) y pedía datos que el
    //     propio canal ya aporta.
    //  3. Esto: el visitante NO escribe, TOCA. Elige intención y franja horaria, y
    //     el mensaje se arma solo. Cero campos obligatorios.
    //
    // No usamos calendario de terceros a propósito: mete una UI ajena en el momento
    // de conversión y sería incoherente que el producto que vendemos (automatización
    // conversacional) no pueda coordinar una llamada. El costo es que NO mostramos
    // disponibilidad real — por eso el copy dice "lo confirmamos en el chat" y nunca
    // "elegí tu horario", que prometería agenda que acá no hay.
    // ────────────────────────────────────────────────────────────────────────────

    type Intent = 'book' | 'call' | 'ask';
    type DayPref = 'this' | 'next' | 'any';
    type TimePref = 'morning' | 'midday' | 'afternoon' | 'any';

    const ContactSection = () => {
    const { t } = useLanguage();

    // 'book' por defecto: el visitante llega desde CTAs que dicen "Agendar", así
    // que la sección ya aparece resuelta para esa intención.
    const [intent, setIntent] = useState<Intent>('book');
    const [dayPref, setDayPref] = useState<DayPref>('this');
    const [timePref, setTimePref] = useState<TimePref>('any');
    const [topic, setTopic] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successChannel, setSuccessChannel] = useState<'wa' | 'mail'>('wa');

    // La franja horaria solo tiene sentido si hay algo que coordinar.
    const needsSchedule = intent === 'book' || intent === 'call';

    const intents: { id: Intent; icon: string; label: string }[] = [
        { id: 'book', icon: 'CalendarDaysIcon', label: t('contact.intent.book') },
        { id: 'call', icon: 'PhoneIcon', label: t('contact.intent.call') },
        { id: 'ask', icon: 'ChatBubbleLeftRightIcon', label: t('contact.intent.ask') },
    ];

    const days: { id: DayPref; label: string }[] = [
        { id: 'this', label: t('contact.day.this') },
        { id: 'next', label: t('contact.day.next') },
        { id: 'any', label: t('contact.day.any') },
    ];

    const times: { id: TimePref; label: string }[] = [
        { id: 'morning', label: t('contact.time.morning') },
        { id: 'midday', label: t('contact.time.midday') },
        { id: 'afternoon', label: t('contact.time.afternoon') },
        { id: 'any', label: t('contact.time.any') },
    ];

    // Mensaje que el visitante envía. Se arma solo con lo que tocó.
    const buildMessage = () => {
        const lines = [t(`contact.wa.msg.${intent}`)];

        if (needsSchedule) {
        // ⚠️ NO usar la etiqueta del chip acá. El chip está escrito para leerse
        // solo ("La próxima", "Me adapto") y dentro de una oración queda roto:
        // "Me queda cómodo: La próxima, ..." o "Me queda cómodo: Me adapto, ...".
        // El mensaje usa fragmentos redactados para prosa (contact.wa.day/time.*).
        if (dayPref === 'any' && timePref === 'any') {
            lines.push(t('contact.wa.pref.any'));
        } else {
            lines.push(
            `${t('contact.wa.pref')} ${t(`contact.wa.day.${dayPref}`)}, ${t(`contact.wa.time.${timePref}`)}.`,
            );
        }
        }

        if (topic.trim()) {
        lines.push('', `${t('contact.wa.topic')}: ${topic.trim()}`);
        }

        return lines.join('\n');
    };

    const reset = () => {
        setIntent('book');
        setDayPref('this');
        setTimePref('any');
        setTopic('');
    };

    const handleWhatsApp = () => {
        const url = waLink(buildMessage());
        window.open(url, '_blank', 'noopener,noreferrer');
        setSuccessChannel('wa');
        setShowSuccess(true);
        reset();
    };

    // Alternativa para quien no usa WhatsApp: mailto directo, tampoco hay terceros.
    const handleEmail = () => {
        const url = `mailto:${site.email}?subject=${encodeURIComponent(t('contact.mail.subject'))}&body=${encodeURIComponent(buildMessage())}`;
        window.location.href = url;
        setSuccessChannel('mail');
        setShowSuccess(true);
        reset();
    };

    // Estilo compartido de las "píldoras" seleccionables (día y franja horaria).
    // 🚨 `w-full` en móvil y `w-auto` desde `sm`. Con `flex-wrap` y píldoras de ancho
    // variable, en un teléfono las 7 opciones caían en una ESCALERA (dos, después una
    // sola, después una por línea) que se leía como desorden y no dejaba ver dónde
    // terminaba una pregunta y empezaba la otra. En grilla forman un bloque parejo — y de
    // paso el área táctil pasa a ser la celda entera, no el texto.
    //
    // ⚠️ El cuerpo en móvil se queda en 13px aunque las etiquetas caigan en DOS líneas.
    // Probado en 12px: ahí algunas entran en una línea y otras no, y el bloque queda
    // desparejo. Uniforme en dos líneas se lee mejor que mezclado en una.
    const chipClass = (active: boolean) =>
        `w-full rounded-full border px-2.5 py-2.5 text-center text-[13px] font-medium leading-tight transition-smooth sm:w-auto sm:px-4 sm:py-2 sm:text-sm ${
        active
            ? 'border-accent bg-accent/15 font-semibold text-foreground'
            : 'border-border bg-muted text-muted-foreground hover:border-accent/40 hover:text-foreground'
        }`;

    // Rótulo de paso numerado. Las tres preguntas se veían como bloques sueltos: no había
    // forma de saber cuántas decisiones había ni en qué orden. El numeral es el mismo
    // recurso que la banda del hero, el proceso y los casos.
    const StepHeading = ({ n, title }: { n: number; title: string }) => (
        <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-[11px] font-semibold leading-none text-accent">0{n}</span>
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{title}</h3>
        </div>
    );

    return (
        <section id="contact" className="relative overflow-hidden py-24 section-raised">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">

            {/* ── Columna izquierda: promesa y expectativa ── */}
            <div>
                <div className="reveal flex items-center gap-2.5">
                <span aria-hidden="true" className="slash slash-sm text-accent" />
                <p className="eyebrow">{t('contact.eyebrow')}</p>
                </div>
                <h2 className="reveal mt-5 text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-[2.6rem]" data-delay="1">
                {t('contact.title')}
                </h2>
                <p className="reveal mt-5 mb-9 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8" data-delay="2">
                {t('contact.subtitle')}
                </p>

                <div className="space-y-6">
                {[
                    { icon: 'BoltIcon', title: t('contact.feat.response.title'), desc: t('contact.feat.response.desc') },
                    { icon: 'ShieldCheckIcon', title: t('contact.feat.commit.title'), desc: t('contact.feat.commit.desc') },
                    { icon: 'RocketLaunchIcon', title: t('contact.feat.start.title'), desc: t('contact.feat.start.desc') },
                ].map((feat) => (
                    <div key={feat.title} className="flex items-start space-x-4">
                    <div className="icon-tile flex-shrink-0">
                        <Icon name={feat.icon as any} size={22} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{feat.title}</h3>
                        <p className="text-muted-foreground">{feat.desc}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* ── Columna derecha: el selector ── */}
            <div className="glass-panel p-8 shadow-cta reveal" data-delay={1}>
                {showSuccess ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCircleIcon" size={32} className="text-success" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                    {t(successChannel === 'wa' ? 'contact.success.title' : 'contact.success.mail.title')}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                    {t(successChannel === 'wa' ? 'contact.success.desc' : 'contact.success.mail.desc')}
                    </p>
                    <button
                    onClick={() => setShowSuccess(false)}
                    className="px-6 py-3 text-sm font-semibold text-accent border border-accent rounded-lg transition-smooth hover:bg-accent/10"
                    >
                    {t('contact.success.button')}
                    </button>
                </div>
                ) : (
                <div className="space-y-8">

                    {/* 1 · Intención */}
                    <div>
                    <StepHeading n={1} title={t('contact.q.title')} />
                    <div className="space-y-3" role="radiogroup" aria-label={t('contact.q.title')}>
                        {intents.map((opt) => {
                        const active = intent === opt.id;
                        return (
                            <button
                            key={opt.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setIntent(opt.id)}
                            className={`flex w-full items-center gap-3 rounded-sm border px-4 py-4 text-left transition-smooth sm:gap-4 sm:px-5 ${
                                active
                                ? 'border-accent bg-accent/10 ring-1 ring-accent/30'
                                : 'border-border bg-muted hover:border-accent/40'
                            }`}
                            >
                            <span
                                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-smooth ${
                                active ? 'bg-accent' : 'bg-accent/15'
                                }`}
                            >
                                <Icon
                                name={opt.icon as any}
                                size={20}
                                className={active ? 'text-accent-foreground' : 'text-accent'}
                                />
                            </span>
                            <span className="font-semibold text-foreground">{opt.label}</span>
                            {active && (
                                <Icon name="CheckCircleIcon" size={20} className="ml-auto text-accent" />
                            )}
                            </button>
                        );
                        })}
                    </div>
                    </div>

                    {/* 2 · Preferencia horaria (solo si hay algo que coordinar) */}
                    {needsSchedule && (
                    <div>
                        <StepHeading n={2} title={t('contact.when.title')} />
                        {/* Honestidad: no mostramos agenda real, se cierra en el chat. */}
                        <p className="-mt-2 mb-5 text-sm text-muted-foreground">{t('contact.when.note')}</p>

                        {/* 🚨 DOS elecciones independientes, con su rótulo cada una. Antes
                            eran 7 chips idénticos seguidos: se leían como una sola lista y
                            no se entendía que había que elegir en las dos filas. */}
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {t('contact.when.day')}
                        </p>
                        <div className="mb-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap" role="radiogroup" aria-label={t('contact.when.day')}>
                        {days.map((d) => (
                            <button
                            key={d.id}
                            type="button"
                            role="radio"
                            aria-checked={dayPref === d.id}
                            onClick={() => setDayPref(d.id)}
                            className={chipClass(dayPref === d.id)}
                            >
                            {d.label}
                            </button>
                        ))}
                        </div>

                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {t('contact.when.slot')}
                        </p>
                        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" role="radiogroup" aria-label={t('contact.when.slot')}>
                        {times.map((tt) => (
                            <button
                            key={tt.id}
                            type="button"
                            role="radio"
                            aria-checked={timePref === tt.id}
                            onClick={() => setTimePref(tt.id)}
                            className={chipClass(timePref === tt.id)}
                            >
                            {tt.label}
                            </button>
                        ))}
                        </div>
                    </div>
                    )}

                    {/* 3 · Tema (opcional, no bloquea nada) */}
                    <div>
                    <StepHeading n={needsSchedule ? 3 : 2} title={t('contact.topic.label')} />
                    <label htmlFor="topic" className="sr-only">
                        {t('contact.topic.label')}
                    </label>
                    <textarea
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        rows={2}
                        className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={t('contact.topic.ph')}
                    />
                    </div>

                    {/* 4 · Salida */}
                    <div className="space-y-3">
                    {/* 🚨 Vista previa del mensaje. Toda la sección se apoya en que "el
                        mensaje se arma solo" y hasta acá el visitante no lo veía nunca:
                        apretaba un botón que abría WhatsApp con un texto que no había
                        leído. Mostrarlo elimina la duda de "qué va a pasar si toco esto",
                        que en el paso de conversión es exactamente la duda que frena, y de
                        paso demuestra lo que vendemos en vez de contarlo.
                        `whitespace-pre-line` porque el mensaje trae saltos de línea. */}
                    <div className="rounded-sm border border-border bg-muted/60 px-4 py-3">
                        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        {t('contact.preview.title')}
                        </p>
                        <p className="whitespace-pre-line text-[13px] leading-6 text-foreground">
                        {buildMessage()}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="w-full px-8 py-4 text-lg font-semibold bg-accent text-accent-foreground transition-colors hover:bg-accent-hover"
                    >
                        <span className="flex items-center justify-center gap-2">
                        <Icon name="ChatBubbleLeftRightIcon" size={20} />
                        {t('contact.cta.wa')}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={handleEmail}
                        className="w-full text-sm text-muted-foreground underline underline-offset-4 transition-smooth hover:text-accent"
                    >
                        {t('contact.cta.mail')}
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                        {t('contact.legal.wa')}
                    </p>
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>
        </section>
    );
    };

    export default ContactSection;
