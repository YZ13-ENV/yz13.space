import { Separator } from "@repo/ui/separator"
import { Suspense } from "react"
import { BiShow, BiTime } from "react-icons/bi"
import { StatusStatistic } from "./status-statistic"

type Props = {
  project_id: string
  created_at: string
}
const CardStatistics = ({ project_id, created_at }: Props) => {
  return (
    <div className="w-full h-10 p-1 rounded-lg border gap-1 flex items-center">
      <div className="w-1/3 h-full flex hover:bg-muted transition-colors p-1 rounded-md items-center justify-center gap-1">
        <BiShow size={18} />
        <span className="text-sm">1.1k</span>
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/3 h-full flex hover:bg-muted transition-colors p-1 rounded-md items-center justify-center gap-1">
        <BiTime size={18} />
        <span className="text-sm line-clamp-1">{created_at}</span>
      </div>
      <Separator orientation="vertical" />
      <Suspense fallback={<div className="w-1/3 h-full rounded-md bg-muted animate-pulse" />}>
        <StatusStatistic project_id={project_id} />
      </Suspense>
    </div>
  )
}
export { CardStatistics }
