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
    <div className="flex items-center w-full h-10 gap-1 p-1 border rounded-lg">
      {/* <div className="flex items-center justify-center w-1/3 h-full gap-1 p-1 transition-colors rounded-md hover:bg-muted">
        <BiShow size={18} />
        <span className="text-sm">1.1k</span>
      </div> */}
      {/* <Separator orientation="vertical" /> */}
      <div className="flex items-center justify-center w-1/2 h-full gap-1 p-1 transition-colors rounded-md hover:bg-muted">
        <BiTime size={18} />
        <span className="text-sm line-clamp-1">{created_at}</span>
      </div>
      <Separator orientation="vertical" />
      <Suspense fallback={<div className="w-1/2 h-full rounded-md bg-muted animate-pulse" />}>
        <StatusStatistic project_id={project_id} />
      </Suspense>
    </div>
  )
}
export { CardStatistics }
