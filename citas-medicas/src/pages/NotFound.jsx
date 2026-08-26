import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page">
      <h2>404 - Página no encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      <Link to="/" className="btn-primario">Ir al inicio</Link>
    </div>
  );
}

export default NotFound;