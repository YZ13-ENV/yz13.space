export type MetricParams = {
  name: string;
  good: number;
  mid: number;
  poor: number;
  weight?: number;
};

const FCP: MetricParams = {
  weight: 15,
  name: "FCP",
  good: 1.8,
  mid: 2.0,
  poor: 2.0,
};
const TTFB: MetricParams = {
  name: "TTFB",
  good: 0.8,
  mid: 1,
  poor: 1,
};
const CLS: MetricParams = {
  weight: 25,
  name: "CLS",
  good: 0.1,
  mid: 0.1,
  poor: 0.1,
};
const LCP: MetricParams = {
  weight: 30,
  name: "LCP",
  good: 2.5,
  mid: 3,
  poor: 3,
};

const FID: MetricParams = {
  name: "FID",
  good: 0.1,
  mid: 0.2,
  poor: 0.2,
};
const INP: MetricParams = {
  weight: 30,
  name: "INP",
  good: 0.2,
  mid: 0.4,
  poor: 0.4,
};
export type Metrics = "FCP" | "TTFB" | "CLS" | "LCP" | "FID" | "INP";
const metrics = [FCP, TTFB, CLS, LCP, FID, INP];
export { CLS, FCP, FID, INP, LCP, TTFB, metrics };
