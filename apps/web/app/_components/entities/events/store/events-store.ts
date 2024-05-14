import { MDXContent } from "@/utils/mdx";
import { create } from "zustand";

export type Event = {
  created_at: string;
  description: string;
  event_id: string;
  title: string;
};

type Store = {
  events: MDXContent[];
  setEvents: (events: MDXContent[]) => void;
};
export const useEvents = create<Store>((set) => ({
  events: [],
  setEvents: (events) => set(() => ({ events: events })),
}));
