import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🏥 Citas Médicas</Link>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/citas">Ver Citas</Link>
        <Link to="/nueva-cita">Nueva Cita</Link>
      </div>
    </nav>
  );
}

export default Navbar;