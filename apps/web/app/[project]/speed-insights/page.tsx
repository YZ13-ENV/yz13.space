import { getProject } from "@/api/projects"
import { Vitals, getWebVitalsRecords } from "@/api/web-vitals"
import { ThemeSwitcher } from "@/app/_components/entities/theme"
import { ProjectCharts } from "@/app/_components/widgets/project-charts"
import { getMetricScore } from "@/app/_components/widgets/project-charts/api/getMetricScore"
import { Footer } from "@/components/shared/footer"
import { User } from "@/components/shared/user"
import { cn } from "@repo/ui/cn"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { ProjectTabsV2 } from "../project-tabs"

type Props = {
  params: {
    project: string
  }
}
dayjs.extend(relativeTime)
const page = async ({ params }: Props) => {
  const OWNER = "YZ13-ENV"
  const REPO = "yz13"
  const id = params.project
  const { data } = await getProject(id)
  const project = data ? data[0] : null
  const created_at = dayjs(project?.created_at).fromNow(true)
  const vitals = await getWebVitalsRecords(id)
  const all_vitals: Vitals[] = vitals.data as Vitals[]
  return (
    <>
      <div className="container py-6">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="w-full flex flex-row flex-wrap gap-2">
            <ProjectTabsV2 id={id} />
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <User />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-6xl font-bold">Speed insights</h1>
        </div>
      </div>
      <div className="container py-12">
        <div className="max-w-6xl mx-auto w-full">
          <ProjectCharts project_id={id} />
        </div>
      </div>
      <div className="container py-12">
        <div className="max-w-6xl mx-auto space-y-6 w-full">
          <h2 className="text-4xl font-bold">Last metrics</h2>
          <ul className="p-1 w-full overflow-x-auto">
            <li className="h-9 mb-0">
              <div className="p-1 h-full flex items-center gap-2 w-full">
                <span className="text-sm shrink-0 px-2 p-1 w-36 rounded-md bg-accents-2">Time</span>
                <span className="text-sm shrink-0 px-2 p-1 w-fit rounded-md bg-accents-2">Name</span>
                <div className="px-2 divide-x h-7 inline-flex items-center shrink-0 rounded-md bg-accents-2 py-1">
                  <span className="text-sm pr-2">Score</span>
                  <span className="text-sm pl-2">Value</span>
                </div>
                <span className="text-sm shrink-0 px-2 p-1 w-fit rounded-md bg-accents-2">Path</span>
                <span className="text-sm shrink-0 px-2 p-1 w-fit rounded-md bg-accents-2">Navigation type</span>
              </div>
            </li>
            {
              all_vitals
                .filter((_, i) => i <= 10)
                .map(
                  item => {
                    const score = getMetricScore(item.name, item.value)
                    return (
                      <li key={item.name + "-" + item.created_at} className="h-9 mb-0">
                        <div className="p-1 h-full flex items-center gap-2 w-full">
                          <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{dayjs(item.created_at).format("DD MMMM HH:mm:ss:SSS")}</span>
                          <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{item.name}</span>
                          <div className={cn("px-2 h-7 divide-x inline-flex items-center shrink-0 rounded-md py-1",
                            score.score === "good"
                              ? "text-success-foreground bg-success-background border-success-foreground"
                              : score.score === "needs-improvement"
                                ? "text-warning-foreground bg-warning-background border-warning-foreground"
                                : score.score === "poor"
                                  ? "text-error-foreground bg-error-background border-error-foreground"
                                  : "bg-accents-2 text-foreground/70 border-border"
                          )}>
                            <span className={"capitalize text-sm pr-2 text-inherit border-inherit"}>{score.score}</span>
                            <span className={"text-sm pl-2 text-inherit border-inherit"}>{score.formattedValue}s.</span>
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
        </div>
      </div>
      <Footer className="bg-accents-1 border-t" />
    </>
  )
}
export default page