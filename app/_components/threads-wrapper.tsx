"use client"
import { cn } from "@/packages/ui/lib/utils"
import { ReactNode } from "react"
import { useSplitMode } from "./split-control/store/store"

type Props = {
  children?: ReactNode
  className?: string
}
const ThreadsWrapper = ({ children, className }: Props) => {
  const mode = useSplitMode(state => state.mode)
  const isWide = mode === "1:2"
  return (
    <div className={cn(
      "max-w-xl lg:mr-auto lg:ml-6 mx-auto h-full pr-12 space-y-12 py-3 pl-6",
      "transition-all duration-700",
      isWide ? "max-w-4xl" : "",
      className
    )}>
      {children}
    </div>
  )
}
export { ThreadsWrapper }
