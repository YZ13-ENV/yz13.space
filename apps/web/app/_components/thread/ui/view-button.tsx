"use client"
import { Button, ButtonProps } from "@repo/ui/button"
import { useInViewport } from "ahooks"
import { ElementRef, useEffect, useRef } from "react"
import AnimatedNumbers from "react-animated-numbers"
import { BiChart } from "react-icons/bi"

type Props = {
  onClick?: () => void
  value: number
  variant?: ButtonProps["variant"]
  onView?: () => void
}
const ViewButton = ({ value, onClick, variant, onView }: Props) => {
  const ref = useRef<ElementRef<"button">>(null)
  const [inView] = useInViewport(ref)
  useEffect(() => {
    console.log(inView)
    if (inView && onView) onView()
  }, [inView])
  return (
    <Button
      ref={ref}
      onClick={onClick}
      variant={variant}
      size="sm"
      className="gap-1 px-2 py-0 h-6"
    >
      <BiChart size={16} />
      <AnimatedNumbers
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
export { ViewButton }
