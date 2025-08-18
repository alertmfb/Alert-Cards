// hooks/useAuth.ts - Fixed
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authApi } from "@/api/services/auth";
import { useHydratedAuthStore } from "@/store/slices/authStore";
import type { LoginRequest } from "@/types/auth";
import { useCallback, useRef, useEffect } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    _hasHydrated,
    setAuth,
    clearAuth,
    setLoading,
  } = useHydratedAuthStore();

  // Use ref to track if we've already initiated a user fetch
  const userFetchInitiated = useRef(false);

  // Reset the ref when accessToken changes or user is cleared
  useEffect(() => {
    if (!accessToken || !user) {
      userFetchInitiated.current = false;
    }
  }, [accessToken, user]);

  // Get user profile - only fetch if we have token, no user, haven't fetched yet, and are hydrated
  const shouldFetchUser = Boolean(
    _hasHydrated && accessToken && !user && !userFetchInitiated.current
  );

  const userQuery = useQuery({
    queryKey: ["user", accessToken],
    queryFn: async () => {
      userFetchInitiated.current = true;
      return authApi.getProfile();
    },
    enabled: shouldFetchUser,
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // // Handle successful user fetch
  // useEffect(() => {
  //   if (userQuery.data && !user && accessToken) {
  //     const userData = userQuery.data;
  //     setAuth(userData, accessToken, refreshToken || "");
  //   }
  // }, [userQuery.data, user, accessToken, refreshToken, setAuth]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      // setLoading(true);
      userFetchInitiated.current = false; // Reset for new login
    },
    onSuccess: async (data) => {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        data.data;
      setAuth(null, newAccessToken, newRefreshToken);
      console.log(data);
      try {
        // Get user profile with the new token
        const userResponse = await authApi.getProfile();
        console.log(userResponse, "tesssss water");
        const userData = userResponse;

        // Set auth with user data
        setAuth(userData, newAccessToken, newRefreshToken);
        queryClient.setQueryData(["user", newAccessToken], userResponse);
        userFetchInitiated.current = true;

        toast.success("Login successful");
        navigate("/", { replace: true });
      } catch (error) {
        setLoading(false);
        toast.error("Failed to get user profile");
      }
    },
    onError: (error: any) => {
      setLoading(false);
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      if (!refreshToken) throw new Error("No refresh token");
      return authApi.logout({ refreshToken });
    },
    onMutate: () => setLoading(true),
    onSettled: () => {
      // Always clear auth state regardless of success/error
      clearAuth();
      queryClient.clear();
      userFetchInitiated.current = false;
      navigate("/sign-in", { replace: true });
      toast.success("Logged out successfully");
    },
  });

  const login = useCallback(
    (data: LoginRequest) => {
      console.log(data);
      loginMutation.mutate(data);
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading:
      isLoading ||
      loginMutation.isPending ||
      logoutMutation.isPending ||
      userQuery.isLoading,
    login,
    logout,
    error: loginMutation.error || logoutMutation.error || userQuery.error,
  };
};
