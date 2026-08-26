import React, { createContext, useContext, useEffect, useState } from 'react';
import { citas as citasIniciales } from '../data/citas';

const CitasContext = createContext();

export function CitasProvider({ children }) {
  // Cargar citas desde localStorage si existen, si no usar las iniciales
  const [citas, setCitas] = useState(() => {
    const guardadas = localStorage.getItem('citas');
    return guardadas ? JSON.parse(guardadas) : citasIniciales;
  });

  // Guardar en localStorage cada vez que cambien las citas
  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas]);

  const agregarCita = (nuevaCita) => {
    setCitas((prev) => [
      ...prev,
      { id: Date.now(), ...nuevaCita, estado: 'Pendiente' }
    ]);
  };

  const eliminarCita = (id) => {
    setCitas((prev) => prev.filter(cita => cita.id !== id));
  };

  return (
    <CitasContext.Provider value={{ citas, agregarCita, eliminarCita }}>
      {children}
    </CitasContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useCitas() {
  const context = useContext(CitasContext);
  if (!context) {
    throw new Error('useCitas debe usarse dentro de CitasProvider');
  }
  return context;
}