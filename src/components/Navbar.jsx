function Navbar({
  cantidadCarrito,
  categorias,
  categoriaActiva,
  alSeleccionarCategoria,
  alMostrarTodos,
}) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <button
          type="button"
          className="navbar-brand fw-bold boton-enlace"
          onClick={alMostrarTodos}
        >
          GamerZone
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarGamerZone"
          aria-controls="navbarGamerZone"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarGamerZone">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${categoriaActiva === "Todos" ? "active" : ""}`}
                onClick={alMostrarTodos}
              >
                Inicio
              </button>
            </li>

            {categorias.map((categoria) => (
              <li className="nav-item" key={categoria}>
                <button
                  type="button"
                  className={`nav-link ${categoriaActiva === categoria ? "active" : ""}`}
                  onClick={() => alSeleccionarCategoria(categoria)}
                >
                  {categoria}
                </button>
              </li>
            ))}
          </ul>

          <a className="navbar-text text-white text-decoration-none" href="#carrito">
            🛒 Carrito:{" "}
            <span className="badge bg-danger" aria-live="polite">
              {cantidadCarrito}
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
