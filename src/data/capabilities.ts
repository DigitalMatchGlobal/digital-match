// Las cuatro capacidades de la casa, en su ORDEN canónico.
//
// Fuente única de la lista que consumen la banda del hero y `ServicesSection`. Antes la
// banda tenía sus propios `t('services.*.title')` sueltos y linkeaba las cuatro celdas a
// `#services`: era un índice que no indexaba nada — hicieras clic donde hicieras clic,
// caías en el mismo lugar. Ahora cada celda lleva al pilar que nombra.
//
// 🚨 `id` es lo que ata la celda de la banda con la tarjeta de la sección: el `id` del DOM
// de cada tarjeta se arma con `serviceAnchor()`. Está tipado como unión para que un typo
// (o renombrar uno solo de los dos lados) **rompa el build** en vez de degradar en
// silencio a un link que scrollea a ninguna parte.

export type CapabilityId = 'automation' | 'ai-assistants' | 'web-products' | 'consulting';

export interface Capability {
    id: CapabilityId;
    /** clave i18n del nombre — la MISMA que muestra la tarjeta, para que no drifteen */
    titleKey: string;
}

export const CAPABILITIES: Capability[] = [
    { id: 'automation', titleKey: 'services.auto.title' },
    { id: 'ai-assistants', titleKey: 'services.ai.title' },
    { id: 'web-products', titleKey: 'services.web.title' },
    { id: 'consulting', titleKey: 'services.consulting.title' },
];

/** Ancla de la tarjeta de un pilar dentro de `ServicesSection` (con `#`). */
export const serviceAnchor = (id: CapabilityId) => `#service-${id}`;

/** El mismo valor sin `#`, para el atributo `id` del DOM. */
export const serviceDomId = (id: CapabilityId) => `service-${id}`;
