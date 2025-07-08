import { axiosInstance } from "~/lib/axios";
import type {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  ProfileResponse,
} from "~/types/auth";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/auth/sign-in",
        data
      );
      // Make sure we're returning the actual data, not the response object
      return response.data;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  },

  logout: async (data: LogoutRequest): Promise<LogoutResponse> => {
    try {
      const response = await axiosInstance.post<LogoutResponse>(
        "/auth/sign-out",
        data
      );
      // Make sure we're returning the actual data, not the response object
      return response.data;
    } catch (error) {
      console.error("Logout API error:", error);
      throw error;
    }
  },

  getProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.get<ProfileResponse>(
        "/auth/profile"
      );
      // Make sure we're returning the actual data, not the response object
      return response.data;
    } catch (error) {
      console.error("Profile API error:", error);
      throw error;
    }
  },
};
