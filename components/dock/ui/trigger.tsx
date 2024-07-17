"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"
import { useDockTab } from "../store/dock.store"

type TriggerProps = {
  value: string
  children?: ReactNode
  className?: string
  asChild?: boolean
}
const Trigger = ({ asChild = false, value, children, className = '' }: TriggerProps) => {
  const { tab, setTab } = useDockTab()
  const isSelected = tab ? tab === value : false
  return (
    <Button
      asChild={asChild}
      onClick={() => isSelected ? setTab(undefined) : setTab(value)}
      variant="ghost"
      size="icon"
      className={cn("w-10 h-10 aspect-square bg-yz-neutral-200 rounded-full", className)}
    >
      {children}
    </Button>
  )
}
export { Trigger }
