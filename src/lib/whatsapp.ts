import { site } from '@/data/site';

// Enlaces de WhatsApp — un solo lugar.
//
// 🚨 `wa.me` quiere el número en dígitos SIN `+`. `site.phone` está en E.164 (`+598…`)
// porque así lo necesitan `tel:` y el JSON-LD, así que hay que limpiarlo acá. Estaba
// interpolado crudo (`https://wa.me/${site.phone}`) en el footer: funciona de casualidad
// porque WhatsApp redirige, pero no es la forma canónica.
//
// 🚨 Y SIEMPRE con mensaje. El botón flotante abría un chat VACÍO: el visitante llegaba
// al chat sin saber qué escribir y del otro lado no había forma de saber de dónde venía.
// Un mensaje prellenado resuelve las dos puntas y es editable antes de enviar.

const DIGITS = site.phone.replace(/[^\d]/g, '');

/** URL de wa.me con el texto prellenado (el usuario lo puede editar antes de enviar). */
export function waLink(message: string): string {
    return `https://wa.me/${DIGITS}?text=${encodeURIComponent(message)}`;
}
