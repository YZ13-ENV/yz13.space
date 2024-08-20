import { Locales } from "@/locales/server";
import dayjs from "dayjs";
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
  const currentMonthLastDay = date.daysInMonth();
  const prevMonthLastDay = date.subtract({ month: 1 }).daysInMonth();

  const lastDayCurrentMonth = date.set({ day: currentMonthLastDay });
  const lastDayPrevMonth = date.set({
    day: prevMonthLastDay,
    month: date.month() - 1,
  });

  const dayBeforeFirstDay = lastDayPrevMonth.day();
  const predictedCount =
    dayBeforeFirstDay +
    lastDayCurrentMonth.day() +
    (7 - lastDayCurrentMonth.day());
  const dayAfterLastDay =
    predictedCount === 42
      ? 7 - lastDayCurrentMonth.date()
      : 42 - predictedCount + 7 - lastDayCurrentMonth.date();
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
  for (let i = 1; i <= lastDayCurrentMonth.date(); i++) {
    const generatedDate = date.set({ date: i, month: date.month() });
    currentMonthItems.push(generatedDate);
  }
  for (let i = 1; i <= dayAfterLastDay; i++) {
    const generatedDate = date.set({ date: i, month: date.month() + 1 });
    nextMonthItems.push(generatedDate);
  }
  return [...prevMonthItems, ...currentMonthItems, ...nextMonthItems];
};
