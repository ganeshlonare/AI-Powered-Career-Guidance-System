export const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8080/api';

export const STORAGE_KEYS = {
  authToken: 'cg_auth_token',
  refreshToken: 'cg_refresh_token',
  user: 'cg_user',
} as const;
