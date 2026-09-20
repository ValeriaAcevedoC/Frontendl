// Lista de productos obtenidos desde el archivo JSON
let productos = [];

// Productos agregados al carrito
let carrito = [];


/*
 * Inicia las funcionalidades principales de GamerZone
 * cuando el contenido de la página está disponible.
 */
document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
    cargarProductos();
    configurarBusqueda();
    configurarCategorias();
}


/*
 * Obtiene los productos desde el archivo JSON.
 * Se realizan hasta 2 intentos si ocurre un error temporal.
 */
async function cargarProductos() {

    mostrarCargando();

    try {

        productos = await obtenerProductosConReintento(2);

        mostrarProductos(productos);
        mostrarExito("Productos cargados correctamente.");

    } catch (error) {

        console.error("Error al cargar productos:", error);

        mostrarError(
            "No fue posible cargar los productos. Intenta nuevamente."
        );
    }
}


/*
 * Realiza la solicitud Fetch.
 * AbortController permite cancelar la solicitud
 * si demora más de 5 segundos.
 */
async function obtenerProductos() {

    const controlador = new AbortController();

    const timeout = setTimeout(() => {
        controlador.abort();
    }, 5000);

    try {

        const respuesta = await fetch(
            "assets/data/productos.json",
            {
                signal: controlador.signal
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );
        }

        return await respuesta.json();

    } finally {

        clearTimeout(timeout);
    }
}


/*
 * Reintenta la carga cuando ocurre un error.
 */
async function obtenerProductosConReintento(intentos) {

    let ultimoError;

    for (let intento = 1; intento <= intentos; intento++) {

        try {

            return await obtenerProductos();

        } catch (error) {

            ultimoError = error;

            console.warn(
                `Intento ${intento} de ${intentos} fallido.`
            );
        }
    }

    throw ultimoError;
}


/*
 * Muestra los productos recibidos.
 * DocumentFragment permite preparar las tarjetas antes
 * de insertarlas todas juntas en el DOM.
 */
function mostrarProductos(listaProductos) {

    const contenedor =
        document.getElementById("contenedor-productos");

    contenedor.innerHTML = "";

    const fragmento =
        document.createDocumentFragment();

    listaProductos.forEach(producto => {

        const columna =
            crearTarjetaProducto(producto);

        fragmento.appendChild(columna);
    });

    contenedor.appendChild(fragmento);
}


/*
 * Crea una tarjeta reutilizable para cada producto.
 */
function crearTarjetaProducto(producto) {

    const columna = document.createElement("div");

    columna.className =
        "col-12 col-md-6 col-lg-4";

    columna.innerHTML = `
        <div class="card h-100 shadow-sm">

            <img
                src="${producto.imagen}"
                class="card-img-top"
                alt="${producto.nombre}">

            <div class="card-body d-flex flex-column">

                <h3 class="card-title h5">
                    ${producto.nombre}
                </h3>

                <p class="card-text">
                    ${producto.descripcion}
                </p>

                <p>
                    <span class="badge text-bg-secondary">
                        ${producto.categoria}
                    </span>
                </p>

                <p class="fw-bold fs-5">
                    ${formatearPrecio(producto.precio)}
                </p>

                <button
                    class="btn btn-primary mt-auto boton-agregar"
                    type="button">
                    Agregar al carrito
                </button>

            </div>

        </div>
    `;

    const boton =
        columna.querySelector(".boton-agregar");

    boton.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });

    return columna;
}


/*
 * Agrega un producto al carrito.
 */
function agregarAlCarrito(producto) {

    carrito.push(producto);

    actualizarCarrito();
}

/*
 * Actualiza el resumen del carrito.
 * Los productos repetidos se agrupan indicando su cantidad.
 */
