    'use client';

    import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

    type Language = 'es' | 'en';

    interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    }

    const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

    const translations = {
    es: {
        // ... MANTENER TODO LO ANTERIOR (nav, etc) ...
        'nav.services': 'Servicios',
        'nav.about': 'Nosotros',
        'nav.solutions': 'Soluciones',
        'nav.cases': 'Casos',
        'nav.process': 'Proceso',
        'nav.contact': 'Contacto',
        'nav.menu': 'Menú',
        'nav.book': 'Agendar una conversación',
        'nav.tooltips.services': 'Explora soluciones de automatización',
        // Botones flotantes. Van traducidos porque un `aria-label` es texto que el
        // usuario LEE (con lector de pantalla): estaban hardcodeados en inglés.
        // Mensaje con el que abre el botón flotante de WhatsApp. Antes abría el chat
        // VACÍO: ni el visitante sabía qué escribir ni nosotros de dónde venía.
        'wa.default': 'Hola, vengo del sitio web de Digital Match Global. Tengo una consulta.',
        'float.top': 'Volver arriba',
        'float.book': 'Agendar una conversación',
        'float.whatsapp': 'Escribinos por WhatsApp',
        'nav.tooltips.about': 'Conocé al equipo detrás',
        'nav.tooltips.solutions': 'Nuestras soluciones propias',
        'nav.tooltips.cases': 'Ver nuestros casos y proyectos',
        'nav.tooltips.process': 'Entender nuestra metodología',
        'nav.tooltips.contact': 'Agendar consulta',

        // --- PORTFOLIO / CASOS ---
        'portfolio.title': 'Casos y proyectos',
        'portfolio.subtitle': 'Una selección de trabajos reales por rubro. Cada proyecto, su propio desafío y su propia solución.',
        'portfolio.home.eyebrow': 'Casos',
        'portfolio.home.title': 'Así convertimos problemas operativos en soluciones digitales',
        'portfolio.home.subtitle': 'Selección de proyectos entregados para reducir trabajo manual, conectar herramientas y mejorar operaciones.',
        'portfolio.home.cta': 'Ver todos los casos',
        'portfolio.featured': 'Casos destacados',
        'portfolio.enterprise': 'Soluciones enterprise',
        'portfolio.enterprise.subtitle': 'Herramientas que construimos para resolver operaciones corporativas reales sobre stack Microsoft: primero entendemos y rediseñamos el proceso, después lo automatizamos. El mismo dolor se repite en cualquier organización que trabaje con Azure DevOps, SharePoint o SQL Server.',
        'portfolio.more': 'Más proyectos',
        'case.featured': 'Caso destacado',
        'case.enterprise': 'Enterprise',
        'case.eyebrow': 'Caso de éxito',
        'case.eyebrow.enterprise': 'Solución enterprise',
        'case.client': 'Cliente',
        'case.context': 'Contexto',
        'case.challenge': 'El desafío',
        'case.solution': 'La solución',
        'case.services': 'Servicios',
        'case.result': 'Resultado',
        'case.view': 'Ver caso',
        'case.back': 'Volver a los casos',
        'case.prev': 'Proyecto anterior',
        'case.next': 'Proyecto siguiente',
        'case.contact.eyebrow': 'Contacto',
        'case.contact.title': 'Trabajemos juntos',
        'case.contact.subtitle': 'Si llegaste hasta acá, escribinos y lo charlamos sin compromiso.',
        'case.contact.cta': 'Ponerse en contacto',

        // El hero pasó de titular+2 botones a una composición asimétrica (copy a la
        // izquierda, panel de "cómo entra un proceso" a la derecha). La bajada dejó de
        // ser un eslogan de una línea y ahora dice QUÉ hacemos: es lo primero que lee
        // alguien que no nos conoce.
        // VOZ INSTITUCIONAL. Digital Match Global es la marca PARAGUAS: habla como casa
        // ("construimos", "nuestros clientes"), no como producto que le habla al usuario
        // ("construí tu sistema"). Los productos —MatchBot y los que vengan— son los que
        // usan la voz directa en segunda persona. No mezclar los dos registros.
        // KICKER del hero. Reemplazó a 'hero.eyebrow', que era una lista con puntos
        // medios ("Automatización · IA · Desarrollo a medida") y no comunicaba nada que
        // el titular no dijera ya. Esto MUESTRA la transformación que vendemos.
        // 🚨 Los procesos que rotan salen de features REALES de `services.*` y del
        // placeholder de contacto. No agregar procesos que no hagamos.
        'hero.kicker.label': 'Proceso',
        'hero.kicker.p1': 'carga de facturas',
        'hero.kicker.p2': 'generación de reportes',
        'hero.kicker.p3': 'notificaciones y correos',
        'hero.kicker.p4': 'integración entre sistemas',
        'hero.kicker.p5': 'atención de consultas',
        'hero.kicker.result': 'Automatizado',
        // El titular le habla al LECTOR de su problema, no describe a la empresa: el
        // anterior ("...la operación de nuestros clientes") ponía al lector afuera,
        // mirando, y medía 5 líneas en móvil. Éste sale del patrón que más se repite en la
        // cartera real — un proceso que alguien hacía a mano convertido en sistema — y lo
        // continúa el subtítulo. 3 líneas en móvil (medido).
        // 🚨 Van en DOS claves porque el titular tiene jerarquía tonal: el arranque (el
        // problema de hoy) en grafito y el remate (el resultado) en tinta plena. El gris
        // → negro es la misma transición que la frase nombra; no es decoración. Partirlo
        // en render por la coma sería frágil entre idiomas.
        'hero.title.lead': 'Lo que hoy tu equipo hace a mano,',
        'hero.title.payoff': 'hecho sistema.',
        'hero.subtitle': 'Diagnosticamos dónde se pierde el tiempo y construimos el sistema que lo resuelve.',
        'hero.cta.book': 'Agendar una conversación',
        'hero.cta.work': 'Ver nuestro trabajo',
        // Chips: contestan las tres objeciones que aparecen siempre.

        // --- QUIÉNES SOMOS (anónimo, diferencial — NO servicios) ---
        'about.eyebrow': 'El equipo detrás de Digital Match Global',
        'about.title': 'Recuperá las horas que hoy se pierden en tareas manuales.',
        'about.subtitle': 'Ingeniería aplicada a tu día a día: automatizamos procesos, conectamos sistemas y construimos herramientas para que tu equipo trabaje con menos fricción.',
        'about.diff1.title': '+14 años',
        'about.diff1.desc': 'De experiencia en automatización, IA y desarrollo.',
        'about.diff2.title': 'Empresas y gobierno',
        'about.diff2.desc': 'Experiencia real en el sector privado y público.',
        'about.diff3.title': 'Seguridad y cumplimiento',
        'about.diff3.desc': 'Experiencia bajo ISO 9001 y compliance PCI-DSS en el tratamiento de datos.',
        'about.diff4.title': 'Certificados',
        'about.diff4.desc': 'En UiPath, Microsoft e IBM.',
        'about.tools_label': 'Stack tecnológico',
        'stack.subtitle': 'De la infraestructura al proceso automatizado: elegimos y sostenemos cada capa.',
        'stack.count': '{tools} tecnologías',
        'stack.top': 'Lo que el cliente usa',
        'stack.base': 'Lo que no se ve, y sostiene todo',
        'stack.rpa': 'Automatización / RPA',
        'stack.ai': 'IA & Datos',
        'stack.dev': 'Desarrollo',
        'stack.cloud': 'Cloud & Infraestructura',
        'stack.data': 'Bases de datos',
        'stack.integrations': 'Integraciones & APIs',

        'proof.m1.label': 'Años de Experiencia',
        'proof.m2.label': 'Procesos Automatizados',
        'proof.m3.label': 'Días del diagnóstico a la solución',
        'services.eyebrow': 'Qué hacemos',
        'services.main_title': 'Cuatro frentes para sacarle trabajo manual a tu operación.',
        'services.main_subtitle': 'Automatización, asistentes de IA, producto web y consultoría. Se combinan según lo que tu operación necesita, no según un paquete cerrado.',
        'services.cta_button': 'Ver caso de éxito',
        // --- Producto propio: MatchBot ---
        // --- SOLUCIONES (banda de cartera) ---
        // Digital Match Global es el paraguas: acá viven las soluciones propias, y
        // MatchBot es la primera. 🚨 NO inventar soluciones para "llenar" la banda:
        // si mañana hay una segunda, se agrega; hasta entonces la segunda celda es
        // una invitación explícita, no un producto fantasma.
        'solutions.eyebrow': 'Soluciones',
        'solutions.title': 'Además de construir a medida, desarrollamos soluciones propias.',
        // 🚨 Decía: "Cuando un problema se repite en muchos clientes, deja de ser un
        // proyecto y pasa a ser un producto". Describe, literalmente, convertir trabajo que
        // pagó un cliente en producto para vender a otro: se lee como que aprovechamos lo
        // que nos plantean y después lo monetizamos. Aunque no sea la intención, es lo que
        // dice la oración. Reescrita desde el BENEFICIO DEL LECTOR: no siempre hace falta
        // construir desde cero, y si la herramienta ya existe entra antes.
        'solutions.subtitle': 'No todo necesita construirse desde cero: cuando la herramienta ya existe, entra antes y cuesta menos. Estas son nuestras, así que las conocemos por dentro y las sostenemos nosotros.',
        'solutions.status.live': 'En producción',
        'solutions.matchbot.category': 'Automatización conversacional',
        'solutions.matchbot.desc': 'MatchBot es nuestra plataforma de bots de WhatsApp con IA: cada empresa conecta su propio número y automatiza sus conversaciones. Construida sobre nuestra integración oficial como Tech Provider de Meta.',
        'solutions.matchbot.cta': 'Conocé MatchBot',
        'solutions.next.title': '¿Tu problema no tiene herramienta?',
        'solutions.next.desc': 'La mayoría de lo que construimos empieza así: un proceso que ninguna herramienta del mercado resuelve como necesitás. Contanos cuál es el tuyo.',
        'solutions.next.cta': 'Plantearnos el caso',
        'services.auto.title': 'Automatización de Procesos (RPA)',
        'services.auto.headline': 'Elimina el 80% de tareas manuales',
        'services.auto.desc': 'Bots RPA que transforman flujos repetitivos en sistemas que trabajan 24/7, sin intervención humana (UiPath · Rocketbot · Power Automate).',
        'services.auto.f1': 'Bots RPA a medida (UiPath · Rocketbot)',
        'services.auto.f2': 'Sincronización e integración de datos',
        'services.auto.f3': 'Notificaciones y correos automáticos',
        'services.auto.f4': 'Sistemas de generación de reportes',
        'services.ai.title': 'Asistentes IA',
        'services.ai.headline': 'Soporte al cliente automatizado 24/7',
        'services.ai.desc': 'Implementa chatbots inteligentes que manejan consultas, reservas y tickets de soporte automáticamente.',
        'services.ai.f1': 'Procesamiento de lenguaje natural (NLP)',
        'services.ai.f2': 'Integración multicanal (WhatsApp/Web)',
        'services.ai.f3': 'Entrenamiento personalizado con tus datos',
        'services.ai.f4': 'Panel de análisis y métricas',
        'services.web.title': 'Productos web',
        'services.web.headline': 'Plataformas que generan ingresos',
        'services.web.desc': 'Construye aplicaciones web escalables y herramientas internas que impulsan el crecimiento y la eficiencia.',
        'services.web.f1': 'Desarrollo de MVP funcional',
        'services.web.f2': 'Diseño adaptable a móviles',
        'services.web.f3': 'Integraciones API y de terceros',
        'services.web.f4': 'Seguridad y cumplimiento integrados',
        'services.consulting.title': 'Consultoría y Capacitación',
        'services.consulting.headline': 'Transformación digital y adopción de tecnología',
        'services.consulting.desc': 'Cuando lo que falta no es construir, sino decidir qué construir y que el equipo sepa operarlo.',
        'services.consulting.f1': 'Diagnóstico de procesos y oportunidades (RPA/IA)',
        'services.consulting.f2': 'Hoja de ruta de transformación digital',
        'services.consulting.f3': 'Jornadas de capacitación a equipos',
        'services.consulting.f4': 'Adopción de IA y automatización',

        // --- Modelos de contratación ---
        'services.models.eyebrow': 'Modelos de trabajo',
        'services.models.title': 'Cómo podés contratarnos',
        'services.models.subtitle': 'Elegí el formato que mejor se adapta a tu necesidad.',
        'services.models.project.title': 'Por proyecto',
        'services.models.project.desc': 'Alcance y precio cerrados de antemano: el riesgo de la estimación lo asumimos nosotros.',
        'services.models.hourly.title': 'Por hora',
        'services.models.hourly.desc': 'Bolsa de horas para RPA, automatización y desarrollo, a demanda.',
        'services.models.consulting.title': 'Consultoría',
        'services.models.consulting.desc': 'Sin construir nada: te queda el análisis y el plan, y decidís con quién lo ejecutás.',
        'services.models.training.title': 'Jornadas de capacitación',
        'services.models.training.desc': 'Jornadas agendadas, presenciales o remotas, para el equipo que va a usar la herramienta.',

        // --- Certificaciones ---
        'certs.eyebrow': 'Formación oficial',
        'certs.title': 'Certificaciones que nos avalan',
        'certs.subtitle': 'Formación oficial que respalda cómo trabajamos.',
        'certs.uipath': 'UiPath RPA Developer',
        'certs.rocketbot': 'Rocketbot Suite (RPA)',
        'certs.microsoft': 'Microsoft Azure AI',
        'certs.ibm': 'IBM Data Science',
        'certs.meta.title': 'Tech Provider verificado de Meta',
        'certs.meta.subtitle': 'Integración oficial con la API de WhatsApp Business — negocio verificado y App Review aprobado por Meta.',

        // --- PROCESO (sección con apilado sticky) ---
        // 🚨 Estas etapas describen cómo trabaja el equipo. Si el proceso real cambia,
        // se corrige ACÁ y no se maquilla en la UI. Los plazos ("7 a 14 días") son los
        // mismos que ya afirma el hero y el FAQ: no inventar otros.
        'process.eyebrow': 'Cómo trabajamos',
        'process.title': 'Cuatro etapas, sin entregas sorpresa al final.',
        'process.subtitle': 'Cada etapa se apoya en la anterior y termina en algo que podés ver. No hay una caja negra de tres meses.',

        'process.s1.name': 'Diagnóstico',
        'process.s1.lede': 'Mapeamos el proceso real: quién lo ejecuta, cuánto tarda y dónde se traba.',
        'process.s1.p1': 'Relevamos con quien hace la tarea, no con el organigrama',
        'process.s1.p2': 'Definimos qué conviene automatizar y qué no',

        'process.s2.name': 'Diseño de la solución',
        'process.s2.lede': 'Decidimos qué se automatiza, qué queda manual y sobre qué sistemas se construye.',
        'process.s2.p1': 'Se construye sobre las herramientas que ya usás',
        'process.s2.p2': 'Acordamos el alcance y también qué queda afuera',

        'process.s3.name': 'Construcción iterativa',
        'process.s3.lede': 'Entregas parciales y frecuentes, para que puedas corregir el rumbo mientras se construye.',
        'process.s3.p1': 'Primera versión útil entre 7 y 14 días',
        'process.s3.p2': 'Lo ves funcionando antes de que esté terminado',

        'process.s4.name': 'Entrega y traspaso',
        'process.s4.lede': 'Queda documentado y tu equipo puede operarlo sin depender de nosotros.',
        'process.s4.p1': 'Documentación de cómo funciona y cómo se opera',
        'process.s4.p2': 'Soporte posterior, sin quedar atado a nosotros',

        // Acá vivían las claves `technical.*` de `TechnicalShowcase`. La sección se
        // ELIMINÓ: decía las mismas áreas que los cuatro pilares de Servicios con
        // otras palabras ("Asistentes IA" era el mismo string), y contradecía a
        // Servicios en la cifra (80% de tareas manuales vs 90% de entrada de datos,
        // ninguna con fuente). El rótulo "Cómo trabajamos" lo tiene ahora Proceso.
        //
        // Las preguntas del FAQ tampoco están acá: viven en `src/data/faq.ts`, que es
        // también la fuente del FAQPage de JSON-LD. Sólo queda el chrome de la sección.
        // `faq.nav` es la etiqueta CORTA para menús. Existe porque `faq.title` pasó a
        // ser una frase y el footer la usaba como texto de link: quedaba una oración
        // entera en el menú.
        'faq.nav': 'Preguntas frecuentes',
        'faq.eyebrow': 'Antes de escribirnos',
        'faq.title': 'Las dudas que aparecen siempre, contestadas.',
        'faq.subtitle': 'Plazos, comunicación, soporte y con qué te tenés que venir para arrancar.',
        'contact.eyebrow': 'Siguiente paso',
        'contact.title': 'Contanos qué proceso te está comiendo el tiempo.',
        'contact.subtitle': 'Contanos qué necesitás y seguimos la charla por WhatsApp. Te atiende MatchBot, nuestra propia plataforma de bots con IA: la misma que implementamos para nuestros clientes.',
        'contact.feat.response.title': 'Te atiende al instante',
        'contact.feat.response.desc': 'MatchBot toma tu consulta apenas la enviás, a cualquier hora. Un humano del equipo sigue la conversación en el día.',
        'contact.feat.commit.title': 'Sin compromiso',
        'contact.feat.commit.desc': 'Consulta gratuita sin obligación. Te daremos consejos honestos incluso si no somos la opción ideal.',
        'contact.feat.start.title': 'Inicio rápido',
        'contact.feat.start.desc': 'Si somos compatibles, podemos iniciar tu proyecto en 24-48 horas.',
        // --- Selector de contacto (todo sale por WhatsApp → MatchBot) ---
        'contact.q.title': '¿Qué necesitás?',
        'contact.intent.book': 'Agendar una llamada',
        'contact.intent.call': 'Que me llamen',
        'contact.intent.ask': 'Consulta puntual',
        'contact.when.title': '¿Cuándo te queda cómodo?',
        'contact.when.note': 'Horario de Montevideo (UTC-3). Lo confirmamos en el chat, en el momento.',
        // Sub-rótulos de las dos filas de chips. Sin ellos, las 7 opciones se leían como
        // un solo bloque y no se entendía que son DOS elecciones independientes.
        // 🚨 Los rangos llevan GUION SIN CORTE (U+2011). Con el guion normal, en la
        // grilla de móvil el chip partía en "(12-" / "15)" y el rango quedaba roto.
        'contact.when.day': 'Semana',
        'contact.when.slot': 'Franja horaria',
        'contact.preview.title': 'Esto es lo que vas a enviar',
        'contact.day.this': 'Esta semana',
        'contact.day.next': 'La próxima',
        'contact.day.any': 'Me adapto',
        // ⚠️ "Por la mañana", no "Mañana": el texto viaja al mensaje de WhatsApp y
        // el bot lo repite en prosa, donde "mañana" se lee como el DÍA siguiente.
        'contact.time.morning': 'Por la mañana (8‑12)',
        'contact.time.midday': 'Al mediodía (12‑15)',
        'contact.time.afternoon': 'Por la tarde (15‑19)',
        'contact.time.any': 'Cualquier horario',
        'contact.topic.label': '¿Sobre qué? (opcional)',
        'contact.topic.ph': 'Ej: automatizar la carga de facturas',
        'contact.cta.wa': 'Abrir WhatsApp',
        'contact.cta.mail': '¿Preferís por correo? Escribinos directo',
        'contact.legal.wa': 'Al continuar abrís una conversación de WhatsApp con nuestro equipo. Tus datos no pasan por terceros.',
        'contact.wa.msg.book': 'Hola, quiero agendar una llamada de 30 minutos.',
        'contact.wa.msg.call': 'Hola, ¿me pueden llamar para coordinar una charla?',
        'contact.wa.msg.ask': 'Hola, tengo una consulta.',
        // Fragmentos REDACTADOS PARA PROSA del mensaje de WhatsApp. Van aparte de
        // las etiquetas de los chips (contact.day.* / contact.time.*), que son
        // texto de UI y dentro de una oración quedan rotos.
        'contact.wa.pref': 'Me queda cómodo',
        'contact.wa.pref.any': 'Me adapto al día y al horario que tengan.',
        'contact.wa.day.this': 'esta semana',
        'contact.wa.day.next': 'la semana que viene',
        'contact.wa.day.any': 'cualquier día',
        'contact.wa.time.morning': 'por la mañana (8-12)',
        'contact.wa.time.midday': 'al mediodía (12-15)',
        'contact.wa.time.afternoon': 'por la tarde (15-19)',
        'contact.wa.time.any': 'en cualquier horario',
        'contact.wa.topic': 'Tema',
        'contact.mail.subject': 'Consulta desde la web',
        'contact.success.title': '¡Te abrimos WhatsApp!',
        'contact.success.desc': 'Tu consulta ya está escrita en el chat: solo tenés que enviarla. MatchBot te responde ahí mismo.',
        'contact.success.mail.title': '¡Te abrimos el correo!',
        'contact.success.mail.desc': 'Tu consulta ya está escrita en el mensaje: solo tenés que enviarla. Te respondemos dentro de las próximas 24 horas.',
        'contact.success.button': 'Hacer otra consulta',
        'footer.rights': 'Todos los derechos reservados',
        'footer.privacy': 'Política de Privacidad',
        'footer.terms': 'Términos de Servicio',
        'footer.data_deletion': 'Eliminación de Datos',
        'footer.matchbot': 'MatchBot ↗',
        // 🚨 Dos cosas que NO tiene que hacer esta línea:
        //  · Decía "Todas nacen y se sostienen bajo Digital Match Global", copiada de
        //    `solutions.subtitle`. Allá "Todas" tiene antecedente (las soluciones propias);
        //    acá la oración anterior enumera CATEGORÍAS, no productos, así que el "Todas"
        //    se quedaba sin sujeto y la frase no decía nada.
        //  · Tampoco nombra un producto concreto. La descripción de la MADRE no se cierra
        //    en una sola solución: hoy es MatchBot, mañana puede ser otra, y el footer
        //    quedaría desactualizado o angosto. Los productos se nombran en Soluciones.
        'footer.description': 'Construimos automatización de procesos, inteligencia artificial y software a medida. Trabajamos para empresas y también desarrollamos productos propios.',
        'footer.legal.title': 'Legal',
        'footer.location': 'Con base en Uruguay',
        // "Experiencia" no es opcional: comunicamos ISO/PCI como experiencia, nunca como
        // certificación propia de la empresa (ver CLAUDE.md §7).
        'footer.security': 'Seguridad primero • Experiencia ISO 9001 · PCI-DSS • Documentado',
        'footer.contact.title': 'Contacto',
        'footer.contact.whatsapp': 'WhatsApp',
        'footer.social.follow': 'Seguinos en',
        'footer.signature.madeBy': 'Hecho por'
    },
    en: {
        // ... MANTENER TODO LO ANTERIOR EN INGLÉS ...
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.solutions': 'Solutions',
        'nav.cases': 'Cases',
        'nav.process': 'Process',
        'nav.contact': 'Contact',
        'nav.menu': 'Menu',
        'nav.book': 'Book a conversation',
        'nav.tooltips.services': 'Explore automation solutions',
        'wa.default': "Hi, I'm coming from the Digital Match Global website. I have a question.",
        'float.top': 'Back to top',
        'float.book': 'Book a conversation',
        'float.whatsapp': 'Message us on WhatsApp',
        'nav.tooltips.about': 'Meet the team behind it',
        'nav.tooltips.solutions': 'Our own solutions',
        'nav.tooltips.cases': 'See our cases and projects',
        'nav.tooltips.process': 'Understand our methodology',
        'nav.tooltips.contact': 'Book consultation',

        // --- PORTFOLIO / CASES ---
        'portfolio.title': 'Cases & projects',
        'portfolio.subtitle': 'A selection of real work by industry. Each project, its own challenge and its own solution.',
        'portfolio.home.eyebrow': 'Cases',
        'portfolio.home.title': 'How we turn operational problems into digital solutions',
        'portfolio.home.subtitle': 'A selection of delivered projects to reduce manual work, connect tools and improve operations.',
        'portfolio.home.cta': 'View all cases',
        'portfolio.featured': 'Featured cases',
        'portfolio.enterprise': 'Enterprise solutions',
        'portfolio.enterprise.subtitle': 'Tools we built to solve real corporate operations on the Microsoft stack: first we understand and redesign the process, then we automate it. The same pain shows up in any organization working with Azure DevOps, SharePoint or SQL Server.',
        'portfolio.more': 'More projects',
        'case.featured': 'Featured case',
        'case.enterprise': 'Enterprise',
        'case.eyebrow': 'Case study',
        'case.eyebrow.enterprise': 'Enterprise solution',
        'case.client': 'Client',
        'case.context': 'Context',
        'case.challenge': 'The challenge',
        'case.solution': 'The solution',
        'case.services': 'Services',
        'case.result': 'Result',
        'case.view': 'View case',
        'case.back': 'Back to cases',
        'case.prev': 'Previous project',
        'case.next': 'Next project',
        'case.contact.eyebrow': 'Contact',
        'case.contact.title': "Let's work together",
        'case.contact.subtitle': 'If you got this far, drop us a line — no strings attached.',
        'case.contact.cta': 'Get in touch',


        'hero.kicker.label': 'Process',
        'hero.kicker.p1': 'invoice entry',
        'hero.kicker.p2': 'report generation',
        'hero.kicker.p3': 'notifications and emails',
        'hero.kicker.p4': 'system integration',
        'hero.kicker.p5': 'handling inquiries',
        'hero.kicker.result': 'Automated',
        'hero.title.lead': 'What your team does by hand today,',
        'hero.title.payoff': 'turned into a system.',
        'hero.subtitle': 'We find where the time is lost and build the system that fixes it.',
        'hero.cta.book': 'Book a conversation',
        'hero.cta.work': 'View our work',

        // --- ABOUT / WHO WE ARE (anonymous, differentiators — NOT services) ---
        'about.eyebrow': 'The team behind Digital Match Global',
        'about.title': 'Recover the hours your team loses on manual tasks.',
        'about.subtitle': 'Engineering applied to your day-to-day: we automate processes, connect systems and build tools so your team works with less friction.',
        'about.diff1.title': '14+ years',
        'about.diff1.desc': 'Of experience in automation, AI, and development.',
        'about.diff2.title': 'Enterprise & government',
        'about.diff2.desc': 'Real experience across the private and public sectors.',
        'about.diff3.title': 'Security & compliance',
        'about.diff3.desc': 'Experience under ISO 9001 and PCI-DSS compliance in data handling.',
        'about.diff4.title': 'Certified',
        'about.diff4.desc': 'In UiPath, Microsoft & IBM.',
        'about.tools_label': 'Technology stack',
        'stack.subtitle': 'From the infrastructure to the automated process: we choose and maintain every layer.',
        'stack.count': '{tools} technologies',
        'stack.top': 'What the client uses',
        'stack.base': 'What you never see, holding it all up',
        'stack.rpa': 'Automation / RPA',
        'stack.ai': 'AI & Data',
        'stack.dev': 'Development',
        'stack.cloud': 'Cloud & Infrastructure',
        'stack.data': 'Databases',
        'stack.integrations': 'Integrations & APIs',

        // ... MANTENER EL RESTO EN INGLÉS ...
        'proof.m1.label': 'Years of Experience',
        'proof.m2.label': 'Automated Processes',
        'proof.m3.label': 'Days from diagnosis to solution',
        'services.eyebrow': 'What we do',
        'services.main_title': 'Four fronts for taking manual work out of your operation.',
        'services.main_subtitle': 'Automation, AI assistants, web product and consulting. They combine around what your operation needs, not around a fixed package.',
        'services.cta_button': 'View case study',
        // --- Our own product: MatchBot ---
        // --- SOLUTIONS (portfolio band) ---
        'solutions.eyebrow': 'Solutions',
        'solutions.title': 'Alongside custom work, we develop our own solutions.',
        'solutions.subtitle': 'Not everything needs to be built from scratch: when the tool already exists, it gets you there sooner and costs less. These are ours, so we know them inside out and we maintain them.',
        'solutions.status.live': 'In production',
        'solutions.matchbot.category': 'Conversational automation',
        'solutions.matchbot.desc': 'MatchBot is our AI-powered WhatsApp bot platform: each business connects its own number and automates its conversations. Built on our official Meta Tech Provider integration.',
        'solutions.matchbot.cta': 'Discover MatchBot',
        'solutions.next.title': 'No tool for your problem?',
        'solutions.next.desc': 'Most of what we build starts exactly there: a process no off-the-shelf tool solves the way you need it. Tell us which one is yours.',
        'solutions.next.cta': 'Bring us the case',
        'services.auto.title': 'Process Automation (RPA)',
        'services.auto.headline': 'Eliminate 80% manual tasks',
        'services.auto.desc': 'RPA bots that turn repetitive workflows into systems running 24/7, without human intervention (UiPath · Rocketbot · Power Automate).',
        'services.auto.f1': 'Custom RPA bots (UiPath · Rocketbot)',
        'services.auto.f2': 'Data integration & synchronization',
        'services.auto.f3': 'Email & notification automation',
        'services.auto.f4': 'Report generation systems',
        'services.ai.title': 'AI Assistants',
        'services.ai.headline': '24/7 customer support automation',
        'services.ai.desc': 'Deploy intelligent chatbots that handle customer inquiries, bookings, and support tickets automatically.',
        'services.ai.f1': 'Natural language processing',
        'services.ai.f2': 'Multi-channel integration',
        'services.ai.f3': 'Custom training on your data',
        'services.ai.f4': 'Analytics & insights dashboard',
        'services.web.title': 'Web products',
        'services.web.headline': 'Revenue-generating platforms',
        'services.web.desc': 'Build scalable web applications and internal tools that drive business growth and efficiency.',
        'services.web.f1': 'Working MVP development',
        'services.web.f2': 'Mobile-responsive design',
        'services.web.f3': 'API & third-party integrations',
        'services.web.f4': 'Security & compliance built-in',
        'services.consulting.title': 'Consulting & Training',
        'services.consulting.headline': 'Digital transformation & technology adoption',
        'services.consulting.desc': 'When what is missing is not building, but deciding what to build and having the team run it.',
        'services.consulting.f1': 'Process & opportunity assessment (RPA/AI)',
        'services.consulting.f2': 'Digital transformation roadmap',
        'services.consulting.f3': 'Team training sessions',
        'services.consulting.f4': 'AI & automation adoption',

        // --- Engagement models ---
        'services.models.eyebrow': 'Ways of working',
        'services.models.title': 'How you can work with us',
        'services.models.subtitle': 'Pick the format that best fits your need.',
        'services.models.project.title': 'By project',
        'services.models.project.desc': 'Scope and price agreed upfront: we carry the estimation risk.',
        'services.models.hourly.title': 'By the hour',
        'services.models.hourly.desc': 'Hour bank for RPA, automation and development, on demand.',
        'services.models.consulting.title': 'Consulting',
        'services.models.consulting.desc': 'No build involved: you keep the analysis and the plan, and decide who executes it.',
        'services.models.training.title': 'Training sessions',
        'services.models.training.desc': 'Scheduled sessions, on-site or remote, for the team that will use the tool.',

        // --- Certifications ---
        'certs.eyebrow': 'Official training',
        'certs.title': 'Certifications that back us',
        'certs.subtitle': 'Official training that backs how we work.',
        'certs.uipath': 'UiPath RPA Developer',
        'certs.rocketbot': 'Rocketbot Suite (RPA)',
        'certs.microsoft': 'Microsoft Azure AI',
        'certs.ibm': 'IBM Data Science',
        'certs.meta.title': 'Verified Meta Tech Provider',
        'certs.meta.subtitle': 'Official WhatsApp Business API integration — business verified and Meta App Review approved.',

        'process.eyebrow': 'How we work',
        'process.title': 'Four stages, with no surprise delivery at the end.',
        'process.subtitle': 'Each stage builds on the previous one and ends in something you can see. There is no three-month black box.',

        'process.s1.name': 'Diagnosis',
        'process.s1.lede': 'We map the real process: who runs it, how long it takes and where it stalls.',
        'process.s1.p1': 'We survey with whoever does the task, not with the org chart',
        'process.s1.p2': 'We define what is worth automating and what is not',

        'process.s2.name': 'Solution design',
        'process.s2.lede': 'We decide what gets automated, what stays manual and which systems it builds on.',
        'process.s2.p1': 'Built on the tools you already use',
        'process.s2.p2': 'We agree on scope, and on what is out of scope',

        'process.s3.name': 'Iterative build',
        'process.s3.lede': 'Frequent partial deliveries, so you can correct course while it is being built.',
        'process.s3.p1': 'First useful version in 7 to 14 days',
        'process.s3.p2': 'You see it working before it is finished',

        'process.s4.name': 'Handover',
        'process.s4.lede': 'It ships documented, so your team can run it without depending on us.',
        'process.s4.p1': 'Documentation of how it works and how it is operated',
        'process.s4.p2': 'Ongoing support, without being locked to us',

        'faq.nav': 'FAQ',
        'faq.eyebrow': 'Before you write',
        'faq.title': 'The questions that always come up, answered.',
        'faq.subtitle': 'Timelines, communication, support and what you need to have ready to start.',
        'contact.eyebrow': 'Next step',
        'contact.title': 'Tell us which process is eating your time.',
        'contact.subtitle': 'Tell us what you need and we continue on WhatsApp. MatchBot takes it from there — our own AI bot platform, the same one we deploy for our clients.',
        'contact.feat.response.title': 'Answered instantly',
        'contact.feat.response.desc': 'MatchBot picks up your inquiry the moment you send it, at any hour. Someone from the team follows up the same day.',
        'contact.feat.commit.title': 'No commitment',
        'contact.feat.commit.desc': "Free consultation with no obligation. We'll provide honest advice even if we're not the right fit",
        'contact.feat.start.title': 'Quick start',
        'contact.feat.start.desc': "If we're a good match, we can start your project within 24-48 hours",
        // --- Contact selector (everything routes to WhatsApp → MatchBot) ---
        'contact.q.title': 'What do you need?',
        'contact.intent.book': 'Book a call',
        'contact.intent.call': 'Have us call you',
        'contact.intent.ask': 'Quick question',
        'contact.when.title': 'When works for you?',
        'contact.when.note': 'Montevideo time (UTC-3). We confirm right there in the chat.',
        'contact.when.day': 'Week',
        'contact.when.slot': 'Time of day',
        'contact.preview.title': "Here's what you'll send",
        'contact.day.this': 'This week',
        'contact.day.next': 'Next week',
        'contact.day.any': "I'm flexible",
        'contact.time.morning': 'Morning (8‑12)',
        'contact.time.midday': 'Midday (12‑3)',
        'contact.time.afternoon': 'Afternoon (3‑7)',
        'contact.time.any': 'Any time',
        'contact.topic.label': 'What about? (optional)',
        'contact.topic.ph': 'e.g. automating invoice entry',
        'contact.cta.wa': 'Open WhatsApp',
        'contact.cta.mail': 'Prefer email? Write to us directly',
        'contact.legal.wa': 'Continuing opens a WhatsApp conversation with our team. Your details never pass through third parties.',
        'contact.wa.msg.book': "Hi, I'd like to book a 30-minute call.",
        'contact.wa.msg.call': 'Hi, could you call me to set up a chat?',
        'contact.wa.msg.ask': 'Hi, I have a question.',
        'contact.wa.pref': 'Works for me',
        'contact.wa.pref.any': "I'm flexible on both the day and the time.",
        'contact.wa.day.this': 'this week',
        'contact.wa.day.next': 'next week',
        'contact.wa.day.any': 'any day',
        'contact.wa.time.morning': 'in the morning (8-12)',
        'contact.wa.time.midday': 'around midday (12-3)',
        'contact.wa.time.afternoon': 'in the afternoon (3-7)',
        'contact.wa.time.any': 'at any time',
        'contact.wa.topic': 'Topic',
        'contact.mail.subject': 'Inquiry from the website',
        'contact.success.title': 'WhatsApp is open!',
        'contact.success.desc': 'Your inquiry is already written in the chat — just hit send. MatchBot replies right there.',
        'contact.success.mail.title': 'Your email is open!',
        'contact.success.mail.desc': 'Your inquiry is already written in the message — just hit send. We reply within 24 hours.',
        'contact.success.button': 'Send another inquiry',
        'footer.rights': 'All rights reserved',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.data_deletion': 'Data Deletion',
        'footer.matchbot': 'MatchBot ↗',
        'footer.description': 'We build process automation, artificial intelligence and custom software. We work for companies and we also develop our own products.',
        'footer.legal.title': 'Legal',
        'footer.location': 'Based in Uruguay',
        'footer.security': 'Security-first • ISO 9001 · PCI-DSS experience • Documented',
        'footer.contact.title': 'Contact',
        'footer.contact.whatsapp': 'WhatsApp',
        'footer.social.follow': 'Follow us on',
        'footer.signature.madeBy': 'Made by'
    },
    };

    export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('es');

    useEffect(() => {
        const savedLang = localStorage.getItem('preferred-language') as Language;
        if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
        setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('preferred-language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.es] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
        {children}
        </LanguageContext.Provider>
    );
    };

    export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
    };