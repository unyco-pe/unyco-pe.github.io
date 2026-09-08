# unyco.pe — iteración final (post ronda de correcciones)

Repo completo, listo para reemplazar `unyco-pe.github.io`. Descomprime,
revisa y haz commit. No hay nada que borrar a mano.

## Audit final (última pasada antes del push)

Se revisaron y quedaron limpios: HTML balanceado en las 10 páginas,
0 enlaces o assets rotos, CSS con llaves balanceadas, 0 imágenes sin
`alt`, 0 imágenes sin `width`/`height`, 0 enlaces externos sin
`rel="noopener"`, 0 videos con atributos de autoplay incompletos, y
0 páginas con scroll horizontal (probado en 1280px y 390px).

Sitemap alineado exacto con las páginas indexables (8 y 8), un solo
número de WhatsApp en los 36 enlaces, un solo Instagram, un solo correo.
Carga inicial por página entre 72 KB y 369 KB, sin contar videos.

Tres cosas corregidas en el audit:
- Dos `meta description` pasaban los ~160 caracteres que muestra Google
  (merch 167, piezas-óseas 166). Acortadas a 143 y 140.
- Las 9 imágenes del mosaico de Instagram declaraban `600x600` cuando los
  archivos reales son 4:5. El CSS ya forzaba el recorte cuadrado, pero
  declarar dimensiones falsas puede causar un salto de layout antes de que
  cargue el CSS. Corregidas a sus dimensiones reales.
- Se agregaron 2 tarjetas a "Una muestra del rango" en Trabajos, usando
  fotos que estaban sin utilizar: una maqueta arquitectónica y la carcasa
  de tomacorriente. Ambas suman categorías que no existían en la grilla
  (ninguna es trofeo ni merch), y la sección pasó de 6 a 8 tarjetas.

## Verificado en esta revisión final

- 10 páginas HTML, 0 etiquetas sin cerrar.
- 0 enlaces o assets rotos en todo el repo.
- CSS con llaves balanceadas.
- `sitemap.xml` con las 8 páginas indexables correctas.
- Las 9 páginas revisadas visualmente completas, en desktop y móvil.
- Los `og:image` de cada página coinciden con su contenido real (corregí
  el de Contacto, que seguía apuntando a la foto vieja).

Dos cosas que aparecen en consola durante pruebas locales y que **no van a
pasar en producción**: un 403 de Fontshare (bloqueado por las reglas de
red de mi entorno de pruebas, no por el sitio) y un "failed to load" en
los videos (el servidor local de Python no soporta range requests; GitHub
Pages sí). Confirmado con curl, no requieren acción.

## Qué cambió en la ronda de correcciones

**Home**
- Trofeo de Coolbox reemplazado por el del Golf y Country Club Trujillo
  en el hero, para no repetir la marca Coolbox dos veces en la misma vista.
- Texto bajo los botones de WhatsApp, eliminado.
- Franja de clientes, eliminada.
- Sección "Recién terminada" (video suelto sin link ni CTA), eliminada.
- Franja de Instagram nueva, con mosaico de 6 fotos, ubicada antes del
  cierre de WhatsApp para no competir con la conversión principal.
- "Taller propio": pie de foto pequeño bajo las imágenes, eliminado.

**Merch**
- Sección "Piezas entregadas" eliminada: eran fotos de catálogo, no
  evidencia de entregas reales.
- El video de los pines de Coolbox se movió al mismo bloque que las
  4 fotos del caso, como quinta pieza a ancho completo con leyenda.
  Antes vivía separado en "Del logo al lote".

**Fabricación**
- Tercer recuadro en "Distintas escalas": la pelvis ampliada, para
  mostrar el extremo grande de la escala.
- Video del hero reemplazado por uno nuevo (pieza terminada frente a la
  impresora); el video anterior (pines de Coolbox) se dejó solo en Merch.
- "Combinamos procesos": la foto del ampersand ya grabado se agregó
  junto al video que muestra el grabado en curso.

**Trabajos**
- Grilla "Una muestra del rango" reordenada: antes 3 de 4 tarjetas
  visibles eran trofeos; ahora las primeras cuatro son variadas.
- Ruta de texto plano reemplazada por `route-list--photo`, con una
  miniatura real por cada caso.
- "Diseño pensado para fabricar" pasó de un video suelto a una grilla de
  4 piezas: modelado en pantalla, modelo+pieza a la vez, y el par
  render/impreso del trofeo de Coolbox.

**Contacto**
- Foto del hero reemplazada por una más ordenada del mismo rack de
  impresoras.
- "Ven al taller": la foto estática se reemplazó por un video en loop
  del recorrido por el taller.
- Tarjeta de Instagram con mini-vista de 3 fotos y CTA más directo
  ("Seguir en Instagram"), con más peso visual que la de Correo.

**Todo el sitio**
- Correo `hola@unyco.pe` en las 10 páginas.
- Mensaje de WhatsApp del botón "Cotizar" y del botón flotante corregido
  a "Hola, quiero cotizar con Un&Co." en las 9 páginas, alineado con lo
  que dice el propio botón. Los dos cierres temáticos ("Hagámosla",
  "¿Tienes algo distinto?") mantienen su mensaje de "tengo una idea",
  que ahí sí encaja.

## Archivos que quedaron sin usar

17 imágenes quedaron sin usar tras los reemplazos de esta ronda: las
8 fotos de la sección "Piezas entregadas" que se eliminó, la foto vieja
del hero de Contacto, la foto vieja de "Ven al taller", y 3 versiones
tempranas de fotos de Coolbox reemplazadas por las que se mandaron
después. (De las 19 originales, 2 se recuperaron para las tarjetas
nuevas de Trabajos.) No se borraron, siguen en
`assets/media/merch/`, `assets/media/photos/` y `assets/media/proyectos/`
por si sirven más adelante.

## Pendiente (según lo acordado, queda para el final)

1. **Prueba en iPhone real.** Carrusel de merch, autoplay de video en
   modo de bajo consumo, apertura voxel contra la barra de Safari.
2. **Fotos originales del catálogo**, en mayor resolución que las
   extraídas del PDF.

## Después de desplegar

- Pedir reindexado de `/`, `/areas/merch.html` y `/proyectos/index.html`
  en Search Console (esta última cambió bastante en esta ronda).
- Pasar unyco.pe por el depurador de Facebook para refrescar la
  previsualización de los links.
- Probar los enlaces de WhatsApp prellenados, incluido el nuevo mensaje
  genérico.

## Analítica

Sin script instalado: unyco.pe está proxied en Cloudflare con inyección
automática de RUM. Si se saca el dominio del proxy, la analítica se
apaga sin aviso.
