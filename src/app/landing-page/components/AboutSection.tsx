    'use client';

    import { useMemo } from 'react';
    import Icon from '@/components/ui/AppIcon';
    import { useLanguage } from '@/contexts/LanguageContext';
    import SectionIntro from '@/components/common/SectionIntro';
    import StackPipeline from './StackPipeline';

    const AboutSection = () => {
    const { t } = useLanguage();

    // Diferenciales (POR QUÉ confiar) — NO servicios (eso está en Servicios/Capacidades).
    //
    // 🚨 Copy CURADO por el cliente: eyebrow, titular, bajada y las cuatro celdas son
    // los originales y se restauraron a pedido (2026-08-25). En una pasada de
    // deduplicación se habían reescrito y recortado a tres celdas; la reescritura leía
    // como texto generado, que es exactamente lo contrario de lo que este sitio quiere
    // demostrar. **No volver a tocar estos textos sin pedirlo.** Si hay que resolver una
    // repetición que involucre esta sección, se resuelve en la OTRA punta.
    //
    // Lo único que queda repetido a propósito: "+14 años" también es la primera métrica
    // del ProofStrip. Es una decisión de contenido, no un descuido — acá el número viene
    // con su matiz ("en automatización, IA y desarrollo") y allá va pelado como dato.
    const differentiators = useMemo(() => [
        { icon: 'ClockIcon', title: t('about.diff1.title'), desc: t('about.diff1.desc') },
        { icon: 'BuildingOffice2Icon', title: t('about.diff2.title'), desc: t('about.diff2.desc') },
        { icon: 'ShieldCheckIcon', title: t('about.diff3.title'), desc: t('about.diff3.desc') },
        { icon: 'CheckBadgeIcon', title: t('about.diff4.title'), desc: t('about.diff4.desc') }
    ], [t]);

    return (
        <section id="about" className="relative overflow-hidden py-24 bg-background">
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">

            {/* Intro a la IZQUIERDA: rompe la fila de 10 secciones centradas seguidas.
                El badge pill se fue: el rótulo ahora es el eyebrow del SectionIntro. */}
            <SectionIntro
            eyebrow={t('about.eyebrow')}
            title={t('about.title')}
            body={t('about.subtitle')}
            />

            {/* Diferenciales: alineados a la izquierda y separados por hairlines, no
                cuatro columnas centradas con degradado (el centrado hacía que los
                bloques de distinto largo quedaran con las bases desparejas). */}
            <div className="reveal lattice grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-14">
            {differentiators.map((diff, index) => (
                <div key={index} className="p-6">
                <div className="icon-tile mb-5">
                    <Icon name={diff.icon} size={22} />
                </div>
                <h3 className="font-display font-bold text-base mb-2 leading-tight text-foreground">
                    {diff.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {diff.desc}
                </p>
                </div>
            ))}
            </div>

            <StackPipeline />

        </div>
        </section>
    );
    };

    export default AboutSection;
