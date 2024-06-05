import { create } from "zustand";

export type VisitorCursor = {
  user_id: string;
  cursor: { x: number; y: number };
  theme_id?: number;
};

type Store = {
  cursors: VisitorCursor[];
  setCursors: (cursors: VisitorCursor[]) => void;
};

export const useCursors = create<Store>((set) => ({
  cursors: [],
  setCursors: (cursors) => set(() => ({ cursors: cursors })),
}));
