    import React from 'react';
    import Link from 'next/link';

    export const metadata = {
    title: 'Solicitud de Eliminación de Datos | Digital Match Global',
    description: 'Instrucciones para solicitar el borrado de tus datos personales.',
    };

    export default function DataDeletionPage() {
    return (
        <main className="min-h-screen bg-background py-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
            <Link href="/" className="text-accent hover:underline text-sm font-semibold">
                ← Volver al inicio
            </Link>
            </div>
            
            <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-foreground mb-2">Eliminación de Datos de Usuario</h1>
            <p className="text-muted-foreground text-sm mb-8">Última actualización: 02/12/2025</p>

            <div className="space-y-6 text-muted-foreground">
                <p>
                En Digital Match Global respetamos tu derecho a solicitar la eliminación de tus datos personales (“Derecho al olvido”).
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">1. Cómo solicitar la eliminación</h3>
                <p>
                Envía un correo electrónico a: <a href="mailto:info@digitalmatchglobal.com" className="text-accent font-bold">info@digitalmatchglobal.com</a>
                </p>
                <p><strong>Asunto:</strong> "Solicitud de eliminación de datos"</p>
                <p><strong>Incluye en el mensaje:</strong></p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Nombre completo.</li>
                <li>Correo electrónico y/o teléfono asociado a la cuenta o interacción.</li>
                <li>Nombre de la empresa con la que interactuaste (si eres usuario final).</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">2. Proceso de eliminación</h3>
                <p>
                Una vez recibida la solicitud válida, procederemos a eliminar o anonimizar tus datos personales de nuestros sistemas (bases de datos y logs operativos) en un plazo máximo de 30 días hábiles.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">3. Excepciones</h3>
                <p>
                Es posible que debamos conservar ciertos datos si existe una obligación legal (fiscal, contable) o para la defensa ante reclamaciones legales. En estos casos, los datos se bloquearán y solo se usarán para dichos fines.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">4. Datos en terceros</h3>
                <p>
                Haremos los esfuerzos razonables para comunicar tu solicitud a nuestros proveedores (como Meta o servicios de nube) para que también procedan a la eliminación, en la medida que sus sistemas lo permitan.
                </p>
            </div>
            </article>
        </div>
        </main>
    );
    }