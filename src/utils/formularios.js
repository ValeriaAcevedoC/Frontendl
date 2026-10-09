export function esCorreoValido(valor) {
  const correo = valor.trim();
  if (correo.length > 254) return false;

  const partes = correo.split("@");
  if (partes.length !== 2) return false;

  const [usuario, dominio] = partes;
  // Admite direcciones habituales, con puntos solo entre segmentos del usuario.
  const formatoUsuario = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i;
  if (usuario.length > 64 || !formatoUsuario.test(usuario)) return false;

  const etiquetas = dominio.split(".");
  const formatoEtiqueta = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;
  if (
    dominio.length > 253 ||
    etiquetas.length < 2 ||
    etiquetas.some((etiqueta) => !formatoEtiqueta.test(etiqueta))
  ) {
    return false;
  }

  const extension = etiquetas.at(-1);
  return /^(?:[a-z]{2,63}|xn--[a-z0-9-]+[a-z0-9])$/i.test(extension);
}

export function validarContacto(datos) {
  const errores = {};
  if (!datos.nombre.trim()) errores.nombre = "Ingresa tu nombre.";
  if (datos.nombre.trim().length > 100) errores.nombre = "Usa como máximo 100 caracteres.";
  if (!esCorreoValido(datos.email)) errores.email = "Ingresa un correo válido, por ejemplo nombre@correo.cl.";
  if (datos.email.trim().length > 254) errores.email = "El correo es demasiado largo.";
  if (!datos.mensaje.trim()) errores.mensaje = "Escribe tu mensaje.";
  if (datos.mensaje.trim().length > 2000) errores.mensaje = "Usa como máximo 2000 caracteres.";
  return errores;
}

export function esImagenValida(imagen) {
  const ruta = imagen.trim();
  if (/^https?:\/\//i.test(ruta)) {
    try {
      const url = new URL(ruta);
      return Boolean(url.hostname) && !url.username && !url.password;
    } catch {
      return false;
    }
  }
  // Las imágenes locales se indican desde assets, por ejemplo img/minecraft.jpg.
  return /^img\/(?:[\p{L}\p{N}_-]+\/)*[\p{L}\p{N}_ .-]+\.(?:png|jpe?g|webp|gif|svg|avif)$/iu.test(ruta);
}

export function validarVideojuego(datos) {
  const errores = {};
  const limites = { nombre: 100, categoria: 50, descripcion: 1000 };
  for (const [campo, limite] of Object.entries(limites)) {
    if (!datos[campo].trim()) errores[campo] = "Completa este campo.";
    else if (datos[campo].trim().length > limite) errores[campo] = `Usa como máximo ${limite} caracteres.`;
  }
  for (const campo of ["precioNormal", "precioOferta"]) {
    const precio = Number(datos[campo]);
    if (!datos[campo].trim() || !Number.isSafeInteger(precio) || precio <= 0) errores[campo] = "Ingresa un precio entero mayor que cero en pesos chilenos.";
  }
  if (!errores.precioNormal && !errores.precioOferta && Number(datos.precioOferta) > Number(datos.precioNormal)) errores.precioOferta = "La oferta no puede superar el precio normal.";
  if (!esImagenValida(datos.imagen)) errores.imagen = "Usa una dirección http/https válida o una ruta como img/minecraft.jpg.";
  return errores;
}

export function enfocarPrimerError(formulario, errores) {
  formulario.elements.namedItem(Object.keys(errores)[0])?.focus();
}
