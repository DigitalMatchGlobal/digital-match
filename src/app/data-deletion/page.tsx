    import React from 'react';
    import Link from 'next/link';

    export const metadata = {
    title: 'Eliminación de Datos de Usuario | Digital Match Global',
    description: 'Instrucciones y proceso para solicitar la eliminación de datos personales.',
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
                En <strong>Digital Match Global</strong> respetamos tu derecho a solicitar la eliminación de tus datos personales. Esta página describe cómo puedes hacerlo en relación con nuestros servicios, incluyendo nuestra Plataforma de automatización y las integraciones con la API oficial de WhatsApp Business.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">1. ¿Quién puede solicitar la eliminación de datos?</h3>
                <ul className="list-disc pl-5 space-y-2">
                <li>Usuarios finales que hayan interactuado con empresas que utilizan nuestra Plataforma.</li>
                <li>Clientes (empresas) que deseen cerrar su cuenta y eliminar datos asociados al servicio.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">2. Información necesaria para procesar tu solicitud</h3>
                <p>Para poder localizar correctamente los datos y ejecutar la eliminación de forma segura, necesitaremos que nos envíes:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Nombre completo.</li>
                <li>Correo electrónico y/o número de teléfono utilizado en las comunicaciones.</li>
                <li>Nombre de la empresa con la que te comunicaste (si aplica).</li>
                <li>Descripción breve de la interacción (por ejemplo: canal utilizado, fechas aproximadas).</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">3. Cómo solicitar la eliminación de tus datos</h3>
                <p>
                Envía un correo electrónico a: <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a> con el asunto <strong>“Solicitud de eliminación de datos”</strong> e incluye la información indicada en el punto anterior.
                </p>
                <p>
                También puedes contactar a la empresa con la que te comunicaste (nuestro Cliente), quien podrá derivar la solicitud hacia nosotros en caso de que corresponda.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">4. Qué ocurre cuando eliminamos tus datos</h3>
                <ul className="list-disc pl-5 space-y-2">
                <li>Eliminaremos o anonimizaremos los datos personales identificables almacenados en nuestra base de datos principal (por ejemplo, registros de conversaciones, información de contacto y metadatos asociados), siempre que no exista obligación legal de conservarlos.</li>
                <li>La eliminación se aplicará a los sistemas que controlamos directamente (por ejemplo, nuestra base de datos en Supabase y logs operativos razonables).</li>
                <li>En caso de integraciones con terceros (Meta, proveedores de nube, etc.), haremos los esfuerzos razonables para que la eliminación se refleje en dichos sistemas, en la medida en que lo permitan sus políticas y APIs.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">5. Plazos de respuesta</h3>
                <p>
                Procuraremos responder a tu solicitud en un plazo máximo de <strong>30 días hábiles</strong> desde su recepción. En casos complejos o de alta carga, este plazo podría extenderse, pero te informaremos del estado de tu solicitud.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">6. Limitaciones legales</h3>
                <p>En algunos casos, es posible que no podamos eliminar ciertos datos de forma inmediata si:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Debemos conservarlos por obligaciones legales, contables o de auditoría.</li>
                <li>Existen disputas, fraudes o investigaciones abiertas relacionados con esos datos.</li>
                </ul>
                <p>
                En esos supuestos, restringiremos el acceso a la información y la conservaremos solo durante el tiempo estrictamente necesario.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">7. Más información</h3>
                <p>
                Para más detalles sobre cómo tratamos tus datos personales, consulta nuestra <Link href="/privacy" className="text-accent hover:underline">Política de Privacidad</Link>.
                </p>
            </div>
            </article>
        </div>
        </main>
    );
    }