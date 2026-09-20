// ==============================
// SECCIÓN DE OFERTAS
// ==============================

// Función que crea dinámicamente la sección de ofertas
function crearSeccionOfertas() {

    const seccionOfertas = document.createElement("section");
    seccionOfertas.id = "ofertas";
    seccionOfertas.className = "container my-5";

    // Crear título de la sección
    const titulo = document.createElement("h2");
    titulo.textContent = "Ofertas GamerZone";
    titulo.className = "text-center mb-4";

    // Crear descripción
    const descripcion = document.createElement("p");
    descripcion.textContent =
        "Descubre promociones especiales en nuestros videojuegos destacados.";
    descripcion.className = "text-center";

    // Crear botón para mostrar la oferta
    const botonOferta = document.createElement("button");
    botonOferta.textContent = "Ver oferta";
    botonOferta.className = "btn btn-primary d-block mx-auto mt-3";

    // Crear mensaje oculto de la oferta
    const mensajeOferta = document.createElement("p");
    mensajeOferta.textContent =
        "¡Oferta especial! 20% de descuento en juegos seleccionados.";
    mensajeOferta.className = "text-center mt-3";
    mensajeOferta.style.display = "none";

    // Evento click para mostrar u ocultar la oferta
    botonOferta.addEventListener("click", function () {

        if (mensajeOferta.style.display === "none") {

            mensajeOferta.style.display = "block";
            botonOferta.textContent = "Ocultar oferta";

        } else {

            mensajeOferta.style.display = "none";
            botonOferta.textContent = "Ver oferta";
        }
    });

    // Agregar elementos a la sección
    seccionOfertas.appendChild(titulo);
    seccionOfertas.appendChild(descripcion);
    seccionOfertas.appendChild(botonOferta);
    seccionOfertas.appendChild(mensajeOferta);

    // Insertar la sección antes del footer
    const footer = document.querySelector("footer");
    document.body.insertBefore(seccionOfertas, footer);
}


// ==============================
// EVENTOS DE LAS TARJETAS
// ==============================

// Función que agrega los eventos mouseover y mouseout a una tarjeta
function agregarEventoTarjeta(tarjeta) {

    // Evento mouseover: agranda y agrega sombra
    tarjeta.addEventListener("mouseover", function () {

        tarjeta.style.transform = "scale(1.05)";
        tarjeta.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
        tarjeta.style.transition = "0.3s";
    });

    // Evento mouseout: vuelve al estado original
    tarjeta.addEventListener("mouseout", function () {

        tarjeta.style.transform = "scale(1)";
        tarjeta.style.boxShadow = "none";
    });
}


// Función que aplica los eventos a las tarjetas existentes
function agregarEventosTarjetas() {

    const tarjetas = document.querySelectorAll(".card");

    tarjetas.forEach(function (tarjeta) {

        agregarEventoTarjeta(tarjeta);
    });
}


// ==============================
// FORMULARIO DE NOVEDADES
// ==============================

// Función que crea dinámicamente el formulario
function crearFormulario() {

    const seccionFormulario = document.createElement("section");
    seccionFormulario.id = "novedades";
    seccionFormulario.className = "container my-5";

    // Crear título
    const titulo = document.createElement("h2");
    titulo.textContent = "Recibe novedades de GamerZone";
    titulo.className = "text-center mb-4";

    // Crear formulario
    const formulario = document.createElement("form");
    formulario.className = "mx-auto";
    formulario.style.maxWidth = "500px";

    formulario.innerHTML = `
        <div class="mb-3">
            <label for="nombre" class="form-label">
                Nombre
            </label>

            <input
                type="text"
                class="form-control"
                id="nombre"
            >
        </div>

        <div class="mb-3">
            <label for="correo" class="form-label">
                Correo electrónico
            </label>

            <input
                type="email"
                class="form-control"
                id="correo"
            >
        </div>

        <button
            type="submit"
            class="btn btn-success"
        >
            Suscribirme
        </button>

        <p
            id="mensajeFormulario"
            class="mt-3"
        ></p>
    `;

    // Agregar elementos a la sección
    seccionFormulario.appendChild(titulo);
    seccionFormulario.appendChild(formulario);

    // Insertar antes del footer
    const footer = document.querySelector("footer");
    document.body.insertBefore(seccionFormulario, footer);

    // Evento submit del formulario
    formulario.addEventListener("submit", function (evento) {

        // Evitar que la página se recargue
        evento.preventDefault();

        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const mensaje =
            document.getElementById("mensajeFormulario");

        // Validar que los campos estén completos
        if (nombre === "" || correo === "") {

            mensaje.textContent =
                "Por favor, completa todos los campos.";

            mensaje.className =
                "mt-3 text-danger";

            return;
        }

        // Mostrar mensaje de éxito
        mensaje.textContent =
            "¡Gracias " +
            nombre +
            "! Te has suscrito correctamente.";

        mensaje.className =
            "mt-3 text-success";

        // Limpiar campos
        formulario.reset();
    });
}


