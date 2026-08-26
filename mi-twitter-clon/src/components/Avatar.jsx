import React from 'react';

function Avatar({ nombre, color, tamaño = 40 }) {
  const inicial = nombre ? nombre.charAt(0).toUpperCase() : '?';
  return (
    <div
      className="avatar"
      style={{
        backgroundColor: color || '#1da1f2',
        width: tamaño,
        height: tamaño,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: tamaño * 0.5
      }}
    >
      {inicial}
    </div>
  );
}

export default Avatar;