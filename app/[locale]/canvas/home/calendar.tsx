import { DotIcon } from "lucide-react"


const Calendar = () => {
  return (
    <>
      <div className="flex items-center gap-4 h-fit">
        <span className="text-4xl font-medium">09</span>
        <div className="flex flex-col gap-1">
          <span className="text-sm">Monday</span>
          <div className="flex items-center gap-0">
            <span className="text-sm text-foreground/60">September</span>
            <DotIcon size={16} className="text-secondary" />
            <span className="text-sm text-foreground/60">0 events</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 h-full w-full">
        <div className="w-full h-1/3 flex flex-row items-center gap-2">
          <div className="h-full w-1 rounded-full bg-yz-neutral-200" />
          <div className="flex flex-col gap-1">
            <p className="text-sm text-foreground/60">
              So, there is should be some type of event
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-secondary">10:45</span>
              <span className="text-xs text-secondary">45 min.</span>
            </div>
          </div>
        </div>
        <div className="w-full h-1/3 flex flex-row items-center gap-2">
          <div className="h-full w-1 rounded-full bg-yz-neutral-200" />
          <div className="flex flex-col gap-1">
            <p className="text-sm text-foreground/60">
              So, there is should be some type of event
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-secondary">10:45</span>
              <span className="text-xs text-secondary">45 min.</span>
            </div>
          </div>
        </div>
        <div className="w-full h-1/3 flex flex-row items-center gap-2">
          <div className="h-full w-1 rounded-full bg-yz-neutral-200" />
          <div className="flex flex-col gap-1">
            <p className="text-sm text-foreground/60">
              So, there is should be some type of event
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-secondary">10:45</span>
              <span className="text-xs text-secondary">45 min.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export { Calendar }
