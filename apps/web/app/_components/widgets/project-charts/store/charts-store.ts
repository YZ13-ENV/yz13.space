import { create } from "zustand";

type Store = {
  charts: any[];
  setCharts: (charts: any[]) => void;
};

const useCharts = create<Store>((set) => ({
  charts: [],
  setCharts: (charts) => set(() => ({ charts: charts })),
}));
export { useCharts };