// ==============================
// FETCH API
// ==============================

// Función que obtiene productos desde un archivo JSON
function cargarProductos() {

    fetch("data/productos.json")

        // Procesar respuesta
        .then(function (respuesta) {

            // Comprobar que la petición fue correcta
            if (!respuesta.ok) {

                throw new Error(
                    "No fue posible cargar los productos."
                );
            }

            return respuesta.json();
        })

        // Procesar productos obtenidos
        .then(function (productos) {

            // Crear sección
            const seccion = document.createElement("section");

            seccion.id = "productos-api";
            seccion.className = "container my-5";

            // Crear título
            const titulo = document.createElement("h2");

            titulo.textContent = "Más juegos";
            titulo.className = "text-center mb-4";

            // Crear contenedor Bootstrap
            const contenedor =
                document.createElement("div");

            contenedor.className = "row";

            seccion.appendChild(titulo);
            seccion.appendChild(contenedor);

            // Recorrer productos del JSON
            productos.forEach(function (producto) {

                // Crear columna
                const columna =
                    document.createElement("div");

                columna.className =
                    "col-md-4 mb-3";

                // Crear tarjeta
                const tarjeta =
                    document.createElement("div");

                tarjeta.className =
                    "card h-100";

                // Crear cuerpo de tarjeta
                const cuerpo =
                    document.createElement("div");

                cuerpo.className =
                    "card-body";

                // Nombre
                const nombre =
                    document.createElement("h3");

                nombre.className =
                    "card-title";

                nombre.textContent =
                    producto.nombre;

                // Categoría
                const categoria =
                    document.createElement("p");

                categoria.textContent =
                    "Categoría: " +
                    producto.categoria;

                // Precio
                const precio =
                    document.createElement("p");

                if (producto.precio === 0) {

                    precio.textContent =
                        "Precio: Gratis";

                } else {

                    precio.textContent =
                        "Precio: $" +
                        producto.precio.toLocaleString(
                            "es-CL"
                        );
                }

                // Agregar contenido
                cuerpo.appendChild(nombre);
                cuerpo.appendChild(categoria);
                cuerpo.appendChild(precio);

                tarjeta.appendChild(cuerpo);
                columna.appendChild(tarjeta);
                contenedor.appendChild(columna);

                // Agregar también el evento mouseover
                // a las tarjetas creadas mediante Fetch
                agregarEventoTarjeta(tarjeta);
            });

            // Insertar sección antes del footer
            const footer =
                document.querySelector("footer");

            document.body.insertBefore(
                seccion,
                footer
            );
        })

        // Manejo de errores
        .catch(function (error) {

            console.error(
                "Error al cargar productos:",
                error
            );

            // Crear mensaje de error visible
            const mensajeError =
                document.createElement("p");

            mensajeError.textContent =
                "No se pudieron cargar los productos adicionales.";

            mensajeError.className =
                "text-center text-danger my-4";

            const footer =
                document.querySelector("footer");

            document.body.insertBefore(
                mensajeError,
                footer
            );
        });
}


// ==============================
// INICIO DE LA PÁGINA
// ==============================

// Función principal que inicia todas las funcionalidades
function iniciarPagina() {

    crearSeccionOfertas();

    agregarEventosTarjetas();

    crearFormulario();

    cargarProductos();
}


// Ejecutar JavaScript cuando el DOM termine de cargar
document.addEventListener(
    "DOMContentLoaded",
    iniciarPagina
);