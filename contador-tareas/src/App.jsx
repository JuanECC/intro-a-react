import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');

  // useMemo calcula el total solo cuando cambian las tareas
  const tiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  // useEffect actualiza el título del documento cuando cambia el tiempoTotal
  useEffect(() => {
    document.title = `Total: ${tiempoTotal} minutos`;
  }, [tiempoTotal]);

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== '' && duracion > 0) {
      const nuevaTareaObj = {
        nombre: nuevaTarea.trim(),
        duracion: parseInt(duracion, 10)
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  return (
    <div className="app-container">
      <div className="tarjeta">
        <h1>⏱️ Contador de Tareas</h1>

        <div className="formulario">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Nombre de la tarea"
          />
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            placeholder="Duración (min)"
            min="1"
          />
          <button onClick={agregarTarea}>Agregar tarea</button>
        </div>

        <h2>Tareas</h2>
        {tareas.length === 0 ? (
          <p className="vacio">No hay tareas registradas.</p>
        ) : (
          <ul className="lista">
            {tareas.map((tarea, index) => (
              <li key={index}>
                <span>{tarea.nombre}</span>
                <span className="duracion">{tarea.duracion} min</span>
              </li>
            ))}
          </ul>
        )}

        <h3 className="total">Total de tiempo: {tiempoTotal} minutos</h3>
      </div>
    </div>
  );
}

export default App;