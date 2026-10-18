import React, { useState } from 'react';
import { money, products } from './products';
import { orderMessage, whatsappUrl } from './whatsapp';

export default function OrderDialog({ ref, items, onRemove }) {
  const [soda, setSoda] = useState(false);
  const entries = Object.entries(items);
  const total = entries.reduce((sum, [id, qty]) => sum + products[id].price * qty, 0);

  return (
    <dialog ref={ref} id="cart" aria-labelledby="order-title"
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) ref.current.close();
      }}>
      <button className="close" aria-label="Cerrar pedido" onClick={() => ref.current.close()}>×</button>
      <h2 id="order-title">Tu antojo, a tu manera.</h2>
      <ul id="order-list">
        {entries.map(([id, qty]) => (
          <li key={id}>
            <span>{qty} × {products[id].name} · {money(products[id].price * qty)}</span>
            <button className="remove" aria-label={`Quitar una unidad de ${products[id].name}`}
              onClick={() => onRemove(id)}>−</button>
          </li>
        ))}
      </ul>
      {!entries.length && <p className="empty">Tu pedido está esperando algo rico. Elige una pizza o un pedazo en el menú.</p>}
      <label style={{ fontSize: 13 }}>
        <input type="checkbox" checked={soda} onChange={event => setSoda(event.target.checked)} /> Quiero consultar los refrescos disponibles
      </label>
      <div className="total"><span>Subtotal</span><span>{money(total)}</span></div>
      <p className="notice">Abriremos WhatsApp con tu pedido listo para enviar al 829 909 3939. Confirma el envío en el chat. Refrescos y cualquier cargo adicional se confirman con el negocio.</p>
      {entries.length > 0 ? (
        <a className="button" style={{ width: '100%' }} href={whatsappUrl(orderMessage(items, soda))} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp ↗</a>
      ) : (
        <button className="button" style={{ width: '100%' }} disabled>Agrega algo rico para pedir</button>
      )}
    </dialog>
  );
}
