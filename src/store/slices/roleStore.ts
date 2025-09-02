// @/store/slices/roleStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Role } from "@/types/auth";

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

interface RoleStore {
  roles: Role[];
  setRoles: (r: Role[]) => void;
  /** Convert ["IT"] → [{label:"IT", value:"IT"}] for <Select> */
  getRoleOptions: () => Array<{ label: string; value: string }>;
}

export const useRoleStore = create<RoleStore>()(
  persist(
    (set, get) => ({
      roles: [],
      setRoles: (roles) => set({ roles }),
      getRoleOptions: () => get().roles.map((r) => ({ label: r, value: r })),
    }),
    {
      name: "role-storage",
      storage: safeStorage,
      partialize: (s) => ({ roles: s.roles }),
    }
  )
);
