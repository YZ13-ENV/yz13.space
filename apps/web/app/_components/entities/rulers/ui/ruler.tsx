import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import { ReactNode } from "react"
import { useDate } from "../../date"
import { useEvents } from "../../events"
import { EventMark } from "./event"

const Ruler = ({ ruler, children }: { ruler: number, children?: ReactNode }) => {
  const date = dayjs().add(ruler, "month")
  const today = useDate(state => state.date)
  const events = useEvents(state => state.events)
  const onlyInRuler = events.filter(event => {
    const event_date = dayjs(event.created_at)
    const isSameMonth = event_date.month() === date.month()
    const isSameYear = event_date.year() === date.year()
    return isSameYear && isSameMonth
  })
  const key = date.format("MMMM-YYYY").toLowerCase()
  const isFirstMonth = date.month() === 0
  const format = date.format("MMMM")
  const formatWithYear = date.format("MMMM YYYY")
  const lastDay = date.daysInMonth()
  return (
    <div
      id={key}
      className='relative w-fit flex flex-col gap-2 group mt-12 justify-center items-center h-20'
    >
      <div className="w-full h-full flex gap-8 relative">
        {children}
        {
          !!onlyInRuler.length &&
          onlyInRuler.map(event => {
            const key = event.event_id
            return <EventMark key={key} event={event} date={today} />
          })
        }

        <div className='relative h-full flex items-end justify-center'>
          <div className='w-5 h-5 flex items-center justify-center -top-10 rounded-md absolute'>
            <span className="text-xs text-muted-foreground transition-colors hover:text-accent-foreground"></span>
          </div>
          <Separator className='h-1/3 opacity-0' orientation="vertical" />
        </div>
        <div className='relative h-full flex items-end justify-center'>
          <div className='w-5 h-5 flex items-center justify-center -top-6 rounded-md absolute'>
            <span className="text-xs text-muted-foreground transition-colors hover:text-accent-foreground"></span>
          </div>
          <Separator className='h-1/3' orientation="vertical" />
        </div>
        <div className='relative h-full flex items-end justify-center'>
          <div className='w-5 h-5 flex items-center justify-center -top-10 rounded-md absolute'>
            <span className="text-xs text-muted-foreground transition-colors hover:text-accent-foreground"></span>
          </div>
          <Separator className='h-2/3' orientation="vertical" />
        </div>
        <div className='relative h-full flex items-end justify-center'>
          <div className='w-5 h-5 flex items-center justify-center -top-10 rounded-md absolute'>
            <span className="text-xs text-muted-foreground transition-colors hover:text-accent-foreground"></span>
          </div>
          <Separator className='h-1/3' orientation="vertical" />
        </div>
        <div className='relative h-full flex items-end justify-center'>
          <div className='w-5 h-5 flex items-center justify-center -bottom-6 rounded-md absolute'>
            <span className="text-xs cursor-pointer transition-colors text-muted-foreground/60">{lastDay}/1</span>
          </div>
          <Separator className='h-full' orientation="vertical" />
        </div>
      </div>
      <span className={cn(
        'text-muted-foreground transition-opacity text-xs z-10'
      )}>
        {isFirstMonth ? formatWithYear : format}
      </span>
    </div>
  )
}
export { Ruler }
