import { create } from "zustand";

type Store = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useNewThreadControl = create<Store>((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open: open })),
}));
