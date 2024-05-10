import { create } from "zustand";

export type ZoomLevel = 1 | 2 | 3 | 4;
// 1 - default, year
// 2 - month
// 3 - week
// 4 - day

type State = {
  zoomLevel: ZoomLevel;
  setZoomLevel: (zoomLevel: ZoomLevel) => void;
};

export const useZoomLevel = create<State>((set) => ({
  zoomLevel: 1,
  setZoomLevel: (zoom) => set(() => ({ zoomLevel: zoom })),
}));
