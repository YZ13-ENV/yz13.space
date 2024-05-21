import { Vitals } from "@/api/web-vitals";
import { create } from "zustand";

type Store = {
  vitals: Vitals[];
  setVitals: (vitals: Vitals[]) => void;
};

export const useVitals = create<Store>((set) => ({
  vitals: [],
  setVitals: (vitals) => set(() => ({ vitals: vitals })),
}));
