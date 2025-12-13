    'use client';

    import { useState, useEffect } from 'react';
    import Icon from '@/components/ui/AppIcon';

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
    const [isHydrated, setIsHydrated] = useState(false);
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

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
        }

        if (!formData.company.trim()) {
        newErrors.company = 'Company name is required';
        }

        if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
        }

        if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 20) {
        newErrors.message = 'Message must be at least 20 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
        return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            message: ''
        });

        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    if (!isHydrated) {
        return (
        <section id="contact" className="py-24 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Ready to Scale Your Business?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                    Book a free strategy call and discover how we can transform your operations in 7-14 days
                </p>
                </div>
                <div className="bg-surface border border-border rounded-2xl p-8">
                <form className="space-y-6">
                    <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground"
                    />
                    </div>
                    <button
                    type="submit"
                    className="w-full px-8 py-4 text-lg font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta"
                    >
                    Book Strategy Call
                    </button>
                </form>
                </div>
            </div>
            </div>
        </section>
        );
    }

    return (
        <section id="contact" className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Scale Your Business?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                Book a free strategy call and discover how we can transform your operations in 7-14 days
                </p>

                <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="ClockIcon" size={24} className="text-accent" />
                    </div>
                    <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                        Fast Response
                    </h3>
                    <p className="text-muted-foreground">
                        We'll get back to you within 24 hours to schedule your strategy call
                    </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheckIcon" size={24} className="text-accent" />
                    </div>
                    <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                        No Commitment
                    </h3>
                    <p className="text-muted-foreground">
                        Free consultation with no obligation. We'll provide honest advice even if we're not the right fit
                    </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="RocketLaunchIcon" size={24} className="text-accent" />
                    </div>
                    <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                        Quick Start
                    </h3>
                    <p className="text-muted-foreground">
                        If we're a good match, we can start your project within 24-48 hours
                    </p>
                    </div>
                </div>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-8">
                {showSuccess ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCircleIcon" size={32} className="text-success" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                    Message Sent Successfully!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                    We'll get back to you within 24 hours to schedule your strategy call
                    </p>
                    <button
                    onClick={() => setShowSuccess(false)}
                    className="px-6 py-3 text-sm font-semibold text-accent border border-accent rounded-lg transition-smooth hover:bg-accent/10"
                    >
                    Send Another Message
                    </button>
                </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                        Full Name *
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
                        placeholder="John Doe"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-error">{errors.name}</p>
                    )}
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        Email *
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
                        placeholder="john@company.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-error">{errors.email}</p>
                    )}
                    </div>

                    <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                        Company Name *
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
                        placeholder="Your Company"
                    />
                    {errors.company && (
                        <p className="mt-1 text-sm text-error">{errors.company}</p>
                    )}
                    </div>

                    <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number *
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
                        placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-error">{errors.phone}</p>
                    )}
                    </div>

                    <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        Tell us about your project *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-accent resize-none ${
                        errors.message ? 'border-error' : 'border-border'
                        }`}
                        placeholder="Describe your business challenge and what you're looking to achieve..."
                    />
                    {errors.message && (
                        <p className="mt-1 text-sm text-error">{errors.message}</p>
                    )}
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 text-lg font-semibold bg-gradient-accent text-accent-foreground rounded-lg shadow-cta transition-smooth hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center space-x-2">
                        <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                        <span>Sending...</span>
                        </span>
                    ) : (
                        'Book Strategy Call'
                    )}
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy and terms of service
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