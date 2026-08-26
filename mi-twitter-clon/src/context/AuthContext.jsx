import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem('usuarios');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('usuarioActual');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  const registrar = (nombre, password) => {
    if (usuarios.some(u => u.nombre === nombre)) {
      return { error: 'El usuario ya existe' };
    }
    const nuevoUsuario = { id: Date.now(), nombre, password, avatarColor: '#' + Math.floor(Math.random()*16777215).toString(16) };
    setUsuarios([...usuarios, nuevoUsuario]);
    setUser(nuevoUsuario);
    localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
    return { ok: true };
  };

  const login = (nombre, password) => {
    const usuario = usuarios.find(u => u.nombre === nombre && u.password === password);
    if (!usuario) return { error: 'Credenciales inválidas' };
    setUser(usuario);
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuarioActual');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registrar }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);