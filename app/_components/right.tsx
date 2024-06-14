"use client"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"
import { useSplitMode } from "./split-control/store/store"

type Props = {
  children?: ReactNode
  ratio?: "1/3" | "1/2" | "2/3"
}
const RightSide = ({ children, ratio }: Props) => {
  // If ratio is set then its going to rewrite ratio for component
  // So if ratio is "2" and mode is "2:1" then component would work with ratio
  const mode = useSplitMode(state => state.mode)
  return (
    <div className={cn(
      "lg:w-1/2 shrink-0 w-full min-h-screen h-fit lg:pt-20 pt-0 pb-12",
      "transition-all duration-500",
      ratio
        ? ratio === "1/2" ? "lg:w-1/2"
          : ratio === "2/3" ? "lg:w-2/3"
            : ratio === "1/3" ? "lg:w-1/3"
              : ""
        : mode === "1:1" ? "lg:w-1/2" : mode === "2:1" ? "lg:w-1/3" : "lg:w-2/3"
    )}>
      {children}
    </div>
  )
}
export { RightSide }
