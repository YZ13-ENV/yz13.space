"use client"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"

type Props = {
  className?: string
  children?: ReactNode
}
const SplitViewContainer = ({ children, className }: Props) => {
  return (
    <div className={cn(
      "split-view-container",
      className
    )}
    >
      {children}
    </div>
  )
}
export { SplitViewContainer }
