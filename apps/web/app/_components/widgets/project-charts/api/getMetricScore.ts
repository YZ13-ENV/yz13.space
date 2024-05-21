import { MetricParams, metrics } from "../const";

type MetricScoreResult = {
  value: number;
  formattedValue: string;
  score: "good" | "needs-improvement" | "poor";
  metric?: MetricParams;
};

const getMetricScore = (
  metric_name: string,
  value: number
): MetricScoreResult => {
  const existed_metric = metrics.find((metric) => metric.name === metric_name);
  const prepared_value = value / 1000;
  const status = existed_metric
    ? prepared_value <= existed_metric?.good
      ? "good"
      : prepared_value > existed_metric?.good &&
          existed_metric.mid >= prepared_value
        ? "needs-improvement"
        : "poor"
    : "poor";
  const score: MetricScoreResult = {
    formattedValue: prepared_value.toFixed(3),
    score: status,
    value: value,
    metric: existed_metric,
  };
  return score;
};

export { getMetricScore };
