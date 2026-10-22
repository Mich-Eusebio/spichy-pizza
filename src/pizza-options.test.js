import test from 'node:test';
import assert from 'node:assert/strict';
import { pizzaVariant, products, pizzas, extras } from './products.js';
import { createOrderId, orderMessage, whatsappUrl } from './whatsapp.js';

test('opciones con precios confirmados para ambas bases', () => {
  for (const [id, normal, double] of [['jamon', 550, 675], ['pepperoni', 625, 750]]) {
    assert.equal(pizzaVariant(id).price, normal);
    assert.equal(pizzaVariant(id, false, true).price, double);
    assert.equal(pizzaVariant(id, true).price, 650);
    assert.equal(pizzaVariant(id, true, true).price, 775);
    for (const half of [false, true]) for (const cheese of [false, true]) {
      const variant = pizzaVariant(id, half, cheese);
      assert.deepEqual(products[variant.id], variant);
    }
  }
});

test('WhatsApp conserva combinaciones distintas, cantidades y subtotal', () => {
  const normal = pizzaVariant('jamon');
  const half = pizzaVariant('pepperoni', true, true);
  const text = orderMessage({ [normal.id]: 1, [half.id]: 2 });
  assert.ok(text.includes('1 × Jamón & queso'));
  assert.ok(text.includes('2 × Mitad jamón y mitad pepperoni · doble queso'));
  assert.match(text, /Subtotal: RD\$2[,.]?100/);
});

test('cada topping se asocia a su pizza y suma su precio en WhatsApp', () => {
  for (const pizza of pizzas) for (const extra of extras) {
    const selected = pizzaVariant(pizza.id, false, false, extra.id);
    assert.equal(selected.price, pizza.price + extra.price);
    assert.deepEqual(products[selected.id], selected);
    assert.ok(orderMessage({ [selected.id]: 1 }).includes(selected.name));
  }
  const selected = pizzaVariant('jamon', true, true, 'extra-bacon');
  assert.equal(selected.price, 875);
  assert.equal(products[selected.id].price, 875);
  assert.throws(() => pizzaVariant('jamon', false, true, 'extra-queso'));
  assert.notEqual(pizzaVariant('jamon').id, pizzaVariant('jamon', false, false, 'extra-maiz').id);
});

test('WhatsApp incluye un número de orden de cuatro caracteres', () => {
  for (let i = 0; i < 100; i++) assert.match(createOrderId(), /^[A-HJ-NP-Z2-9]{4}$/);
  const text = orderMessage({ jamon: 1 }, false, 'AB23');
  assert.ok(text.includes('Número de orden: AB23'));
  assert.equal(new URL(whatsappUrl(text)).searchParams.get('text'), text);
  assert.match(orderMessage({ jamon: 1 }), /Número de orden: [A-HJ-NP-Z2-9]{4}\n/);
});
