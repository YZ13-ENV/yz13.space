import { Vitals, getWebVitalsRecords } from "@/api/web-vitals"
import { uniqBy } from "lodash"
import { unstable_noStore } from "next/cache"
import { ChartOutput } from "./chart-output"
import { ChartSelector } from "./chart-selector"


export type ChartTab = {
  value: string
  label: string
}
type Props = {
  project_id: string
}
const ProjectCharts = async ({ project_id }: Props) => {
  unstable_noStore()
  const vitals = await getWebVitalsRecords(project_id)
  const chart_names: ChartTab[] = uniqBy(vitals.data, "name")?.map(insight => ({ label: insight.name, value: insight.name })) || []
  const data: Vitals[] = vitals.data as Vitals[]
  const charts: ChartTab[] = chart_names
  return (
    <div className="w-full space-y-12">
      <ChartOutput data={data} />
      <ChartSelector charts={charts} />
    </div>
  )
}
export { ProjectCharts }
