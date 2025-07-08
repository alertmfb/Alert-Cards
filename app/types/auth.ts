export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignOutRequest {
  refreshToken: string;
}

export type SignOutResponse = null;

export interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

export interface SignInOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export interface SignOutOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInRequest, options?: SignInOptions) => void;
  signOut: (options?: SignOutOptions) => void;
  isSigningIn: boolean;
  isSigningOut: boolean;
}

// types/auth.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface LogoutResponse {
  status: string;
  data: null;
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface ProfileResponse {
  status: string;
  data: User;
  message: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
