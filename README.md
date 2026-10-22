# Spichy Pizza

Landing page en React y Vite. Incluye menú, selector de productos, subtotal y enlace de WhatsApp con el pedido prellenado.

## Desarrollo

```sh
npm install
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

El build se genera en `dist/`. Los productos y precios están en `src/products.js`; los estilos, en `src/styles.css`.

Jamón y pepperoni abren un modal de personalización antes de agregarse al pedido: doble queso +RD$125; mitad jamón/mitad pepperoni RD$650; ambas opciones RD$775. Cada combinación se guarda por separado y aparece con su precio en WhatsApp. Precios confirmados por el usuario y verificados con `node --test src/pizza-options.test.js`.

Todas las pizzas permiten elegir un ingrediente extra en su modal mediante Sí/No y un selector con precios. El adicional se suma a esa pizza y viaja en la misma línea de WhatsApp. No se cobra queso otra vez si se eligió doble queso. Los adicionales ya no aparecen como productos sueltos en la landing.

WhatsApp: 829 909 3939, configurado con código de país en `src/whatsapp.js`. El enlace `wa.me` incluye los productos, cantidades, subtotal y la consulta opcional de refrescos. El visitante confirma el envío en WhatsApp.

Las fotos visibles provienen de los archivos proporcionados por el usuario, optimizadas a WebP. El hero muestra la Especial en versiones de 480 y 960 px y se precarga; las fotos del menú usan carga diferida. Consulta `PHOTO-LABELS.md` para las etiquetas visuales, sus niveles de confianza y las variedades omitidas. Precios y adicionales se tomaron del menú del 22 de octubre. El contacto de WhatsApp conserva el número indicado por el usuario, que difiere del impreso en el menú.
