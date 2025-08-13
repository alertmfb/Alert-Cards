import { axiosInstance } from "~/lib/axios";
import type { Branch, BranchesResponse } from "~/types/branch";

export const branchApi = {
  getBranches: async (): Promise<Branch[]> => {
    const res = await axiosInstance.get<BranchesResponse>("/branches");
    return res.data.data;
  },
};
