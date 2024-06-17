"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/tooltip"
import { useInViewport } from "ahooks"
import { ElementRef, useEffect, useRef } from "react"
import { LuBarChart2 } from "react-icons/lu"
import { Button } from "./sub-threads/button"
// const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
// ssr: false,
// loading: () => <span className="w-6 h-4 rounded-md bg-accents-2 animate-pulse inline-block" />
// })

type Props = {
  onClick?: () => void
  value: number
  onView?: () => void
}
const ViewButton = ({ value, onClick, onView }: Props) => {
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
          >
            <span className="relative flex items-center justify-center">
              <LuBarChart2 size={16} className="z-[1]" />
              <span className="w-7 h-7 z-[-1] bg-transparent group-hover/tag:bg-yz-neutral-100 transition-colors rounded-full absolute" />
            </span>
            {value}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg" sideOffset={6}>{value} views</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export { ViewButton }
