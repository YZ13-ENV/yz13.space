import { Vitals } from "@yz13/api/db/types";
import { create } from "zustand";

type Store = {
  charts: Vitals[];
  setCharts: (charts: Vitals[]) => void;
};

const useCharts = create<Store>((set) => ({
  charts: [],
  setCharts: (charts) => set(() => ({ charts: charts })),
}));
export { useCharts };
