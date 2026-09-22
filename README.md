# GamerZone - Tienda de Videojuegos

Proyecto frontend de una tienda de videojuegos llamada **GamerZone**. La aplicacion muestra un catalogo de productos, permite buscar videojuegos, filtrar por categoria y agregar productos a un carrito de compras dinamico.

## Descripcion

GamerZone es una pagina web estatica desarrollada con HTML, CSS, Bootstrap y JavaScript. Los productos se cargan desde un archivo JSON local usando Fetch API y se renderizan dinamicamente en tarjetas.

El proyecto tambien incluye estilos responsivos para escritorio, tablet y movil, ademas de capturas de evidencia del funcionamiento.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Fetch API
- JSON

## Funcionalidades

- Carga de productos desde `assets/data/productos.json`.
- Visualizacion de videojuegos en tarjetas responsivas.
- Busqueda de productos por nombre.
- Filtro por categorias:
  - Aventura
  - RPG
  - Carreras
- Carrito de compras dinamico.
- Contador de productos en el carrito.
- Calculo automatico del total.
- Manejo de estados de carga, exito y error.
- Diseno adaptable para escritorio, tablet y celular.

## Estructura del proyecto

```text
Frontendl/
+-- assets/
|   +-- css/
|   |   +-- estilos.css
|   |   +-- estilos-tablet.css
|   |   +-- estilos-movil.css
|   +-- data/
|   |   +-- productos.json
|   +-- img/
|   |   +-- minecraft.jpg
|   |   +-- World_of_Warcraft.png
|   |   +-- mariokart.webp
|   +-- js/
|       +-- app.js
|       +-- script.js
+-- capturas/
+-- capturas_evidencias/
+-- index.html
+-- README.md
```

## Como ejecutar el proyecto

Como el proyecto usa Fetch API para cargar un archivo JSON local, se recomienda abrirlo mediante un servidor local.

### Opcion 1: Live Server

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extension **Live Server**.
3. Hacer clic derecho sobre `index.html`.
4. Seleccionar **Open with Live Server**.

### Opcion 2: Servidor local con Python

Desde la raiz del proyecto, ejecutar:

```bash
python -m http.server 8000
```

Luego abrir en el navegador:

```text
http://localhost:8000
```

## Archivos principales

- `index.html`: estructura principal de la pagina.
- `assets/css/estilos.css`: estilos generales del sitio.
- `assets/css/estilos-tablet.css`: ajustes responsivos para tablet.
- `assets/css/estilos-movil.css`: ajustes responsivos para celular.
- `assets/js/app.js`: logica principal del catalogo, filtros, busqueda y carrito.
- `assets/data/productos.json`: informacion de los videojuegos.
- `capturas/` y `capturas_evidencias/`: imagenes de respaldo del funcionamiento del proyecto.

## Productos incluidos

El catalogo inicial contiene:

- Minecraft
- World of Warcraft
- Mario Kart

Cada producto incluye nombre, precio, categoria, imagen y descripcion.

## Autor

Proyecto desarrollado por **Valeria Acevedo** para la asignatura de frontend.
