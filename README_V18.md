# Un&Co. — v18 (auditoría total)

## PRIORIDAD: CALIDAD DE IMAGEN
En una primera pasada comprimí de más y degradé calidad (carrusel 1356→1000px,
videos 1080→720px). Se revirtió. Estado actual:
- Carrusel de merch: marco 1600x2000, calidad 94, contenido a resolución nativa.
- Tarjetas de catálogo: 1200x1500, calidad 93.
- Los 7 videos: 1080px, CRF 22 (alta calidad), regenerados desde los originales.
- Pósters regenerados a 1080px.

Verificado con medición automática de resolución-nativa vs tamaño-de-despliegue:
ningún asset que yo haya generado queda por debajo de 2x en pantallas retina.

## Fotos originales con resolución limitada (NO las toqué)
Estas se ven blandas en desktop por su resolución de origen. Solo se arreglan
retomándolas:
  escaneo2.webp      640x740    <- la más crítica
  escaneo.webp       788x1400
  58075a47...webp    900x1600
  811b3f35...webp    960x1280
  casco.webp         904x1400
  capibara.webp      1400x788

## Carrusel de merch — el bug que se reportó
El espacio muerto NO era CSS: estaba horneado en los archivos. Medido:
entre 43% y 71% de cada PNG era relleno crema. Se regeneraron desde los
originales de alta calidad, recortando el relleno, en 4:5 vertical.
Ahora el producto ocupa 66-78% del marco, con aire consistente.

## Peso
Se recortó peso SIN tocar calidad, vía carga diferida:
  preload="none" en los 8 videos + IntersectionObserver con rootMargin 200px.
El póster nítido aparece de inmediato; el video llega después.
Se eliminaron 15 PNG huérfanos (26 MB) y los PNG en uso pasaron a WebP.

## Correcciones de accesibilidad y UX
- Contraste AA: el rojo de marca (#D64443) daba 4.41:1 en botones y 3.91:1 en
  precios. Se añadió --red-ink (#C23B3A): 5.28:1 y 4.68:1. El rojo de marca se
  conserva para el logo y acentos.
- Puntos del carrusel: 6x6px -> área táctil de 28px (verificado con clic real
  desplazado 11px).
- Footer: "Lima, Perú" desalineado en móvil (era <span>, el min-height solo
  aplicaba a <a>).
- Flechas del carrusel sin feedback -> :active scale(.92).
- width/height añadidos a whatsapp.svg y contacto-impresoras.webp (evita CLS).
- prefers-reduced-motion extendido al carrusel y al CTA flotante.

## Verificado
HTML bien formado en 8 páginas | 0 assets faltantes | 0 errores de consola
0 scroll horizontal | 1 h1 por página | todos los alt presentes
contraste AA limpio en las 7 páginas | CSS y JS válidos

## PENDIENTE — leer antes de publicar
1. NO pude verificar reproducción de video: este entorno no soporta H.264.
   Abre el sitio en tu celular y confirma que los 7 videos reproducen.
2. Si el dominio no es unyco.pe, buscar y reemplazar "https://unyco.pe" en los
   8 HTML y en sitemap.xml.
3. Deuda de CSS: selectores definidos hasta 5 veces y 20 !important, por capas
   de sobreescritura acumuladas. No es bug visible pero hace frágil todo cambio
   futuro. Limpiarlo requiere pruebas de regresión; no hacerlo justo antes de
   lanzar.
4. Copy de venta SIN hacer: no hay prueba social (SERFOR, MillionHair,
   Italcafé solo aparecen en fotos, nunca en texto), no hay promesa de tiempo
   de respuesta, y la home no ancla precio.

## v18.1 — correcciones reportadas
- Ícono de WhatsApp: el path que había escrito era una aproximación y el
  auricular salía deformado. Reemplazado por el glifo oficial.
- Trofeo fuera del carrusel de merch (es un reconocimiento, tiene su propia
  página). La tarjeta de "Trofeos" del catálogo se mantiene, con imagen propia.
- Carrusel recortado: CAUSA RAÍZ encontrada. La imagen renderizaba a 659x824
  dentro de una caja de 659x412 (el doble de alto) y overflow:hidden la
  cortaba. Origen: una de las definiciones duplicadas de .merch-slide img
  perdía la restricción de altura. Ahora el marco es 4:5, igual que las
  imágenes: cero recorte (verificado: 440x550 imagen en caja 440x550).
- Sección azul reescrita. Era ambigua porque el titular jugaba con el nombre
  (único / uno & compañía) pero la explicación del juego se había perdido en
  una versión anterior, y los dos puntos se contradecían ("contigo" vs "si el
  archivo está listo, producimos"). Ahora dice algo concreto y accionable:
  las dos formas reales de empezar.
