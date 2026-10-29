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

## Estado de esta entrega (V9.8)

- SEO: enlaces internos a la URL canónica (sin `index.html`), sitemap con fechas y nombres alternativos de la marca (Unyco, Un y Co, Un and Co) en los datos estructurados de la portada.
- Pie de página con enlaces a todos los servicios y a Trabajos en las 15 páginas.
- Llaveros, Pines, Trofeos y Regalos: preguntas nuevas con datos de los casos, el catálogo y el generador. Cada caso enlaza a su servicio.
- Contacto con dirección y horario del taller. El pintor: llaveros en morado, beige y blanco.
- Cloudflare: "Always Use HTTPS" activado (http redirige a https).

## Entrega anterior (V9.7)

- Nuevo caso: El pintor de los milagros (proyectos/el-pintor-de-los-milagros.html), con video del elenco con sonido.
- Portada: "Trabajos recientes" con los 4 casos más nuevos (sale Piezas óseas).
- Merch: la tarjeta del caso reemplaza la foto de la calabaza en Encargos especiales.

## Entrega anterior (V9.6)

- Nuevo caso: Ministerio del Ambiente (proyectos/minam.html), 47 reconocimientos en teca.
- Portada: "Trabajos recientes" con los 4 casos más nuevos; sale el bloque UV DTF.
- Trofeos: "Encargos recientes" en 3 columnas en escritorio.
- Historial completo en VERSION.txt.

## Entrega anterior (V9.5)

- Portada: bloque final con Instagram y reseñas de Google (botón y QR).
- Trofeos: foto EEMRI 2026 en la galería.
- Repuestos: galería de 9 fotos (suma escaneo de montura, modelo y estribos impresos).
- Contacto: tarjeta de reseñas de Google.
- Título de la portada con "Un&Co:".
- Historial completo en VERSION.txt.

## Entrega anterior (V8)

- Base: V7.1 publicada.
- Un&Co. Lab integrado: aviso en portada bajo las tarjetas de Merch y Trofeos (enlace directo a lab.unyco.pe), sección completa en Merch (#lab) y llamados en Llaveros y Pines.
- Acceso "Taller" del equipo en el pie de página (lab.unyco.pe/taller, detrás de login).
- El botón flotante de WhatsApp se oculta al llegar al pie de página.

La publicación en producción requiere subir el contenido de esta raíz al repositorio de GitHub Pages.

## De qué página viene cada WhatsApp

Cada página abre WhatsApp con una primera línea distinta. Para saber qué página genera cotizaciones, anoten esa línea al recibir el mensaje.

| Primera línea del mensaje | Página |
|---|---|
| Hola, quiero cotizar con Un&Co. | Portada (botón Cotizar y botón flotante) |
| Hola, tengo una idea para Un&Co. | Portada (cierre "¿Tienes una idea? Hagámosla.") |
| Hola, quiero visitar el taller de Un&Co. | Portada (enlace "visitando el taller") |
| Hola, quiero cotizar merch con Un&Co. | Merch |
| Hola, quiero cotizar posavasos / soportes con Un&Co. | Merch (tarjetas del catálogo) |
| Hola, tengo un encargo de merch que no sé dónde ubicar. | Merch (Encargos especiales) |
| Hola, quiero cotizar llaveros personalizados con Un&Co. | Llaveros |
| Hola, quiero cotizar pines personalizados con Un&Co. | Pines |
| Hola, quiero cotizar trofeos personalizados con Un&Co. | Trofeos |
| Hola, necesito cotizar un repuesto o pieza técnica con Un&Co. | Repuestos |
| Hola, vi sus trabajos y quiero cotizar con Un&Co. | Trabajos |
| Hola, vi sus trabajos y tengo una idea para Un&Co. | Trabajos (cierre) |
| Hola, vi los llaveros de Cantol... | Caso Cantol |
| Hola, quiero cotizar reconocimientos en teca con Un&Co. | Caso Ministerio del Ambiente |
| Hola, vi el caso de El pintor de los milagros y quiero cotizar merch con Un&Co. | Caso El pintor de los milagros |
| Hola, quiero cotizar merch para un evento con Un&Co. | Caso Coolbox |
| Hola, quiero cotizar regalos en teca de Merch & Gifts con Un&Co. | Merch & Gifts |
| Hola, necesito una pieza grande para una exhibición o stand... | Caso piezas óseas |
| Hola, vi el caso de desarrollo de producto... / tengo una muestra... | Caso desarrollo de producto |
| Hola, vi su web y quiero cotizar con Un&Co. | Contacto |
| Hola, quiero coordinar una visita al taller de Un&Co. | Contacto (visita) |
| Hola, no encontré lo que buscaba en la web... | Página de error 404 |

Si el cliente borra el texto antes de enviar, el origen se pierde: es normal y pasa en una minoría de casos.
