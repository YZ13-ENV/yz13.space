import { create } from "zustand";

type Store = {
  selected: string;
  setSelected: (selected: string) => void;
};
const useSelectChart = create<Store>((set) => ({
  selected: "",
  setSelected: (selected) => set(() => ({ selected: selected })),
}));
export { useSelectChart };
