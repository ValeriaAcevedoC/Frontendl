import { useState } from "react";

function ProductCard({ producto, cantidadEnCarrito, alAgregar, formatearPrecio }) {
  const [imagenFallida, setImagenFallida] = useState(false);
  const imagen = /^https?:\/\//i.test(producto.imagen)
    ? producto.imagen
    : `${import.meta.env.BASE_URL}${producto.imagen}`;
  // Usa la cantidad del carrito para reflejar también las disminuciones y eliminaciones.
  const enCarrito = cantidadEnCarrito > 0;

  return (
    <article className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm tarjeta-producto">
        {imagenFallida ? (
          <div
            className="card-img-top imagen-no-disponible"
            role="img"
            aria-label={`Portada no disponible de ${producto.nombre}`}
          >
            Imagen no disponible
          </div>
        ) : (
          <img
            src={imagen}
            className="card-img-top"
            alt={`Portada de ${producto.nombre}`}
            onError={() => setImagenFallida(true)}
          />
        )}

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

          <div className="mt-auto">
            {enCarrito && (
              <p className="mb-2" role="status">
                <span className="badge bg-success">
                  En el carrito: {cantidadEnCarrito}
                </span>
              </p>
            )}
            <button
              className={`btn w-100 ${enCarrito ? "btn-success" : "btn-primary"}`}
              type="button"
              onClick={() => alAgregar(producto)}
            >
              {enCarrito ? "Agregar otra unidad" : "Agregar al carrito"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
