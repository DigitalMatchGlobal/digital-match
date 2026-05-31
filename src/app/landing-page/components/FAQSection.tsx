    'use client';

    import { useState, useMemo } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import CircuitFlow from './CircuitFlow';

    interface FAQItem {
    id: string;
    question: string;
    answer: string;
    stats?: string;
    }

    const FAQSection = () => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const { t } = useLanguage();

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
        },
        {
        id: '6',
        question: t('faq.q6.question'),
        answer: t('faq.q6.answer'),
        stats: t('faq.q6.stats')
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

    return (
        // AGREGADO ID AQUI (Esto era lo que faltaba para que funcionara siempre)
        <section id="process" className="relative overflow-hidden py-24 section-raised">
        <CircuitFlow className="[transform:scaleX(-1)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t('faq.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
                {t('faq.subtitle')}
            </p>
            </div>

            <div className="border-t border-border/60 divide-y divide-border/60">
            {faqs.map((faq, index) => {
                const isOpen = openItems.has(faq.id);

                return (
                <div key={faq.id} className="reveal" data-delay={index}>
                    <button
                    onClick={() => toggleItem(faq.id)}
                    className="group w-full py-6 text-left flex items-center justify-between gap-4"
                    >
                    <h3 className={`text-lg font-semibold pr-2 transition-colors ${
                        isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'
                    }`}>
                        {faq.question}
                    </h3>
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-smooth ${
                        isOpen ? 'rotate-180 bg-accent/20' : 'bg-accent/10 group-hover:bg-accent/20'
                        }`}
                    >
                        <Icon name="ChevronDownIcon" size={16} className="text-accent" />
                    </div>
                    </button>

                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}>
                    <div className="overflow-hidden min-h-0">
                        <div className="pb-6">
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
                </div>
                );
            })}
            </div>
        </div>
        </section>
    );
    };

    export default FAQSection;