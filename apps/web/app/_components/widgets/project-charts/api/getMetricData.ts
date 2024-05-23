import { Vitals } from "@yz13/api/db/types";
import dayjs from "dayjs";
import { groupBy } from "lodash";

const getMetricData = (vitals: Vitals[], target: string, date?: string) => {
  const filtered = vitals.filter((chart) => chart.name === target);
  const group = groupBy(
    filtered
      .map((chart) => ({
        ...chart,
        created_at: dayjs(chart.created_at).format("YYYY-MM-DD"),
      }))
      .sort((a, b) => dayjs(a.created_at).diff(dayjs(b.created_at), "date")),
    "created_at"
  );
  const today_key = date ? date : dayjs().format("YYYY-MM-DD");
  return (group[today_key] || []).filter((item) => item.name === target);
};
export { getMetricData };
