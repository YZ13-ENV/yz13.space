"use client"
import { useVitals } from "@/app/_components/entities/vitals"
import { statuses_variants } from "@/styles/variants/statuses"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import Link from "next/link"
import { getUserExperiences } from "../../api/user-experience"

type Props = {
  id: string
}
const Content = ({ id }: Props) => {
  const vitals = useVitals(state => state.vitals)
  const user_experience = getUserExperiences(vitals)
  return (
    <ul className="p-1 w-full overflow-x-auto">
      {
        user_experience.map(vital =>
          <li key={vital.date} className="h-9 mb-0">
            <div className="p-1 h-full flex items-center gap-2 w-full">
              <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{vital.date}</span>
              <span className={cn("text-sm px-2 py-1 shrink-0 w-fit rounded-md", statuses_variants({ variant: vital.user_experience_status }))}>
                {vital.user_experience_percent}
              </span>
              {
                vital.metrics.map(score =>
                  <span key={score.name + "-" + score.value} className={cn("text-sm shrink-0 px-2 py-1 w-fit rounded-md", statuses_variants({ variant: score.status }))}
                  >
                    {score.name} {score.value}s.
                  </span>
                )
              }
            </div>
          </li>
        )
      }
      <li className="px-1">
        <Button className="w-full rounded-md" variant="ghost" asChild><Link href={`/${id}/speed-insights`}>See all</Link></Button>
      </li>
    </ul>
  )
}
export { Content }
