import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Centralized guard to enforce the full user journey across ALL routes
// States we consider:
// - Not logged in: allow public routes; protect private ones
// - Logged in but not verified: only allow /verify-email (and optional logout route if added)
// - Verified but onboarding not completed: only allow /onboarding
// - Verified + onboarded but quiz not completed: only allow assessment (instructions/quiz)
// - All done: block returning to auth/onboarding/verify routes

const PUBLIC_ALLOW = new Set<string>(['/', '/signup', '/signin/email']);

function isPathAllowed(pathname: string, allowed: string[]) {
  return allowed.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

const GlobalGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const path = location.pathname;
    const onboarded = (typeof window !== 'undefined' && localStorage.getItem('cg_onboarded') === '1') || (user as any)?.onboardingCompleted === true;
    const quizDone = (typeof window !== 'undefined' && localStorage.getItem('cg_quiz_completed') === '1') || (user as any)?.quizCompleted === true;

    // 1) Not logged in
    if (!user) {
      // Allow only public routes
      if (!PUBLIC_ALLOW.has(path)) {
        navigate('/signin/email', { replace: true });
      }
      return;
    }

    // 2) Logged in but not verified
    if (user.verified === false) {
      if (!isPathAllowed(path, ['/verify-email'])) {
        navigate('/verify-email', { replace: true });
      }
      return;
    }

    // 3) Verified but onboarding not completed
    if (!onboarded) {
      if (!isPathAllowed(path, ['/onboarding'])) {
        navigate('/onboarding', { replace: true });
      }
      return;
    }

    // 4) Onboarded but quiz not completed
    if (onboarded && !quizDone) {
      if (!isPathAllowed(path, ['/assessment/instructions', '/dashboard/assessment'])) {
        // Send to instructions first
        navigate('/assessment/instructions', { replace: true });
      }
      return;
    }

    // 5) All done -> block returning to auth/verify/onboarding
    const disallowCompleted = ['/signup', '/signin/email', '/verify-email', '/onboarding'];
    if (disallowCompleted.some((p) => isPathAllowed(path, [p]))) {
      // Prefer dashboard/roadmap as the main app flow per new requirement
      navigate('/dashboard/roadmap', { replace: true });
      return;
    }
  }, [user, loading, location.pathname, navigate]);

  return <>{children}</>;
};

export default GlobalGuard;
