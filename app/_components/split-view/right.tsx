"use client"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  className?: string
}
const RightSide = ({ children, className = "" }: Props) => {
  return (
    <div
      className={cn(
        "right-view",
        className
      )}>
      {children}
    </div>
  )
}
export { RightSide }
