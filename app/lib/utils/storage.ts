// lib/utils/storage.ts
// SSR-safe localStorage utilities

export const isClient = () => typeof window !== "undefined";

export const storage = {
  getItem: (key: string): string | null => {
    if (!isClient()) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (!isClient()) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  },

  removeItem: (key: string): void => {
    if (!isClient()) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    if (!isClient()) return;
    try {
      localStorage.clear();
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
    }
  },
};
