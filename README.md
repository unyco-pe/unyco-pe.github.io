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
- Las rutas, recursos, anclas, navegación móvil y diseño responsive fueron comprobados antes de empaquetar.

La publicación en producción requiere subir el contenido de esta raíz al repositorio de GitHub Pages.
