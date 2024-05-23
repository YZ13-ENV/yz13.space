import { Vitals } from "@yz13/api/db/types";
import dayjs from "dayjs";
import { groupBy, keys } from "lodash";
import { getMetricScore } from "../../project-charts/api/getMetricScore";
import { metrics } from "../../project-charts/const";

export type UserExperience = {
  date: string;
  user_experience_percent: string;
  user_experience_status: "good" | "needs-improvement" | "poor";
  metrics: {
    name: string | undefined;
    status: "good" | "needs-improvement" | "poor";
    value: string;
  }[];
};

const getUserExperiences = (vitals: Vitals[]): UserExperience[] => {
  const group = groupBy(
    vitals
      .map((chart) => ({
        ...chart,
        created_at: dayjs(chart.created_at).format("YYYY-MM-DD"),
      }))
      .sort((a, b) => dayjs(a.created_at).diff(dayjs(b.created_at), "date")),
    "created_at"
  );
  const group_keys = keys(group);
  const user_experience = group_keys.map((key) => {
    const metric_group = group[key] || [];
    const metrics_avg = metric_group.map((metric) => {
      const score = getMetricScore(metric.name, metric.value);
      return score;
    });
    const metrics_scores = metrics.map((metric_params) => {
      const filtered_by_metric = metrics_avg.filter((metric) =>
        metric.metric ? metric.metric.name === metric_params.name : metric
      );
      const metric_avg = filtered_by_metric.length
        ? filtered_by_metric.map((item) => item.value).reduce((a, b) => a + b) /
          filtered_by_metric.length
        : 0;
      const metric_score = getMetricScore(metric_params.name, metric_avg);
      return metric_score;
    });
    const percent = metrics_scores.length
      ? metrics_scores
          .map((item) => {
            const status = item.score;
            if (status === "good") return item.metric?.weight || 0;
            return 0;
          })
          .reduce((a, b) => a + b)
      : 0;
    const overall_status =
      percent >= 90
        ? "good"
        : percent >= 50 && percent < 90
          ? "needs-improvement"
          : "poor";
    return {
      date: dayjs(key).format("DD MMMM YYYY"),
      user_experience_percent: `${percent}%`,
      user_experience_status: overall_status,
      metrics: metrics_scores.map((score) => ({
        name: score.metric?.name,
        status: score.score,
        value: score.formattedValue,
      })),
    } as UserExperience;
  });
  return user_experience;
};

export { getUserExperiences };
