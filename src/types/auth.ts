export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  roles?: string[];
  role?: string;
  verified?: boolean;
}

export interface AuthResponse {
  token: string; // access token
  refreshToken: string;
  user: AuthUser;
}
