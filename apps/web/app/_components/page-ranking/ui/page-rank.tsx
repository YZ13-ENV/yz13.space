"use client"
import { getPageRank } from "@yz13/api/db/page-rank"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Circle from "../../circle"
import { SimpleTooltip } from "../../simple-tooltip"

const PageRank = () => {
  const [rank, setRank] = useState<number>(0)
  const page = usePathname()
  const [likes, setLikes] = useState<number>(10)
  const [dislikes, setDislikes] = useState<number>(10)
  const sum = likes + dislikes
  const percent = (likes / (likes + dislikes)) * 100 || 0
  const isReadyToShowRank = sum >= 10
  const rank_description = `Likes - ${likes} / Dislikes - ${dislikes}`
  useEffect(() => {
    getPageRank(page)
      .then(rank => {
        const rank_data = rank.data
        if (rank_data) {
          const onlyLikes = rank_data.length !== 0 ? (rank_data.map(rank => rank.liked).map(like => like === true ? 1 : 0) as number[]).reduce((a, b) => a + b) : 0
          const onlyDislikes = rank_data.length !== 0 ? (rank_data.map(rank => rank.disliked).map(dislike => dislike === true ? 1 : 0) as number[]).reduce((a, b) => a + b) : 0
          // setLikes(onlyLikes)
          // setDislikes(onlyDislikes)
        }
      })
  }, [])
  return (
    <SimpleTooltip
      text={isReadyToShowRank ? rank_description : `Need more votes to show page rank, now - ${sum}`}
      side="left"
      sideOffset={12}
    >
      <div className="w-full aspect-square rounded-full flex items-center justify-center">
        {
          isReadyToShowRank
            ? <Circle percent={percent} />
            : <div className="w-full h-full rounded-full border bg-accents-1 flex items-center justify-center"><span className="text-secondary">-</span></div>
        }
      </div>
    </SimpleTooltip>
  )
}
export { PageRank }
