import { useState } from "react";
import FormField from "./FormField.jsx";
import { enfocarPrimerError, validarContacto } from "../utils/formularios.js";

const camposIniciales = { nombre: "", email: "", mensaje: "" };

function ContactForm() {
  const [datos, setDatos] = useState(camposIniciales);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [validado, setValidado] = useState(false);

  function actualizarCampo(evento) {
    const nuevosDatos = { ...datos, [evento.target.name]: evento.target.value };
    setDatos(nuevosDatos);
    setEnviado(false);
    if (validado) setErrores(validarContacto(nuevosDatos));
  }

  function enviarMensaje(evento) {
    evento.preventDefault();
    const nuevosErrores = validarContacto(datos);
    setErrores(nuevosErrores);
    setValidado(true);
    setEnviado(false);
    if (Object.keys(nuevosErrores).length) {
      enfocarPrimerError(evento.currentTarget, nuevosErrores);
      return;
    }
    // No se envían datos a un servidor: esta versión demuestra la validación.
    setEnviado(true);
    setDatos(camposIniciales);
    setValidado(false);
  }

  return (
    <section id="contacto" className="container my-5" aria-labelledby="titulo-contacto">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 id="titulo-contacto">Contacto</h2>
          <p className="text-muted">¿Tienes alguna consulta? Completa los campos obligatorios.</p>
          <form className="row g-3" noValidate onSubmit={enviarMensaje}>
            <FormField
              id="contacto-nombre"
              name="nombre"
              label="Nombre"
              autoComplete="name"
              required
              maxLength={100}
              value={datos.nombre}
              onChange={actualizarCampo}
              error={errores.nombre}
              className="col-12 col-md-6"
            />
            <FormField
              id="contacto-email"
              name="email"
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={datos.email}
              onChange={actualizarCampo}
              error={errores.email}
              className="col-12 col-md-6"
            />
            <FormField
              id="contacto-mensaje"
              name="mensaje"
              label="Mensaje"
              multilinea
              rows={5}
              required
              maxLength={2000}
              value={datos.mensaje}
              onChange={actualizarCampo}
              error={errores.mensaje}
            />
            <div className="col-12">
              <button type="submit" className="btn btn-primary" aria-describedby="aviso-contacto">Enviar mensaje</button>
              <p id="aviso-contacto" className="form-text mb-0">Formulario de demostración: no se envían mensajes reales.</p>
            </div>
          </form>
          {enviado && <p className="alert alert-success mt-3 mb-0" role="status">Los datos son válidos. Envío simulado completado; no se ha enviado ningún correo.</p>}
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
