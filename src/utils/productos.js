// Valida todo el catálogo antes de mostrarlo para evitar errores en filtros y precios.
export function validarProductos(datos) {
  if (!Array.isArray(datos)) {
    throw new Error("El catálogo debe ser una lista de productos.");
  }

  const identificadores = new Set();
  const camposTexto = ["nombre", "categoria", "imagen", "descripcion"];
  const camposPrecio = ["precioNormal", "precioOferta"];

  for (const producto of datos) {
    if (
      !producto ||
      typeof producto !== "object" ||
      !Number.isSafeInteger(producto.id) ||
      producto.id <= 0 ||
      identificadores.has(producto.id)
    ) {
      throw new Error("Cada producto debe tener un identificador entero positivo y único.");
    }

    if (
      camposTexto.some(
        (campo) =>
          typeof producto[campo] !== "string" || !producto[campo].trim(),
      ) ||
      camposPrecio.some(
        (campo) => !Number.isFinite(producto[campo]) || producto[campo] < 0,
      )
    ) {
      throw new Error(`El producto ${producto.id} tiene campos incompletos o precios inválidos.`);
    }

    identificadores.add(producto.id);
  }

  return datos;
}
