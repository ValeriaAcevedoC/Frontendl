import { useState } from "react";
import FormField from "./FormField.jsx";
import { enfocarPrimerError, validarVideojuego } from "../utils/formularios.js";

const camposIniciales = {
  nombre: "",
  categoria: "",
  precioNormal: "",
  precioOferta: "",
  imagen: "",
  descripcion: "",
};

function ProductManager({ productos, categorias, cargando, error, alAgregar, alEliminar }) {
  const [datos, setDatos] = useState(camposIniciales);
  const [errores, setErrores] = useState({});
  const [validado, setValidado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const deshabilitado = cargando || Boolean(error);

  function actualizarCampo(evento) {
    const nuevosDatos = { ...datos, [evento.target.name]: evento.target.value };
    setDatos(nuevosDatos);
    setMensaje("");
    if (validado) setErrores(validarVideojuego(nuevosDatos));
  }

  function agregarVideojuego(evento) {
    evento.preventDefault();
    if (deshabilitado) return;
    const nuevosErrores = validarVideojuego(datos);
    setErrores(nuevosErrores);
    setValidado(true);
    setMensaje("");
    if (Object.keys(nuevosErrores).length) {
      enfocarPrimerError(evento.currentTarget, nuevosErrores);
      return;
    }
    const producto = Object.fromEntries(
      Object.entries(datos).map(([campo, valor]) => [campo, valor.trim()]),
    );
    producto.precioNormal = Number(producto.precioNormal);
    producto.precioOferta = Number(producto.precioOferta);
    // Reutiliza la categoría existente aunque se haya escrito con otra capitalización.
    producto.categoria = categorias.find(
      (categoria) => categoria.toLocaleLowerCase("es") === producto.categoria.toLocaleLowerCase("es"),
    ) ?? producto.categoria;
    alAgregar(producto);
    setDatos(camposIniciales);
    setValidado(false);
    setMensaje(`${producto.nombre} se agregó al catálogo. Los filtros se restablecieron para mostrarlo.`);
  }

  function eliminarVideojuego(producto) {
    alEliminar(producto.id);
    setMensaje(`${producto.nombre} se eliminó del catálogo y del carrito.`);
  }

  return (
    <section id="gestion" className="container my-5" aria-labelledby="titulo-gestion">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 id="titulo-gestion">Gestionar videojuegos</h2>
          <p className="text-muted">Agrega o elimina videojuegos del catálogo. Los cambios duran hasta recargar la página. Al eliminar un juego también se retira del carrito.</p>
          <form noValidate onSubmit={agregarVideojuego}>
            <fieldset disabled={deshabilitado}>
              <legend className="h5">Agregar videojuego</legend>
              <div className="row g-3">
                <FormField
                  id="juego-nombre"
                  name="nombre"
                  label="Nombre"
                  required
                  maxLength={100}
                  value={datos.nombre}
                  onChange={actualizarCampo}
                  error={errores.nombre}
                  className="col-12 col-md-6"
                />
                <FormField
                  id="juego-categoria"
                  name="categoria"
                  label="Categoría"
                  list="categorias-disponibles"
                  required
                  maxLength={50}
                  value={datos.categoria}
                  onChange={actualizarCampo}
                  error={errores.categoria}
                  className="col-12 col-md-6"
                />
                <datalist id="categorias-disponibles">{categorias.map((categoria) => <option key={categoria} value={categoria} />)}</datalist>
                <FormField
                  id="juego-precio-normal"
                  name="precioNormal"
                  label="Precio normal (CLP)"
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={datos.precioNormal}
                  onChange={actualizarCampo}
                  error={errores.precioNormal}
                  className="col-12 col-md-6"
                />
                <FormField
                  id="juego-precio-oferta"
                  name="precioOferta"
                  label="Precio de oferta (CLP)"
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={datos.precioOferta}
                  onChange={actualizarCampo}
                  error={errores.precioOferta}
                  className="col-12 col-md-6"
                />
                <FormField
                  id="juego-imagen"
                  name="imagen"
                  label="Imagen"
                  required
                  value={datos.imagen}
                  onChange={actualizarCampo}
                  error={errores.imagen}
                  ayuda="Dirección http/https o una imagen existente, por ejemplo img/minecraft.jpg."
                />
                <FormField
                  id="juego-descripcion"
                  name="descripcion"
                  label="Descripción"
                  multilinea
                  rows={3}
                  required
                  maxLength={1000}
                  value={datos.descripcion}
                  onChange={actualizarCampo}
                  error={errores.descripcion}
                />
                <div className="col-12"><button type="submit" className="btn btn-primary">Agregar videojuego</button></div>
              </div>
            </fieldset>
          </form>
          <p className="mt-3 mb-0" role="status">{mensaje}</p>
          <h3 className="h5 mt-4">Videojuegos del catálogo ({productos.length})</h3>
          {deshabilitado ? (
            <p className="text-muted">La gestión estará disponible cuando el catálogo se cargue correctamente.</p>
          ) : productos.length === 0 ? (
            <p className="text-muted">El catálogo está vacío. Agrega un videojuego para comenzar.</p>
          ) : (
            <ul className="list-group">
              {productos.map((producto) => (
                <li key={producto.id} className="list-group-item gestion-item">
                  <div><strong>{producto.nombre}</strong><span className="d-block text-muted">{producto.categoria}</span></div>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminarVideojuego(producto)}
                    aria-label={`Eliminar ${producto.nombre} del catálogo`}
                  >
                    Eliminar del catálogo
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductManager;
