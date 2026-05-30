    import type { Metadata } from 'next';
    import { notFound } from 'next/navigation';
    import { cases, getCase } from '@/data/cases';
    import CaseDetailInteractive from './components/CaseDetailInteractive';

    interface PageProps {
    params: { slug: string };
    }

    export function generateStaticParams() {
    return cases.map((c) => ({ slug: c.slug }));
    }

    export function generateMetadata({ params }: PageProps): Metadata {
    const item = getCase(params.slug);
    if (!item) {
        return { title: 'Caso no encontrado | Digital Match Global' };
    }
    return {
        title: `${item.rubro.es} | Casos | Digital Match Global`,
        description: item.solution.es,
    };
    }

    export default function CasePage({ params }: PageProps) {
    const item = getCase(params.slug);
    if (!item) {
        notFound();
    }
    return <CaseDetailInteractive item={item} />;
    }
