import { Separator } from "@repo/ui/separator"
import { Suspense } from "react"
import { BiTime } from "react-icons/bi"
import { StatusStatistic } from "./status-statistic"

type Props = {
  project_id: string
  created_at: string
}
const CardStatistics = ({ project_id, created_at }: Props) => {
  return (
    <div className="flex items-center w-fit h-full px-1 gap-1">
      <div className="flex items-center justify-center w-fit h-full gap-1 p-1 transition-colors rounded-md hover:bg-muted">
        <BiTime size={14} className="shrink-0" />
        <span className="text-xs shrink-0">{created_at}</span>
      </div>
      <Separator orientation="vertical" className="h-2/3" />
      <Suspense fallback={<div className="w-16 h-full rounded-md bg-muted animate-pulse" />}>
        <StatusStatistic project_id={project_id} />
      </Suspense>
    </div>
  )
}
export { CardStatistics }
