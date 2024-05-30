"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/tooltip"
import { useTimeout } from "ahooks"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { BiHeart, BiSolidHeart } from "react-icons/bi"
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false
})

type Props = {
  onClick?: () => void
  value: number
  variant?: "liked" | "not-liked"
}

const LikeButton = ({ value, onClick, variant = "not-liked" }: Props) => {
  const [ready, setReady] = useState<boolean>(false)
  const [clicked, setClicked] = useState<boolean>(false)
  const isLiked = ready ? variant === "liked" : false
  useEffect(() => {
    if (typeof document !== "undefined") setReady(true)
  }, [typeof document])
  useTimeout(() => {
    setClicked(false)
  }, clicked ? 1000 : undefined)
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              onClick && onClick()
              setClicked(true)
            }}
            variant="ghost"
            size="sm"
            className={cn("gap-1 px-2 py-0 h-6", isLiked ? "text-error-foreground" : "text-inherit")}
          >
            {
              isLiked
                ? <BiSolidHeart size={16} className={isLiked ? "text-error-foreground" : "text-inherit"} />
                : <BiHeart size={16} className={isLiked ? "text-error-foreground" : "text-inherit"} />
            }
            <AnimatedNumbers
              className={isLiked ? "text-error-foreground" : "text-inherit"}
              includeComma
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
              animateToNumber={value}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg" sideOffset={6}>{value} likes</TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}
export { LikeButton }
