function FormField({
  id,
  label,
  error,
  ayuda,
  multilinea = false,
  className = "col-12",
  ...props
}) {
  const Control = multilinea ? "textarea" : "input";
  const descripcion = [ayuda && `${id}-ayuda`, error && `${id}-error`].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">{label}</label>
      <Control
        {...props}
        id={id}
        className={`form-control ${error ? "is-invalid" : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={descripcion || undefined}
      />
      {ayuda && <div id={`${id}-ayuda`} className="form-text">{ayuda}</div>}
      {error && <div id={`${id}-error`} className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default FormField;
