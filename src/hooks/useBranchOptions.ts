import { useBranchStore } from "@/store/slices/branchStore";

export const useBranchOptions = () => {
  const getBranchOptions = useBranchStore((s: any) => s.getBranchOptions);
  const branchNameById = useBranchStore((s: any) => s.branchNameById);

  return {
    branchOptions: getBranchOptions(),
    isLoading: false, // Mock loading state
    error: null, // Mock error state
    getBranchOptions,
    branchNameById,
  };
};
