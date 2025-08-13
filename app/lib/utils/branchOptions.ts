import type { Branch } from "~/types/branch";

export const createBranchOptions = (branches: Branch[]) => {
  // const options = [{ label: "All Branches", value: "ALL" }];

  // Add dynamic branches from API
  const branchOptions = branches.map((branch) => ({
    label: branch.name,
    value: branch.id,
  }));

  return [...branchOptions];
};
