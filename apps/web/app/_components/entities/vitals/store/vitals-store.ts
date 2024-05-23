import { Vitals } from "@yz13/api/db/types";
import { create } from "zustand";

type Store = {
  vitals: Vitals[];
  setVitals: (vitals: Vitals[]) => void;
};

export const useVitals = create<Store>((set) => ({
  vitals: [],
  setVitals: (vitals) => set(() => ({ vitals: vitals })),
}));
