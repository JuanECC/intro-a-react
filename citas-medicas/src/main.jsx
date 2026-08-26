import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CitasProvider } from './context/CitasContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CitasProvider>
      <App />
    </CitasProvider>
  </React.StrictMode>
);