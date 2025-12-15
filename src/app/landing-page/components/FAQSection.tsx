    'use client';

    import { useState, useEffect, useMemo } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext'; // 1. Importar el hook

    interface FAQItem {
    id: string;
    question: string;
    answer: string;
    stats?: string;
    }

    const FAQSection = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const { t } = useLanguage(); // 2. Usar el hook

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // 3. Crear el array de FAQs usando useMemo y t()
    // Esto asegura que el contenido se actualice cuando cambia el idioma
    const faqs: FAQItem[] = useMemo(() => [
        {
        id: '1',
        question: t('faq.q1.question'),
        answer: t('faq.q1.answer'),
        stats: t('faq.q1.stats')
        },
        {
        id: '2',
        question: t('faq.q2.question'),
        answer: t('faq.q2.answer'),
        stats: t('faq.q2.stats')
        },
        {
        id: '3',
        question: t('faq.q3.question'),
        answer: t('faq.q3.answer'),
        stats: t('faq.q3.stats')
        },
        {
        id: '4',
        question: t('faq.q4.question'),
        answer: t('faq.q4.answer'),
        stats: t('faq.q4.stats')
        },
        {
        id: '5',
        question: t('faq.q5.question'),
        answer: t('faq.q5.answer'),
        stats: t('faq.q5.stats')
        }
    ], [t]);

    const toggleItem = (id: string) => {
        setOpenItems((current) => {
        const newSet = new Set(current);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
        });
    };

    if (!isHydrated) {
        return (
        <section className="py-24 bg-secondary/30">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {/* Fallback para server-side rendering o carga inicial */}
                Frequently Asked Questions 
                </h2>
                <p className="text-xl text-muted-foreground">
                Everything you need to know about working with us
                </p>
            </div>
            {/* Renderizamos un esqueleto o lista vacía en SSR para evitar mismatch */}
            </div>
        </section>
        );
    }

    return (
        <section className="py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('faq.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
                {t('faq.subtitle')}
            </p>
            </div>

            <div className="space-y-4">
            {faqs.map((faq) => {
                const isOpen = openItems.has(faq.id);

                return (
                <div
                    key={faq.id}
                    className="bg-surface border border-border rounded-xl overflow-hidden transition-smooth hover:border-accent/50"
                >
                    <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between"
                    >
                    <h3 className="text-lg font-semibold text-foreground pr-8">
                        {faq.question}
                    </h3>
                    <div
                        className={`w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 transition-smooth ${
                        isOpen ? 'rotate-180' : ''
                        }`}
                    >
                        <Icon name="ChevronDownIcon" size={16} className="text-accent" />
                    </div>
                    </button>

                    <div
                    className={`transition-accordion overflow-hidden ${
                        isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                    >
                    <div className="px-6 pb-6">
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                        {faq.answer}
                        </p>
                        {faq.stats && (
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
                            <Icon name="CheckBadgeIcon" size={16} className="text-accent" />
                            <span className="text-sm font-semibold text-accent">
                            {faq.stats}
                            </span>
                        </div>
                        )}
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </section>
    );
    };

    export default FAQSection;