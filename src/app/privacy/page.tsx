    import React from 'react';
    import Link from 'next/link';

    export const metadata = {
    title: 'Política de Privacidad | Digital Match Global',
    description: 'Política de privacidad y protección de datos de Digital Match Global.',
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
                En <strong>Digital Match Global</strong> (“DigitalMatch”, “nosotros” o “la empresa”) valoramos y protegemos la privacidad de nuestros clientes y de los usuarios finales que interactúan a través de nuestras soluciones de automatización conversacional, incluyendo nuestra plataforma de gestión de WhatsApp Business y otros canales digitales.
                </p>
                <p>
                Esta política explica cómo recopilamos, usamos, almacenamos y protegemos los datos personales, en cumplimiento de la normativa aplicable en Uruguay y de buenas prácticas internacionales de privacidad (incluyendo principios alineados con el Reglamento General de Protección de Datos de la Unión Europea – GDPR).
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">1. Responsable y ámbito de aplicación</h3>
                <ul className="list-disc pl-5 space-y-2">
                <li><strong>Responsable del tratamiento:</strong> Digital Match Global – Gonzalo Andrés Ramos (empresa unipersonal).</li>
                <li><strong>Domicilio:</strong> Montevideo, Uruguay.</li>
                <li><strong>Correo de contacto:</strong> <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a></li>
                </ul>
                <p className="mt-4">Esta política aplica a:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>El sitio web digitalmatchglobal.com y sus subdominios (por ejemplo: matchbot.digitalmatchglobal.com).</li>
                <li>Nuestra plataforma SaaS de automatización conversacional y gestión de canales (incluyendo la integración con la API oficial de WhatsApp Business de Meta).</li>
                <li>Cualquier comunicación, formulario o canal de soporte que ofrezcamos (correo, WhatsApp, etc.).</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">2. Rol de Digital Match Global</h3>
                <ul className="list-disc pl-5 space-y-2">
                <li><strong>Responsable de datos de clientes (B2B):</strong> somos responsables de los datos de contacto, acceso y facturación de las empresas que contratan nuestros servicios.</li>
                <li><strong>Encargado del tratamiento de datos de usuarios finales:</strong> cuando nuestros clientes usan nuestra plataforma para comunicarse con sus propios usuarios (por ejemplo, vía WhatsApp), procesamos dichos mensajes y metadatos únicamente en nombre de nuestros clientes y siguiendo sus instrucciones.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">3. Datos que recopilamos</h3>
                
                <h4 className="text-lg font-bold text-foreground mt-4">3.1 Datos de cuenta y contacto de clientes</h4>
                <ul className="list-disc pl-5 space-y-2">
                <li>Nombre y apellidos.</li>
                <li>Correo electrónico profesional.</li>
                <li>Teléfono de contacto.</li>
                <li>Nombre de la empresa y rol/cargo.</li>
                <li>Datos de facturación (si corresponde).</li>
                </ul>

                <h4 className="text-lg font-bold text-foreground mt-4">3.2 Datos operativos de la plataforma</h4>
                <p>Al utilizar nuestra integración con la API oficial de WhatsApp Business u otros canales, se pueden procesar:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Mensajes enviados y recibidos (texto, contenido multimedia y metadatos necesarios para el envío y entrega).</li>
                <li>Identificadores técnicos (por ejemplo: ID de conversación, número de teléfono, ID de plantilla).</li>
                <li>Estados de entrega, lectura, etiquetas de conversación y asignación de agentes.</li>
                </ul>
                <p>No utilizamos estos datos para publicidad ni para crear perfiles comerciales ajenos al servicio contratado.</p>

                <h4 className="text-lg font-bold text-foreground mt-4">3.3 Datos técnicos y de uso</h4>
                <ul className="list-disc pl-5 space-y-2">
                <li>Dirección IP, navegador, sistema operativo y tipo de dispositivo.</li>
                <li>Fechas y horas de acceso, páginas visitadas y acciones realizadas en la plataforma.</li>
                <li>Registros de errores y logs técnicos necesarios para la seguridad y mantenimiento del servicio.</li>
                </ul>

                <h4 className="text-lg font-bold text-foreground mt-4">3.4 Cookies y tecnologías similares</h4>
                <p>Podemos utilizar cookies propias y de terceros para:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Recordar preferencias de navegación.</li>
                <li>Medir el tráfico y uso del sitio.</li>
                <li>Mejorar el rendimiento y la seguridad.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">4. Finalidades del tratamiento</h3>
                <p>Tratamos los datos personales para las siguientes finalidades:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Prestar y mantener el funcionamiento de nuestra plataforma y servicios.</li>
                <li>Configurar y gestionar la integración con la API de WhatsApp Business y otros proveedores.</li>
                <li>Brindar soporte técnico y atención al cliente.</li>
                <li>Enviar comunicaciones relacionadas con el servicio (alertas, cambios, mejoras, avisos legales).</li>
                <li>Mejorar la seguridad, estabilidad y experiencia de uso de la plataforma.</li>
                <li>Cumplir obligaciones legales y responder a requerimientos de autoridades competentes.</li>
                <li>Enviar comunicaciones comerciales solo cuando exista consentimiento o una relación comercial previa permitida por la ley.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">5. Base legal</h3>
                <ul className="list-disc pl-5 space-y-2">
                <li><strong>Ejecución de un contrato:</strong> cuando tratamos datos para prestar el servicio que el cliente contrató.</li>
                <li><strong>Consentimiento:</strong> por ejemplo, suscripción voluntaria a newsletters o descargas de material.</li>
                <li><strong>Interés legítimo:</strong> prevención de fraude, mejora de seguridad, estadísticas internas.</li>
                <li><strong>Cumplimiento legal:</strong> conservación de cierta información de facturación o registros exigidos por la normativa.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">6. Proveedores y transferencias de datos</h3>
                <p>Para operar nuestra plataforma utilizamos proveedores de infraestructura tecnológica que actúan como encargados del tratamiento, por ejemplo:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li><strong>Vercel Inc.</strong> – Hosting y despliegue de aplicaciones.</li>
                <li><strong>Supabase, Inc.</strong> – Base de datos, autenticación y servicios backend.</li>
                <li>Otros servicios de nube y correo electrónico equivalentes, utilizados siempre bajo acuerdos de confidencialidad y protección de datos.</li>
                </ul>
                <p>Estos proveedores pueden estar ubicados en otros países. En esos casos procuramos que existan mecanismos adecuados de protección (cláusulas contractuales, certificaciones de seguridad, etc.).</p>

                <h3 className="text-xl font-bold text-foreground mt-8">7. Conservación de los datos</h3>
                <ul className="list-disc pl-5 space-y-2">
                <li><strong>Datos de cuenta de clientes:</strong> se conservan mientras la cuenta esté activa y por un periodo adicional razonable para cumplir obligaciones legales o resolver posibles disputas.</li>
                <li><strong>Datos operativos (mensajes y registros de conversaciones):</strong> se conservan mientras el cliente mantenga activo el servicio o según los parámetros configurados en la plataforma. Luego pueden ser eliminados o anonimizados.</li>
                <li><strong>Logs técnicos y de seguridad:</strong> se conservan por el tiempo necesario para fines de seguridad, auditoría y mantenimiento.</li>
                </ul>

                <h3 className="text-xl font-bold text-foreground mt-8">8. Derechos de las personas</h3>
                <p>Según la normativa aplicable, las personas cuyos datos tratamos pueden tener derecho a:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Acceder a sus datos personales.</li>
                <li>Solicitar la rectificación de datos inexactos o incompletos.</li>
                <li>Solicitar la eliminación de sus datos (“derecho al olvido”), cuando sea legalmente posible.</li>
                <li>Oponerse o solicitar la limitación de determinados tratamientos.</li>
                <li>Solicitar la portabilidad de los datos, cuando corresponda.</li>
                </ul>
                <p>
                Para ejercer estos derechos, pueden escribirnos a <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a>. Si actuamos como encargados de tratamiento para un cliente, es posible que derivemos la solicitud a dicho cliente, que es el responsable final frente al usuario.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">9. Seguridad de la información</h3>
                <p>Implementamos medidas técnicas y organizativas razonables para proteger los datos personales, tales como:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Cifrado mediante HTTPS (TLS) en tránsito.</li>
                <li>Controles de acceso basados en usuarios y roles.</li>
                <li>Registros de actividad y monitoreo básico de seguridad.</li>
                <li>Buenas prácticas de desarrollo y gestión de claves.</li>
                </ul>
                <p>Ningún sistema es 100% inmune, pero trabajamos para reducir los riesgos y actuar de forma diligente ante cualquier incidente.</p>

                <h3 className="text-xl font-bold text-foreground mt-8">10. Uso de APIs de Meta (Facebook / WhatsApp)</h3>
                <p>Nuestra plataforma se integra con la API oficial de WhatsApp Business proporcionada por Meta. El uso de esta integración se limita a:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li>Enviar y recibir mensajes en nombre de nuestros clientes, de acuerdo con las políticas de WhatsApp Business y de Meta.</li>
                <li>Gestionar plantillas de mensajes, números de teléfono y otros activos necesarios para la operación del canal.</li>
                </ul>
                <p>No vendemos, cedemos ni reutilizamos los datos de Meta para finalidades ajenas al servicio contratado.</p>

                <h3 className="text-xl font-bold text-foreground mt-8">11. Eliminación de datos de usuario</h3>
                <p>
                Las instrucciones específicas para solicitar la eliminación de datos están disponibles en: <Link href="/data-deletion" className="text-accent hover:underline">/data-deletion</Link>.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">12. Cambios en esta política</h3>
                <p>
                Podemos actualizar esta Política de Privacidad cuando sea necesario para reflejar cambios legales, técnicos o de negocio. Publicaremos la versión actualizada en esta misma URL e indicaremos la fecha de última actualización.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8">13. Contacto</h3>
                <p>Si tienes dudas sobre esta Política de Privacidad o sobre el tratamiento de tus datos, puedes contactarnos en:</p>
                <ul className="list-disc pl-5 space-y-2">
                <li><strong>Correo:</strong> <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a></li>
                <li><strong>Ubicación:</strong> Montevideo, Uruguay.</li>
                </ul>
            </div>
            </article>
        </div>
        </main>
    );
    }