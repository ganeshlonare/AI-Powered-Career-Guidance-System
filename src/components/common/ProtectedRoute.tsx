import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null; // keep UI unchanged; optionally spinner
  if (!user) return <Navigate to="/signin/email" replace />;
  if (user.verified === false) return <Navigate to="/verify-email" replace />;

  const onboarded = (typeof window !== 'undefined' && localStorage.getItem('cg_onboarded') === '1') || (user as any)?.onboardingCompleted === true;
  const quizDone = (typeof window !== 'undefined' && localStorage.getItem('cg_quiz_completed') === '1') || (user as any)?.quizCompleted === true;

  if (!onboarded) return <Navigate to="/onboarding" replace />;
  if (onboarded && !quizDone) {
    // Allow direct access to the quiz route; otherwise, send to instructions
    const path = location.pathname;
    if (path.startsWith('/dashboard/assessment')) {
      return <Outlet />;
    }
    return <Navigate to="/assessment/instructions" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
