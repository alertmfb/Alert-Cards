// lib/api/mutations/auth.ts (Updated for SSR)
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../services/auth";
import { storage } from "~/lib/utils/storage";

export const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      // Store tokens (SSR-safe)
      storage.setItem("accessToken", data.data.accessToken);
      storage.setItem("refreshToken", data.data.refreshToken);

      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      // Clear any existing tokens on error (SSR-safe)
      storage.removeItem("accessToken");
      storage.removeItem("refreshToken");
    },
  });
};
export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (refreshToken: string) => {
      // Pass refreshToken directly to the API
      return authApi.signOut({ refreshToken });
    },
    onSuccess: () => {
      // Clear tokens and cache on successful signout
      storage.removeItem("accessToken");
      storage.removeItem("refreshToken");
      queryClient.clear();
    },
    onError: () => {
      // Clear tokens even on error (in case of invalid token)
      storage.removeItem("accessToken");
      storage.removeItem("refreshToken");
    },
  });
};
