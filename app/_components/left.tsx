"use client"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
}
const LeftSide = ({ children }: Props) => {
  return (
    <div className={cn(
      "w-full shrink-0 gap-6 lg:sticky top-0 lg:h-screen h-fit",
      "transition-all duration-500",
      "xl:w-1/2 lg:w-1/3"
    )}>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  )
}
export { LeftSide }
