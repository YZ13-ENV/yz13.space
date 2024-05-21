"use client"
import { useVitals } from "@/app/_components/entities/vitals"
import { statuses_variants } from "@/styles/variants/statuses"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import dayjs from "dayjs"
import Link from "next/link"
import { getMetricScore } from "../../../project-charts/api/getMetricScore"

type Props = {
  id: string
}
const Content = ({ id }: Props) => {
  const vitals = useVitals(state => state.vitals)
  return (
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
        vitals
          .slice(vitals.length - 10, vitals.length)
          .map(
            item => {
              const score = getMetricScore(item.name, item.value)
              return (
                <li key={item.name + "-" + item.created_at} className="h-9 mb-0">
                  <div className="p-1 h-full flex items-center gap-2 w-full">
                    <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{dayjs(item.created_at).format("DD MMMM HH:mm:ss:SSS")}</span>
                    <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{item.name}</span>
                    <div className={cn("px-2 divide-x shrink-0 rounded-md py-1", statuses_variants({ variant: score.score }))}>
                      <span className={cn("capitalize text-sm pr-2 text-inherit border-inherit")}>{score.score}</span>
                      <span className={cn("text-sm pl-2 text-inherit border-inherit")}>{score.formattedValue}s.</span>
                    </div>
                    <span className="text-sm shrink-0 px-2 py-1 min-w-12 w-fit rounded-md bg-accents-2">{item.path}</span>
                    <span className="text-sm shrink-0 px-2 py-1 w-fit capitalize rounded-md bg-accents-2">{item.navigation_type}</span>
                  </div>
                </li>
              )
            }
          )
      }
      <li className="px-1">
        <Button className="w-full rounded-md" variant="ghost" asChild><Link href={`/${id}/speed-insights`}>See all</Link></Button>
      </li>
    </ul>
  )
}
export { Content }
