import ProductCard from "./ProductCard.jsx";

function ProductList({
  productos,
  carrito,
  cargando,
  error,
  alReintentar,
  busqueda,
  categoria,
  alAgregar,
  formatearPrecio,
}) {
  let contenido;

  // Muestra el contenido adecuado según la carga, el error o los resultados.
  if (cargando) {
    contenido = (
      <div className="text-center py-5" role="status">
        <div className="spinner-border text-primary" aria-hidden="true" />
        <p className="mt-2 mb-0">Cargando productos...</p>
      </div>
    );
  } else if (error) {
    contenido = (
      <div className="alert alert-danger text-center" role="alert">
        <p className="mb-3">{error}</p>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={alReintentar}
        >
          Reintentar
        </button>
      </div>
    );
  } else if (productos.length === 0) {
    contenido = (
      <div className="alert alert-info text-center" role="status">
        No se encontraron videojuegos con esos criterios.
      </div>
    );
  } else {
    contenido = (
      <div className="row g-4">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            cantidadEnCarrito={
              carrito.find((item) => item.id === producto.id)?.cantidad ?? 0
            }
            alAgregar={alAgregar}
            formatearPrecio={formatearPrecio}
          />
        ))}
      </div>
    );
  }

  const filtroActivo = busqueda.trim() || categoria !== "Todos";

  return (
    <section id="productos" className="container my-5" aria-live="polite">
      <h2 id="titulo-productos" className="text-center mb-3">
        Nuestros videojuegos
      </h2>
      {filtroActivo && !cargando && !error && (
        <p className="text-center text-muted mb-4">
          {productos.length} producto(s) encontrado(s)
        </p>
      )}
      {contenido}
    </section>
  );
}

export default ProductList;
