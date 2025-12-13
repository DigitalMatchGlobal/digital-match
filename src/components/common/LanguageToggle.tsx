    'use client';

    import { useLanguage } from '@/contexts/LanguageContext';
    import Icon from '@/components/ui/AppIcon';

    const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    return (
        <button
        onClick={toggleLanguage}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-surface/50 border border-border hover:bg-surface hover:border-accent transition-smooth"
        aria-label="Toggle language"
        title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
        <Icon name="LanguageIcon" size={20} className="text-foreground" />
        <span className="text-sm font-semibold text-foreground uppercase">
            {language}
        </span>
        <div className="flex items-center space-x-1">
            <span className={`w-2 h-2 rounded-full transition-colors ${language === 'es' ? 'bg-accent' : 'bg-muted-foreground/30'}`} />
            <span className={`w-2 h-2 rounded-full transition-colors ${language === 'en' ? 'bg-accent' : 'bg-muted-foreground/30'}`} />
        </div>
        </button>
    );
    };

    export default LanguageToggle;