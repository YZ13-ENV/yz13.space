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
          <div style={{ left: `${left}%` }} className='bottom-0 group/event absolute z-10 right-1/2 flex flex-col justify-between items-center w-[1px] shrink-0 h-[175%] gap-5'>
            <div className={cn(
              "w-[21px] rounded-md absolute h-full cursor-pointer transition-colors",
              isInPast ? "group-hover/event:bg-foreground/10" : "group-hover/event:bg-foreground/25"
            )} />
            <div className='w-5 h-5 flex items-center justify-center cursor-pointer relative rounded-md mt-0.5'>
              <span className={cn("text-xs", isInPast ? "text-muted-foreground" : "text-accent-foreground")}>{current_day}</span>
            </div>
            <div className="h-full flex flex-col relative group-hover/event:bottom-2 bottom-0 duration-700 transition-all items-center justify-center w-[1px]">
              <div className={cn("w-[5px] h-[5px] absolute top-0 rounded-full", isInPast ? "group-hover/event:bg-accents-7/40 bg-border" : "bg-accents-7/60")}></div>
              <Separator className={cn("h-full w-full rounded-full", isInPast ? "group-hover/event:bg-accents-7/40 bg-border" : "bg-accents-7/60")} orientation="vertical" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-1 mb-2.5 rounded-full bg-background text-foreground backdrop-blur">
          <span>{format} - {event.title}</span> <BiRightArrowAlt size={14} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export { EventMark }
