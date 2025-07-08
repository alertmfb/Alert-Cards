// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";

// type Theme = "dark" | "light" | "system";

// interface ThemeProviderState {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
// }

// /* 1️⃣  Create context with undefined so we can warn outside provider */
// const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

// interface ThemeProviderProps {
//   children: ReactNode;
//   defaultTheme?: Theme;
//   storageKey?: string;
// }

// export function ThemeProvider({
//   children,
//   defaultTheme = "system",
//   storageKey = "vite-ui-theme",
// }: ThemeProviderProps) {
//   /* 2️⃣  First render: pull from localStorage synchronously (no flash) */
//   const [theme, setThemeState] = useState<Theme>(() => {
//     if (typeof window === "undefined") return defaultTheme;
//     return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme;
//   });

//   /* 3️⃣  Keep <html> class list in sync */
//   useEffect(() => {
//     const root = document.documentElement;

//     const apply = (t: Theme) => {
//       const resolved =
//         t === "system"
//           ? window.matchMedia("(prefers-color-scheme: dark)").matches
//             ? "dark"
//             : "light"
//           : t;

//       root.classList.toggle("dark", resolved === "dark");
//       root.classList.toggle("light", resolved === "light");
//     };

//     apply(theme);

//     /* 4️⃣  React if system theme flips while user picked “system” */
//     if (theme === "system") {
//       const mq = window.matchMedia("(prefers-color-scheme: dark)");
//       const listener = () => apply("system");
//       mq.addEventListener("change", listener);
//       return () => mq.removeEventListener("change", listener);
//     }
//   }, [theme]);

//   /* 5️⃣  Public setter */
//   const setTheme = (t: Theme) => {
//     t === "system"
//       ? localStorage.removeItem(storageKey)
//       : localStorage.setItem(storageKey, t);
//     setThemeState(t);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// /* 6️⃣  Safe hook */
// export function useTheme() {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
//   return ctx;
// }
