import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { branchApi } from "../services/branch";
import { useBranchStore } from "~/stores/branchStore";
import { isClient } from "~/lib/utils/storage";

export const useBranchesQuery = (options?: { enabled?: boolean }) => {
  const setBranches = useBranchStore((s) => s.setBranches);

  const query = useQuery({
    queryKey: ["branches"],
    queryFn: branchApi.getBranches,
    enabled: isClient() && options?.enabled !== false,
    staleTime: 30 * 60 * 1000, // 30 min – branches rarely change
    gcTime: 60 * 60 * 1000, // 60 min
  });

  // Handle success case with useEffect
  useEffect(() => {
    if (query.data) {
      setBranches(query.data);
    }
  }, [query.data, setBranches]);

  return query;
};
