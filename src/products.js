export const money = amount => `RD$${amount.toLocaleString('es-DO')}`;

export const pizzas = [
  {
    id: 'jamon', name: 'Jamón & queso', price: 550,
    description: 'La combinación que siempre se antoja. Jamón y queso, así de sencillo.',
    tag: 'EL CLÁSICO', cta: '¡Dame esa pizza! ↗',
    image: '/images/jamon.webp',
  },
  {
    id: 'pepperoni', name: 'Pepperoni & queso', price: 550,
    description: 'Pepperoni y queso: un dúo que merece un lugar en tu mesa.',
    tag: 'PARA EL ANTOJO', cta: '¡Dame esa pizza! ↗',
    image: '/images/pepperoni.webp',
  },
  {
    id: 'vegetales', name: 'Vegetales', price: 800,
    description: 'Tu opción con vegetales para cambiar la rutina, pedazo a pedazo.',
    tag: 'MÁS COLOR, MÁS ANTOJO', cta: '¡Dame esa pizza! ↗',
    image: '/images/vegetales.webp',
  },
];

export const products = Object.fromEntries([
  ...pizzas,
  { id: 'pedazo', name: 'Pedazo de pizza (sabor por confirmar)', price: 100 },
].map(product => [product.id, product]));
