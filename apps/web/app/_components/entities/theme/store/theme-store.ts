import { create } from "zustand";

export type Theme = "dark" | "light" | "system";

type Store = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useTheme = create<Store>((set) => ({
  theme: "system",
  setTheme: (theme) => set(() => ({ theme: theme })),
}));
