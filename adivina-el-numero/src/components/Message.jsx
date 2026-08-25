import React from 'react';

function Message({ mensaje, acertado }) {
  const clase = acertado ? 'mensaje exito' : 'mensaje pista';
  return <div className={clase}>{mensaje}</div>;
}

export default Message;