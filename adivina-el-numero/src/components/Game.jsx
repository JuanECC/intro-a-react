import React, { useState } from 'react';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';

function Game() {
  const [numeroSecreto, setNumeroSecreto] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [numeroIngresado, setNumeroIngresado] = useState('');
  const [mensaje, setMensaje] = useState('Ingresa un número entre 1 y 100');
  const [intentos, setIntentos] = useState(0);
  const [acertado, setAcertado] = useState(false);

  const handleChange = (e) => {
    setNumeroIngresado(e.target.value);
  };

  const handleAdivinar = () => {
    const numero = parseInt(numeroIngresado, 10);

    if (isNaN(numero) || numero < 1 || numero > 100) {
      setMensaje('⚠️ Ingresa un número válido entre 1 y 100.');
      return;
    }

    setIntentos(intentos + 1);

    if (numero === numeroSecreto) {
      setMensaje(`🎉 ¡Correcto! Lo adivinaste en ${intentos + 1} intento(s).`);
      setAcertado(true);
    } else if (numero < numeroSecreto) {
      setMensaje('📈 El número es mayor.');
    } else {
      setMensaje('📉 El número es menor.');
    }
  };

  const handleReiniciar = () => {
    setNumeroSecreto(Math.floor(Math.random() * 100) + 1);
    setNumeroIngresado('');
    setMensaje('Ingresa un número entre 1 y 100');
    setIntentos(0);
    setAcertado(false);
  };

  return (
    <div className="juego">
      <InputNumber
        value={numeroIngresado}
        onChange={handleChange}
        disabled={acertado}
      />
      {!acertado ? (
        <button onClick={handleAdivinar}>Adivinar</button>
      ) : null}
      <Message mensaje={mensaje} acertado={acertado} />
      <p className="contador">Intentos: {intentos}</p>
      {acertado && <RestartButton onReiniciar={handleReiniciar} />}
    </div>
  );
}

export default Game;