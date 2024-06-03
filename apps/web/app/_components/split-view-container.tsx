"use client"
import { cn } from "@repo/ui/cn"
import { ReactNode, useEffect } from "react"
import { SplitMode, useSplitMode } from "./split-control/store/store"

type Props = {
  className?: string
  children?: ReactNode
  mode?: SplitMode
}
const SplitViewContainer = ({ children, className, mode = "1:1" }: Props) => {
  const setSplitMode = useSplitMode(state => state.setMode)
  useEffect(() => {
    setSplitMode(mode)
  }, [mode])
  return (
    <div className={cn(
      "flex lg:flex-row lg:max-w-full max-w-xl lg:mx-0 mx-auto flex-col lg:divide-x divide-x-0 w-full justify-center overflow-y-auto min-h-screen",
      className
    )}
    >
      {children}
    </div>
  )
}
export { SplitViewContainer }
