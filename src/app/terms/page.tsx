    import React from 'react';
    import Link from 'next/link';

    export const metadata = {
    title: 'Términos y Condiciones | Digital Match Global',
    description: 'Términos y condiciones de uso de los servicios de Digital Match Global.',
    };

    export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background py-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
            <Link href="/" className="text-accent hover:underline text-sm font-semibold">
                ← Volver al inicio
            </Link>
            </div>
            
            <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-foreground mb-2">Términos y Condiciones de Uso</h1>
            <p className="text-muted-foreground text-sm mb-8">Última actualización: 02/12/2025</p>

            <div className="space-y-6 text-muted-foreground">
                <p>
                Estos Términos y Condiciones (“Términos”) regulan el uso del sitio web y de los servicios ofrecidos por 
                <strong> Digital Match Global</strong>, incluyendo su plataforma de automatización y gestión de canales de mensajería (en adelante, la “Plataforma”).
                </p>
                <p>
                Al registrarte, acceder o utilizar nuestros servicios, declaras que has leído y aceptas estos Términos y nuestra Política de Privacidad. Si no estás de acuerdo, no debes usar la Plataforma.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">1. Definiciones</h3>
                <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cliente:</strong> empresa o profesional que contrata y utiliza la Plataforma.</li>
                <li><strong>Usuario autorizado:</strong> persona que usa la Plataforma en nombre del Cliente (por ejemplo, agentes, administradores).</li>
                <li><strong>Usuarios finales:</strong> personas que interactúan con el Cliente a través de canales como WhatsApp u otros medios integrados.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">2. Objeto del servicio</h3>
                <p>
                Digital Match Global ofrece una Plataforma SaaS para gestionar conversaciones, automatizar flujos y operar canales como WhatsApp Business a través de integraciones oficiales (por ejemplo, la API de Meta).
                </p>
                <p>
                No somos Meta, WhatsApp ni un sustituto de dichos servicios. El uso de la Plataforma no exime al Cliente de cumplir con las políticas de Meta/WhatsApp y con las leyes aplicables.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">3. Cuenta del cliente</h3>
                <ul className="list-disc pl-5 space-y-2">
                <li>El Cliente debe proporcionar información veraz y mantenerla actualizada.</li>
                <li>El Cliente es responsable de la confidencialidad de sus credenciales y del uso que hagan sus usuarios autorizados.</li>
                <li>El Cliente debe notificar de inmediato cualquier uso no autorizado de su cuenta.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">4. Uso permitido y prohibido</h3>
                <p>El Cliente se compromete a utilizar la Plataforma únicamente para fines legítimos y de acuerdo con la ley. Queda estrictamente prohibido:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Enviar spam o mensajes masivos no autorizados.</li>
                <li>Realizar actividades fraudulentas, engañosas o ilícitas.</li>
                <li>Enviar contenido violento, discriminatorio, ilegal o que vulnere derechos de terceros.</li>
                <li>Utilizar la Plataforma para procesar datos sensibles sin contar con las bases legales adecuadas.</li>
                <li>Intentar vulnerar la seguridad, estabilidad o integridad de nuestros sistemas.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">5. Relación con proveedores externos</h3>
                <p>
                El uso de la integración con la API de WhatsApp Business está sujeto a las políticas de Meta. Determinadas conductas pueden ocasionar sanciones externas ajenas a Digital Match Global.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">6. Planes, pagos y cancelaciones</h3>
                <p>
                Las suscripciones son recurrentes (mensuales o anuales) y se renuevan automáticamente salvo cancelación. Digital Match Global puede suspender el acceso ante impago.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">7. Propiedad intelectual</h3>
                <p>
                El software y código fuente son propiedad de Digital Match Global. El Cliente mantiene todos los derechos sobre sus propios datos y contenido.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">8. Datos personales y privacidad</h3>
                <p>
                El Cliente se compromete a cumplir con la normativa de protección de datos aplicable y a informar a sus usuarios finales sobre el uso de Digital Match Global como proveedor.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">9. Disponibilidad y Responsabilidad</h3>
                <p>
                La Plataforma se ofrece “tal cual”. No garantizamos disponibilidad ininterrumpida por mantenimientos o causas de fuerza mayor. Nuestra responsabilidad se limita al importe pagado por el Cliente en los últimos 12 meses.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">10. Legislación y Contacto</h3>
                <p>
                Estos Términos se rigen por las leyes de la República Oriental del Uruguay. Para consultas: <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a>.
                </p>
            </div>
            </article>
        </div>
        </main>
    );
    }