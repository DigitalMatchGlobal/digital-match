    'use client';

    import { useState, useEffect } from 'react';
    import AppImage from '@/components/ui/AppImage';
    import Icon from '@/components/ui/AppIcon';

    interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    alt: string;
    quote: string;
    results: string;
    videoUrl?: string;
    }

    const TestimonialsSection = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Carlos Mendoza',
        role: 'CEO',
        company: 'TechStart LATAM',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_18af27586-1763296142519.png",
        alt: 'Professional Hispanic businessman in navy suit smiling confidently in modern office',
        quote: 'Digital Match Global transformed our operations completely. What used to take our team 3 days now happens automatically in minutes. The ROI was immediate.',
        results: '85% reduction in processing time, $50K annual savings',
        videoUrl: '#'
    },
    {
        id: '2',
        name: 'Maria Rodriguez',
        role: 'Operations Director',
        company: 'ScaleUp Solutions',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_126946a46-1763294962859.png",
        alt: 'Professional Hispanic woman with long dark hair in white blazer smiling in corporate setting',
        quote: 'The AI assistant they built handles 80% of our customer inquiries. Our support team can now focus on complex issues while maintaining 24/7 availability.',
        results: '300% increase in customer satisfaction, 60% cost reduction',
        videoUrl: '#'
    },
    {
        id: '3',
        name: 'Diego Santos',
        role: 'Founder',
        company: 'InnovateLab',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1649ccff3-1763295333634.png",
        alt: 'Young Hispanic entrepreneur in casual blue shirt working on laptop in modern workspace',
        quote: 'They delivered our MVP in 10 days. The platform scaled from 100 to 10,000 users without any issues. Best investment we made this year.',
        results: 'Launched in 10 days, scaled to 10K users, $200K revenue in 3 months',
        videoUrl: '#'
    }];


    useEffect(() => {
        if (!isHydrated) return;

        const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [isHydrated, testimonials.length]);

    const handlePrevious = () => {
        setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
    };

    if (!isHydrated) {
        return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Client Success Stories
                </h2>
                <p className="text-xl text-muted-foreground">
                Real results from real businesses
                </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                    <AppImage
                    src={testimonials[0].image}
                    alt={testimonials[0].alt}
                    className="w-full h-full object-cover" />

                </div>
                <div>
                    <p className="text-xl text-foreground mb-6 leading-relaxed">
                    {testimonials[0].quote}
                    </p>
                    <div className="mb-6">
                    <div className="text-lg font-bold text-foreground">
                        {testimonials[0].name}
                    </div>
                    <div className="text-muted-foreground">
                        {testimonials[0].role} at {testimonials[0].company}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>);

    }

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Client Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
                Real results from real businesses
            </p>
            </div>

            <div className="relative">
            <div className="bg-surface border border-border rounded-2xl p-8 md:p-12 transition-smooth">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                    <AppImage
                    src={activeTestimonial.image}
                    alt={activeTestimonial.alt}
                    className="w-full h-full object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                <div>
                    <div className="mb-6">
                    <Icon name="ChatBubbleLeftIcon" size={32} className="text-accent mb-4" />
                    <p className="text-xl text-foreground mb-6 leading-relaxed">
                        "{activeTestimonial.quote}"
                    </p>
                    </div>

                    <div className="mb-6">
                    <div className="text-lg font-bold text-foreground">
                        {activeTestimonial.name}
                    </div>
                    <div className="text-muted-foreground">
                        {activeTestimonial.role} at {activeTestimonial.company}
                    </div>
                    </div>

                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-success/20 border border-success/30">
                    <Icon name="ChartBarIcon" size={16} className="text-success" />
                    <span className="text-sm font-semibold text-success-foreground">
                        {activeTestimonial.results}
                    </span>
                    </div>
                </div>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-8">
                <button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center transition-smooth hover:border-accent hover:bg-accent/10"
                aria-label="Previous testimonial">

                <Icon name="ChevronLeftIcon" size={24} />
                </button>

                <div className="flex space-x-2">
                {testimonials.map((_, index) =>
                <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-smooth ${
                    index === activeIndex ? 'bg-accent w-8' : 'bg-muted'}`
                    }
                    aria-label={`Go to testimonial ${index + 1}`} />

                )}
                </div>

                <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center transition-smooth hover:border-accent hover:bg-accent/10"
                aria-label="Next testimonial">

                <Icon name="ChevronRightIcon" size={24} />
                </button>
            </div>
            </div>
        </div>
        </section>);

    };

    export default TestimonialsSection;