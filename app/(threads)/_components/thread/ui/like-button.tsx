"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/tooltip"
import { useTimeout } from "ahooks"
import { useEffect, useState } from "react"
import AnimatedNumbers from "react-animated-numbers"
import { BiHeart, BiLoaderAlt, BiSolidHeart } from "react-icons/bi"
// const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
//   ssr: false,
//   loading: () => <span className="w-6 h-4 rounded-md bg-accents-2 animate-pulse inline-block" />
// })

type Props = {
  loading?: boolean
  onClick?: () => void
  value: number
  variant?: "liked" | "not-liked"
}

const LikeButton = ({ loading = false, value, onClick, variant = "not-liked" }: Props) => {
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
            disabled={loading}
            onClick={() => {
              onClick && onClick()
              setClicked(true)
            }}
            variant="ghost"
            size="sm"
            className={cn("hover:bg-transparent gap-1 p-0 group/tag", isLiked ? "text-error-foreground" : "text-inherit")}
          >
            <span className="relative flex items-center justify-center">
              <span className="w-7 h-7 bg-transparent group-hover/tag:bg-yz-neutral-100 transition-colors rounded-full absolute z-[-1]" />
              {
                loading
                  ? <BiLoaderAlt size={16} className={cn("animate-spin z-[1]", isLiked ? "text-error-foreground" : "text-inherit")} />
                  :
                  isLiked
                    ? <BiSolidHeart size={16} className={cn("z-[1]", isLiked ? "text-error-foreground" : "text-inherit")} />
                    : <BiHeart size={16} className={cn("z-[1]", isLiked ? "text-error-foreground" : "text-inherit")} />
              }
            </span>
            <AnimatedNumbers
              className={isLiked ? "text-error-foreground" : "text-inherit"}
              includeComma
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
              animateToNumber={value > 1000 ? value / 1000 : value}
            />
            {
              value > 1000 &&
              <span>k.</span>
            }
          </Button>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg" sideOffset={6}>{value} likes</TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}
export { LikeButton }
