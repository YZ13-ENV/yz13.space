import { Vitals } from "@/api/web-vitals";
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
