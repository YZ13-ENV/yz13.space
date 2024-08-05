"use client"
import { Button } from "@yz13/mono/components/button"
import { ReactNode } from "react"
import { cn } from "yz13/cn"
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
      className={cn("size-8 aspect-square transition-colors hover:bg-yz-neutral-200 rounded-full", className)}
    >
      {children}
    </Button>
  )
}
export { Trigger }
