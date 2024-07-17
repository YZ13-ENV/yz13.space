import { create } from "zustand";

type Store = {
  tab: string | undefined;
  setTab: (tab: string | undefined) => void;
};

export const useDockTab = create<Store>((set) => ({
  tab: undefined,
  setTab: (tab) => set(() => ({ tab: tab })),
}));
