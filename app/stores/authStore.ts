// stores/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState, User } from "~/types/auth";

interface AuthStore extends AuthState {
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      initialized: false,

      setAuth: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          initialized: true,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          initialized: true,
        });
      },

      setUser: (user) => {
        set({ user, isLoading: false });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setInitialized: (initialized) => {
        set({ initialized });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      // Remove onRehydrateStorage to prevent conflicts
    }
  )
);
