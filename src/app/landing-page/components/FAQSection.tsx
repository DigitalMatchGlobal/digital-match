    'use client';

    import { useState, useMemo } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import SectionIntro from '@/components/common/SectionIntro';
    import { faqEntries } from '@/data/faq';

    interface FAQItem {
    id: string;
    question: string;
    answer: string;
    stats?: string;
    }

    const FAQSection = () => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const { t, language } = useLanguage();

    // El contenido sale de `src/data/faq.ts`, que es la MISMA fuente que consume el
    // FAQPage de JSON-LD. No volver a escribir las preguntas acá: cuando vivían en
    // dos lados, el JSON-LD (lo que leen Google y los LLMs) podía driftear del sitio.
    const faqs: FAQItem[] = useMemo(
        () =>
        faqEntries.map((entry) => ({
            id: entry.id,
            question: entry.question[language],
            answer: entry.answer[language],
            stats: entry.stats[language],
        })),
        [language]
    );

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
        <section id="faq" className="relative overflow-hidden py-24 bg-background">
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
            <SectionIntro
            className="mb-14"
            eyebrow={t('faq.eyebrow')}
            title={t('faq.title')}
            body={t('faq.subtitle')}
            />

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