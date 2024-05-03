import { Vitals, getWebVitalsRecords } from "@/api/web-vitals"
import { uniqBy } from "lodash"
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
  // const insights = await getList(project_id)
  // const ids = insights.results.map(insight => insight.id)
  const vitals = await getWebVitalsRecords(project_id)
  const chart_names: ChartTab[] = uniqBy(vitals.data, "name")?.map(insight => ({ label: insight.name, value: insight.name })) || []
  // console.log(insights)
  // console.log(insights)
  // ids.forEach(chart => {
  // getInsights(project_id, chart)
  // .then(result => {
  // console.log({ chart: chart, result: result })
  // console.log(result?.result)
  // })
  // })
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
