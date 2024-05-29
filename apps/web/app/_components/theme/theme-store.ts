import { create } from "zustand";

export type Theme = "dark" | "light";
type Store = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const useTheme = create<Store>((set) => ({
  theme: "light",
  setTheme: (theme) => set(() => ({ theme: theme })),
}));
export { useTheme };
