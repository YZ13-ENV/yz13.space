import { events } from "@/actions/activity-events.server"
import { member } from "@/actions/team-member"
import { Activity } from "@/components/activity"
import { Locales } from "@/dictionaries/tools"
import dayjs from "dayjs"
import { unstable_cache as cache } from "next/cache"

export type ActivityEvent = {
  id: string
  type: string,
  created_at: string
}

const fetchAllEvents = async () => {
  const username = "YZ13-ENV"
  const pages = Array.from({ length: 10 }).map((_, i) => i + 1)
  let all: any[] = []
  pages.forEach(async page => {
    const activity = await events({ username, page })
    console.log(activity?.length)
    if (!activity) return
    if (typeof activity?.message === "string") return
    if (activity?.length === 0) return
    if (activity) all = [...all, ...activity]
  })
  return all
}

const UserActivity = async ({ uid, lang = "en" }: { uid: string, lang?: Locales }) => {
  const getAllCached = cache(async () => fetchAllEvents(), ["all-events"], { revalidate: 60 * 60, tags: ["all-events"] })
  const all = await getAllCached()
  const user = await member(uid)
  const data = user?.data
  const year = data?.["experience-from"] ?? 2024
  const activityEvents: ActivityEvent[] = all.map((item: any) => ({ id: item.id, type: item.type, created_at: dayjs(item.created_at).format("DD-MM-YYYY") }))
  // console.log(activityEvents)
  return (
    <Activity year={year} data={activityEvents} lang={lang} />
  )
}
export { UserActivity }
