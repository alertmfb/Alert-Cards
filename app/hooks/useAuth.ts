import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "../stores/authStore";
import { authApi } from "~/api/services/auth";
import type { LoginRequest } from "~/types/auth";
import { useEffect, useCallback, useRef } from "react";

// Helper function to safely extract user data
const extractUserData = (data: any) => {
  if (!data) return null;

  // Handle different possible response structures
  let userData = data;
  if (data.data) {
    userData = data.data;
  }
  if (data.user) {
    userData = data.user;
  }

  return {
    id: userData?.id || "",
    name: userData?.name || "",
    email: userData?.email || "",
    avatar: userData?.avatar || "",
  };
};

// Helper function to safely extract auth tokens
const extractAuthData = (data: any) => {
  if (!data) return { accessToken: "", refreshToken: "" };

  let authData = data;
  if (data.data) {
    authData = data.data;
  }

  return {
    accessToken: authData?.accessToken || authData?.access_token || "",
    refreshToken: authData?.refreshToken || authData?.refresh_token || "",
  };
};

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const hasInitialized = useRef(false);

  const authStore = useAuthStore();
  const {
    setAuth,
    clearAuth,
    setUser,
    setLoading,
    setInitialized,
    user,
    isAuthenticated,
    isLoading,
    initialized,
    accessToken,
    refreshToken,
  } = authStore;

  // Initialize auth state ONLY ONCE
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      // Get current state to avoid stale closures
      const currentState = useAuthStore.getState();

      if (currentState.accessToken && currentState.refreshToken) {
        // We have tokens, mark as authenticated and initialized
        setInitialized(true);
        if (!currentState.isAuthenticated) {
          // Update auth state if not already set
          useAuthStore.setState({
            isAuthenticated: true,
            initialized: true,
            isLoading: false,
          });
        }
      } else {
        // No tokens, mark as initialized but not authenticated
        setInitialized(true);
        useAuthStore.setState({
          isAuthenticated: false,
          initialized: true,
          isLoading: false,
        });
      }
    }
  }, []); // Empty dependency array - run only once

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      try {
        console.log("Login success data:", data);
        const authData = extractAuthData(data);

        if (!authData.accessToken || !authData.refreshToken) {
          throw new Error("Invalid auth response: missing tokens");
        }

        // Create a temporary user object
        const tempUser = {
          id: "",
          name: "",
          email: "",
          avatar: "",
        };

        setAuth(tempUser, authData.accessToken, authData.refreshToken);
        queryClient.invalidateQueries({ queryKey: ["profile"] });

        const message =
          typeof data === "object" && data !== null && "message" in data
            ? String(data.message)
            : "Login successful";
        toast.success(message);

        const from = (location.state as any)?.from || "/";
        navigate(from, { replace: true });
      } catch (error) {
        console.error("Login success handler error:", error);
        setLoading(false);
        toast.error("Login failed: Invalid response");
      }
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      setLoading(false);
      const errorMessage =
        error?.response?.data?.message || error?.message || "Login failed";
      toast.error(errorMessage);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: (data) => {
      clearAuth();
      queryClient.clear();

      const message =
        typeof data === "object" && data !== null && "message" in data
          ? String(data.message)
          : "Logout successful";
      toast.success(message);
      navigate("/sign-in", { replace: true });
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      clearAuth();
      queryClient.clear();

      const errorMessage =
        error?.response?.data?.message || error?.message || "Logout failed";
      toast.error(errorMessage);
      navigate("/sign-in", { replace: true });
    },
  });

  // Profile query - Only run when we have auth tokens
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    enabled: Boolean(
      initialized && isAuthenticated && accessToken && !isLoading
    ),
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Handle profile query success
  useEffect(() => {
    if (
      profileQuery.data &&
      profileQuery.isSuccess &&
      !profileQuery.isLoading
    ) {
      try {
        console.log("Profile data:", profileQuery.data);
        const userData = extractUserData(profileQuery.data);

        if (userData && userData.id) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Profile data processing error:", error);
      }
    }
  }, [
    profileQuery.data,
    profileQuery.isSuccess,
    profileQuery.isLoading,
    setUser,
  ]);

  // Handle profile query error
  useEffect(() => {
    if (profileQuery.error && profileQuery.isError) {
      const error = profileQuery.error as any;
      console.error("Profile fetch failed:", error);

      if (error?.response?.status === 401) {
        console.log("Unauthorized - clearing auth");
        clearAuth();
        navigate("/sign-in", { replace: true });
      }
    }
  }, [profileQuery.error, profileQuery.isError, clearAuth, navigate]);

  const login = useCallback(
    (data: LoginRequest) => {
      loginMutation.mutate(data);
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    const currentRefreshToken = refreshToken;
    if (currentRefreshToken) {
      logoutMutation.mutate({ refreshToken: currentRefreshToken });
    } else {
      clearAuth();
      navigate("/sign-in", { replace: true });
    }
  }, [logoutMutation, clearAuth, navigate, refreshToken]);

  // Return only safe, serializable data
  return {
    user: user || null,
    isAuthenticated: Boolean(isAuthenticated),
    isLoading: Boolean(
      isLoading || loginMutation.isPending || logoutMutation.isPending
    ),
    initialized: Boolean(initialized),
    login,
    logout,
    // Return only safe profile data
    profileLoading: profileQuery.isLoading,
    profileError: profileQuery.error ? String(profileQuery.error) : null,
    loginError: loginMutation.error ? String(loginMutation.error) : null,
    logoutError: logoutMutation.error ? String(logoutMutation.error) : null,
  };
};
