import React, { useState, useEffect } from 'react';

function ThemeToggle() {
  const [tema, setTema] = useState(() => localStorage.getItem('tema') || 'light');

  useEffect(() => {
    document.body.className = tema;
    localStorage.setItem('tema', tema);
  }, [tema]);

  return (
    <button
      className="theme-btn"
      onClick={() => setTema(tema === 'light' ? 'dark' : 'light')}
    >
      {tema === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;