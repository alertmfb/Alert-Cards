// lib/axios.ts - Fixed
import axios from "axios";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT ?? 15000),
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Store reference to avoid circular dependencies
let authStore: any = null;

// Initialize auth store reference after it's created
export const initializeAxiosAuth = (store: any) => {
  authStore = store;
};

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only get token if store is initialized and we're on client
    if (authStore && typeof window !== "undefined") {
      const state = authStore.getState();

      const { accessToken } = state;

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle 401 errors (unauthorized)
    if (
      error.response?.status === 401 &&
      authStore &&
      typeof window !== "undefined"
    ) {
      const { clearAuth } = authStore.getState();
      clearAuth();

      // Only redirect if not already on sign-in page
      // if (window.location.pathname !== "/sign-in") {
      //   // Use a timeout to avoid potential race conditions
      //   setTimeout(() => {
      //     window.location.href = "/sign-in";
      //   }, 0);
      // }
    }

    return Promise.reject(error);
  }
);
