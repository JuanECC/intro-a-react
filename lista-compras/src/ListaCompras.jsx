import { useState } from "react";

function ListaCompras() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");

  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
      setProductos([...productos, nuevoProducto.trim()]);
      setNuevoProducto("");
    }
  };

  const eliminarProducto = (index) => {
    const productosRestantes = productos.filter((_, i) => i !== index);
    setProductos(productosRestantes);
  };

  return (
    <div className="tarjeta">
      <h2>🛒 Lista de Compras</h2>
      <div className="agregar-producto">
        <input
          type="text"
          value={nuevoProducto}
          onChange={(e) => setNuevoProducto(e.target.value)}
          placeholder="Escribe un producto..."
        />
        <button onClick={agregarProducto}>Agregar</button>
      </div>

      {productos.length === 0 ? (
        <p className="vacio">No hay productos en la lista.</p>
      ) : (
        <ul className="lista">
          {productos.map((producto, index) => (
            <li key={index}>
              <span>{producto}</span>
              <button className="eliminar" onClick={() => eliminarProducto(index)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaCompras;