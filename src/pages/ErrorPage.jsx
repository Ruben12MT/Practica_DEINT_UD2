import React from "react";
import { Link, useRouteError } from "react-router-dom";

/**
 * Componente de página de error.
 * Se muestra cuando ocurre un error en el enrutamiento (react-router).
 * Muestra el mensaje de error y un enlace para volver al inicio.
 * 
 * @returns {JSX.Element} Página de error.
 */
export default function ErrorPage() {
  const error = useRouteError(); // Obtiene el error de la ruta
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Ha ocurrido un error.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Volver a la página de inicio</Link>
    </div>
  );
}