function actualizarCarrito() {

    const lista =
        document.getElementById("lista-carrito");

    const contador =
        document.getElementById("contador-carrito");

    const totalElemento =
        document.getElementById("total-carrito");

    lista.innerHTML = "";

    // El contador muestra la cantidad total de productos agregados
    contador.textContent = carrito.length;

    if (carrito.length === 0) {

        lista.innerHTML = `
            <p class="text-muted">
                Todavía no has agregado productos.
            </p>
        `;

        totalElemento.textContent = "$0";

        return;
    }

    /*
     * Agrupa los productos repetidos utilizando su ID.
     */
    const productosAgrupados = {};

    carrito.forEach(producto => {

        if (productosAgrupados[producto.id]) {

            productosAgrupados[producto.id].cantidad++;

        } else {

            productosAgrupados[producto.id] = {
                ...producto,
                cantidad: 1
            };
        }
    });

    const fragmento =
        document.createDocumentFragment();

    let total = 0;

    Object.values(productosAgrupados).forEach(producto => {

        const subtotal =
            producto.precio * producto.cantidad;

        total += subtotal;

        const elemento =
            document.createElement("div");

        elemento.className =
            "d-flex justify-content-between border-bottom py-2";

        elemento.innerHTML = `
            <span>
                ${producto.nombre} x${producto.cantidad}
            </span>

            <span>
                ${formatearPrecio(subtotal)}
            </span>
        `;

        fragmento.appendChild(elemento);
    });

    lista.appendChild(fragmento);

    totalElemento.textContent =
        formatearPrecio(total);
}


/*
 * Configura el formulario de búsqueda.
 */
function configurarBusqueda() {

    const formulario =
        document.getElementById("form-busqueda");

    const input =
        document.getElementById("input-busqueda");

    const mensaje =
        document.getElementById("mensaje-busqueda");

    formulario.addEventListener("submit", evento => {

        evento.preventDefault();

        const texto =
            input.value.trim().toLowerCase();

        if (texto === "") {

            mostrarProductos(productos);

            mensaje.textContent =
                "Ingresa un nombre para realizar la búsqueda.";

            mensaje.className =
                "text-center mt-3 text-danger";

            return;
        }

        const resultados =
            productos.filter(producto =>
                producto.nombre
                    .toLowerCase()
                    .includes(texto)
            );

        mostrarProductos(resultados);

        if (resultados.length === 0) {

            mensaje.textContent =
                "No se encontraron videojuegos.";

            mensaje.className =
                "text-center mt-3 text-danger";

        } else {

            mensaje.textContent =
                `${resultados.length} producto(s) encontrado(s).`;

            mensaje.className =
                "text-center mt-3 text-success";
        }
    });
}


/*
 * Permite filtrar productos desde las categorías
 * disponibles en la barra de navegación.
 */
function configurarCategorias() {

    const enlaces =
        document.querySelectorAll(".categoria-link");

    enlaces.forEach(enlace => {

        enlace.addEventListener("click", () => {

            const categoria =
                enlace.dataset.categoria;

            const resultados =
                productos.filter(producto =>
                    producto.categoria === categoria
                );

            mostrarProductos(resultados);

            document.getElementById("mensaje-busqueda")
                .textContent =
                `Mostrando categoría: ${categoria}`;
        });
    });
}


/*
 * Muestra el estado inicial de carga.
 */
function mostrarCargando() {

    const estado =
        document.getElementById("estado-productos");

    estado.className =
        "text-center my-4";

    estado.innerHTML = `
        <div
            class="spinner-border"
            role="status">
            <span class="visually-hidden">
                Cargando...
            </span>
        </div>

        <p class="mt-2">
            Cargando productos...
        </p>
    `;
}


/*
 * Muestra un mensaje cuando Fetch finaliza correctamente.
 */
function mostrarExito(mensaje) {

    const estado =
        document.getElementById("estado-productos");

    estado.className =
        "alert alert-success text-center";

    estado.textContent = mensaje;
}


/*
 * Muestra un mensaje amigable cuando ocurre un error.
 */
function mostrarError(mensaje) {

    const estado =
        document.getElementById("estado-productos");

    estado.className =
        "alert alert-danger text-center";

    estado.textContent = mensaje;
}


/*
 * Formatea los precios utilizando pesos chilenos.
 */
function formatearPrecio(precio) {

    return precio.toLocaleString(
        "es-CL",
        {
            style: "currency",
            currency: "CLP"
        }
    );
}