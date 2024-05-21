"use client"

import { useVitals } from "@/app/_components/entities/vitals"
import { statuses_variants } from "@/styles/variants/statuses"
import { cn } from "@repo/ui/cn"
import { getUserExperiences } from "../../api/user-experience"

const Trigger = () => {
  const vitals = useVitals(state => state.vitals)
  const user_experience = getUserExperiences(vitals)
  const last = user_experience[user_experience.length - 1]
  const last_experience = last ? last : null
  return (
    <>
      <span>User experience</span>
      {
        last_experience &&
        <span className="ml-auto inline-flex gap-2 items-center">
          <span className="text-sm shrink-0 px-2 py-1 w-fit rounded-md bg-accents-2">{last_experience.date}</span>
          <span className={cn("text-sm px-2 py-1 shrink-0 w-fit rounded-md", statuses_variants({ variant: last_experience.user_experience_status }))}>
            {last_experience.user_experience_percent}
          </span>
        </span>
      }
    </>
  )
}
export { Trigger }
