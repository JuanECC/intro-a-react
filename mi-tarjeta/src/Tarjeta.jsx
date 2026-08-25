import React from 'react';

function Tarjeta() {
  const nombre = "Juan Elias";
  const profesion = "Desarrollador Web";
  const mensaje = "¡Bienvenido a mi tarjeta de presentación!";
  const iniciales = nombre.split(' ').map(palabra => palabra[0]).join('');

  return (
    <div className="tarjeta">
      <div className="avatar">{iniciales}</div>
      <h2 className="nombre">{nombre}</h2>
      <h4 className="profesion">{profesion}</h4>
      <p className="mensaje">{mensaje}</p>
      <div className="redes">
        <span className="icono">🐦</span>
        <span className="icono">💼</span>
        <span className="icono">📷</span>
      </div>
    </div>
  );
}

export default Tarjeta;