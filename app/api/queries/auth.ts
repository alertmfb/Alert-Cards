// api/queries/auth.ts
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../services/auth";
import { isClient } from "~/lib/utils/storage";

export const useUserQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getProfile, // Fixed: use getProfile instead of getUser
    enabled: isClient() && options?.enabled !== false,
    retry: (failureCount, error: any) => {
      // Don't retry on auth errors
      if (error?.statusCode === 401 || error?.message === "Unauthorized") {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
