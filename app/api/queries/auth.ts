// api/queries/auth.ts (Fixed)
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { authApi } from "../services/auth";
import { isClient } from "~/lib/utils/storage";
import { useRoleStore } from "~/stores/roleStore";

export const useUserQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getProfile,
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

export const useRolesQuery = (options?: { enabled?: boolean }) => {
  const setRoles = useRoleStore((s) => s.setRoles);

  const query = useQuery({
    queryKey: ["roles"],
    queryFn: authApi.getRoles,
    enabled: isClient() && options?.enabled !== false,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  // Handle success callback using useEffect
  useEffect(() => {
    if (query.isSuccess && query.data) {
      setRoles(query.data.data);
    }
  }, [query.isSuccess, query.data, setRoles]);

  return query;
};
