import { useBranchesQuery } from "~/api/queries/branch";
import { useBranchStore } from "~/stores/branchStore";

export const useBranchOptions = () => {
  const { data: branches, isLoading, error } = useBranchesQuery();
  const getBranchOptions = useBranchStore((s) => s.getBranchOptions);
  const branchNameById = useBranchStore((s) => s.branchNameById);

  return {
    branchOptions: getBranchOptions(),
    isLoading,
    error,
    branchNameById,
  };
};
