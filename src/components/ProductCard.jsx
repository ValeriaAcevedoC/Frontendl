function ProductCard({ producto, alAgregar, formatearPrecio }) {
  return (
    <article className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm tarjeta-producto">
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={`Portada de ${producto.nombre}`}
        />

        <div className="card-body d-flex flex-column">
          <h3 className="card-title h5">{producto.nombre}</h3>
          <p className="card-text">{producto.descripcion}</p>
          <p>
            <span className="badge bg-secondary">{producto.categoria}</span>
          </p>
          <p className="precio-normal mb-1">
            Precio normal: <del>{formatearPrecio(producto.precioNormal)}</del>
          </p>
          <p className="precio-oferta fw-bold fs-4">
            Oferta: {formatearPrecio(producto.precioOferta)}
          </p>

          <button
            className="btn btn-primary mt-auto"
            type="button"
            onClick={() => alAgregar(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
