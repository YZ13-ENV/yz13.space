import { create } from "zustand";

type Store = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};
export const useProjectModal = create<Store>((set) => ({
  enabled: false,
  setEnabled: (enabled) => set(() => ({ enabled: enabled })),
}));
