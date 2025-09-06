import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) return null; // keep UI unchanged; optionally spinner
  if (!user) return <Navigate to="/signin/email" replace />;
  if (user.verified === false) return <Navigate to="/verify-email" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
