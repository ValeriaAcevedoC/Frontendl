import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import ProductList from "./components/ProductList.jsx";
import Cart from "./components/Cart.jsx";

const formatearPrecio = (precio) =>
  precio.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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

        setProductos(await respuesta.json());
      } catch (errorCarga) {
        if (errorCarga.name !== "AbortError") {
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
    return () => controlador.abort();
  }, []);

  const categorias = useMemo(
    () => [...new Set(productos.map((producto) => producto.categoria))],
    [productos],
  );

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.toLocaleLowerCase("es").trim();

    return productos.filter((producto) => {
      const coincideCategoria =
        categoria === "Todos" || producto.categoria === categoria;
      const coincideBusqueda = producto.nombre
        .toLocaleLowerCase("es")
        .includes(texto);

      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, categoria, productos]);

  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  );

  const totalCarrito = carrito.reduce(
    (total, producto) =>
      total + producto.precioOferta * producto.cantidad,
    0,
  );

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

  function eliminarDelCarrito(idProducto) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== idProducto),
    );
  }

  function mostrarTodos() {
    setCategoria("Todos");
    setBusqueda("");
  }

  return (
    <>
      <Navbar
        cantidadCarrito={cantidadTotal}
        categorias={categorias}
        categoriaActiva={categoria}
        alSeleccionarCategoria={setCategoria}
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
            <div className="col-12 col-md-7">
              <label htmlFor="busqueda" className="visually-hidden">
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
          </form>
        </section>

        <ProductList
          productos={productosFiltrados}
          cargando={cargando}
          error={error}
          busqueda={busqueda}
          categoria={categoria}
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
      </main>

      <footer id="contacto" className="text-white text-center py-4 mt-5">
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
