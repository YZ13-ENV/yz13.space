import { create } from "zustand";

type Store = {
  media: string | null;
  setMedia: (media: string | null) => void;
};

export const useMediaOverlay = create<Store>((set) => ({
  media: null,
  setMedia: (media) => set(() => ({ media: media })),
}));
