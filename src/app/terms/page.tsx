        'use client';

    import React from 'react';
    import Link from 'next/link';
    import { useLanguage } from '@/contexts/LanguageContext';

    export default function TermsPage() {
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Términos y Condiciones de Uso</h1>
                <p className="text-muted-foreground text-sm mb-8">Última actualización: 02/12/2025</p>

                <div className="space-y-6 text-muted-foreground">
                    <p>
                    Estos Términos y Condiciones (“Términos”) regulan el uso del sitio web y de los servicios ofrecidos por <strong>Digital Match Global</strong>, incluyendo su plataforma de automatización y gestión de canales de mensajería (en adelante, la “Plataforma”).
                    </p>
                    <p>
                    Al registrarte, acceder o utilizar nuestros servicios, declaras que has leído y aceptas estos Términos y nuestra <Link href="/privacy" className="text-accent hover:underline">Política de Privacidad</Link>. Si no estás de acuerdo, no debes usar la Plataforma.
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
                    <p>El Cliente se compromete a utilizar la Plataforma únicamente para fines legítimos y de acuerdo con la ley.</p>
                    <p>Queda estrictamente prohibido:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Enviar spam o mensajes masivos no autorizados.</li>
                    <li>Realizar actividades fraudulentas, engañosas o ilícitas.</li>
                    <li>Enviar contenido violento, discriminatorio, ilegal o que vulnere derechos de terceros.</li>
                    <li>Utilizar la Plataforma para procesar datos sensibles (salud, financieros, menores, etc.) sin contar con las bases legales y medidas adecuadas.</li>
                    <li>Intentar vulnerar la seguridad, estabilidad o integridad de nuestros sistemas o de terceros.</li>
                    </ul>
                    <p>El incumplimiento de estas reglas puede dar lugar a la suspensión o cancelación de la cuenta, sin derecho a reembolso.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">5. Relación con proveedores externos (Meta / WhatsApp y otros)</h3>
                    <p>El uso de la integración con la API de WhatsApp Business está sujeto a las políticas de Meta y de WhatsApp. Determinadas conductas (por ejemplo, spam, uso abusivo de plantillas) pueden ocasionar sanciones externas ajenas a Digital Match Global.</p>
                    <p>El Cliente reconoce que incidencias o decisiones tomadas por proveedores externos (Meta, operadores de telecomunicaciones, servicios de nube, etc.) pueden afectar el funcionamiento de la Plataforma y no siempre están bajo nuestro control.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">6. Planes, pagos y cancelaciones</h3>
                    <p>En caso de ofrecer planes de suscripción o servicios de pago:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Los precios, características y condiciones se detallarán en nuestras propuestas comerciales o en el sitio web.</li>
                    <li>Salvo que se indique lo contrario, las suscripciones son recurrentes (mensuales o anuales) y se renuevan automáticamente hasta que el Cliente las cancele.</li>
                    <li>Digital Match Global puede suspender el acceso ante impago o incumplimiento grave.</li>
                    <li>Las políticas de reembolso, si las hubiera, se especificarán en las condiciones comerciales particulares.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">7. Propiedad intelectual</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>El software, código fuente, diseños y demás elementos de la Plataforma son propiedad de Digital Match Global o de sus licenciantes.</li>
                    <li>El Cliente mantiene todos los derechos sobre sus propios datos, marcas y contenido que suba o genere a través de la Plataforma.</li>
                    <li>Se prohíbe copiar, modificar, descompilar o crear obras derivadas de la Plataforma sin autorización expresa.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">8. Datos personales y privacidad</h3>
                    <p>El uso de la Plataforma implica el tratamiento de datos personales. El Cliente se compromete a:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Cumplir con la normativa de protección de datos aplicable a sus operaciones.</li>
                    <li>Informar adecuadamente a sus usuarios finales sobre el uso de Digital Match Global como proveedor.</li>
                    <li>Respetar los derechos de las personas (acceso, rectificación, eliminación, etc.).</li>
                    </ul>
                    <p>Más detalles en nuestra <Link href="/privacy" className="text-accent hover:underline">Política de Privacidad</Link>.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">9. Disponibilidad del servicio</h3>
                    <p>Trabajamos para que la Plataforma esté disponible de forma estable y segura, pero no podemos garantizar disponibilidad ininterrumpida. Mantenimientos programados, incidencias técnicas o problemas de terceros pueden generar interrupciones.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">10. Limitación de responsabilidad</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>La Plataforma se ofrece “tal cual” y “según disponibilidad”.</li>
                    <li>En la medida permitida por la ley, Digital Match Global no será responsable por daños indirectos, pérdida de beneficios, datos o reputación.</li>
                    <li>Salvo dolo o culpa grave, la responsabilidad total acumulada de Digital Match Global frente al Cliente se limitará, como máximo, al importe efectivamente pagado por el Cliente en los últimos 12 meses por los servicios en cuestión.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">11. Suspensión y terminación</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>El Cliente puede solicitar la baja del servicio conforme a los plazos y condiciones comerciales acordadas.</li>
                    <li>Digital Match Global podrá suspender o dar por terminado el acceso ante uso abusivo, violación grave de estos Términos o de la ley.</li>
                    <li>En caso de terminación, procuraremos que el Cliente pueda exportar sus datos dentro de un plazo razonable, salvo obligación legal en contrario.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">12. Modificaciones de los Términos</h3>
                    <p>Podemos actualizar estos Términos cuando sea necesario. Publicaremos la versión actualizada en esta misma URL e, en caso de cambios relevantes, podremos comunicarlo por correo o dentro de la Plataforma. El uso continuado del servicio tras la publicación de cambios implica la aceptación de los nuevos Términos.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">13. Legislación aplicable y jurisdicción</h3>
                    <p>Estos Términos se rigen por las leyes de la República Oriental del Uruguay. Cualquier controversia será sometida a los tribunales competentes de Montevideo, salvo que la ley disponga otra cosa.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">14. Contacto</h3>
                    <p>Para consultas relacionadas con estos Términos, puedes escribirnos a: <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a>.</p>
                </div>
                </>
            )}

            {/* ================= ENGLISH ================= */}
            {language === 'en' && (
                <>
                <h1 className="text-3xl font-bold text-foreground mb-2">Terms and Conditions of Use</h1>
                <p className="text-muted-foreground text-sm mb-8">Last Updated: 12/02/2025</p>

                <div className="space-y-6 text-muted-foreground">
                    <p>
                    These Terms and Conditions ("Terms") govern the use of the website and services offered by <strong>Digital Match Global</strong>, including its automation platform and messaging channel management (hereinafter, the "Platform").
                    </p>
                    <p>
                    By registering, accessing, or using our services, you declare that you have read and accept these Terms and our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>. If you do not agree, you must not use the Platform.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">1. Definitions</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Client:</strong> The company or professional that contracts and uses the Platform.</li>
                    <li><strong>Authorized User:</strong> A person who uses the Platform on behalf of the Client (e.g., agents, administrators).</li>
                    <li><strong>End Users:</strong> People who interact with the Client through channels such as WhatsApp or other integrated media.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">2. Object of the Service</h3>
                    <p>
                    Digital Match Global offers a SaaS Platform to manage conversations, automate flows, and operate channels such as WhatsApp Business through official integrations (e.g., the Meta API).
                    </p>
                    <p>
                    We are not Meta, WhatsApp, nor a substitute for such services. Using the Platform does not exempt the Client from complying with Meta/WhatsApp policies and applicable laws.
                    </p>

                    <h3 className="text-xl font-bold text-foreground mt-8">3. Client Account</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>The Client must provide truthful information and keep it updated.</li>
                    <li>The Client is responsible for the confidentiality of their credentials and their use by authorized users.</li>
                    <li>The Client must immediately notify us of any unauthorized use of their account.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">4. Permitted and Prohibited Use</h3>
                    <p>The Client agrees to use the Platform only for legitimate purposes and in accordance with the law.</p>
                    <p>The following are strictly prohibited:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Sending spam or unauthorized mass messages.</li>
                    <li>Engaging in fraudulent, deceptive, or illicit activities.</li>
                    <li>Sending violent, discriminatory, illegal content, or content that infringes on third-party rights.</li>
                    <li>Using the Platform to process sensitive data (health, financial, minors, etc.) without appropriate legal bases and measures.</li>
                    <li>Attempting to breach the security, stability, or integrity of our systems or third parties.</li>
                    </ul>
                    <p>Failure to comply with these rules may result in the suspension or cancellation of the account, without the right to a refund.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">5. Relationship with External Providers (Meta / WhatsApp and others)</h3>
                    <p>Use of the WhatsApp Business API integration is subject to Meta and WhatsApp policies. Certain behaviors (e.g., spam, abusive use of templates) may result in external sanctions outside of Digital Match Global's control.</p>
                    <p>The Client acknowledges that incidents or decisions made by external providers (Meta, telecommunications operators, cloud services, etc.) may affect the operation of the Platform and are not always under our control.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">6. Plans, Payments, and Cancellations</h3>
                    <p>In the case of offering subscription plans or paid services:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Prices, features, and conditions will be detailed in our commercial proposals or on the website.</li>
                    <li>Unless otherwise indicated, subscriptions are recurring (monthly or annual) and renew automatically until the Client cancels them.</li>
                    <li>Digital Match Global may suspend access in case of non-payment or serious breach.</li>
                    <li>Refund policies, if any, will be specified in the particular commercial conditions.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">7. Intellectual Property</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>The software, source code, designs, and other elements of the Platform are the property of Digital Match Global or its licensors.</li>
                    <li>The Client retains all rights to their own data, trademarks, and content uploaded or generated through the Platform.</li>
                    <li>Copying, modifying, decompiling, or creating derivative works of the Platform without express authorization is prohibited.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">8. Personal Data and Privacy</h3>
                    <p>Using the Platform implies the processing of personal data. The Client commits to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>Comply with applicable data protection regulations for their operations.</li>
                    <li>Adequately inform their end users about the use of Digital Match Global as a provider.</li>
                    <li>Respect the rights of individuals (access, rectification, deletion, etc.).</li>
                    </ul>
                    <p>More details in our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">9. Service Availability</h3>
                    <p>We work to ensure the Platform is available in a stable and secure manner, but we cannot guarantee uninterrupted availability. Scheduled maintenance, technical incidents, or third-party issues may generate interruptions.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">10. Limitation of Liability</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>The Platform is offered "as is" and "as available".</li>
                    <li>To the extent permitted by law, Digital Match Global shall not be liable for indirect damages, loss of profits, data, or reputation.</li>
                    <li>Except for willful misconduct or gross negligence, Digital Match Global's total accumulated liability to the Client shall be limited, at most, to the amount effectively paid by the Client in the last 12 months for the services in question.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">11. Suspension and Termination</h3>
                    <ul className="list-disc pl-5 space-y-2">
                    <li>The Client may request service cancellation according to the agreed terms and commercial conditions.</li>
                    <li>Digital Match Global may suspend or terminate access for abusive use, serious violation of these Terms, or the law.</li>
                    <li>In the event of termination, we will endeavor to allow the Client to export their data within a reasonable timeframe, unless legally obliged otherwise.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-foreground mt-8">12. Modifications to the Terms</h3>
                    <p>We may update these Terms when necessary. We will publish the updated version at this same URL, and in case of relevant changes, we may communicate it by mail or within the Platform. Continued use of the service after the publication of changes implies acceptance of the new Terms.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">13. Applicable Law and Jurisdiction</h3>
                    <p>These Terms are governed by the laws of the Eastern Republic of Uruguay. Any controversy shall be submitted to the competent courts of Montevideo, unless the law provides otherwise.</p>

                    <h3 className="text-xl font-bold text-foreground mt-8">14. Contact</h3>
                    <p>For inquiries related to these Terms, you can write to us at: <a href="mailto:info@digitalmatchglobal.com" className="text-accent hover:underline">info@digitalmatchglobal.com</a>.</p>
                </div>
                </>
            )}
            </article>
        </div>
        </main>
    );
    }