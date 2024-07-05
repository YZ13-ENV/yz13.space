"use client"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  className?: string
}
const LeftSide = ({ children, className = "" }: Props) => {
  return (
    <div
      className={cn(
        "left-view",
        className
      )}>
      {children}
    </div>
  )
}
export { LeftSide }
