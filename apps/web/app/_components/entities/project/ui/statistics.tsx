import { Suspense } from "react"
import { StatusStatistic } from "./status-statistic"

type Props = {
  project_id: string
}
const CardStatistics = ({ project_id }: Props) => {
  return (
    <Suspense fallback={<div className="w-16 h-full rounded-md bg-accents-3 animate-pulse" />}>
      <StatusStatistic project_id={project_id} />
    </Suspense>
  )
}
export { CardStatistics }
