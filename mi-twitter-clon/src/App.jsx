import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TweetsProvider } from './context/TweetsContext';

function App() {
  return (
    <AuthProvider>
      <TweetsProvider>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/profile"
                element={<RutaProtegida component={<Profile />} />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </TweetsProvider>
    </AuthProvider>
  );
}

function RutaProtegida({ component }) {
  const { user } = useAuth();
  return user ? component : <Navigate to="/login" />;
}

export default App;