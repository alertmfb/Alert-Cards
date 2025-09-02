import { axiosInstance } from "@/lib/axios";
import type {
  AcceptInviteRequest,
  AcceptInviteResponse,
  InviteRequest,
  InviteResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  ProfileResponse,
  RolesResponse,
  User,
} from "@/types/auth";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/auth/sign-in",
        data
      );
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
      return response.data;
    } catch (error) {
      console.error("Logout API error:", error);
      throw error;
    }
  },

  getProfile: async (): Promise<User> => {
    try {
      const response = await axiosInstance.get<User>("/auth/profile");
      return response.data;
    } catch (error) {
      console.error("Profile API error:", error);
      throw error;
    }
  },

  invite: async (data: InviteRequest): Promise<InviteResponse> => {
    try {
      const response = await axiosInstance.post<InviteResponse>(
        "/auth/invite",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Invite API error:", error);
      throw error;
    }
  },

  acceptInvite: async (
    inviteId: string,
    data: AcceptInviteRequest
  ): Promise<AcceptInviteResponse> => {
    try {
      const response = await axiosInstance.post<AcceptInviteResponse>(
        `/auth/invite/${inviteId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Accept invite API error:", error);
      throw error;
    }
  },

  getRoles: async (): Promise<RolesResponse> => {
    try {
      const response = await axiosInstance.get<RolesResponse>("/auth/roles");
      return response.data;
    } catch (error) {
      console.error("Get roles API error:", error);
      throw error;
    }
  },
};
