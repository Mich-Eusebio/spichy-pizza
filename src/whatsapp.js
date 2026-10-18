import { money, products } from './products.js';

export const WHATSAPP_NUMBER = '18299093939';

export function whatsappUrl(message = '¡Hola, Spichy Pizza! 🍕 Quiero hacer un pedido. ¿Me ayudan a elegir mi pizza?') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(items, soda = false) {
  const entries = Object.entries(items);
  const total = entries.reduce((sum, [id, qty]) => sum + products[id].price * qty, 0);
  return [
    '¡Hola, Spichy Pizza! 🍕 Quiero hacer este pedido:',
    ...entries.map(([id, qty]) => `${qty} × ${products[id].name} — ${money(products[id].price * qty)}`),
    soda && 'También quiero consultar los refrescos disponibles.',
    `Subtotal: ${money(total)}`,
    '¿Me confirman disponibilidad y el total, incluyendo cualquier cargo adicional?',
  ].filter(Boolean).join('\n');
}
