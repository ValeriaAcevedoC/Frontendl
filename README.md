# GamerZone - React eCommerce

GamerZone es una tienda de videojuegos desarrollada con React y Vite. La aplicación muestra un catálogo, permite buscar y filtrar productos, y administra un carrito de compras mediante estados de React.

**Sitio publicado:** [GamerZone en GitHub Pages](https://valeriaacevedoc.github.io/Frontendl/).

## Cambios recientes

- **Migración a React y Vite:** la interfaz se organiza en componentes reutilizables y actualiza el catálogo y el carrito mediante estados de React.
- **Mejoras de la semana 8:** validación del catálogo antes de mostrarlo, botón para reintentar una carga fallida y cancelación de peticiones anteriores con `AbortController`.
- **Tarjetas sincronizadas con el carrito:** muestran la cantidad agregada y cambian el botón a «Agregar otra unidad». El indicador también se actualiza al disminuir o eliminar productos.
- **Renderizado condicional:** se muestra un indicador de carga, un mensaje de error con opción de reintento o un aviso cuando no hay resultados. Los filtros activos muestran el número de productos encontrados.
- **Evidencias de la semana 8:** capturas de carga dinámica, filtros, búsqueda sin resultados y modificación de cantidades en el carrito.
- **Publicación en GitHub Pages:** la versión de producción se genera con Vite y se despliega en la rama `gh-pages`.

## Funcionalidades

- Catálogo cargado desde `assets/data/productos.json` mediante Fetch API y `useEffect`.
- Validación de identificadores únicos, campos de texto obligatorios y precios numéricos no negativos.
- Nombre, descripción, imagen, categoría, precio normal y precio de oferta.
- Búsqueda por nombre mientras se escribe, sin distinguir mayúsculas y minúsculas.
- Categorías obtenidas del catálogo y filtro combinado con la búsqueda.
- Botón «Inicio» o «GamerZone» para restablecer la búsqueda y mostrar todos los productos.
- Carrito administrado con `useState`.
- Botones para agregar, disminuir o eliminar productos.
- Eliminación automática del producto cuando su cantidad llega a cero.
- Cantidad por producto en las tarjetas, contador de unidades en la navegación y cálculo automático de subtotales y total usando el precio de oferta.
- Precios en pesos chilenos (`CLP`), con formato `es-CL`.
- Estados de carga, error con reintento, carrito vacío y búsqueda sin resultados.
- Diseño responsivo para escritorio, tablet y móvil.
- Etiquetas accesibles, avisos de cambios con `aria-live`, foco visible y respeto de la preferencia de movimiento reducido.

El carrito se mantiene en memoria durante el uso de la página y se reinicia al recargarla.

## Tecnologías

- React
- React DOM
- Vite
- JavaScript y JSX
- Bootstrap 5
- CSS3
- Fetch API y JSON
- `gh-pages` para publicar la compilación

## Organización de la aplicación

| Archivo | Responsabilidad |
| --- | --- |
| `src/App.jsx` | Carga del catálogo, estados, filtros y operaciones del carrito. |
| `src/components/Navbar.jsx` | Categorías, restablecimiento de filtros y contador del carrito. |
| `src/components/ProductList.jsx` | Lista de productos y estados de carga, error y resultados vacíos. |
| `src/components/ProductCard.jsx` | Información del producto, cantidad en el carrito y botón para agregar. |
| `src/components/Cart.jsx` | Resumen del carrito y total de la compra. |
| `src/components/CartItem.jsx` | Cantidad, subtotal y acciones sobre cada producto del carrito. |
| `src/utils/productos.js` | Validación de los datos del catálogo. |

`useState` administra el estado de la interfaz, `useEffect` realiza la carga de datos y `useMemo` calcula las categorías y los resultados de los filtros. Las actualizaciones del carrito usan el estado anterior sin modificarlo directamente.

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
│   ├── utils/
│   │   └── productos.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── capturas/
├── capturas_evidencias/
│   ├── semana5/
│   ├── semana6/
│   └── semana8/
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Ejecución local

Se necesita Node.js `20.19.x` o posterior de la rama 20, o `22.12.0` o posterior, y npm, de acuerdo con los requisitos de la versión instalada de Vite.

```bash
npm ci
npm run dev
```

`npm ci` instala las versiones registradas en `package-lock.json`. Abre la dirección que indique Vite y usa la ruta base `/Frontendl/`; con el puerto predeterminado, será `http://localhost:5173/Frontendl/`.

## Catálogo de productos

Para agregar o modificar videojuegos, edita `assets/data/productos.json` y coloca las imágenes en `assets/img/`. Cada producto debe seguir esta estructura:

```json
{
  "id": 1,
  "nombre": "Minecraft",
  "precioNormal": 24990,
  "precioOferta": 19990,
  "categoria": "Aventura",
  "imagen": "img/minecraft.jpg",
  "descripcion": "Explora, construye y vive aventuras en un mundo lleno de posibilidades."
}
```

El catálogo debe ser un arreglo JSON. Cada `id` debe ser un entero positivo seguro y único; los textos deben tener contenido y ambos precios deben ser números finitos no negativos. Si falla la solicitud o la validación, la interfaz muestra un error y permite reintentar.

Vite utiliza `assets/` como directorio público, por lo que copia el catálogo y las imágenes a `dist/data/` y `dist/img/`. La carga del JSON usa `import.meta.env.BASE_URL` para respetar la ruta de GitHub Pages.

## Compilación de producción

```bash
npm run build
npm run preview
```

La compilación queda en la carpeta `dist`. Para revisarla, abre la URL que indique la vista previa con la ruta `/Frontendl/`.

## Despliegue en GitHub Pages

El archivo `vite.config.js` usa la ruta base `/Frontendl/`, correspondiente al nombre de este repositorio. El remoto `origin` debe apuntar al repositorio y se necesitan permisos de escritura en GitHub.

```bash
npm run deploy
```

Este comando ejecuta `predeploy` para compilar la aplicación y luego publica `dist` en la rama `gh-pages`. En **Settings → Pages** del repositorio se debe seleccionar **Deploy from a branch**, rama **gh-pages** y carpeta **/(root)**.

Para actualizar el sitio después de modificar el código o el catálogo, vuelve a ejecutar `npm run deploy`. La publicación de `dist` es independiente de guardar los cambios del código fuente en `main`.

## Evidencias

- `capturas/`: vistas de escritorio, tablet y móvil.
- `capturas_evidencias/semana5/` y `semana6/`: evidencias de las etapas anteriores del proyecto.
- `capturas_evidencias/semana8/`: carga dinámica con JSON y Fetch API, filtros, estado sin resultados y carrito antes y después de modificar cantidades.

## Autor

Proyecto desarrollado por **Valeria Acevedo** para la asignatura Desarrollo Frontend I (PFY2201).
