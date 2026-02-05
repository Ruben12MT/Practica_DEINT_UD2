import { create } from "zustand";
import { persist } from "zustand/middleware";
/**
 * Store global para la gestión del tema (claro/oscuro).
 * Utiliza Zustand con middleware de persistencia para guardar la preferencia en localStorage.
 * 
 * @typedef {Object} ThemeState
 * @property {boolean} darkMode - Indica si el modo oscuro está activado.
 * @property {function(): void} setDarkMode - Función para alternar el estado del modo oscuro.
 */
export const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false, // Estado inicial: modo claro
      // Acción para alternar el modo oscuro
      setDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: "darkmode-storage" } // Clave para guardar en localStorage
  ),
);
