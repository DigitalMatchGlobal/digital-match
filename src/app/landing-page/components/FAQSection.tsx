    'use client';

    import { useState, useEffect } from 'react';
    import Icon from '@/components/ui/AppIcon';

    interface FAQItem {
    id: string;
    question: string;
    answer: string;
    stats?: string;
    }

    const FAQSection = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const faqs: FAQItem[] = [
        {
        id: '1',
        question: 'How long does it take to deliver a project?',
        answer: 'Most projects are delivered within 7-14 days from kickoff. We follow an agile methodology with daily updates and iterative releases. For larger projects, we break them into phases with the first working version delivered within 2 weeks.',
        stats: 'Average delivery: 10 days'
        },
        {
        id: '2',
        question: 'What is your work process?',
        answer: 'We start with a strategy call to understand your needs, then create a detailed technical specification. Development happens in sprints with daily updates via Slack/WhatsApp. You get access to a staging environment to test features as they are built. Final delivery includes complete documentation, training, and 30 days of support.',
        stats: '100% client satisfaction rate'
        },
        {
        id: '3',
        question: 'Do you provide post-delivery support?',
        answer: 'Yes! Every project includes 30 days of free support and bug fixes. After that, we offer flexible maintenance plans starting at $500/month. We also provide training for your team and comprehensive documentation so you can manage the system independently if needed.',
        stats: '95% client retention rate'
        },
        {
        id: '4',
        question: 'What do I need to get started?',
        answer: 'Just three things: a clear business problem you want to solve, access to any existing systems we need to integrate with, and availability for a 1-hour kickoff call. We handle everything else including project management, design, development, testing, and deployment.',
        stats: 'Start in 24-48 hours'
        },
        {
        id: '5',
        question: 'Who are your typical clients?',
        answer: 'We work with ambitious startups and SMEs in LATAM and US markets with $5K-50K budgets. Our clients are typically experiencing operational bottlenecks, looking to scale efficiently, and value technical expertise over cheap alternatives. They need fast implementation with documented, maintainable systems.',
        stats: '50+ startups scaled'
        }
    ];

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
                Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground">
                Everything you need to know about working with us
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq) => (
                <div
                    key={faq.id}
                    className="bg-surface border border-border rounded-xl p-6"
                >
                    <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground pr-8">
                        {faq.question}
                    </h3>
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0" />
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
        );
    }

    return (
        <section className="py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
                Everything you need to know about working with us
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