import { getWebVitalsRecords, Vitals } from "@/api/web-vitals"
import { metrics } from "@/app/_components/widgets/project-charts/const"
import { cn } from "@repo/ui/cn"
import dayjs from "dayjs"
import { groupBy, keys } from "lodash"
import { GrStatusGoodSmall } from "react-icons/gr"

type Props = {
  project_id: string
}

type PreparedMetric = {
  name: string;
  status: string;
  value: number;
  weight: number;
}
const StatusStatistic = async ({ project_id }: Props) => {
  const today = dayjs()
  const today_key = today.format("YYYY-MM-DD")
  const vitals = await getWebVitalsRecords(project_id)
  const charts: Vitals[] = (vitals.data as Vitals[]).filter(item => {
    const item_date_key = dayjs(item.created_at).format("YYYY-MM-DD")
    return item_date_key === today_key
  })
  const grouped_charts = groupBy(charts, "name")
  const grouped_charts_keys = keys(grouped_charts)
  const prepared_metrics: PreparedMetric[] = grouped_charts_keys.map(key => {
    const metric = metrics.find(item => item.name === key)
    const target = grouped_charts[key]
    const mid = target ? (target.map(item => item.value).reduce((a, b) => a + b) / target.length) / 1000 : 0
    const status = metric ? mid <= metric?.good ? "good" : mid > metric?.good && metric.mid >= mid ? "needs-improvement" : "poor" : "poor"
    const result = {
      name: key,
      status: status,
      value: mid,
      weight: metric?.weight || 0
    }
    return result
  })
  const percent = prepared_metrics.map(item => {
    const status = item.status
    if (status === "good") return item.weight
    return 0
  }).reduce((a, b) => a + b)
  const overall_status = percent >= 90 ? "Good" : percent >= 50 && percent < 90 ? "Medium" : "Poor"
  const overall_status_code = overall_status.toLowerCase()
  return (
    <div className={cn(
      "w-1/2 h-full flex group/status transition-colors p-1 rounded-md items-center justify-center gap-1",
      overall_status_code === "good"
        ? "hover:bg-green-600 bg-green-900/30 text-green-600 hover:text-accent-foreground"
        : overall_status_code === "medium"
          ? "hover:bg-yellow-600 bg-yellow-900/30 text-yellow-600 hover:text-accent-foreground"
          : overall_status_code === "poor"
            ? "hover:bg-red-600 bg-red-900/30 text-red-600 hover:text-accent-foreground"
            : "hover:bg-secondary bg-secondary/60 text-secondary-foreground hover:text-accent-foreground"
    )}>
      <GrStatusGoodSmall size={10} className="transition-colors text-inherit" />
      <span className="text-sm transition-colors text-inherit">{overall_status}</span>
    </div>
  )
}
export { StatusStatistic }
