import React from 'react';
import { useCitas } from '../context/CitasContext';
import CitaCard from '../components/CitaCard';

function Citas() {
  const { citas, eliminarCita } = useCitas();

  return (
    <div className="page">
      <h2>Lista de Citas</h2>
      <div className="citas-grid">
        {citas.length === 0 ? (
          <p>No hay citas registradas.</p>
        ) : (
          citas.map(cita => (
            <CitaCard key={cita.id} cita={cita} onEliminar={eliminarCita} />
          ))
        )}
      </div>
    </div>
  );
}

export default Citas;