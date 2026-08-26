import React from 'react';
import { Link } from 'react-router-dom';

function CitaCard({ cita, onEliminar }) {
  return (
    <div className="cita-card">
      <h3>{cita.paciente}</h3>
      <p><strong>Doctor:</strong> {cita.doctor}</p>
      <p><strong>Fecha:</strong> {cita.fecha} a las {cita.hora}</p>
      <p><strong>Motivo:</strong> {cita.motivo}</p>
      <p><strong>Estado:</strong> {cita.estado}</p>
      <div className="acciones-card">
        <Link to={`/cita/${cita.id}`} className="ver-detalle">Ver detalle</Link>
        <button onClick={() => onEliminar(cita.id)} className="btn-eliminar">Eliminar</button>
      </div>
    </div>
  );
}

export default CitaCard;