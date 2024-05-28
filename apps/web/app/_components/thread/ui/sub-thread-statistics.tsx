"use client"
import { Button } from "@repo/ui/button"
import { ThreadItem } from "@yz13/api/db/types"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useState } from "react"
import AnimatedNumbers from "react-animated-numbers"
import { BiChart, BiHeart } from "react-icons/bi"

type Props = {
  sub_thread: ThreadItem
}
dayjs.extend(relativeTime)
const SubThreadStatistics = ({ sub_thread }: Props) => {
  const created_at = dayjs(sub_thread?.created_at)
  const formatted_created_at = created_at.fromNow(false)
  const [likes, setLikes] = useState<string[]>([])
  const [views, setViews] = useState<string[]>([])
  const test_id = "test-id"
  const isLiked = likes.includes(test_id)
  const isViewed = views.includes(test_id)
  const like = () => {
    if (isLiked) {
      setLikes(likes.filter(like => like !== test_id))
    } else setLikes([...likes, test_id])
  }
  const view = () => {
    if (isViewed) {
      setViews(views.filter(like => like !== test_id))
    } else setViews([...views, test_id])
  }
  return (
    <div className="w-full flex items-center justify-between">
      <div className="relative -left-3 flex items-center gap-2">
        <Button
          onClick={like}
          variant={isLiked ? "error" : "ghost"}
          size="sm"
          className="gap-2 transition-all"
        >
          <BiHeart size={16} />
          <AnimatedNumbers
            includeComma
            transitions={(index) => ({
              type: "spring",
              duration: index + 0.3,
            })}
            animateToNumber={likes.length}
          />
        </Button>
        <Button onClick={view} variant="ghost" size="sm" className="gap-2">
          <BiChart size={16} />
          <AnimatedNumbers
            includeComma
            transitions={(index) => ({
              type: "spring",
              duration: index + 0.3,
            })}
            animateToNumber={views.length}
          />
        </Button>
      </div>
      <span className="text-xs">{formatted_created_at}</span>
    </div>
  )
}
export { SubThreadStatistics }
