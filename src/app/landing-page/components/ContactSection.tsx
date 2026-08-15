    'use client';

    import { useState } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import CircuitFlow from './CircuitFlow';
    import { site } from '@/data/site';

    interface FormData {
    name: string;
    email: string;
    company: string;
    phone: string;
    message: string;
    }

    interface FormErrors {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
    message?: string;
    }

    const ContactSection = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    // Por qué canal salió la consulta: el mensaje de éxito tiene que decir la verdad.
    const [successChannel, setSuccessChannel] = useState<'wa' | 'mail'>('wa');
    const { t } = useLanguage();

    // 🤖 La consulta entra por MatchBot (nuestro propio producto), no por correo.
    //
    // Antes esto posteaba a FormSubmit.co —un tercero gratuito— que reenviaba un
    // mail. Se quitó por dos motivos: los datos del prospecto (nombre, empresa,
    // teléfono) pasaban por un servicio ajeno, y una consultora que vende
    // automatización no puede tomar sus propios leads a mano.
    //
    // Ahora el formulario arma un mensaje estructurado y abre la conversación de
    // WhatsApp con nuestro número: MatchBot la atiende, la califica y la deja en
    // la bandeja del equipo. Sin backend propio y sin intermediarios.
    //
    // El correo queda como alternativa explícita para quien no quiera WhatsApp
    // (mailto directo, tampoco pasa por terceros).
    const WHATSAPP_NUMBER = site.phone.replace(/[^\d]/g, '');

    // Mensaje que el prospecto envía. Va etiquetado para que el bot y la bandeja
    // reconozcan de dónde viene el lead.
    const buildLeadMessage = () => {
        const lines = [
        t('contact.wa.intro'),
        '',
        `${t('contact.form.name')}: ${formData.name}`,
        `${t('contact.form.company')}: ${formData.company}`,
        `${t('contact.form.email')}: ${formData.email}`,
        ];
        if (formData.phone.trim()) {
        lines.push(`${t('contact.form.phone')}: ${formData.phone}`);
        }
        if (formData.message.trim()) {
        lines.push('', `${t('contact.form.message')}: ${formData.message}`);
        }
        return lines.join('\n');
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
        newErrors.name = t('contact.error.name');
        }

        if (!formData.email.trim()) {
        newErrors.email = t('contact.error.email');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('contact.error.email.invalid');
        }

        if (!formData.company.trim()) {
        newErrors.company = t('contact.error.company');
        }

        // El teléfono ya no es obligatorio: la consulta sale por WhatsApp, así que
        // el número lo aporta el propio canal. Se deja el campo por si quieren
        // dejar otro distinto al que escriben.

        // ✅ MODIFICACIÓN: Validaciones de mensaje ELIMINADAS.
        // El campo puede ir vacío y no requiere longitud mínima.
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    };

    // Abre la conversación de WhatsApp con el mensaje ya escrito. No hay request
    // de red: no hay nada que pueda fallar ni tercero al que enviarle el dato.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
        return;
        }

        setIsSubmitting(true);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildLeadMessage())}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        setSuccessChannel('wa');
        setShowSuccess(true);
        resetForm();
        setIsSubmitting(false);
    };

    // Alternativa para quien no usa WhatsApp: mailto directo a la casilla propia.
    const handleEmailFallback = () => {
        if (!validateForm()) {
        return;
        }
        const subject = `${t('contact.mail.subject')}: ${formData.company}`;
        const url = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildLeadMessage())}`;
        window.location.href = url;
        setSuccessChannel('mail');
        setShowSuccess(true);
        resetForm();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden py-24 section-raised">
        <CircuitFlow className="[transform:scaleX(-1)]" />
        <div className="glow-radial pointer-events-none absolute inset-x-0 bottom-0 h-2/3" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t('contact.title')}
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                {t('contact.subtitle')}
                </p>

                <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="ClockIcon" size={24} className="text-accent" />
                    </div>
                    <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                        {t('contact.feat.response.title')}
                    </h3>
                    <p className="text-muted-foreground">
                        {t('contact.feat.response.desc')}
                    </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheckIcon" size={24} className="text-accent" />
                    </div>
                    <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                        {t('contact.feat.commit.title')}
                    </h3>
                    <p className="text-muted-foreground">
                        {t('contact.feat.commit.desc')}
                    </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="RocketLaunchIcon" size={24} className="text-accent" />
                    </div>
                    <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                        {t('contact.feat.start.title')}
                    </h3>
                    <p className="text-muted-foreground">
                        {t('contact.feat.start.desc')}
                    </p>
                    </div>
                </div>
                </div>
            </div>

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
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                        {t('contact.form.name')} *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.name ? 'border-error' : 'border-border'
                        }`}
                        placeholder={t('contact.form.name.ph')}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-error">{errors.name}</p>
                    )}
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        {t('contact.form.email')} *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.email ? 'border-error' : 'border-border'
                        }`}
                        placeholder={t('contact.form.email.ph')}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-error">{errors.email}</p>
                    )}
                    </div>

                    <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                        {t('contact.form.company')} *
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.company ? 'border-error' : 'border-border'
                        }`}
                        placeholder={t('contact.form.company.ph')}
                    />
                    {errors.company && (
                        <p className="mt-1 text-sm text-error">{errors.company}</p>
                    )}
                    </div>

                    <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                        {t('contact.form.phone')}
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.phone ? 'border-error' : 'border-border'
                        }`}
                        placeholder={t('contact.form.phone.ph')}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-error">{errors.phone}</p>
                    )}
                    </div>

                    <div>
                    {/* OPCIONAL: Sin asterisco y sin validación de longitud */}
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        {t('contact.form.message')} 
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        placeholder={t('contact.form.message.ph')}
                    />
                    {/* Se elimina el mensaje de error de mensaje */}
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 text-lg font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta transition-smooth hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center space-x-2">
                        <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                        <span>{t('contact.form.sending')}</span>
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                        <Icon name="ChatBubbleLeftRightIcon" size={20} />
                        {t('contact.form.submit')}
                        </span>
                    )}
                    </button>

                    {/* Alternativa para quien no quiera WhatsApp. Deliberadamente
                        secundaria: el camino bueno es el que atiende el bot. */}
                    <button
                    type="button"
                    onClick={handleEmailFallback}
                    className="w-full -mt-2 text-sm text-muted-foreground underline underline-offset-4 transition-smooth hover:text-accent"
                    >
                    {t('contact.form.email.fallback')}
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                    {t('contact.form.legal')}
                    </p>
                </form>
                )}
            </div>
            </div>
        </div>
        </section>
    );
    };

    export default ContactSection;