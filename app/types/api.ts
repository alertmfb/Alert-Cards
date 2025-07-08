// export interface BaseApiResponse<T = any> {
//   status: "success" | "error";
//   data: T;
//   message: string;
// }

// export interface PaginatedResponse<T = any> {
//   items: T[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// export interface ApiError {
//   message: string;
//   code?: string;
//   status?: number;
// }

// ~/types/api.ts
export interface ApiSuccessResponse<T> {
  status: "success";
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error: string;
  timestamp: string;
}
