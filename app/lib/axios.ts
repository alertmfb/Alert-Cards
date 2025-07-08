import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../stores/authStore";
import { toast } from "sonner";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT ?? 15000),
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, clearAuth } = useAuthStore.getState();

      if (refreshToken) {
        try {
          // Attempt to refresh token
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
            {
              refreshToken,
            }
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data.data;

          // Update store with new tokens
          useAuthStore
            .getState()
            .setAuth(
              useAuthStore.getState().user!,
              newAccessToken,
              newRefreshToken
            );

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear auth and redirect to login
          clearAuth();
          window.location.href = "/sign-in";
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, clear auth and redirect
        clearAuth();
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);
