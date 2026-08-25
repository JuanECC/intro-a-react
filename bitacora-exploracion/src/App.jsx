import React, { useState, useEffect, useRef } from 'react';

function App() {
  // Estado inicial: cargar planetas desde localStorage o array vacío
  const [planetas, setPlanetas] = useState(() => {
    const guardados = localStorage.getItem('planetas');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const inputImagenRef = useRef(null);

  // Guardar en localStorage cada vez que planetas cambia
  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas));
  }, [planetas]);

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setImagen(null);
    if (inputImagenRef.current) {
      inputImagenRef.current.value = '';
    }
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || descripcion.trim() === '') {
      alert('Por favor completa el nombre y la descripción.');
      return;
    }

    const nuevoPlaneta = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      imagen: imagen ? URL.createObjectURL(imagen) : null
    };

    if (editIndex !== null) {
      // Modo edición: reemplazar el planeta en el índice
      const copia = [...planetas];
      copia[editIndex] = nuevoPlaneta;
      setPlanetas(copia);
    } else {
      // Modo creación: agregar al final
      setPlanetas([...planetas, nuevoPlaneta]);
    }

    limpiarFormulario();
  };

  const handleEditar = (index) => {
    const planeta = planetas[index];
    setNombre(planeta.nombre);
    setDescripcion(planeta.descripcion);
    setImagen(null); // la imagen previa no se puede cargar directamente en el input
    setEditIndex(index);
  };

  const handleEliminar = (index) => {
    const nuevos = planetas.filter((_, i) => i !== index);
    setPlanetas(nuevos);
    if (editIndex === index) limpiarFormulario();
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
  };

  return (
    <div className="app-container">
      <h1>🚀 Bitácora de Exploración</h1>

      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          ref={inputImagenRef}
        />
        <button type="submit">
          {editIndex !== null ? 'Actualizar planeta' : 'Guardar planeta'}
        </button>
        {editIndex !== null && (
          <button type="button" className="secundario" onClick={cancelarEdicion}>
            Cancelar edición
          </button>
        )}
      </form>

      <h2>Planetas Registrados</h2>
      {planetas.length === 0 ? (
        <p className="vacio">Aún no hay planetas en la bitácora.</p>
      ) : (
        <ul className="lista-planetas">
          {planetas.map((planeta, index) => (
            <li key={index} className="planeta">
              {planeta.imagen && (
                <img src={planeta.imagen} alt={planeta.nombre} className="imagen-planeta" />
              )}
              <div className="info">
                <h3>{planeta.nombre}</h3>
                <p>{planeta.descripcion}</p>
              </div>
              <div className="acciones">
                <button onClick={() => handleEditar(index)}>Editar</button>
                <button className="eliminar" onClick={() => handleEliminar(index)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;