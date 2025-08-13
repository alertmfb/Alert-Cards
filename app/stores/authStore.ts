// stores/authStore.ts - Fixed with better hydration handling
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "~/types/auth";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  _hasHydrated: boolean; // Internal hydration flag

  // Actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  _setHasHydrated: (hasHydrated: boolean) => void;
}

// Better SSR-safe storage
const createSafeStorage = () => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return window.localStorage;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true, // Start with loading true
      _hasHydrated: false,

      setAuth: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      _setHasHydrated: (hasHydrated) => {
        set({
          _hasHydrated: hasHydrated,
          // Only set loading to false after hydration if we weren't already loading something else
          isLoading: hasHydrated ? false : get().isLoading,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => createSafeStorage()),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Set hydrated flag after rehydration
        state?._setHasHydrated(true);
      },
    }
  )
);

// Hook that handles hydration properly
export const useHydratedAuthStore = () => {
  const store = useAuthStore();

  // Return safe state until hydrated
  if (!store._hasHydrated) {
    return {
      ...store,
      isLoading: true,
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
    };
  }

  return store;
};
