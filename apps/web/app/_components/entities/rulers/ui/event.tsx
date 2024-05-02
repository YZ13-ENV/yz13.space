import { Separator } from "@repo/ui/separator"
import dayjs, { Dayjs } from "dayjs"
import { Event } from "../../events/store/events-store"

type Props = {
  event: Event
  date?: Dayjs
}
const EventMark = ({ event, date = dayjs() }: Props) => {
  const current_day = dayjs(event.created_at).date()
  const left = (current_day / date.daysInMonth()) * 100 - 2
  return (
    <div style={{ left: `${left}%` }} className='absolute z-10 right-1/2 flex items-center justify-center w-[1px] shrink-0 h-full'>
      <div className='w-5 h-5 flex items-center justify-center -top-12 rounded-md absolute'>
        <span className="text-xs text-accent-foreground">{current_day}</span>
      </div>
      <Separator className='h-2/3 w-full rounded-full bg-primary' orientation="vertical" />
    </div>
  )
}
export { EventMark }
