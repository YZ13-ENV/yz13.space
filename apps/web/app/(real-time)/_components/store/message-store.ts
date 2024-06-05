import { create } from "zustand";

export type VisitorMessage = {
  uid: string;
  created_at: string;
  text: string;
};

export type VisitorMessageWithID = VisitorMessage & { id: number };

type Store = {
  message: VisitorMessage | undefined;
  setMessage: (message: VisitorMessage | undefined) => void;
};

export const useMessage = create<Store>((set) => ({
  message: undefined,
  setMessage: (message) => set(() => ({ message: message })),
}));
