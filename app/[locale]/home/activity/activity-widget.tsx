import { events } from "@/actions/activity-events.server"
import { member } from "@/actions/team-member"
import { Activity } from "@/components/activity"
import { Locales } from "@/locales/server"

export type ActivityEvent = {
  id: string
  type: string,
  created_at: string
}


const UserActivity = async ({ uid, lang = "en" }: { uid: string, lang?: Locales }) => {
  const all = await events({ username: "YZ13-ENV" })
  const user = await member(uid)
  const data = user?.data
  const year = data?.["experience-from"] ?? 2024
  const allData: ActivityEvent[] = all.data ?? []
  return <Activity year={year} data={allData} lang={lang} />
}
export { UserActivity }
