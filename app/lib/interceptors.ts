// // lib/interceptors.ts - Updated with proper TypeScript types

// import type {
//   AxiosResponse,
//   AxiosError,
//   InternalAxiosRequestConfig,
// } from "axios";

// export const requestInterceptor = (
//   config: InternalAxiosRequestConfig
// ): InternalAxiosRequestConfig => {
//   // Add any common request modifications here
//   // For example: logging, common headers, etc.

//   console.log(
//     `Making ${config.method?.toUpperCase()} request to ${config.url}`
//   );

//   return config;
// };

// export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
//   // Add any common response processing here
//   // For example: logging, data transformation, etc.

//   console.log(`Response received: ${response.status} ${response.statusText}`);

//   return response;
// };

// export const errorInterceptor = (error: AxiosError) => {
//   // Add any common error processing here
//   // For example: logging, error transformation, etc.

//   console.error("API Error:", error.response?.status, error.message);

//   // Return the error data if available, otherwise the full error
//   return Promise.reject(error?.response?.data || error);
// };
