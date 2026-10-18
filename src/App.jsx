import React, { useRef, useState } from 'react';
import { pizzas, money } from './products';
import OrderDialog from './OrderDialog';
import { whatsappUrl } from './whatsapp';

function PizzaCard({ product, onAdd }) {
  return (<article className="card"><div className="food-image"><img loading="lazy" decoding="async" width="640" height="440" src={product.image} alt={`${product.name}, imagen ilustrativa`} /><span className="tag">{product.tag}</span></div><div className="card-body"><h3>{product.name}</h3><p>{product.description}</p><div className="card-bottom"><strong>{money(product.price)}</strong><button className="add" onClick={() => onAdd(product.id)}>{product.cta}</button></div></div></article>);
}

export default function App() {
  const [items, setItems] = useState({});
  const dialogRef = useRef(null);
  const count = Object.values(items).reduce((sum, qty) => sum + qty, 0);
  function openCart() { if (!dialogRef.current.open) dialogRef.current.showModal(); }
  function addItem(id) {
    setItems(previous => ({ ...previous, [id]: (previous[id] || 0) + 1 }));
    openCart();
  }
  function removeItem(id) {
    setItems(previous => {
      const next = { ...previous };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  }
  return (<>

<div className="wrap"><header><a className="brand" href="#" aria-label="Spichy Pizza, inicio"><img className="brand-logo" src="/images/logo.webp" alt="Spicchi Pizza" width="100" height="100" /></a><nav aria-label="Navegación principal"><a href="#menu">El menú</a><a href="#pedazos">Por pedazos</a><a href="#resenas">Reseñas</a><button className="button" onClick={openCart}>Armar mi pedido <span id="cart-count">{count > 0 ? `(${count})` : ""}</span> ↗</button></nav></header>
<main><section className="hero"><div><div className="eyebrow">Un buen plan empieza con pizza</div><h1>Tu antojo<br />tiene <em>buen<br />precio.</em></h1><p>Queso, tu topping favorito y un precio que se disfruta. Pizzas desde <strong style={{"color":"white"}}>RD$550</strong> o tu pedazo por <strong style={{"color":"white"}}>RD$100</strong>.</p><div className="actions"><a className="button" href="#menu">Dale gusto al antojo <span>↗</span></a></div><p className="hero-note">PIZZA ENTERA O POR PEDAZOS. TÚ ELIGES.</p></div><div className="hero-art"><img src="/images/pepperoni-hero.webp" srcSet="/images/pepperoni-hero-small.webp 480w, /images/pepperoni-hero.webp 960w" sizes="(max-width: 800px) 90vw, 50vw" width="960" height="960" decoding="async" alt="Pizza de pepperoni con queso derretido" fetchPriority="high" /><div className="price-stamp"><small>PIZZAS DESDE</small><strong>RD$550</strong><small>QUE SÍ, QUE SÍ.</small></div></div></section></main></div>
<div className="wrap"><section className="menu" id="menu"><div className="section-heading"><div><h2>¿Cuál se te antoja?</h2></div><p>Para compartir o para darte tu gusto.<br />Elige tu favorita y arma tu pedido.</p></div><div className="cards">
{pizzas.map(product => <PizzaCard key={product.id} product={product} onAdd={addItem} />)}
</div><p style={{"fontSize":"10px","color":"var(--muted)"}}>Fotografías ilustrativas. Consulta los ingredientes y la disponibilidad al pedir.</p>
<div className="slice" id="pedazos"><div className="slice-copy"><span className="eyebrow">Un break con mucho sabor</span><h3>No siempre hace falta<br />la pizza entera.</h3><p>Resuelve ese antojito con un pedazo a RD$100.<br />¿Y para beber? También tenemos refrescos.<br />Consulta sabores y precios al hacer tu pedido.</p></div><div className="slice-side"><div className="slice-price"><small>CADA PEDAZO</small>100<small>PESOS DOMINICANOS</small></div><button className="button" onClick={() => addItem("pedazo")}>Dame un pedazo ↗</button></div></div></section>
<section className="reviews" id="resenas"><div><span className="eyebrow">La voz de quienes nos prueban</span><h2>El próximo antojo<br />puede ser el tuyo.</h2><p style={{"color":"var(--muted)","fontSize":"13px"}}>Este espacio está reservado para las reseñas de nuestros clientes.</p></div><div className="review-placeholder"><span className="eyebrow">Reseñas de Spichy</span><p>Pronto podrás leer aquí sus experiencias.</p><small>Sección lista para incorporar reseñas reales con su fuente.</small></div></section></div>
<section className="order-section"><div className="wrap"><span className="eyebrow">Ya pensaste en pizza. Ahora elígela.</span><h2>El antojo no se quita<br />mirando el menú.</h2><p>Una entera para compartir. Un pedazo para ti.<br />Tu próximo buen plan empieza aquí.</p><button className="button" onClick={openCart}>Vamos a armar ese pedido ↗</button></div></section>
<footer className="wrap"><a className="brand" href="#"><img className="brand-logo" src="/images/logo.webp" alt="Spicchi Pizza" width="100" height="100" /></a><p>Pizza entera · Por pedazos · Refrescos</p><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12 }}>WhatsApp · 829 909 3939 ↗</a><a href="#menu" style={{"fontSize":"12px"}}>Volver al menú ↑</a></footer>

<OrderDialog ref={dialogRef} items={items} onRemove={removeItem} />
</>);
}
