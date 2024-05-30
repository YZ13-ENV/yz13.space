"use client"
import { cn } from "@repo/ui/cn"
import { likeSubThread, viewSubThread } from "@yz13/api/db/client-threads"
import { ThreadItem } from "@yz13/api/db/types"
import { useLocalStorageState } from "ahooks"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useMemo } from "react"
import { LikeButton } from "./like-button"
import { ViewButton } from "./view-button"

type Props = {
  className?: string
  sub_thread: ThreadItem
  hideTime?: boolean
  format?: string
}
dayjs.extend(relativeTime)
const SubThreadStatistics = ({ className = "", sub_thread, format, hideTime = false }: Props) => {
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const created_at = dayjs(sub_thread?.created_at)
  const formatted_created_at = format ? created_at.format(format) : created_at.fromNow(false)
  const likes = sub_thread.likes
  const views = sub_thread.views
  const session_id = sid || ""
  const isLiked = useMemo(() => { return likes.includes(session_id) }, [likes])
  const isViewed = useMemo(() => { return views.includes(session_id) }, [views])
  const view = async () => {
    if (session_id && !isViewed) {
      await viewSubThread(sub_thread.thread_id, sub_thread.sub_thread_id, session_id)
    }
  }
  const like = async () => {
    if (session_id) {
      await likeSubThread(sub_thread.thread_id, sub_thread.sub_thread_id, session_id)
    }
  }
  return (
    <div className={cn("w-full flex items-center justify-between", className)}>
      <div className="relative -left-1 flex items-center gap-2">
        {
          process.env.NODE_ENV === "development" &&
          <span className="text-sm">{sub_thread.sub_thread_id}</span>
        }
        <LikeButton
          onClick={like}
          variant={isLiked ? "liked" : "not-liked"}
          value={likes.length}
        />
        <ViewButton
          variant="ghost"
          value={views.length}
          onView={view}
        />
      </div>
      {
        !hideTime &&
        <span className="text-xs">{formatted_created_at}</span>
      }
    </div>
  )
}
export { SubThreadStatistics }
