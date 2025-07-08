import { create } from "zustand";

type userRole = "approver" | "initiator";

interface UserRoleStore {
  userRole: userRole;
  setUserRole: (userRole: userRole) => void;
}

export const useUserRolesStore = create<UserRoleStore>((set) => ({
  userRole: "initiator",
  setUserRole: (userRole: userRole) => set({ userRole }),
}));
