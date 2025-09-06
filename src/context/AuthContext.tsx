import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../config/env';
import { authApi } from '../api/auth';
import type { AuthUser, LoginRequest, RegisterRequest } from '../types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const t = localStorage.getItem(STORAGE_KEYS.authToken);
    const rt = localStorage.getItem(STORAGE_KEYS.refreshToken);
    const u = localStorage.getItem(STORAGE_KEYS.user);
    if (t) setToken(t);
    if (rt) setRefreshToken(rt);
    if (u) setUser(JSON.parse(u));
    setLoading(false);
  }, []);

  const persist = useCallback((t: string, rt: string, u: AuthUser) => {
    localStorage.setItem(STORAGE_KEYS.authToken, t);
    localStorage.setItem(STORAGE_KEYS.refreshToken, rt);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(u));
    setToken(t);
    setRefreshToken(rt);
    setUser(u);
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.authToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    localStorage.removeItem(STORAGE_KEYS.user);
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  const login = useCallback(async (payload: LoginRequest) => {
    const { token, refreshToken, user } = await authApi.login(payload);
    persist(token, refreshToken, user);
  }, [persist]);

  const register = useCallback(async (payload: RegisterRequest) => {
    const { token, refreshToken, user } = await authApi.register(payload);
    persist(token, refreshToken, user);
  }, [persist]);

  const refresh = useCallback(async () => {
    try {
      const { user } = await authApi.me();
      if (token && refreshToken) persist(token, refreshToken, user);
    } catch (e) {
      // token invalid or expired
      clear();
    }
  }, [clear, persist, token, refreshToken]);

  const logout = useCallback(() => {
    clear();
  }, [clear]);

  const value = useMemo(() => ({ user, token, refreshToken, loading, login, register, logout, refresh }), [user, token, refreshToken, loading, login, register, logout, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
