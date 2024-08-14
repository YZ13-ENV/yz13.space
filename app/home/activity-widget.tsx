import { events } from "@/actions/activity-events"
import { member } from "@/actions/team-member"
import { Activity } from "@/components/activity"
import dayjs from "dayjs"

export type ActivityEvent = {
  id: string
  type: string,
  created_at: string
}

const UserActivity = async ({ uid }: { uid: string }) => {
  const user = await member(uid)
  const data = user?.data
  const year = data?.["experience-from"] ?? 2024
  const activity = await events({ username: "YZ13-ENV" })
  const activityEvents: ActivityEvent[] = activity.map((item: any) => ({ id: item.id, type: item.type, created_at: dayjs(item.created_at).format("DD-MM-YYYY") }))
  return (
    <Activity year={year} data={activityEvents} />
  )
}
export { UserActivity }
