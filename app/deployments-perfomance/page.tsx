import { cn } from "@repo/ui/cn"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { Metadata } from "next"
import { LuDiff } from "react-icons/lu"
import { PiHashDuotone, PiTimerDuotone } from "react-icons/pi"

dayjs.extend(duration)
dayjs.extend(relativeTime)

export const metadata: Metadata = {
  title: "Deployments perfomance"
}

const page = async () => {
  const response = await fetch("https://api.yz13.space/deployments", {
    "method": "get"
  })
  const json = await response.json()
  const deployments = (json["deployments"] as any[] || [])
  const difference = (start: number, end: number) => {
    return dayjs.duration(end - start)
  }
  const Deployment = ({
    previousDeployment,
    deployment,
    isLast = false
  }: {
    previousDeployment?: any,
    deployment: any,
    isLast?: boolean
  }) => {
    const created_at = deployment.createdAt as number
    const created_at_date = dayjs(created_at).fromNow()
    const started_at = deployment.buildingAt as number
    const ready_at = deployment.ready as number
    const diff = difference(started_at, ready_at)
    const formatted = diff.format("mm:ss")
    const prev_started_at = !isLast ? previousDeployment["buildingAt"] as number : 0
    const prev_ready_at = !isLast ? previousDeployment["ready"] as number : 0
    const prev_diff = difference(prev_started_at, prev_ready_at)
    const deploymentDiff = diff.subtract(prev_diff)
    const formattedDeploymentDiff = deploymentDiff.asSeconds()
    const message = deployment.meta.githubCommitMessage
    return (
      <li key={deployment.uid} className="w-full group cursor-pointer">
        <div
          className="w-full p-3 flex flex-col gap-1.5 bg-background border rounded-2xl justify-between"
        >
          <div className="flex w-full justify-between items-center">
            <span className="text-sm line-clamp-1 font-medium group-hover:text-foreground transition-colors">
              {message}
            </span>
            <span className="text-xs shrink-0 text-secondary">{created_at_date}</span>
          </div>
          {/* <span className="text-sm">#{deployment.uid.slice(4, 10)}</span> */}
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full border inline-flex gap-1 items-center"
            >
              <PiHashDuotone size={12} />
              production
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full border inline-flex gap-1 items-center transition-colors group-hover:text-foreground"
            >
              <PiTimerDuotone size={12} />
              {formatted}
            </span>
            {
              !isLast &&
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full border inline-flex gap-1 items-center",
                formattedDeploymentDiff > 0 ? "text-success-foreground border-success-border bg-success-background/40" :
                  formattedDeploymentDiff < 0 ? "text-error-foreground border-error-border bg-error-background/40" :
                    "text-secondary"
              )}>
                <LuDiff size={12} />
                {formattedDeploymentDiff > 0 && "+"}
                {formattedDeploymentDiff}
              </span>
            }
          </div>
        </div>
      </li>
    )
  }
  return (
    <section className="max-w-xl mx-auto w-full space-y-6 p-6">
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-center">
          Deployments performance
        </h1>
      </div>
      <div className="w-full">
        <ul className="w-full space-y-2">
          {
            deployments.map((deployment, index, arr) => {
              const isLast = arr.length === (index + 1)
              const previousDeployment = isLast ? undefined : arr[(index + 1)]
              return (
                <Deployment
                  key={deployment.uid}
                  deployment={deployment}
                  isLast={isLast}
                  previousDeployment={previousDeployment}
                />
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}
export default page