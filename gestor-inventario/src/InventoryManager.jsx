import React, { useReducer, useRef, useCallback, useState, useEffect } from 'react';

// Estado inicial: carga desde localStorage o array vacío
const initialState = {
  products: JSON.parse(localStorage.getItem('inventario')) || []
};

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        products: [...state.products, {
          id: Date.now(),
          name: action.name,
          quantity: 1
        }]
      };
    case 'increment':
      return {
        products: state.products.map(p =>
          p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      };
    case 'decrement':
      return {
        products: state.products.map(p =>
          p.id === action.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
        )
      };
    case 'remove':
      return {
        products: state.products.filter(p => p.id !== action.id)
      };
    case 'clear':
      return { products: [] };
    default:
      return state;
  }
}

function InventoryManager() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [busqueda, setBusqueda] = useState('');
  const inputRef = useRef(null);

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem('inventario', JSON.stringify(state.products));
  }, [state.products]);

  const handleAddProduct = useCallback(() => {
    const nombre = inputRef.current.value.trim();
    if (nombre !== '') {
      dispatch({ type: 'add', name: nombre });
      inputRef.current.value = '';
    }
  }, []);

  const handleIncrement = useCallback((id) => {
    dispatch({ type: 'increment', id });
  }, []);

  const handleDecrement = useCallback((id) => {
    dispatch({ type: 'decrement', id });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'remove', id });
  }, []);

  const handleClear = useCallback(() => {
    dispatch({ type: 'clear' });
  }, []);

  // Filtrar productos según búsqueda
  const productosFiltrados = state.products.filter(producto =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="inventario">
      <h2>🛒 Gestor de Inventario</h2>

      <div className="agregar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Nombre del producto"
        />
        <button onClick={handleAddProduct}>Agregar</button>
      </div>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      {productosFiltrados.length === 0 ? (
        <p className="vacio">No hay productos en el inventario.</p>
      ) : (
        <ul className="lista">
          {productosFiltrados.map((producto) => (
            <li key={producto.id}>
              <span className="nombre">{producto.name}</span>
              <span className="cantidad">Cantidad: {producto.quantity}</span>
              <div className="acciones">
                <button onClick={() => handleIncrement(producto.id)}>+</button>
                <button onClick={() => handleDecrement(producto.id)}>-</button>
                <button className="eliminar" onClick={() => handleRemove(producto.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {state.products.length > 0 && (
        <button className="vaciar" onClick={handleClear}>
          Vaciar Inventario
        </button>
      )}
    </div>
  );
}

export default InventoryManager;