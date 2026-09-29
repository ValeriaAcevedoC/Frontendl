import CartItem from "./CartItem.jsx";

function Cart({
  productos,
  total,
  alAgregar,
  alDisminuir,
  alEliminar,
  formatearPrecio,
}) {
  return (
    <section id="carrito" className="container my-5" aria-labelledby="titulo-carrito">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 id="titulo-carrito" className="card-title mb-4">
            🛒 Resumen del carrito
          </h2>

          {productos.length === 0 ? (
            <p className="text-muted">No hay productos en el carrito.</p>
          ) : (
            <div className="lista-carrito">
              {productos.map((producto) => (
                <CartItem
                  key={producto.id}
                  producto={producto}
                  alAgregar={alAgregar}
                  alDisminuir={alDisminuir}
                  alEliminar={alEliminar}
                  formatearPrecio={formatearPrecio}
                />
              ))}
            </div>
          )}

          <hr />
          <div className="d-flex justify-content-between align-items-center fs-5">
            <strong>Total:</strong>
            <strong className="text-success" aria-live="polite">
              {formatearPrecio(total)}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
