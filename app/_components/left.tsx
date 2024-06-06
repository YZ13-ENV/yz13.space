"use client"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"
import { useSplitMode } from "./split-control/store/store"

type Props = {
  children?: ReactNode
}
const LeftSide = ({ children }: Props) => {
  const mode = useSplitMode(state => state.mode)
  return (
    <div className={cn(
      "w-full shrink-0 flex flex-col items-center gap-6 lg:sticky relative top-0 lg:h-screen h-fit",
      "transition-all duration-500",
      mode === "1:1" ? "lg:w-1/2" : mode === "2:1" ? "lg:w-2/3" : "lg:w-1/3"
    )}>
      <div className="w-full h-full flex items-center justify-center flex-col">
        {children}
      </div>
    </div>
  )
}
export { LeftSide }
