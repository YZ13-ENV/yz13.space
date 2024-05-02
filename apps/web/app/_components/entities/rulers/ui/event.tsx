import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/tooltip"
import dayjs, { Dayjs } from "dayjs"
import { BiRightArrowAlt } from "react-icons/bi"
import { Event } from "../../events/store/events-store"

type Props = {
  event: Event
  date?: Dayjs
}
const EventMark = ({ event, date = dayjs() }: Props) => {
  const event_date = dayjs(event.created_at)
  const current_day = event_date.date()
  const isInPast = event_date.isBefore(date)
  const left = (current_day / date.daysInMonth()) * 100
  const format = event_date.format("DD MMM")
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div style={{ left: `${left}%` }} className='bottom-[80%] group/event absolute z-10 right-1/2 flex flex-col justify-between items-center w-[1px] shrink-0 h-fit gap-5'>
            <div className={cn(
              "w-[21px] rounded-sm absolute h-full cursor-pointer",
              isInPast ? "group-hover/event:bg-primary/10" : "group-hover/event:bg-primary/25"
            )} />
            <div className='w-5 h-5 flex items-center justify-center cursor-pointer relative rounded-md'>
              <span className={cn("text-xs", isInPast ? "text-muted-foreground" : "text-accent-foreground")}>{current_day}</span>
            </div>
            <div className="h-fit flex flex-col relative group-hover/event:bottom-2 bottom-0 transition-all items-center justify-center w-[1px]">
              <div className={cn("w-[5px] h-[5px] absolute top-0 rounded-full", isInPast ? "bg-muted" : "bg-primary")}></div>
              <Separator className={cn("h-4 w-full rounded-full", isInPast ? "bg-muted" : "bg-primary")} orientation="vertical" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="mb-4 flex items-center gap-1 rounded-full bg-accent text-accent-foreground backdrop-blur">
          <span>{format} - {event.title}</span> <BiRightArrowAlt size={14} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export { EventMark }
