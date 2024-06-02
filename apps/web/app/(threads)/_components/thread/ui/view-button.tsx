"use client"
import { Button, ButtonProps } from "@repo/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/tooltip"
import { useInViewport } from "ahooks"
import dynamic from "next/dynamic"
import { ElementRef, useEffect, useRef } from "react"
import { BiChart } from "react-icons/bi"
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
  loading: () => <span className="w-6 h-4 rounded-md bg-accents-2 animate-pulse inline-block" />
})

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
    if (inView && onView) onView()
  }, [inView])
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
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
              animateToNumber={value > 1000 ? value / 1000 : value}
            />
            {
              value > 1000 &&
              <span>k.</span>
            }
          </Button>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg" sideOffset={6}>{value} views</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export { ViewButton }
