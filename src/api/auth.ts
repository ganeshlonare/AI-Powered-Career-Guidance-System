import { http } from '../lib/http';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

export const authApi = {
  login(payload: LoginRequest) {
    return http<any, LoginRequest>({ method: 'POST', path: '/auth/login', body: payload, auth: false }).then((resp) => {
      const data = resp?.data ?? resp;
      return data as AuthResponse;
    });
  },
  register(payload: RegisterRequest) {
    return http<any, RegisterRequest>({ method: 'POST', path: '/auth/register', body: payload, auth: false }).then((resp) => {
      const data = resp?.data ?? resp;
      return data as AuthResponse;
    });
  },
  verifyEmail(payload: { token: string; email?: string }) {
    const body: any = {
      token: payload.token,
      verificationToken: payload.token,
      email: payload.email,
    };
    return http<any, any>({
      method: 'POST',
      path: '/auth/verify-email',
      query: { token: payload.token, email: payload.email },
      body,
      auth: false,
    })
      .then((resp) => resp?.data ?? resp)
      .catch(async (err) => {
        if (err?.status === 400 || err?.status === 405) {
          // Some backends expect GET with query params only
          const resp = await http<any>({
            method: 'GET',
            path: '/auth/verify-email',
            query: { token: payload.token, email: payload.email },
            auth: false,
          });
          return resp?.data ?? resp;
        }
        throw err;
      });
  },
  me() {
    // Backend provides user info at /users/me; normalize to { user }
    return http<any>({ method: 'GET', path: '/users/me' }).then((resp) => {
      const data = resp?.data ?? resp;
      if (data && data.user) return { user: data.user };
      return { user: data };
    });
  },
};
