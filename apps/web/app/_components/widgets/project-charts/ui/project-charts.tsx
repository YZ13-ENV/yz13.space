import { APIResponse, getList } from "@/utils/posthog/api/insight"
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
  const insights = await getList(project_id)
  // const ids = insights.results.map(insight => insight.id)
  const chart_names: ChartTab[] = insights.results.map(insight => ({ label: insight.name, value: insight.short_id }))
  // console.log(insights)
  // console.log(insights)
  // ids.forEach(chart => {
  // getInsights(project_id, chart)
  // .then(result => {
  // console.log({ chart: chart, result: result })
  // console.log(result?.result)
  // })
  // })
  const data: APIResponse<any> = insights
  const charts: ChartTab[] = chart_names
  return (
    <div className="w-full space-y-12">
      <ChartOutput data={data.results} />
      <ChartSelector charts={charts} />
    </div>
  )
}
export { ProjectCharts }
