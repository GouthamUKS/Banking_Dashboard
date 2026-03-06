/**
 * Authentication Types
 */

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  emailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerificationCode {
  email: string;
  code: string;
  expiresAt: string;
  verified: boolean;
}
