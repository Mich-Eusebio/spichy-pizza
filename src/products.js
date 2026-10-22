export const money = amount => `RD$${amount.toLocaleString('es-DO')}`;

export const pizzas = [
  {
    id: 'jamon', name: 'Jamón & queso', price: 550,
    description: 'La combinación que siempre se antoja. Jamón y queso, así de sencillo.',
    tag: 'EL CLÁSICO', cta: '¡Dame esa pizza! ↗',
    image: '/images/jamon-real.webp',
  },
  {
    id: 'pepperoni', name: 'Pepperoni', price: 625,
    description: 'Pepperoni y queso para darle gusto a tu antojo.',
    tag: 'UN CLÁSICO QUE SE ANTOJA', cta: '¡Dame esa pizza! ↗',
    image: '/images/pepperoni-real.webp',
  },
  {
    id: 'especial', name: 'Especial Specchi', price: 1100,
    description: 'Jamón, doble queso, pepperoni, pollo, salchicha italiana y bacon.',
    tag: 'LA ESPECIAL DE LA CASA', cta: '¡Voy por la especial! ↗',
    image: '/images/especial-real.webp',
  },
  {
    id: 'meat', name: 'Specchi Meat', price: 975,
    description: 'Pollo, doble queso, salchicha italiana y bacon.',
    tag: 'PARA LOS QUE QUIEREN CARNE', cta: '¡Dame esa pizza! ↗',
    image: '/images/meat-real.webp',
  },
  {
    id: 'vegetales', name: 'Vegetales', price: 850,
    description: 'Jamón, pepperoni, salchicha italiana, aceitunas, pimientos, hongos, cebolla y bacon.',
    tag: 'VEGETALES Y CARNES', cta: '¡Dame esa pizza! ↗',
    image: '/images/vegetales-real.webp',
  },
];

export const extras = [
  { id: 'extra-queso', name: 'Adicional de queso', price: 125 },
  { id: 'extra-maiz', name: 'Adicional de maíz', price: 50 },
  { id: 'extra-aceitunas', name: 'Adicional de aceitunas negras', price: 75 },
  { id: 'extra-hongos', name: 'Adicional de hongos', price: 75 },
  { id: 'extra-bacon', name: 'Adicional de bacon', price: 100 },
];

// Prices confirmed by the business: double cheese +125; half-and-half 650.
export const DOUBLE_CHEESE_PRICE = 125;
export const HALF_AND_HALF_PRICE = 650;

export function pizzaVariant(baseId, halfAndHalf = false, doubleCheese = false, extraId = '') {
  const base = pizzas.find(pizza => pizza.id === baseId);
  if (!base) throw new Error('Pizza no válida');
  if ((halfAndHalf || doubleCheese) && !['jamon', 'pepperoni'].includes(baseId)) throw new Error('Combinación no disponible');
  const extra = extraId ? extras.find(item => item.id === extraId) : null;
  if (extraId && !extra) throw new Error('Adicional no válido');
  if (doubleCheese && extraId === 'extra-queso') throw new Error('El doble queso ya incluye el adicional de queso');
  const id = halfAndHalf ? 'mitad-jamon-pepperoni' : baseId;
  return {
    id: `${id}${doubleCheese ? '-doble-queso' : ''}${extra ? `-${extra.id}` : ''}`,
    name: `${halfAndHalf ? 'Mitad jamón y mitad pepperoni' : base.name}${doubleCheese ? ' · doble queso' : ''}${extra ? ` · ${extra.name.toLowerCase()}` : ''}`,
    price: (halfAndHalf ? HALF_AND_HALF_PRICE : base.price) + (doubleCheese ? DOUBLE_CHEESE_PRICE : 0) + (extra?.price || 0),
  };
}

const variants = pizzas.flatMap(({ id }) =>
  (['jamon', 'pepperoni'].includes(id) ? [false, true] : [false]).flatMap(half =>
    (['jamon', 'pepperoni'].includes(id) ? [false, true] : [false]).flatMap(double =>
      ['', ...extras.map(extra => extra.id)].filter(extraId => !(double && extraId === 'extra-queso'))
        .map(extraId => pizzaVariant(id, half, double, extraId)),
    ),
  ),
);

export const products = Object.fromEntries([
  ...pizzas,
  ...variants,
  { id: 'pedazo', name: 'Pedazo de pizza (sabor por confirmar)', price: 100 },
].map(product => [product.id, product]));
