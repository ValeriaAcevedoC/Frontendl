# GamerZone - React eCommerce

GamerZone es una tienda de videojuegos desarrollada con React y Vite. La aplicación muestra un catálogo, permite buscar y filtrar productos, y administra un carrito de compras mediante estados de React.

## Funcionalidades

- Catálogo cargado desde un archivo JSON mediante Fetch API.
- Nombre, descripción, imagen, categoría, precio normal y precio de oferta.
- Búsqueda de productos por nombre.
- Filtro por categoría.
- Carrito administrado con `useState`.
- Botones para agregar, disminuir o eliminar productos.
- Contador de unidades y cálculo automático del total.
- Estados de carga, error, carrito vacío y búsqueda sin resultados.
- Diseño responsivo para escritorio, tablet y móvil.
- Configuración para desplegar en la rama `gh-pages`.

## Tecnologías

- React
- Vite
- JavaScript y JSX
- Bootstrap 5
- CSS3
- Fetch API y JSON

## Estructura principal

```text
Frontendl/
├── assets/
│   ├── data/productos.json
│   └── img/
├── src/
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductList.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

## Ejecución local

Se necesita una versión de Node.js compatible con Vite.

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación, normalmente `http://localhost:5173`.

## Compilación de producción

```bash
npm run build
npm run preview
```

La compilación queda en la carpeta `dist`.

## Despliegue en GitHub Pages

El archivo `vite.config.js` usa la ruta base `/Frontendl/`, correspondiente al nombre de este repositorio.

```bash
npm run deploy
```

Este comando compila la aplicación y publica `dist` en la rama `gh-pages`. En la configuración del repositorio se debe seleccionar **Deploy from a branch**, rama **gh-pages** y carpeta **/(root)**.

## Autor

Proyecto desarrollado por **Valeria Acevedo** para la asignatura Desarrollo Frontend I (PFY2201).
