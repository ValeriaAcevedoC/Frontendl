# GamerZone - React eCommerce

GamerZone es un proyecto académico de una tienda de videojuegos desarrollado con React y Vite. Permite explorar un catálogo, buscar y filtrar juegos, administrar un carrito de compras, agregar o eliminar videojuegos y completar un formulario de contacto con validación.

**Sitio publicado:** [GamerZone en GitHub Pages](https://valeriaacevedoc.github.io/Frontendl/).

## Características principales

- **Migración a React y Vite:** la interfaz se organiza en componentes reutilizables y actualiza el catálogo y el carrito mediante estados de React.
- **Carga dinámica:** validación del catálogo antes de mostrarlo, botón para reintentar una carga fallida y cancelación de peticiones anteriores con `AbortController`.
- **Tarjetas sincronizadas con el carrito:** muestran la cantidad agregada y cambian el botón a «Agregar otra unidad». El indicador también se actualiza al disminuir o eliminar productos.
- **Renderizado condicional:** se muestra un indicador de carga, un mensaje de error con opción de reintento o un aviso cuando no hay resultados. Los filtros activos muestran el número de productos encontrados.
- **Gestión del catálogo:** formulario para agregar videojuegos y listado para eliminarlos, con actualización inmediata del catálogo y del carrito.
- **Contacto:** validación de nombre, correo electrónico y mensaje, con errores junto a cada campo y foco en el primer dato inválido.
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
- Imagen alternativa con el texto «Imagen no disponible» cuando una portada no se puede cargar.
- Formulario para agregar juegos con nombre, categoría, precios, imagen y descripción.
- Eliminación de videojuegos del catálogo y de todas sus unidades en el carrito.
- Formulario de contacto con campos obligatorios y confirmación de envío simulado.
- Diseño responsivo para escritorio, tablet y móvil.
- Etiquetas accesibles, avisos de cambios con `aria-live`, foco visible y respeto de la preferencia de movimiento reducido.

## Alcance del proyecto

La aplicación funciona en el navegador, sin backend ni base de datos. El carrito y los videojuegos agregados o eliminados desde la interfaz se mantienen en memoria y se reinician al recargar la página. Estos cambios no modifican el archivo JSON original.

El formulario de contacto valida los datos y muestra una confirmación simulada; no envía correos ni guarda mensajes. El carrito calcula el total de la compra, pero no incluye pago ni generación de pedidos.

## Tecnologías

- React
- React DOM
- Vite
- JavaScript y JSX
- Bootstrap 5.3.8, cargado desde CDN
- CSS3
- Fetch API y JSON
- `gh-pages` para publicar la compilación

## Organización de la aplicación

| Archivo | Responsabilidad |
| --- | --- |
| `src/App.jsx` | Carga del catálogo, estados, filtros y operaciones del carrito. |
| `src/components/Navbar.jsx` | Navegación, restablecimiento de filtros y contador del carrito. |
| `src/components/ProductList.jsx` | Lista de productos y estados de carga, error y resultados vacíos. |
| `src/components/ProductCard.jsx` | Información del producto, cantidad en el carrito y botón para agregar. |
| `src/components/Cart.jsx` | Resumen del carrito y total de la compra. |
| `src/components/CartItem.jsx` | Cantidad, subtotal y acciones sobre cada producto del carrito. |
| `src/components/ProductManager.jsx` | Formulario de alta y eliminación de videojuegos del catálogo. |
| `src/components/ContactForm.jsx` | Formulario de contacto y confirmación de envío simulado. |
| `src/components/FormField.jsx` | Campo reutilizable con etiqueta, ayuda y mensajes de validación. |
| `src/utils/productos.js` | Validación de los datos del catálogo. |
| `src/utils/formularios.js` | Validación de contacto, precios e imágenes y foco en el primer error. |

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
│   │   ├── ContactForm.jsx
│   │   ├── FormField.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductManager.jsx
│   │   └── ProductList.jsx
│   ├── utils/
│   │   ├── formularios.js
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

Se necesita Node.js `^20.19.0` o `>=22.12.0` y npm, de acuerdo con los requisitos de la versión instalada de Vite. Se requiere conexión a Internet para instalar las dependencias y cargar Bootstrap desde CDN.

Clona el repositorio y entra en su carpeta:

```bash
git clone https://github.com/ValeriaAcevedoC/Frontendl.git
cd Frontendl
```

Instala las dependencias e inicia el servidor de desarrollo:

```bash
npm ci
npm run dev
```

`npm ci` instala las versiones registradas en `package-lock.json`. Abre la dirección que indique Vite y usa la ruta base `/Frontendl/`; con el puerto predeterminado, será `http://localhost:5173/Frontendl/`.

En PowerShell, si la política de ejecución bloquea `npm.ps1`, usa `npm.cmd ci` y `npm.cmd run dev`. No es necesario cambiar la política de ejecución.

### Comandos disponibles

| Comando | Función |
| --- | --- |
| `npm ci` | Instala las dependencias del archivo de bloqueo. |
| `npm run dev` | Inicia el servidor de desarrollo con actualización automática. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve la compilación para revisarla localmente. |
| `npm run deploy` | Compila y publica `dist/` en la rama `gh-pages`. |

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

### Gestión desde la interfaz

En la sección **Gestionar videojuegos**, completa los campos y pulsa **Agregar videojuego**. El identificador se asigna automáticamente, los filtros se limpian para mostrar el nuevo juego y las categorías se actualizan. Si se escribe una categoría existente con distintas mayúsculas, se reutiliza la del catálogo.

El formulario exige precios enteros mayores que cero en CLP y una oferta que no supere el precio normal. La imagen puede ser una URL HTTP/HTTPS o una ruta local como `img/minecraft.jpg`; una ruta local debe corresponder a un archivo existente en `assets/img/`.

Usa **Eliminar del catálogo** para retirar un juego y sus unidades del carrito. Para conservar los cambios después de recargar, edita `assets/data/productos.json` y vuelve a publicar la aplicación.

### Formulario de contacto

La sección **Contacto** solicita nombre (hasta 100 caracteres), correo válido (hasta 254 caracteres) y mensaje (hasta 2000 caracteres). Al enviar datos válidos, muestra la confirmación de simulación y limpia los campos. Si hay errores, los muestra junto a cada campo y enfoca el primero.

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

## Verificación manual

El proyecto no tiene un script de pruebas automatizadas. Para revisar sus funciones:

1. Abre la página y comprueba que el catálogo carga sus imágenes y precios.
2. Combina una búsqueda con una categoría, busca un nombre inexistente y pulsa **Limpiar filtros**.
3. Agrega varias unidades al carrito, disminuye cantidades y elimina productos; comprueba el contador y el total.
4. Intenta agregar un videojuego con campos vacíos o precios inválidos y luego con datos válidos.
5. Elimina un juego que esté en el carrito y comprueba que desaparece de ambos lugares.
6. Envía el formulario de contacto con datos inválidos y luego válidos para comprobar errores y confirmación simulada.
7. Recarga la página para comprobar que vuelve el catálogo original y se vacía el carrito.
8. Revisa la interfaz en tamaños de escritorio, tablet y móvil.

Ejecuta `npm run build` para comprobar que la aplicación compila antes de publicarla.

## Evidencias

- `capturas/`: vistas de escritorio, tablet y móvil.
- `capturas_evidencias/semana5/` y `semana6/`: evidencias de las etapas anteriores del proyecto.
- `capturas_evidencias/semana8/`: carga dinámica con JSON y Fetch API, filtros, estado sin resultados y carrito antes y después de modificar cantidades.

## Autor

Proyecto desarrollado por **Valeria Acevedo** para la asignatura Desarrollo Frontend I (PFY2201).
