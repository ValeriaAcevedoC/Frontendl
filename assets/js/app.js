// ===============================
// VARIABLES GLOBALES
// ===============================

let productos = [];
let carrito = [];


// ===============================
// INICIO DE LA PÁGINA
// ===============================

document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
    cargarProductos();
    configurarBusqueda();
    configurarCategorias();
    configurarMostrarTodos();
}


// ===============================
// CARGAR PRODUCTOS CON FETCH
// ===============================

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


// ===============================
// FETCH CON TIMEOUT
// ===============================

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


// ===============================
// REINTENTOS DE FETCH
// ===============================

async function obtenerProductosConReintento(intentos) {

    let ultimoError;

    for (
        let intento = 1;
        intento <= intentos;
        intento++
    ) {

        try {

            return await obtenerProductos();

        } catch (error) {

            ultimoError = error;

            console.warn(
                `Intento ${intento} fallido.`,
                error
            );
        }
    }

    throw ultimoError;
}


// ===============================
// MOSTRAR PRODUCTOS
// ===============================

function mostrarProductos(listaProductos) {

    const contenedor =
        document.getElementById(
            "contenedor-productos"
        );

    contenedor.innerHTML = "";

    const fragmento =
        document.createDocumentFragment();

    listaProductos.forEach(producto => {

        const tarjeta =
            crearTarjetaProducto(producto);

        fragmento.appendChild(tarjeta);
    });

    contenedor.appendChild(fragmento);
}


// ===============================
// CREAR TARJETA DE PRODUCTO
// ===============================

function crearTarjetaProducto(producto) {

    const columna =
        document.createElement("div");

    columna.className =
        "col-12 col-md-6 col-lg-4";

    columna.innerHTML = `
        <div class="card h-100 shadow-sm">

            <img
                src="${producto.imagen}"
                class="card-img-top"
                alt="${producto.nombre}"
            >

            <div class="card-body d-flex flex-column">

                <h3 class="card-title h5">
                    ${producto.nombre}
                </h3>

                <p class="card-text">
                    ${producto.descripcion}
                </p>

                <p>
                    <span class="badge bg-secondary">
                        ${producto.categoria}
                    </span>
                </p>

                <p class="fw-bold fs-5">
                    ${formatearPrecio(producto.precio)}
                </p>

                <button
                    class="btn btn-primary mt-auto boton-agregar"
                    type="button"
                >
                    Agregar al carrito
                </button>

            </div>

        </div>
    `;

    const boton =
        columna.querySelector(
            ".boton-agregar"
        );

    boton.addEventListener(
        "click",
        () => agregarAlCarrito(producto)
    );

    return columna;
}


// ===============================
// AGREGAR PRODUCTO AL CARRITO
// ===============================

function agregarAlCarrito(producto) {

    carrito.push(producto);

    actualizarCarrito();
}


// ===============================
// ACTUALIZAR CARRITO
// ===============================

function actualizarCarrito() {

    const lista =
        document.getElementById(
            "lista-carrito"
        );

    const contador =
        document.getElementById(
            "contador-carrito"
        );

    const totalElemento =
        document.getElementById(
            "total-carrito"
        );

    contador.textContent =
        carrito.length;

    lista.innerHTML = "";

    if (carrito.length === 0) {

        lista.innerHTML = `
            <p class="text-muted">
                No hay productos en el carrito.
            </p>
        `;

        totalElemento.textContent = "$0";

        return;
    }

    // Agrupar productos repetidos
    const productosAgrupados = {};

    carrito.forEach(producto => {

        if (productosAgrupados[producto.id]) {

            productosAgrupados[
                producto.id
            ].cantidad++;

        } else {

            productosAgrupados[
                producto.id
            ] = {
                ...producto,
                cantidad: 1
            };
        }
    });

    const fragmento =
        document.createDocumentFragment();

    let total = 0;

    Object.values(
        productosAgrupados
    ).forEach(producto => {

        const subtotal =
            producto.precio *
            producto.cantidad;

        total += subtotal;

        const fila =
            document.createElement("div");

        fila.className =
            "d-flex justify-content-between mb-2";

        fila.innerHTML = `
            <span>
                ${producto.nombre}
                x${producto.cantidad}
            </span>

            <span>
                ${formatearPrecio(subtotal)}
            </span>
        `;

        fragmento.appendChild(fila);
    });

    lista.appendChild(fragmento);

    totalElemento.textContent =
        formatearPrecio(total);
}


// ===============================
// BUSCADOR DE PRODUCTOS
// ===============================

function configurarBusqueda() {

    const formulario =
        document.getElementById(
            "form-busqueda"
        );

    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            const texto =
                document
                    .getElementById(
                        "input-busqueda"
                    )
                    .value
                    .toLowerCase()
                    .trim();

            const mensaje =
                document.getElementById(
                    "mensaje-busqueda"
                );

            if (texto === "") {

                mostrarProductos(productos);

                mensaje.textContent =
                    "Ingresa un nombre para buscar.";

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
        }
    );
}


// ===============================
// FILTRAR POR CATEGORÍA
// ===============================

function configurarCategorias() {

    const enlaces =
        document.querySelectorAll(
            ".categoria-link"
        );

    enlaces.forEach(enlace => {

        enlace.addEventListener(
            "click",
            function () {

                const categoria =
                    this.dataset.categoria;

                const productosFiltrados =
                    productos.filter(
                        producto =>
                            producto.categoria ===
                            categoria
                    );

                mostrarProductos(
                    productosFiltrados
                );

                const mensaje =
                    document.getElementById(
                        "mensaje-busqueda"
                    );

                mensaje.textContent =
                    `Mostrando categoría: ${categoria}`;

                mensaje.className =
                    "text-center mt-3 text-success";
            }
        );
    });
}


// ===============================
// MOSTRAR TODOS LOS PRODUCTOS
// ===============================

function configurarMostrarTodos() {

    const enlace =
        document.getElementById(
            "mostrar-todos"
        );

    enlace.addEventListener(
        "click",
        function () {

            mostrarProductos(productos);

            document.getElementById(
                "input-busqueda"
            ).value = "";

            const mensaje =
                document.getElementById(
                    "mensaje-busqueda"
                );

            mensaje.textContent =
                "Mostrando todos los productos.";

            mensaje.className =
                "text-center mt-3 text-success";
        }
    );
}


// ===============================
// ESTADOS DE CARGA
// ===============================

function mostrarCargando() {

    const estado =
        document.getElementById(
            "estado-productos"
        );

    estado.innerHTML = `
        <div
            class="spinner-border"
            role="status"
        >
            <span class="visually-hidden">
                Cargando...
            </span>
        </div>

        <p class="mt-2">
            Cargando productos...
        </p>
    `;
}


function mostrarExito(mensaje) {

    const estado =
        document.getElementById(
            "estado-productos"
        );

    estado.innerHTML = `
        <div class="alert alert-success">
            ${mensaje}
        </div>
    `;
}


function mostrarError(mensaje) {

    const estado =
        document.getElementById(
            "estado-productos"
        );

    estado.innerHTML = `
        <div class="alert alert-danger">
            ${mensaje}
        </div>
    `;
}


// ===============================
// FORMATO DE PRECIOS
// ===============================

function formatearPrecio(precio) {

    return precio.toLocaleString(
        "es-CL",
        {
            style: "currency",
            currency: "CLP"
        }
    );
}