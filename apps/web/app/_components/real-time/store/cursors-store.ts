import { create } from "zustand";

type VisitorCursor = {
  uid: string;
  cursor: { x: number; y: number };
};

type Store = {
  cursors: VisitorCursor[];
  setCursors: (cursors: VisitorCursor[]) => void;
};

export const useCursors = create<Store>((set) => ({
  cursors: [],
  setCursors: (cursors) => set(() => ({ cursors: cursors })),
}));
