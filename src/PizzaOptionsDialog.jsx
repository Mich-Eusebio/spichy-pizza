import React, { useEffect, useRef, useState } from 'react';
import { extras, money, pizzaVariant, products } from './products';

export default function PizzaOptionsDialog({ baseId, onConfirm, onClose }) {
  const ref = useRef(null);
  const [doubleCheese, setDoubleCheese] = useState(false);
  const [halfAndHalf, setHalfAndHalf] = useState(false);
  const [wantsExtra, setWantsExtra] = useState(false);
  const [extraId, setExtraId] = useState('');
  const classic = ['jamon', 'pepperoni'].includes(baseId);
  const base = products[baseId];
  const selected = pizzaVariant(baseId, halfAndHalf, doubleCheese, wantsExtra ? extraId : '');

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog ref={ref} className="pizza-options" aria-labelledby="pizza-options-title" onClose={onClose}>
      <button className="close" aria-label="Cerrar opciones" onClick={() => ref.current.close()}>×</button>
      <span className="eyebrow">Hazla a tu gusto</span>
      <h2 id="pizza-options-title">{base.name}</h2>
      {classic && <><fieldset className="pizza-choice">
        <legend>¿Quieres doble queso?</legend>
        <label><input type="radio" name="cheese" checked={!doubleCheese} onChange={() => setDoubleCheese(false)} /> No, queso normal</label>
        <label><input type="radio" name="cheese" checked={doubleCheese} onChange={() => { setDoubleCheese(true); if (extraId === 'extra-queso') setExtraId(''); }} /> Sí, doble queso</label>
      </fieldset>
      <fieldset className="pizza-choice">
        <legend>¿La quieres mitad y mitad?</legend>
        <label><input type="radio" name="halves" checked={!halfAndHalf} onChange={() => setHalfAndHalf(false)} /> No, toda de {baseId === 'jamon' ? 'jamón' : 'pepperoni'}</label>
        <label><input type="radio" name="halves" checked={halfAndHalf} onChange={() => setHalfAndHalf(true)} /> Mitad jamón y mitad pepperoni</label>
      </fieldset>
      </>}
      <fieldset className="pizza-choice">
        <legend>¿Quieres un ingrediente extra?</legend>
        <label><input type="radio" name="extra" checked={!wantsExtra} onChange={() => { setWantsExtra(false); setExtraId(''); }} /> No, así está perfecta</label>
        <label><input type="radio" name="extra" checked={wantsExtra} onChange={() => setWantsExtra(true)} /> Sí, quiero un topping</label>
        {wantsExtra && <div className="topping-selector">
          <label htmlFor="pizza-topping">Selecciona tu ingrediente extra</label>
          <select id="pizza-topping" value={extraId} onChange={event => setExtraId(event.target.value)} required>
            <option value="" disabled>Elige un ingrediente</option>
            {extras.filter(extra => !(doubleCheese && extra.id === 'extra-queso')).map(extra =>
              <option key={extra.id} value={extra.id}>{extra.name.replace(/^Adicional de /, '')}</option>,
            )}
          </select>
          {doubleCheese && <p className="notice">El adicional de queso ya está incluido en tu selección de doble queso.</p>}
        </div>}
      </fieldset>
      <div className="option-summary" aria-live="polite">
        <p>{selected.name}</p>
        <div className="total"><span>Total por pizza</span><strong>{money(selected.price)}</strong></div>
      </div>
      <button className="button" style={{ width: '100%' }} disabled={wantsExtra && !extraId} onClick={() => onConfirm(selected.id)}>Agregar a mi pedido ↗</button>
      <p className="notice">Estas opciones se aplican solo a esta pizza. Puedes agregar otra con una combinación diferente.</p>
    </dialog>
  );
}
