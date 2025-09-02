// import axios from "axios";
// import { storage } from "./utils/storage";

// export const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: Number(import.meta.env.VITE_REQUEST_TIMEOUT ?? 15000),
//   headers: { "Content-Type": "application/json" },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = storage.getItem("accessToken");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle token refresh
// // apiClient.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;

// //     if (error.response?.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true;

// //       const refreshToken = storage.getItem('refreshToken');
// //       if (refreshToken) {
// //         try {
// //           // Attempt to refresh token
// //           const response = await axios.post('/auth/refresh', {
// //             refreshToken,
// //           });

// //           const { accessToken } = response.data.data;
// //           storage.setItem('accessToken', accessToken);

// //           // Retry original request
// //           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
// //           return apiClient(originalRequest);
// //         } catch (refreshError) {
// //           // Refresh failed, redirect to login
// //           storage.removeItem('accessToken');
// //           storage.removeItem('refreshToken');
// //           if (typeof window !== 'undefined') {
// //             window.location.href = '/login';
// //           }
// //         }
// //       } else {
// //         if (typeof window !== 'undefined') {
// //           window.location.href = '/login';
// //         }
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );
