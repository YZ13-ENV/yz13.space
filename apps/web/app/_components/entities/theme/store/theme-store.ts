import { create } from "zustand";

export type Theme = "dark" | "light" | "system";
export type SystemTheme = "dark" | "light";
type Store = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: SystemTheme;
  setSystemTheme: (theme: SystemTheme) => void;
};

export const useTheme = create<Store>((set) => ({
  theme: "system",
  setTheme: (theme) => set(() => ({ theme: theme })),
  systemTheme: "light",
  setSystemTheme: (systemTheme) => set(() => ({ systemTheme: systemTheme })),
}));
