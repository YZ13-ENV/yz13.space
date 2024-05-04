import { cn } from "@repo/ui/cn"

const ChartBar = ({ withDate = false, percent = 25, date = "24 April" }: { percent?: number, withDate?: boolean, date?: string }) => {
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
            className="w-full h-64 rounded-xl group-hover/chart:bg-muted transition-colors bg-muted/30"
          />
        </div>
      </div>
    </div>
  )
}
export { ChartBar }
