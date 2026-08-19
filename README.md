# egg-web

Sitio estático de presentación de **El Gordo Gekko (EGG)** — un experimento personal de
trading automático, por Mariano Birnios. HTML, CSS y JS planos: sin build, sin dependencias,
sin backend. Todo el contenido está en español.

```
index.html
assets/
  css/styles.css
  js/main.js
  img/            ← arte del hero + galería, favicon
```

## Correr localmente

Abrir `index.html` directo, o servir la carpeta:

```bash
npx serve .
# o
python -m http.server 8080
```

## Notas

- El arte viene del repo del bot (`el-gordo-gekko/public`). El PNG del hero pesa ~3 MB y el de la
  grilla ~680 KB — conviene pasarlos por un optimizador (o exportar WebP) antes de que esto vaya a
  un host real.
- La cinta que scrollea en el hero es **decorativa**. Su contenido está hardcodeado en
  `assets/js/main.js`; no son cotizaciones, posiciones ni resultados.
- El sitio dice explícitamente que EGG no está disponible al público y que no es asesoramiento
  financiero (§05 "Disponibilidad"). Mantener esa sección si la página se publica.
- El broker real es la **API de IOL (Invertir Online)**; se menciona en el hero, en la sección del
  origen (§03) y en el footer.
- §01 describe **qué hace en el mercado**, no cómo está construido por dentro. Se sacó a propósito
  todo lo de arquitectura, reconciliación, SQLite y auto-recuperación: no es lo que la página
  quiere contar.
- §01 es la única sección que explica la operatoria, y lo hace con `assets/img/grid-trading.png`
  (1265×623) a la izquierda y texto corto a la derecha (layout `.split`, imagen con `.figure-frame`).
  La imagen es `.zoomable`: se agranda con el lightbox, igual que la galería del gecko. El epígrafe
  aclara que es **ilustrativo**, igual que la cinta del hero — no son resultados reales.
- **Hoy la página habla solo de grid trading.** DCA y market maker se sacaron porque no están en
  uso, y con el market maker se eliminó la sección "Estrategias" completa: la grilla se explica
  ahora en §01. Si alguna vuelve a correr, hay que reponerla y renumerar los kickers.
- Secciones y bloques eliminados a pedido: "Under the hood" (capas/stack), "Cómo funciona"
  (diagrama, secuencia del tick y reglas), "Estrategias", las tarjetas de §01 y la nota sobre
  `bondiola`. El CSS que quedó sin uso (`.cards`, `.strats`, `.strat`, `.h3`, etc.) también se sacó.
- Orden actual: hero · 01 Qué hace · credo · 02 El origen · 03 Quién está atrás · 04 Disponibilidad.

## Imágenes

`assets/img/mariano-simpson.gif` es el original que trajo Mariano. El GIF tenía una línea de 1 px
negra en el borde derecho y otra gris/negra abajo, así que la página usa
`assets/img/mariano-simpson.png`: el mismo dibujo recortado (181×206), con los bordes limpios y unos
píxeles de aire abajo para que apoye los pies dentro del marco. El original se dejó en el repo.

## SEO

Archivos en la raíz: `robots.txt` (apunta al sitemap), `sitemap.xml` (una URL + extensión de
imágenes), `.nojekyll` (que GitHub Pages no procese el sitio con Jekyll), `404.html` (Pages la sirve
sola; va con `noindex`) y `CNAME`.

En el `<head>` de `index.html`: `canonical` a `https://www.elgordogekko.com.ar/`, `meta robots` con
`max-image-preview:large`, Open Graph + Twitter Card completos apuntando a `assets/img/og-card.jpg`
(1200×630, JPEG porque varios scrapers no leen WebP), y un bloque JSON-LD con cuatro nodos:
`WebSite`, `WebPage`, `Person` y `SoftwareApplication`.

El nodo `SoftwareApplication` incluye `disambiguatingDescription`, que es la pieza pensada
específicamente para el problema de que Google corrija "el gordo gekko" por "Gordon Gekko": dice
explícitamente que el nombre es un guiño a la película pero que el proyecto no tiene relación con
ella. La sección §02 del sitio hace lo mismo en prosa, que es lo que Google efectivamente lee.

### Imágenes

Los PNG originales quedaron en `assets/img/` pero **la página ya no los referencia** (excepto
`mariano-simpson.png`). Se sirven WebP con dos variantes por imagen (`-sm` y completa) vía
`srcset`/`sizes`. La primera pantalla pasó de ~3.000 KB a ~137 KB en móvil y ~286 KB en desktop.

Si se reemplaza o agrega arte, hay que regenerar los WebP; el criterio usado fue: hero 1000 px q78,
grilla 1265 px q88 (tiene texto fino), galería 1200 px q80, variantes `-sm` a 560/700/420 px.

Las imágenes ampliables llevan `data-full` con la ruta del WebP grande, porque el lightbox tomaba
`currentSrc` y con `srcset` eso podía ser la variante chica.
