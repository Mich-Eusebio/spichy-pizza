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

WhatsApp: 829 909 3939, configurado con código de país en `src/whatsapp.js`. El enlace `wa.me` incluye los productos, cantidades, subtotal y la consulta opcional de refrescos. El visitante confirma el envío en WhatsApp.

Pendiente de contenido del negocio: reseñas verificables y fotografías propias. Las fotos actuales son ilustrativas, obtenidas de Unsplash y guardadas en `public/images` como WebP. El logo original se conserva en `public`; la web utiliza una copia optimizada de 240 px. El hero tiene versiones de 480 y 960 px y se precarga; las fotos del menú usan carga diferida.
