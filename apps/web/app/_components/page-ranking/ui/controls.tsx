"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { PageRankVote, getUserVote, makeVote } from "@yz13/api/db/page-rank"
import { useLocalStorageState } from "ahooks"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md"
import { SimpleTooltip } from "../../simple-tooltip"

const RankingControl = () => {
  const path = usePathname()
  const [sid] = useLocalStorageState<string | null>("anon-sid", { defaultValue: null })
  const [liked, setLiked] = useState<boolean>(false)
  const [disliked, setDisliked] = useState<boolean>(false)
  const [likeLoading, setLikeLoading] = useState<boolean>(false)
  const [dislikeLoading, setDislikeLoading] = useState<boolean>(false)
  const disabled = likeLoading || dislikeLoading
  const addLike = async () => {
    if (sid) {
      const vote: PageRankVote = {
        path: path,
        uid: sid,
        liked: true,
        disliked: false
      }
      setLikeLoading(true)
      const new_vote = await makeVote(vote)
      setLikeLoading(false)
      if (new_vote.data) {
        const isLiked = new_vote.data.liked ? new_vote.data.liked : false
        const isDisliked = new_vote.data.disliked ? new_vote.data.disliked : false
        setLiked(isLiked)
        setDisliked(isDisliked)
      }
    }
  }
  const addDislike = async () => {
    if (sid) {
      const vote: PageRankVote = {
        path: path,
        uid: sid,
        liked: false,
        disliked: true
      }
      setDislikeLoading(true)
      const new_vote = await makeVote(vote)
      setDislikeLoading(false)
      if (new_vote.data) {
        const isLiked = new_vote.data.liked ? new_vote.data.liked : false
        const isDisliked = new_vote.data.disliked ? new_vote.data.disliked : false
        setLiked(isLiked)
        setDisliked(isDisliked)
      }
    }
  }
  useEffect(() => {
    console.log(path)
    if (sid) {
      getUserVote(sid, path)
        .then(vote => {
          const vote_data_arr = vote.data
          const vote_data = vote_data_arr ? vote_data_arr[0] : null
          if (vote_data) {
            const isLiked = vote_data.liked ? vote_data.liked : false
            const isDisliked = vote_data.disliked ? vote_data.disliked : false
            setLiked(isLiked)
            setDisliked(isDisliked)
          } else {
            setLiked(false)
            setDisliked(false)
          }
        })
    }
  }, [sid, path])
  return (
    <SimpleTooltip
      text={liked ? "You liked this page" : disliked ? "You didn't like this page" : "Do you like this page?"}
      side="left"
      sideOffset={12}
    >
      <div className="flex flex-col w-full">
        <Button
          disabled={disabled}
          onClick={addLike}
          variant={liked ? "success-default" : "success"}
          className={cn(
            "p-1 rounded-b-none",
            liked ? "" : "border border-success-border"
          )}>
          {
            likeLoading
              ? <BiLoaderAlt className={"text-inherit animate-spin"} size={16} />
              : <MdOutlineThumbUp className={"text-inherit"} size={16} />
          }
        </Button>
        <Button
          disabled={disabled}
          onClick={addDislike}
          variant={disliked ? "error-default" : "error"}
          className={cn(
            "p-1 rounded-t-none",
            disliked ? "" : "border border-error-border"
          )}>
          {
            dislikeLoading
              ? <BiLoaderAlt className={"text-inherit animate-spin"} size={16} />
              : <MdOutlineThumbDown className={"text-inherit"} size={16} />
          }
        </Button>
      </div>
    </SimpleTooltip>
  )
}
export { RankingControl }
