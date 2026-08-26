import React from 'react';

function SearchBar({ filtro, setFiltro }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Buscar tweets..."
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
    />
  );
}

export default SearchBar;