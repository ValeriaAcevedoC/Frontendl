function CartItem({
  producto,
  alAgregar,
  alDisminuir,
  alEliminar,
  formatearPrecio,
}) {
  const subtotal = producto.precioOferta * producto.cantidad;

  return (
    <article className="carrito-item py-3">
      <div>
        <h3 className="h6 mb-1">{producto.nombre}</h3>
        <span className="text-muted">
          {formatearPrecio(producto.precioOferta)} cada uno
        </span>
      </div>

      <div className="controles-cantidad" aria-label={`Cantidad de ${producto.nombre}`}>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => alDisminuir(producto.id)}
          aria-label={`Quitar una unidad de ${producto.nombre}`}
        >
          −
        </button>
        <span className="cantidad" aria-live="polite">
          {producto.cantidad}
        </span>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => alAgregar(producto)}
          aria-label={`Agregar otra unidad de ${producto.nombre}`}
        >
          +
        </button>
      </div>

      <strong>{formatearPrecio(subtotal)}</strong>

      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={() => alEliminar(producto.id)}
      >
        Eliminar
      </button>
    </article>
  );
}

export default CartItem;
