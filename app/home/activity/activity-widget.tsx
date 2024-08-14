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
  let remaining = true
  let page = 1
  let all: any[] = []
  while (remaining) {
    const activity = await events({ username, page })
    if (!activity) remaining = false
    if (typeof activity?.message === "string") remaining = false
    if (activity?.length === 0) remaining = false
    if (activity) all = [...all, ...activity]
    page = page + 1
  }
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
