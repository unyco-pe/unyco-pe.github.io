# unyco.pe

Repositorio completo del sitio estático de Un&Co., listo para GitHub Pages.

## Revisar localmente

Puedes abrir `index.html` directamente. Para revisar el comportamiento del hosting, también puedes ejecutar desde la raíz:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000/`.

## Estructura

- `index.html`: portada.
- `areas/`: Merch, Trofeos, Repuestos y páginas de producto.
- `proyectos/`: índice de Trabajos y casos desarrollados.
- `assets/`: estilos, scripts, tipografías, fotografías, videos y documentos.
- `contacto.html`, `404.html`, `sitemap.xml`, `robots.txt` y `CNAME`: archivos de publicación.

## Estado de esta entrega

- Los archivos del sitio están en la raíz del repositorio.
- Todos los accesos a Trabajos apuntan explícitamente a `proyectos/index.html`, incluso al abrir el sitio directamente desde el sistema de archivos.
- La navegación principal incluye acceso directo a Trofeos.
- Merch ocupa la posición principal de la portada.
- Trofeos aparece en la vitrina inicial, encabeza el catálogo de Merch y protagoniza la portada de Trabajos.
- Repuestos conserva alta visibilidad en una franja secundaria y usa una fotografía de piezas técnicas fabricadas en serie.
- El código incluye navegación móvil y diseño responsive. El alcance de la verificación de esta entrega se detalla abajo.

La publicación en producción requiere subir el contenido de esta raíz al repositorio de GitHub Pages.

## Integración de Un&Co. Lab — 21 de septiembre de 2026

Base: rama `main` de `unyco-pe/unyco-pe.github.io`, commit `2f75d8d`.

- Inicio: aviso azul con etiqueta «Nuevo» al final del contenido, antes del bloque de contacto. Lleva a `areas/merch.html#lab`. La apertura queda libre de promoción de Lab.
- Merch: la sección interactiva completa se ubica inmediatamente debajo del catálogo de productos.
- La sección presenta el recorrido logo → pieza → precio. La muestra permite alternar llavero/pin y tres colores; es una ilustración, no una cotización ni el generador completo.
- `assets/js/lab-promo.js` controla exclusivamente la muestra. Sin JavaScript se conserva la ilustración inicial y funcionan los enlaces a Lab.
- Navegación: se conserva el menú de servicios original; el visor se descubre desde Merch.
- Llaveros y pines: se conservan sus bloques contextuales que llevan al generador.
- Pie de página: enlace discreto «Taller» a `https://lab.unyco.pe/taller` en las 13 páginas con pie compartido. La autenticación sigue correspondiendo al destino.
- WhatsApp flotante: se oculta antes de que el pie entre en pantalla y vuelve al subir, dejando el enlace Taller libre. Mientras está oculto también queda fuera de la navegación por teclado.
- Se conservan fotografías, videos, tipografías, catálogo, archivos de dominio, rutas, precios existentes y contacto por WhatsApp.

### Verificación de esta entrega

- Revisión 3: visor colocado inmediatamente después del catálogo y su descarga PDF; aviso de Inicio con fondo azul de marca, etiqueta «Nuevo» y botón ámbar. Recursos, anclas y orden de las secciones comprobados.

- Revisión 2: 464 referencias locales y anclas válidas; visor único en Merch y aviso al final de Inicio. La lógica de WhatsApp pasó 29 comprobaciones de entrada/salida del pie y cambio de altura, incluida su exclusión del teclado cuando está oculto.

- Se revisaron el repositorio y la web pública, y se recorrió Lab con su ejemplo hasta cantidad/precio. Taller mostró la pantalla de acceso por correo.
- Las 14 páginas HTML pasaron la comprobación de recursos y enlaces locales, IDs únicos y accesos incorporados. Los scripts pasaron la revisión sintáctica de Node y el diff pasó la comprobación de whitespace.
- La vista 3D de Lab mostró un error en el navegador de revisión, aunque fue posible recorrer los controles y el cálculo de precio. No se modificó el proyecto Lab.
- La política del navegador impidió abrir la previsualización local de esta entrega. La adaptación móvil, los estados interactivos y los temas se implementaron en código; queda pendiente comprobar visualmente esta versión en navegador antes de publicarla.
- Esta entrega es un ZIP del sitio completo. No se hizo push a GitHub ni se publicó la modificación.

Para publicar después de revisarlo, sustituye los archivos del repositorio por el contenido del ZIP, manteniendo `CNAME`.
