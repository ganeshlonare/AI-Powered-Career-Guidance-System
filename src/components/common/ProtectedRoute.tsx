import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) return null; // keep UI unchanged; optionally spinner
  return user ? <Outlet /> : <Navigate to="/signin/email" replace />;
};

export default ProtectedRoute;
