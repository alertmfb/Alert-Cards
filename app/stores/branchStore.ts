import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Branch } from "~/types/branch";
import { createBranchOptions } from "~/lib/utils/branchOptions";

const safeStorage = createJSONStorage(() =>
  typeof window !== "undefined" && window.localStorage
    ? window.localStorage
    : {
        getItem() {
          return null;
        },
        setItem() {},
        removeItem() {},
      }
);

interface BranchStore {
  branches: Branch[];
  setBranches: (b: Branch[]) => void;
  branchNameById: Record<string, string>;
  // Add computed property for options
  getBranchOptions: () => Array<{ label: string; value: string }>;
}

export const useBranchStore = create<BranchStore>()(
  persist(
    (set, get) => ({
      branches: [],
      branchNameById: {},
      setBranches: (branches) =>
        set({
          branches,
          branchNameById: Object.fromEntries(
            branches.map(({ id, name }) => [id, name])
          ),
        }),
      getBranchOptions: () => {
        const { branches } = get();
        return createBranchOptions(branches);
      },
    }),
    {
      name: "branch-storage",
      storage: safeStorage,
      partialize: (s) => ({ branches: s.branches }),
    }
  )
);
