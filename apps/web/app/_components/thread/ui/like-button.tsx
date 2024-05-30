"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/tooltip"
import { useTimeout } from "ahooks"
import dynamic from "next/dynamic"
import { useState } from "react"
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
  const [clicked, setClicked] = useState<boolean>(false)
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
            variant={"ghost"}
            size="sm"
            className={cn("gap-1 px-2 py-0 h-6", variant === "liked" ? "text-error-foreground" : "")}
          >
            {
              variant === "liked"
                ? <BiSolidHeart size={16} />
                : <BiHeart size={16} />
            }
            <AnimatedNumbers
              className={variant === "liked" ? "text-error-foreground" : "text-inherit"}
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
