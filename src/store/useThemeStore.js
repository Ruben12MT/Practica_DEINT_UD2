import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false,
      setDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: "darkmode-storage" },
  ),
);
