import { useState } from "react";

function Navbar({ cantidadCarrito, alMostrarTodos }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function irAlInicio() {
    alMostrarTodos();
    setMenuAbierto(false);
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Navegación principal">
      <div className="container">
        <a href="#inicio" className="navbar-brand fw-bold" onClick={irAlInicio}>
          GamerZone
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          aria-controls="navbarGamerZone"
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`} id="navbarGamerZone">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link" href="#inicio" onClick={irAlInicio}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#productos" onClick={() => setMenuAbierto(false)}>Videojuegos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#gestion" onClick={() => setMenuAbierto(false)}>Gestionar catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto" onClick={() => setMenuAbierto(false)}>Contacto</a>
            </li>
          </ul>
          <a className="navbar-text text-white text-decoration-none" href="#carrito" onClick={() => setMenuAbierto(false)}>
            🛒 Carrito: <span className="badge bg-danger" aria-live="polite">{cantidadCarrito}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
