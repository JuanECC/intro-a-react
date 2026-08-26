import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { citas } from '../data/citas';

function CitaDetalle() {
  const { id } = useParams();
  const cita = citas.find(c => c.id === parseInt(id));

  if (!cita) {
    return (
      <div className="page">
        <h2>Cita no encontrada</h2>
        <Link to="/citas">Volver a la lista</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Detalles de la Cita</h2>
      <div className="detalle-cita">
        <p><strong>Paciente:</strong> {cita.paciente}</p>
        <p><strong>Doctor:</strong> {cita.doctor}</p>
        <p><strong>Fecha:</strong> {cita.fecha}</p>
        <p><strong>Hora:</strong> {cita.hora}</p>
        <p><strong>Motivo:</strong> {cita.motivo}</p>
        <p><strong>Estado:</strong> {cita.estado}</p>
        <p><strong>ID de la cita:</strong> {id}</p>
      </div>
      <Link to="/citas" className="btn-secundario">Volver a la lista</Link>
    </div>
  );
}

export default CitaDetalle;