"use client"
import { cn } from "@repo/ui/cn"
import { motion } from "framer-motion"

type Props = {
  barClassName?: string
  value?: string
  percent?: number
  withDate?: boolean
  date?: string
}
const ChartBar = ({ barClassName = "", withDate = false, percent = 25, date = "24 April", value = "" }: Props) => {
  return (
    <div className="flex items-end justify-end h-full w-fit">
      <div className={cn(
        "lg:w-24 w-16",
        "group/chart rounded-b-xl transition-colors h-full flex flex-col gap-2 justify-between border-r border-r-transparent",
        withDate ? "hover:border-muted" : ""
      )}>
        <div className="flex items-center justify-end w-full px-2 py-2">
          {withDate && <span className="text-sm">{date}</span>}
        </div>
        <div className="flex items-end w-full h-full">
          <motion.div
            initial={{ height: "20px" }}
            animate={{ height: `${percent}%` }}
            className={cn(
              "w-full h-64 z-10 min-h-5 cursor-pointer rounded-xl transition-colors flex items-center justify-center",
              barClassName ? barClassName : "group-hover/chart:bg-muted bg-muted/30"
            )}
          >
            <span className="text-xs text-inherit">{value}</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
export { ChartBar }
