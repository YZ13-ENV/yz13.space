"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/tooltip"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  text?: string
}
const SimpleTooltip = ({ text = "", children, sideOffset = 4, side = "top" }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild={!!children}>{children}</TooltipTrigger>
        <TooltipContent
          className="rounded-lg"
          sideOffset={sideOffset}
          side={side}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export { SimpleTooltip }
