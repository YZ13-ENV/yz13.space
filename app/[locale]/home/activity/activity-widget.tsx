
import { member } from "@/actions/team-member"
import CommitsActivity from "@/components/commits-activity"
import { Locales } from "@/locales/server"
import dayjs from "dayjs"
import { HeatMap } from "./heat-map"

export type ActivityEvent = {
  id: string
  type: string,
  created_at: string
}


const UserActivity = async ({ lang = "en", uid }: { uid: string, lang?: Locales }) => {
  const user = await member(uid)
  const data = user?.data
  const now = dayjs()
  const year = data?.["experience-from"] ?? 2024
  const actualYear = now.year()
  const yearDifference = (actualYear + 1) - year
  const years = Array.from({ length: yearDifference }).map((_, i) => year + i).sort((a, b) => b - a)
  return (
    <div className="flex h-fit shrink-0 items-center flex-col overflow-x-hidden gap-2">
      <HeatMap lang={lang} years={years} />
      <CommitsActivity.Legend />
    </div>
  )
}
export { UserActivity }
