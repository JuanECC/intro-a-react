import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCitas } from '../context/CitasContext';

function NuevaCita() {
  const { agregarCita } = useCitas();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    paciente: '',
    doctor: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (
      formData.paciente.trim() === '' ||
      formData.doctor.trim() === '' ||
      formData.fecha === '' ||
      formData.hora === '' ||
      formData.motivo.trim() === ''
    ) {
      alert('Por favor completa todos los campos.');
      return;
    }

    agregarCita(formData);
    alert('Cita agregada correctamente.');
    navigate('/citas');
  };

  return (
    <div className="page">
      <h2>Agregar Nueva Cita</h2>
      <form className="formulario-cita" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Paciente:</label>
          <input
            type="text"
            name="paciente"
            value={formData.paciente}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label>Doctor:</label>
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label>Hora:</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label>Motivo:</label>
          <textarea
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-primario">Guardar Cita</button>
      </form>
    </div>
  );
}

export default NuevaCita;