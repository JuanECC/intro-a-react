import React from 'react';

function InputNumber({ value, onChange, disabled }) {
  return (
    <input
      type="number"
      min="1"
      max="100"
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder="Ingresa tu número"
    />
  );
}

export default InputNumber;