"use client"

import { useVitals } from "@/app/_components/entities/vitals"
import { getMetricScore } from "@/app/_components/widgets/project-charts/api/getMetricScore"
import { statuses_variants } from "@/styles/variants/statuses"
import { cn } from "@repo/ui/cn"

const Trigger = () => {
  const vitals = useVitals(state => state.vitals)
  const last = vitals[vitals.length - 1]
  const last_metric = last ? getMetricScore(last.name, last.value) : null
  return (
    <>
      <span>Last performance metrics</span>
      {
        last_metric &&
        <span className="ml-auto inline-flex gap-2 items-center">
          <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{last_metric.metric?.name}</span>
          <div className={cn("px-2 divide-x shrink-0 rounded-md py-1", statuses_variants({ variant: last_metric.score }))}>
            <span className={cn(
              "capitalize text-sm pr-2 text-inherit border-inherit",
            )}>
              {last_metric.score}
            </span>
            <span className={cn(
              "text-sm pl-2 text-inherit border-inherit",
            )}>
              {last_metric.formattedValue}s.
            </span>
          </div>
        </span>
      }
    </>
  )
}
export { Trigger }
