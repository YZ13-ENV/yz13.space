import { Commit } from "@/types/repo";
import { create } from "zustand";

type Store = {
  commits: Commit[];
  setCommits: (commits: Commit[]) => void;
};

export const useCommits = create<Store>((set) => ({
  commits: [],
  setCommits: (commits) => set(() => ({ commits: commits })),
}));
