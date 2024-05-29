"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { useTimeout } from "ahooks"
import { useState } from "react"
import AnimatedNumbers from "react-animated-numbers"
import { BiHeart, BiSolidHeart } from "react-icons/bi"

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
  )
}
export { LikeButton }
