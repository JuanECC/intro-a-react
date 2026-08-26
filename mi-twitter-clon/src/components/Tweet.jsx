import React, { useState } from 'react';
import Avatar from './Avatar';
import { useAuth } from '../context/AuthContext';

function Tweet({ tweet, onLike, onEdit, onDelete }) {
  const { user } = useAuth();
  const [editando, setEditando] = useState(false);
  const [nuevoTexto, setNuevoTexto] = useState(tweet.texto);

  const puedeEditar = user && user.id === tweet.autorId;

  const handleGuardarEdicion = () => {
    if (nuevoTexto.trim() !== '') {
      onEdit(tweet.id, nuevoTexto.trim());
      setEditando(false);
    }
  };

  return (
    <div className="tweet">
      <div className="tweet-header">
        <Avatar nombre={tweet.autorNombre} color={tweet.autorColor} tamaño={36} />
        <span className="username">{tweet.autorNombre}</span>
        <span className="fecha">{new Date(tweet.fecha).toLocaleString()}</span>
      </div>
      {editando ? (
        <textarea
          className="edit-input"
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
        />
      ) : (
        <p className="tweet-text">{tweet.texto}</p>
      )}
      <div className="tweet-footer">
        <button
          className={`like-btn ${user ? '' : 'disabled'}`}
          onClick={() => onLike(tweet.id)}
          disabled={!user}
        >
          ❤ {tweet.likes}
        </button>
        {puedeEditar && !editando && (
          <button className="action-btn" onClick={() => setEditando(true)}>Editar</button>
        )}
        {puedeEditar && editando && (
          <>
            <button className="action-btn" onClick={handleGuardarEdicion}>Guardar</button>
            <button className="action-btn" onClick={() => setEditando(false)}>Cancelar</button>
          </>
        )}
        {puedeEditar && (
          <button className="action-btn danger" onClick={() => onDelete(tweet.id)}>Eliminar</button>
        )}
      </div>
    </div>
  );
}

export default Tweet;