"use client"
import { likeSubThread, onSubThread, viewSubThread } from "@yz13/api/db/client-threads"
import { FullSubThread, SubThread } from "@yz13/api/db/types"
import { useLocalStorageState } from "ahooks"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useEffect, useMemo, useState } from "react"
import { LikeButton } from "./like-button"
import { ViewButton } from "./view-button"

type Props = {
  sub_thread: FullSubThread
}
dayjs.extend(relativeTime)
const SubThreadStatistics = ({ sub_thread }: Props) => {
  const isDev = process.env.NODE_ENV === "development"
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const [likes, setLikes] = useState<SubThread["likes"]>(sub_thread.likes)
  const [views, setViews] = useState<SubThread["likes"]>(sub_thread.views)
  const session_id = sid || ""
  const isLiked = useMemo(() => { return likes.includes(session_id) }, [likes])
  const isViewed = useMemo(() => { return views.includes(session_id) }, [views])
  const [waitLike, setWaitLike] = useState<boolean>(false)
  const likes_count = useMemo(() => { return likes.length }, [likes])
  const views_count = useMemo(() => { return views.length }, [views])
  const view = async () => {
    if (session_id && !isViewed) {
      if (!isDev) {
        await viewSubThread(sub_thread.thread_id, sub_thread.sub_thread_id, session_id)
          .catch(console.log)
      }
    }
  }
  const like = () => {
    if (session_id) {
      if (!isDev) {
        setWaitLike(true)
        likeSubThread(sub_thread.thread_id, sub_thread.sub_thread_id, session_id)
          .finally(() => setWaitLike(false))
          .catch(console.log)
      }
    }
  }
  useEffect(() => {
    const sub_thread_channel = sub_thread.thread_id + "-" + sub_thread.sub_thread_id
    const thread_id = sub_thread.thread_id
    const sub_thread_id = sub_thread.sub_thread_id
    onSubThread(sub_thread_channel, thread_id, sub_thread_id, (payload) => {
      const new_sub_thread = payload.new
      if (new_sub_thread !== "{}") {
        const updated_likes = (new_sub_thread as SubThread).likes
        const updated_views = (new_sub_thread as SubThread).views
        setLikes(updated_likes)
        setViews(updated_views)
      }
    })
  }, [])
  return (
    <>
      <LikeButton
        loading={waitLike}
        onClick={like}
        variant={isLiked ? "liked" : "not-liked"}
        value={likes.length}
      />
      <ViewButton
        value={views_count}
        onView={view}
      />
    </>
  )
}
export { SubThreadStatistics }
