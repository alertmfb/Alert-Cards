// ~/api/services/users.ts
import type { ServerUser, UsersResponse } from "~/index";
import { axiosInstance } from "~/lib/axios";
import type { UpdateUserRequest, UserOperationResponse } from "~/types/users";

export const usersApi = {
  /** GET /users – returns plain array of ServerUser objects */
  getUsers: async (): Promise<ServerUser[]> => {
    try {
      const res = await axiosInstance.get<UsersResponse>("/users");
      return res.data.data; // unwrap
    } catch (err) {
      console.error("Get users API error:", err);
      throw err;
    }
  },

  /** POST /users/{id}/suspend – suspends a user */
  suspendUser: async (userId: string): Promise<UserOperationResponse> => {
    try {
      const res = await axiosInstance.post<UserOperationResponse>(
        `/users/${userId}/suspend`
      );
      return res.data;
    } catch (err) {
      console.error("Suspend user API error:", err);
      throw err;
    }
  },

  /** POST /users/{id}/activate – activates a user */
  activateUser: async (userId: string): Promise<UserOperationResponse> => {
    try {
      const res = await axiosInstance.post<UserOperationResponse>(
        `/users/${userId}/activate`
      );
      return res.data;
    } catch (err) {
      console.error("Activate user API error:", err);
      throw err;
    }
  },

  /** PATCH /users/{id}/branch – updates user branch */
  updateUserBranch: async (
    userId: string,
    branchName: string
  ): Promise<UserOperationResponse> => {
    try {
      const res = await axiosInstance.patch<UserOperationResponse>(
        `/users/${userId}/branch`,
        {
          branch: branchName,
        }
      );
      return res.data;
    } catch (err) {
      console.error("Update user branch API error:", err);
      throw err;
    }
  },

  /** PATCH /users/{id} – updates user details */
  updateUser: async (
    userId: string,
    userData: UpdateUserRequest
  ): Promise<UserOperationResponse> => {
    try {
      const res = await axiosInstance.patch<UserOperationResponse>(
        `/users/${userId}`,
        userData
      );
      return res.data;
    } catch (err) {
      console.error("Update user API error:", err);
      throw err;
    }
  },
};
