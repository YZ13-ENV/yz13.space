"use client"
import { cn } from "@/packages/ui/lib/utils"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { ServerTab, tabs } from "./const"

type Props = {
  providedTabs?: ServerTab[]
  selectedTab?: string
  onTab?: (tab: string) => void
}
const Tabs = ({ onTab, selectedTab = tabs[0]?.value as string, providedTabs = [] }: Props) => {
  useEffect(() => {
    if (onTab) onTab(selectedTab)
  }, [selectedTab])
  return (
    <div className="h-fit bg-background w-fit max-w-full flex items-center justify-center">
      {
        providedTabs
          .map(tab => {
            const isSelected = selectedTab === tab.value
            return <span
              onClick={() => onTab && onTab(tab.value)}
              key={"tab-" + tab.value}
              className={cn(
                "inline-flex relative select-none w-fit items-center justify-center cursor-pointer h-10 gap-2 px-4 py-2 rounded-full transition-colors delay-300",
                isSelected ? "bg-transparent text-background" : "bg-transparent text-foreground"
              )}
            >
              {tab.icon}

              <span className="text-inherit z-[1] sm:inline hidden md:text-base text-sm">{tab.label}</span>
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
