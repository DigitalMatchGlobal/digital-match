    'use client';

    import React from 'react';
    import Link from 'next/link';
    import { useLanguage } from '@/contexts/LanguageContext';

    export default function PrivacyPage() {
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
                </>
            )}

            {/* ================= ENGLISH ================= */}
            {language === 'en' && (
                <>
                <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
                <p className="text-muted-foreground text-sm mb-8">Last Updated: 12/02/2025</p>

                <div className="space-y-6 text-muted-foreground">
                    <p>
                    At <strong>Digital Match Global</strong> (“DigitalMatch”, “we” or “the company”), we value and protect the privacy of our clients and end users who interact through our conversational automation solutions, including our WhatsApp Business management platform and other digital channels.
                    </p>
                    <p>
                    This policy explains how we collect, use, store, and protect personal data, in compliance with applicable regulations in Uruguay and international privacy best practices (including principles aligned with the European Union General Data Protection Regulation – GDPR).
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">1. Responsible Party and Scope of Application</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Data Controller:</strong> Digital Match Global – Gonzalo Andrés Ramos (sole proprietorship).</li>
                    <li><strong>Address:</strong> Montevideo, Uruguay.</li>
                    <li><strong>Contact Email:</strong> <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a></li>
                    </ul>
                    <p className="mt-4">This policy applies to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>The website digitalmatchglobal.com and its subdomains (e.g., matchbot.digitalmatchglobal.com).</li>
                    <li>Our SaaS conversational automation and channel management platform (including integration with Meta's official WhatsApp Business API).</li>
                    <li>Any communication, form, or support channel we offer (email, WhatsApp, etc.).</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">2. Role of Digital Match Global</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Responsible for Client Data (B2B):</strong> We are responsible for the contact, access, and billing data of companies that contract our services.</li>
                    <li><strong>Data Processor for End Users:</strong> When our clients use our platform to communicate with their own users (e.g., via WhatsApp), we process such messages and metadata solely on behalf of our clients and following their instructions.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">3. Data We Collect</h3>
                    
                    <h4 className="text-lg font-bold text-foreground mt-4">3.1 Client Account and Contact Data</h4>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Full Name.</li>
                    <li>Professional email address.</li>
                    <li>Contact phone number.</li>
                    <li>Company name and role/position.</li>
                    <li>Billing data (if applicable).</li>
                    </ul>

                    <h4 className="text-lg font-bold text-foreground mt-4">3.2 Platform Operational Data</h4>
                    <p>When using our integration with the official WhatsApp Business API or other channels, the following may be processed:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Sent and received messages (text, multimedia content, and metadata necessary for sending and delivery).</li>
                    <li>Technical identifiers (e.g., conversation ID, phone number, template ID).</li>
                    <li>Delivery status, read receipts, conversation labels, and agent assignment.</li>
                    </ul>
                    <p>We do not use this data for advertising or to create commercial profiles unrelated to the contracted service.</p>

                    <h4 className="text-lg font-bold text-foreground mt-4">3.3 Technical and Usage Data</h4>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>IP address, browser, operating system, and device type.</li>
                    <li>Access dates and times, pages visited, and actions taken on the platform.</li>
                    <li>Error logs and technical logs necessary for security and service maintenance.</li>
                    </ul>

                    <h4 className="text-lg font-bold text-foreground mt-4">3.4 Cookies and Similar Technologies</h4>
                    <p>We may use first-party and third-party cookies to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Remember browsing preferences.</li>
                    <li>Measure site traffic and usage.</li>
                    <li>Improve performance and security.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">4. Purposes of Processing</h3>
                    <p>We process personal data for the following purposes:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Provide and maintain the operation of our platform and services.</li>
                    <li>Configure and manage integration with the WhatsApp Business API and other providers.</li>
                    <li>Provide technical support and customer service.</li>
                    <li>Send service-related communications (alerts, changes, improvements, legal notices).</li>
                    <li>Improve the security, stability, and user experience of the platform.</li>
                    <li>Comply with legal obligations and respond to requests from competent authorities.</li>
                    <li>Send commercial communications only when there is consent or a prior commercial relationship permitted by law.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">5. Legal Basis</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Contract Performance:</strong> When we process data to provide the service the client contracted.</li>
                    <li><strong>Consent:</strong> For example, voluntary subscription to newsletters or material downloads.</li>
                    <li><strong>Legitimate Interest:</strong> Fraud prevention, security improvement, internal statistics.</li>
                    <li><strong>Legal Compliance:</strong> Retention of certain billing information or records required by regulations.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">6. Providers and Data Transfers</h3>
                    <p>To operate our platform, we use technology infrastructure providers who act as data processors, for example:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Vercel Inc.</strong> – Hosting and application deployment.</li>
                    <li><strong>Supabase, Inc.</strong> – Database, authentication, and backend services.</li>
                    <li>Other equivalent cloud and email services, always used under confidentiality and data protection agreements.</li>
                    </ul>
                    <p>These providers may be located in other countries. In such cases, we strive to ensure adequate protection mechanisms exist (contractual clauses, security certifications, etc.).</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">7. Data Retention</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Client Account Data:</strong> Retained while the account is active and for a reasonable additional period to comply with legal obligations or resolve potential disputes.</li>
                    <li><strong>Operational Data (messages and conversation logs):</strong> Retained while the client keeps the service active or according to parameters configured in the platform. They may then be deleted or anonymized.</li>
                    <li><strong>Technical and Security Logs:</strong> Retained for the time necessary for security, auditing, and maintenance purposes.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">8. Rights of Individuals</h3>
                    <p>According to applicable regulations, individuals whose data we process may have the right to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Access their personal data.</li>
                    <li>Request rectification of inaccurate or incomplete data.</li>
                    <li>Request deletion of their data (“right to be forgotten”), where legally possible.</li>
                    <li>Object to or request limitation of certain processing.</li>
                    <li>Request data portability, where applicable.</li>
                    </ul>
                    <p>
                    To exercise these rights, you can write to us at <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a>. If we act as a data processor for a client, we may forward the request to that client, who is ultimately responsible to the user.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">9. Information Security</h3>
                    <p>We implement reasonable technical and organizational measures to protect personal data, such as:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Encryption via HTTPS (TLS) in transit.</li>
                    <li>Access controls based on users and roles.</li>
                    <li>Activity logs and basic security monitoring.</li>
                    <li>Development and key management best practices.</li>
                    </ul>
                    <p>No system is 100% immune, but we work to reduce risks and act diligently in the event of any incident.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">10. Use of Meta APIs (Facebook / WhatsApp)</h3>
                    <p>Our platform integrates with the official WhatsApp Business API provided by Meta. Use of this integration is limited to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Sending and receiving messages on behalf of our clients, in accordance with WhatsApp Business and Meta policies.</li>
                    <li>Managing message templates, phone numbers, and other assets necessary for channel operation.</li>
                    </ul>
                    <p>We do not sell, transfer, or reuse Meta data for purposes unrelated to the contracted service.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">11. User Data Deletion</h3>
                    <p>
                    Specific instructions for requesting data deletion are available at: <Link href="/data-deletion" className="text-accent hover:underline">/data-deletion</Link>.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">12. Changes to this Policy</h3>
                    <p>
                    We may update this Privacy Policy when necessary to reflect legal, technical, or business changes. We will publish the updated version at this same URL and indicate the last update date.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">13. Contact</h3>
                    <p>If you have questions about this Privacy Policy or how your data is processed, you can contact us at:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Email:</strong> <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a></li>
                    <li><strong>Location:</strong> Montevideo, Uruguay.</li>
                    </ul>
                </div>
                </>
            )}
            </article>
        </div>
        </main>
    );
    }