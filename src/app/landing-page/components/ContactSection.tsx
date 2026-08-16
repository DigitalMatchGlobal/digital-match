    'use client';

    import { useState } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import CircuitFlow from './CircuitFlow';
    import { site } from '@/data/site';

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

    const WHATSAPP_NUMBER = site.phone.replace(/[^\d]/g, '');

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
        const day = days.find((d) => d.id === dayPref)?.label ?? '';
        const time = times.find((tt) => tt.id === timePref)?.label ?? '';
        lines.push(`${t('contact.wa.pref')}: ${day}, ${time}.`);
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
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
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
    const chipClass = (active: boolean) =>
        `rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${
        active
            ? 'border-accent bg-accent/15 text-foreground'
            : 'border-border bg-white/[0.03] text-muted-foreground hover:border-accent/40 hover:text-foreground'
        }`;

    return (
        <section id="contact" className="relative overflow-hidden py-24 section-raised">
        <CircuitFlow className="[transform:scaleX(-1)]" />
        <div className="glow-radial pointer-events-none absolute inset-x-0 bottom-0 h-2/3" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">

            {/* ── Columna izquierda: promesa y expectativa ── */}
            <div className="reveal">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t('contact.title')}
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                {t('contact.subtitle')}
                </p>

                <div className="space-y-6">
                {[
                    { icon: 'BoltIcon', title: t('contact.feat.response.title'), desc: t('contact.feat.response.desc') },
                    { icon: 'ShieldCheckIcon', title: t('contact.feat.commit.title'), desc: t('contact.feat.commit.desc') },
                    { icon: 'RocketLaunchIcon', title: t('contact.feat.start.title'), desc: t('contact.feat.start.desc') },
                ].map((feat) => (
                    <div key={feat.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Icon name={feat.icon as any} size={24} className="text-accent" />
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
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">
                        {t('contact.q.title')}
                    </h3>
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
                            className={`flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-smooth ${
                                active
                                ? 'border-accent bg-accent/10 ring-1 ring-accent/30'
                                : 'border-border bg-white/[0.03] hover:border-accent/40'
                            }`}
                            >
                            <span
                                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-smooth ${
                                active ? 'bg-gradient-accent' : 'bg-accent/15'
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
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-1">
                        {t('contact.when.title')}
                        </h3>
                        {/* Honestidad: no mostramos agenda real, se cierra en el chat. */}
                        <p className="text-sm text-muted-foreground mb-4">{t('contact.when.note')}</p>

                        <div className="mb-3 flex flex-wrap gap-2">
                        {days.map((d) => (
                            <button
                            key={d.id}
                            type="button"
                            aria-pressed={dayPref === d.id}
                            onClick={() => setDayPref(d.id)}
                            className={chipClass(dayPref === d.id)}
                            >
                            {d.label}
                            </button>
                        ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                        {times.map((tt) => (
                            <button
                            key={tt.id}
                            type="button"
                            aria-pressed={timePref === tt.id}
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
                    <label htmlFor="topic" className="block text-sm font-semibold text-foreground mb-2">
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
                    <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="w-full px-8 py-4 text-lg font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta transition-smooth hover:scale-105 hover:shadow-xl"
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
