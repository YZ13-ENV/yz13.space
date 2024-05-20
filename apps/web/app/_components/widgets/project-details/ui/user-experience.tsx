import { Vitals, getWebVitalsRecords } from "@/api/web-vitals"
import { cn } from "@repo/ui/cn"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/info-accordion"
import dayjs from "dayjs"
import { groupBy, keys } from "lodash"
import { getMetricScore } from "../../project-charts/api/getMetricScore"
import { metrics } from "../../project-charts/const"

type Props = {
  id: string
}
const UserExperience = async ({ id }: Props) => {
  const vitals = await getWebVitalsRecords(id)
  const data: Vitals[] = vitals.data as Vitals[]
  const group = groupBy(data.map(chart => ({ ...chart, created_at: dayjs(chart.created_at).format("YYYY-MM-DD") })).sort((a, b) => dayjs(a.created_at).diff(dayjs(b.created_at), "date")), "created_at")
  const group_keys = keys(group)
  return (
    <AccordionItem value="user-experience">
      <AccordionTrigger>User experience</AccordionTrigger>
      <AccordionContent>
        <ul className="p-1 w-full overflow-x-auto">
          {
            group_keys.map(key => {
              const metric_group = (group[key] || [])
              const metrics_avg = metric_group.map(metric => {
                const score = getMetricScore(metric.name, metric.value)
                return score
              })
              const metrics_scores = metrics.map(metric_params => {
                const filtered_by_metric = metrics_avg.filter(metric => metric.metric ? metric.metric.name === metric_params.name : metric)
                const metric_avg = filtered_by_metric.length ? (filtered_by_metric.map(item => item.value).reduce((a, b) => a + b) / filtered_by_metric.length) : 0
                const metric_score = getMetricScore(metric_params.name, metric_avg)
                return metric_score
              })
              const percent = metrics_scores.length ? metrics_scores.map(item => {
                const status = item.score
                if (status === "good") return item.metric?.weight || 0
                return 0
              }).reduce((a, b) => a + b) : 0
              const overall_status = percent >= 90 ? "Good" : percent >= 50 && percent < 90 ? "Medium" : "Poor"
              const overall_status_code = overall_status.toLowerCase()
              return (
                <li key={key} className="h-9 mb-0">
                  <div className="p-1 h-full flex items-center gap-2 w-full">
                    <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{dayjs(key).format("dd, DD MMMM YYYY")}</span>
                    <span className={cn(
                      "text-sm px-2 py-1 shrink-0 w-fit rounded-md",
                      overall_status_code === "good" ? "bg-success-background text-success-foreground"
                        : overall_status_code === "medium" ? "bg-warning-background text-warning-foreground"
                          : overall_status_code === "poor" ? "bg-error-background text-error-foreground"
                            : "bg-accents-2 text-foreground/70"

                    )}>Score {percent}%</span>
                    {
                      metrics_scores.map(score =>
                        <span key={score.score + "-" + score.value} className={cn(
                          "text-sm shrink-0 px-2 py-1 w-fit rounded-md",
                          score.score === "good" ? "bg-success-background text-success-foreground"
                            : score.score === "needs-improvement" ? "bg-warning-background text-warning-foreground"
                              : score.score === "poor" ? "bg-error-background text-error-foreground"
                                : "bg-accents-2 text-foreground/70"

                        )}>
                          {score.metric?.name} {score.formattedValue}s.
                        </span>
                      )
                    }
                  </div>
                </li>
              )
            }
            )
          }
          {/* export type Metrics = "FCP" | "TTFB" | "CLS" | "LCP" | "FID" | "INP"; */}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export { UserExperience }
