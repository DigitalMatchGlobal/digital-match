    import React from 'react';
    import Link from 'next/link';

    export const metadata = {
    title: 'Política de Privacidad | Digital Match Global',
    description: 'Cómo recopilamos, usamos y protegemos tus datos personales.',
    };

    export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background py-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
            <Link href="/" className="text-accent hover:underline text-sm font-semibold">
                ← Volver al inicio
            </Link>
            </div>
            
            <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-foreground mb-2">Política de Privacidad</h1>
            <p className="text-muted-foreground text-sm mb-8">Última actualización: 02/12/2025</p>

            <div className="space-y-6 text-muted-foreground">
                <p>
                En Digital Match Global valoramos y protegemos la privacidad de nuestros clientes y de los usuarios finales. 
                Esta política explica cómo tratamos los datos personales en cumplimiento de la normativa de Uruguay y buenas prácticas internacionales (GDPR).
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">1. Responsable del tratamiento</h3>
                <p>
                <strong>Digital Match Global</strong> (Gonzalo Andrés Ramos).<br/>
                Domicilio: Montevideo, Uruguay.<br/>
                Contacto: <a href="mailto:info@digitalmatchglobal.com" className="text-accent">info@digitalmatchglobal.com</a>
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">2. Datos que recopilamos</h3>
                <ul className="list-disc pl-5 space-y-2">
                <li><strong>Datos de Clientes:</strong> Nombre, email profesional, teléfono, empresa y datos de facturación.</li>
                <li><strong>Datos Operativos:</strong> Mensajes enviados/recibidos, identificadores técnicos (ID de conversación, teléfono) necesarios para operar WhatsApp Business API.</li>
                <li><strong>Datos Técnicos:</strong> Dirección IP, navegador, logs de seguridad y uso de la plataforma.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">3. Cookies</h3>
                <p>
                Utilizamos cookies propias y de terceros para recordar preferencias, medir tráfico y mejorar la seguridad. No utilizamos estos datos para crear perfiles comerciales ajenos al servicio.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">4. Finalidad del tratamiento</h3>
                <p>
                Tratamos los datos para prestar el servicio SaaS, brindar soporte, mejorar la seguridad y cumplir obligaciones legales. Solo enviamos comunicaciones comerciales con consentimiento.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">5. Compartición de datos</h3>
                <p>
                Utilizamos proveedores tecnológicos seguros (ej. Vercel, Supabase) que actúan como encargados de tratamiento bajo acuerdos de confidencialidad. No vendemos datos a terceros.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">6. Derechos de las personas</h3>
                <p>
                Tienes derecho a acceder, rectificar, eliminar y oponerte al tratamiento de tus datos. Para ejercerlos, escribe a <a href="mailto:info@digitalmatchglobal.com" className="text-accent">info@digitalmatchglobal.com</a>.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">7. Seguridad</h3>
                <p>
                Implementamos cifrado HTTPS (TLS), controles de acceso y monitoreo de seguridad para proteger la información.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">8. Integración con Meta</h3>
                <p>
                El uso de la API de WhatsApp Business se limita a enviar/recibir mensajes en nombre de nuestros clientes. No reutilizamos datos de Meta para otros fines.
                </p>
            </div>
            </article>
        </div>
        </main>
    );
    }