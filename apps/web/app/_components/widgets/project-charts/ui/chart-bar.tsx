import { cn } from "@repo/ui/cn"

type Props = {
  barClassName?: string
  value?: string
  percent?: number
  withDate?: boolean
  date?: string
}
const ChartBar = ({ barClassName = "", withDate = false, percent = 25, date = "24 April", value = "" }: Props) => {
  return (
    <div className="w-fit h-full flex items-end justify-end">
      <div className={cn(
        "lg:w-24 w-16",
        "group/chart rounded-b-xl transition-colors h-full flex flex-col gap-2 justify-between border-r border-r-transparent",
        withDate ? "hover:border-muted" : ""
      )}>
        <div className="w-full py-2 px-2 flex items-center justify-end">
          {withDate && <span className="text-sm">{date}</span>}
        </div>
        <div className="w-full h-full flex items-end">
          <div
            style={{ height: `${percent}%` }}
            className={cn(
              "w-full h-64 min-h-5 cursor-pointer rounded-xl transition-colors flex items-center justify-center",
              barClassName ? barClassName : "group-hover/chart:bg-muted bg-muted/30"
            )}
          >
            <span className="text-xs text-inherit">{value}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export { ChartBar }
