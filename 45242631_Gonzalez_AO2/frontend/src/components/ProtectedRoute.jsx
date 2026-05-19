import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Importa Outlet
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ roles = ['user', 'admin'] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{color: '#00FF00', textAlign: 'center'}}>CARGANDO...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (!roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />; // DEBE ser Outlet para renderizar las páginas hijas
};

export default ProtectedRoute;