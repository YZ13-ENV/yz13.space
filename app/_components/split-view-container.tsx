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
      "lg:mx-0 mx-auto lg:divide-x divide-x-0 w-full flex lg:flex-row flex-col min-h-screen",
      "lg:max-w-full max-w-xl",
      className
    )}
    >
      {children}
    </div>
  )
}
export { SplitViewContainer }
