"use client"
import { cn } from "@/packages/ui/lib/utils"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { tabs } from "./const"

type Props = {
  selectedTab?: string
  onTab?: (tab: string) => void
}
const Tabs = ({ onTab, selectedTab = tabs[0]?.value as string }: Props) => {
  useEffect(() => {
    if (onTab) onTab(selectedTab)
  }, [selectedTab])
  return (
    <div className="h-fit p-1.5 bg-background w-fit max-w-full flex items-center justify-center rounded-full border">
      {
        tabs.map(tab => {
          const isSelected = selectedTab === tab.value
          return <span
            onClick={() => onTab && onTab(tab.value)}
            key={"tab-" + tab.value}
            className={cn(
              "inline-flex relative md:aspect-auto aspect-square select-none w-fit items-center justify-center cursor-pointer h-10 gap-2 px-4 py-2 rounded-full transition-colors delay-300",
              isSelected ? "bg-transparent text-background" : "bg-transparent text-foreground"
            )}
          >
            {tab.icon({ size: 18, className: "shrink-0 z-[1]" })}
            <span className="hidden text-inherit md:inline z-[1]">{tab.label}</span>
            {
              isSelected &&
              <motion.span
                layoutId="active-tab"
                className="absolute top-0 left-0 z-0 w-full h-full rounded-full bg-foreground"
              />
            }
          </span>
        })
      }
    </div>
  )
}
export { Tabs }
