import { create } from "zustand";
import {
  CommandPending,
  CommandRequest,
  CommandResponse,
} from "../registered-commands";

export type Log = CommandRequest | CommandPending | CommandResponse;

type Store = {
  logs: Log[];
  setLogs: (logs: Log[]) => void;
};

export const useLogs = create<Store>((set) => ({
  logs: [],
  setLogs: (logs) => set(() => ({ logs: logs })),
}));
