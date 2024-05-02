import dayjs, { Dayjs } from "dayjs";
import { create } from "zustand";

type Store = {
  date: Dayjs;
  setDate: (date: Dayjs) => void;
};
const useDate = create<Store>((set) => ({
  date: dayjs(),
  setDate: (date) => set(() => ({ date: date })),
}));
export { useDate };
