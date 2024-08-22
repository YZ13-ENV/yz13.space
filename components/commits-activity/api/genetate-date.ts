import { Locales } from "@/locales/server";
import dayjs, { Dayjs } from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);

export const generateData = ({
  month,
  year,
  lang = "en",
}: {
  month: number;
  year: number;
  lang?: Locales;
}) => {
  const date = dayjs({ year: year, month: month, date: 1 }).locale(lang);
  const days_in_month = date.daysInMonth();
  const prev_days_in_month = date.subtract({ month: 1 }).daysInMonth();

  const range_start = date;
  const range_end = date.set({ day: days_in_month });
  const lastDayPrevMonth = date.set({
    day: prev_days_in_month,
    month: date.month() - 1 < 0 ? 11 : date.month() - 1,
  });

  const dayBeforeFirstDay = lastDayPrevMonth.day();
  const predictedCount =
    dayBeforeFirstDay + range_end.day() + (7 - range_end.day());
  const dayAfterLastDay =
    predictedCount === 42
      ? 7 - range_end.date()
      : 42 - predictedCount + 7 - range_end.date();
  const prevMonthItems = [];
  const currentMonthItems = [];
  const nextMonthItems = [];
  for (
    let i = lastDayPrevMonth.date() + 1 - dayBeforeFirstDay;
    i <= lastDayPrevMonth.date();
    i++
  ) {
    const generatedDate = date.set({ date: i, month: date.month() - 1 });
    prevMonthItems.push(generatedDate);
  }
  for (let i = 1; i <= range_end.date(); i++) {
    const generatedDate = date.set({ date: i, month: date.month() });
    currentMonthItems.push(generatedDate);
  }
  for (let i = 1; i <= dayAfterLastDay; i++) {
    const generatedDate = date.set({ date: i, month: date.month() + 1 });
    nextMonthItems.push(generatedDate);
  }
  return [...prevMonthItems, ...currentMonthItems, ...nextMonthItems];
};

export const heat_map = ({
  month,
  year,
  lang = "en",
}: {
  month: number;
  year: number;
  lang?: Locales;
}) => {
  const current = dayjs({ year: year, month: month, date: 1 }).locale(lang);
  const current_last_day = current.daysInMonth();
  const range_start = current;
  const range_end = current.set({ date: current_last_day });
  const moved_range_start = closest_monday(range_start);
  const moved_range_end = closest_sunday(range_end);
  const difference = moved_range_end.diff(moved_range_start, "day") + 1 + 7;
  // console.log(difference);
  const result: Dayjs[] = [];
  for (let index = 0; index < difference; index++) {
    const next = moved_range_start.add(index, "day");
    result.push(next);
  }
  // console.log(result.length, difference);
  return result;
};

const closest_monday = (date: Dayjs) => date.set({ day: 1 });
const closest_sunday = (date: Dayjs) => date.set({ day: 0 });
