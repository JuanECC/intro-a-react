import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <h2>Bienvenido a la Plataforma de Gestión de Citas Médicas</h2>
      <p>
        Administra tus citas de manera fácil y eficiente. Navega para ver las citas existentes.
      </p>
      <Link to="/citas" className="btn-primario">Ver Citas</Link>
    </div>
  );
}

export default Home;