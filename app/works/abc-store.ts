import { Tables } from "yz13/supabase/database";
import { create } from "zustand";

export type Work = Tables<"works">;

type Store = {
  abc: string[];
  setAbc: (abc: string[]) => void;
};

export const useAbc = create<Store>((set) => ({
  abc: [],
  setAbc: (abc) => set(() => ({ abc: abc })),
}));
