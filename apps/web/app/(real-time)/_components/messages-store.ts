import { create } from "zustand";

export type VisitorMessage = {
  uid: string;
  created_at: string;
  text: string;
};

type Store = {
  messages: VisitorMessage[];
  setMessages: (messages: VisitorMessage[]) => void;
};

export const useMessages = create<Store>((set) => ({
  messages: [],
  setMessages: (messages) => set(() => ({ messages: messages })),
}));
