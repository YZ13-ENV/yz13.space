"use client"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"
import { useSplitMode } from "./split-control/store/store"

type Props = {
  children?: ReactNode
}
const RightSide = ({ children }: Props) => {
  // If ratio is set then its going to rewrite ratio for component
  // So if ratio is "2" and mode is "2:1" then component would work with ratio
  const mode = useSplitMode(state => state.mode)
  return (
    <div className={cn(
      "lg:w-1/2 shrink-0 w-full min-h-screen h-fit pt-0",
      "transition-all duration-500",
      "xl:w-1/2 lg:w-2/3"
    )}>
      {children}
    </div>
  )
}
export { RightSide }
