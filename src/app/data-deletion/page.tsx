    'use client';

    import React from 'react';
    import Link from 'next/link';
    import { useLanguage } from '@/contexts/LanguageContext';

    export default function DataDeletionPage() {
    const { language } = useLanguage();

    return (
        <main className="min-h-screen bg-background py-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
            <Link href="/" className="text-accent hover:underline text-sm font-semibold">
                {language === 'es' ? '← Volver al inicio' : '← Back to Home'}
            </Link>
            </div>
            
            <article className="prose prose-invert max-w-none">
            {/* ================= ESPAÑOL ================= */}
            {language === 'es' && (
                <>
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
                </>
            )}

            {/* ================= ENGLISH ================= */}
            {language === 'en' && (
                <>
                <h1 className="text-3xl font-bold text-foreground mb-2">User Data Deletion</h1>
                <p className="text-muted-foreground text-sm mb-8">Last Updated: 12/02/2025</p>

                <div className="space-y-6 text-muted-foreground">
                    <p>
                    At <strong>Digital Match Global</strong>, we respect your right to request the deletion of your personal data. This page describes how you can do so regarding our services, including our automation Platform and integrations with the official WhatsApp Business API.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">1. Who Can Request Data Deletion?</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>End users who have interacted with companies using our Platform.</li>
                    <li>Clients (companies) wishing to close their account and delete data associated with the service.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">2. Information Needed to Process Your Request</h3>
                    <p>To correctly locate data and execute the deletion securely, we will need you to send us:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Full Name.</li>
                    <li>Email address and/or phone number used in communications.</li>
                    <li>Name of the company you communicated with (if applicable).</li>
                    <li>Brief description of the interaction (e.g., channel used, approximate dates).</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">3. How to Request Deletion of Your Data</h3>
                    <p>
                    Send an email to: <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a> with the subject <strong>"Data Deletion Request"</strong> and include the information indicated above.
                    </p>
                    <p>
                    You can also contact the company you communicated with (our Client), who can forward the request to us if applicable.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">4. What Happens When We Delete Your Data</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>We will delete or anonymize identifiable personal data stored in our main database (e.g., conversation logs, contact information, and associated metadata), provided there is no legal obligation to retain it.</li>
                    <li>The deletion will apply to systems we directly control (e.g., our database in Supabase and reasonable operational logs).</li>
                    <li>In the case of integrations with third parties (Meta, cloud providers, etc.), we will make reasonable efforts to reflect the deletion in such systems, to the extent permitted by their policies and APIs.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">5. Response Times</h3>
                    <p>
                    We will endeavor to respond to your request within a maximum period of <strong>30 business days</strong> from receipt. In complex cases or high volume, this period may be extended, but we will inform you of the status of your request.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">6. Legal Limitations</h3>
                    <p>In some cases, we may not be able to delete certain data immediately if:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>We must retain it for legal, accounting, or auditing obligations.</li>
                    <li>There are disputes, fraud, or open investigations related to that data.</li>
                    </ul>
                    <p>
                    In such cases, we will restrict access to the information and retain it only for the strictly necessary time.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">7. More Information</h3>
                    <p>
                    For more details on how we treat your personal data, please consult our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
                    </p>
                </div>
                </>
            )}
            </article>
        </div>
        </main>
    );
    }