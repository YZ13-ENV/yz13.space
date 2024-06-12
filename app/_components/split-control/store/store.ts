import { create } from "zustand";

export type SplitMode = "2:1" | "1:1" | "1:2";

type Store = {
  mode: SplitMode;
  setMode: (mode: SplitMode) => void;
};

export const useSplitMode = create<Store>((set) => ({
  mode: "1:1",
  setMode: (mode) => set(() => ({ mode: mode })),
}));
