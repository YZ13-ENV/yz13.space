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
  const pickTab = () => {
    const isSelected = tab ? tab === value : false
    const pickedDifferentTab = tab ? tab !== value : false
    if (isSelected) {
      setTab(undefined)
    } else {
      if (pickedDifferentTab) {
        setTab(undefined)
        setTimeout(() => { setTab(value) }, 1000)
      } else setTab(value)
    }
  }
  return (
    <Button
      asChild={asChild}
      onClick={pickTab}
      variant="ghost"
      size="icon"
      className={cn("size-10 aspect-square transition-colors hover:bg-yz-neutral-200 rounded-xl", className)}
    >
      {children}
    </Button>
  )
}
export { Trigger }
