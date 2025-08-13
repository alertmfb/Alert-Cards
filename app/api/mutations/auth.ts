// lib/api/mutations/auth.ts - Simplified
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../services/auth";
import { useAuthStore } from "~/stores/authStore";

export const useSignInMutation = () => {
  const queryClient = useQueryClient();
  const { setAuth, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onMutate: () => setLoading(true),
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data.data;

      // Get user profile after successful login
      try {
        const userResponse = await authApi.getProfile();
        const userData = userResponse.data;

        setAuth(userData, accessToken, refreshToken);
        queryClient.setQueryData(["user"], userResponse);
      } catch (error) {
        setLoading(false);
        throw new Error("Failed to get user profile");
      }
    },
    onError: () => setLoading(false),
  });
};

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  const { clearAuth, setLoading, refreshToken } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (!refreshToken) throw new Error("No refresh token");
      return authApi.logout({ refreshToken });
    },
    onMutate: () => setLoading(true),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
    },
  });
};

export const useInviteMutation = () => {
  return useMutation({
    mutationFn: authApi.invite,
  });
};

export const useAcceptInviteMutation = () => {
  return useMutation({
    mutationFn: ({ inviteId, data }: { inviteId: string; data: any }) => {
      return authApi.acceptInvite(inviteId, data);
    },
  });
};
