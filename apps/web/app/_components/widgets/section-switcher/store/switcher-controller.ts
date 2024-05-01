import { ReactNode } from "react";
import { create } from "zustand";

export type Section = {
  id: string;
  component: ReactNode;
};
type Store = {
  current: number;
  pool: Section[];
  setPool: (pool: Section[]) => void;
  setCurrent: (current: number) => void;
};

export const useSwitcherController = create<Store>((set) => ({
  current: 0,
  setCurrent: (current) => set(() => ({ current: current })),
  pool: [],
  setPool: (pool) => set(() => ({ pool: pool })),
}));
