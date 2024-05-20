import { Vitals, getWebVitalsRecords } from "@/api/web-vitals"
import { cn } from "@repo/ui/cn"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/info-accordion"
import dayjs from "dayjs"
import { getMetricScore } from "../../project-charts/api/getMetricScore"

type Props = {
  id: string
}
const LastMetrics = async ({ id }: Props) => {
  const vitals = await getWebVitalsRecords(id)
  const data: Vitals[] = vitals.data as Vitals[]
  return (
    <AccordionItem value="metrics">
      <AccordionTrigger>Last performance metrics</AccordionTrigger>
      <AccordionContent className="divide-y p-0">
        <ul className="p-1 w-full overflow-x-auto">
          <li className="h-9 mb-0">
            <div className="p-1 h-full flex items-center gap-2 w-full">
              <span className="text-sm shrink-0 px-2 p-1 w-36 rounded-md bg-accents-2">Time</span>
              <span className="text-sm shrink-0 px-2 p-1 w-fit rounded-md bg-accents-2">Name</span>
              <div className="px-2 divide-x shrink-0 rounded-md bg-accents-2 py-1">
                <span className="text-sm pr-2">Score</span>
                <span className="text-sm pl-2">Value</span>
              </div>
              <span className="text-sm shrink-0 px-2 p-1 w-fit rounded-md bg-accents-2">Path</span>
              <span className="text-sm shrink-0 px-2 p-1 w-fit rounded-md bg-accents-2">Navigation type</span>
            </div>
          </li>
          {
            data
              .filter((_, i) => i <= 10)
              .map(
                item => {
                  const score = getMetricScore(item.name, item.value)
                  return (
                    <li key={item.name + "-" + item.created_at} className="h-9 mb-0">
                      <div className="p-1 h-full flex items-center gap-2 w-full">
                        <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{dayjs(item.created_at).format("DD MMMM HH:mm:ss:SSS")}</span>
                        <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{item.name}</span>
                        <div className={cn("px-2 divide-x shrink-0 rounded-md py-1",
                          score.score === "good"
                            ? "text-success-foreground bg-success-background border-success-foreground"
                            : score.score === "needs-improvement"
                              ? "text-warning-foreground bg-warning-background border-warning-foreground"
                              : score.score === "poor"
                                ? "text-error-foreground bg-error-background border-error-foreground"
                                : "bg-accents-2 text-foreground/70 border-border"
                        )}>
                          <span className={cn(
                            "capitalize text-sm pr-2 text-inherit border-inherit",
                          )}>
                            {score.score}
                          </span>
                          <span className={cn(
                            "text-sm pl-2 text-inherit border-inherit",
                          )}>
                            {score.formattedValue}s.
                          </span>
                        </div>
                        <span className="text-sm shrink-0 px-2 py-1 min-w-12 w-fit rounded-md bg-accents-2">{item.path}</span>
                        <span className="text-sm shrink-0 px-2 py-1 w-fit capitalize rounded-md bg-accents-2">{item.navigation_type}</span>
                      </div>
                    </li>
                  )
                }
              )
          }
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
export { LastMetrics }
