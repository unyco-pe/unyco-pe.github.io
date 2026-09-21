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

## Estado de esta entrega (V8)

- Base: V7.1 publicada.
- Un&Co. Lab integrado: aviso en portada bajo las tarjetas de Merch y Trofeos (enlace directo a lab.unyco.pe), sección completa en Merch (#lab) y llamados en Llaveros y Pines.
- Acceso "Taller" del equipo en el pie de página (lab.unyco.pe/taller, detrás de login).
- El botón flotante de WhatsApp se oculta al llegar al pie de página.

La publicación en producción requiere subir el contenido de esta raíz al repositorio de GitHub Pages.
