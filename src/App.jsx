import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";
import ContactForm from "./components/ContactForm.jsx";
import ProductManager from "./components/ProductManager.jsx";
import { validarProductos } from "./utils/productos.js";

const formatearPrecio = (precio) =>
  precio.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intentoCarga, setIntentoCarga] = useState(0);
  const siguienteId = useRef(1);

  // Carga el JSON al iniciar y repite la petición cuando se solicita un reintento.
  useEffect(() => {
    const controlador = new AbortController();

    async function cargarProductos() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch(
          `${import.meta.env.BASE_URL}data/productos.json`,
          { signal: controlador.signal },
        );

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = validarProductos(await respuesta.json());
        if (!controlador.signal.aborted) {
          siguienteId.current = datos.reduce(
            (maximo, producto) => Math.max(maximo, producto.id),
            0,
          ) + 1;
          setProductos(datos);
        }
      } catch (errorCarga) {
        if (!controlador.signal.aborted) {
          console.error("Error al cargar productos:", errorCarga);
          setError("No fue posible cargar los productos. Intenta nuevamente.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarProductos();
    // Cancela la petición anterior al desmontar o iniciar una nueva carga.
    return () => controlador.abort();
  }, [intentoCarga]);

  function reintentarCarga() {
    setCargando(true);
    setError("");
    setIntentoCarga((intentoActual) => intentoActual + 1);
  }

  // Obtiene las categorías del catálogo sin duplicarlas.
  const categorias = useMemo(
    () => [...new Set(productos.map((producto) => producto.categoria))],
    [productos],
  );

  // Combina la búsqueda por nombre y la categoría seleccionada.
  const productosFiltrados = useMemo(() => {
    const texto = busqueda.toLocaleLowerCase("es").trim();

    return productos.filter((producto) => {
      const coincideCategoria =
        categoria === "" || producto.categoria === categoria;
      const coincideBusqueda = producto.nombre
        .toLocaleLowerCase("es")
        .includes(texto);

      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, categoria, productos]);

  // El contador y el total se calculan desde el carrito para mantenerlos sincronizados.
  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  );

  const totalCarrito = carrito.reduce(
    (total, producto) =>
      total + producto.precioOferta * producto.cantidad,
    0,
  );

  // Actualiza el estado anterior sin modificarlo: aumenta unidades o agrega un producto.
  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id,
      );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  }

  // Al quitar la última unidad, el producto también desaparece del carrito.
  function disminuirCantidad(idProducto) {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === idProducto
            ? { ...item, cantidad: item.cantidad - 1 }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  }

  // Elimina todas las unidades del producto seleccionado.
  function eliminarDelCarrito(idProducto) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== idProducto),
    );
  }

  function mostrarTodos() {
    setCategoria("");
    setBusqueda("");
  }

  function agregarVideojuego(datos) {
    const producto = { ...datos, id: siguienteId.current++ };
    setProductos((catalogoActual) => [...catalogoActual, producto]);
    mostrarTodos();
  }

  function eliminarVideojuego(idProducto) {
    setProductos((catalogoActual) =>
      catalogoActual.filter((producto) => producto.id !== idProducto),
    );
    eliminarDelCarrito(idProducto);
    // Restablece la categoría si ya no tiene videojuegos disponibles.
    const categoriaDisponible = productos.some(
      (producto) => producto.id !== idProducto && producto.categoria === categoria,
    );
    if (!categoriaDisponible) {
      setCategoria("");
    }
  }

  return (
    <>
      <Navbar
        cantidadCarrito={cantidadTotal}
        alMostrarTodos={mostrarTodos}
      />

      <header id="inicio" className="text-center py-5">
        <div className="container">
          <h1 className="fw-bold">GamerZone</h1>
          <p className="lead mb-0">Tu tienda de videojuegos</p>
        </div>
      </header>

      <main>
        <section className="container my-4" aria-labelledby="titulo-productos">
          <form
            className="row justify-content-center g-2"
            role="search"
            onSubmit={(evento) => evento.preventDefault()}
          >
            <div className="col-12 col-md-6">
              <label htmlFor="busqueda" className="form-label">
                Buscar videojuego
              </label>
              <input
                id="busqueda"
                type="search"
                className="form-control"
                placeholder="Buscar videojuego..."
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="categoria" className="form-label">
                Categoría
              </label>
              <select
                id="categoria"
                className="form-select"
                value={categoria}
                onChange={(evento) => setCategoria(evento.target.value)}
                disabled={cargando || Boolean(error)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-2 d-flex align-items-end">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={mostrarTodos}
              >
                Limpiar filtros
              </button>
            </div>
          </form>
        </section>

        <ProductList
          productos={productosFiltrados}
          carrito={carrito}
          cargando={cargando}
          error={error}
          alReintentar={reintentarCarga}
          busqueda={busqueda}
          categoria={categoria}
          catalogoVacio={productos.length === 0}
          alAgregar={agregarAlCarrito}
          formatearPrecio={formatearPrecio}
        />

        <Cart
          productos={carrito}
          total={totalCarrito}
          alAgregar={agregarAlCarrito}
          alDisminuir={disminuirCantidad}
          alEliminar={eliminarDelCarrito}
          formatearPrecio={formatearPrecio}
        />

        <ProductManager
          productos={productos}
          categorias={categorias}
          cargando={cargando}
          error={error}
          alAgregar={agregarVideojuego}
          alEliminar={eliminarVideojuego}
        />
        <ContactForm />
      </main>

      <footer className="pie-pagina text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-1">GamerZone - Tienda de Videojuegos</p>
          <p className="mb-1">
            Contacto:{" "}
            <a href="mailto:contacto@gamerzone.cl">contacto@gamerzone.cl</a>
          </p>
          <p className="mb-0">Síguenos en nuestras redes sociales</p>
        </div>
      </footer>
    </>
  );
}

export default App;
