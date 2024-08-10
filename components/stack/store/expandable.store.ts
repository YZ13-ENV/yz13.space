import { createContext } from "react";
import { createStore } from "zustand";

export type Store = {
  expanded: boolean;
};
interface StoreAction extends Store {
  setExpanded: (expanded: boolean) => void;
}

export const createExpandableStore = (init?: Partial<Store>) => {
  const DEFAULT_PROPS: Store = {
    expanded: false,
  };
  return createStore<StoreAction>()((set) => ({
    ...DEFAULT_PROPS,
    ...init,
    setExpanded: (value) => set(() => ({ expanded: value })),
  }));
};

type ExpandableStore = ReturnType<typeof createExpandableStore>;

export const ExpandableContext = createContext<ExpandableStore | null>(null);
