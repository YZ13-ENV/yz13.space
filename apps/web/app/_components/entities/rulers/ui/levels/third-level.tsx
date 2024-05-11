import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import { ReactNode } from "react"
import { useDate } from "../../../date"
import { useEvents } from "../../../events"
import { EventMark } from "../event"
import { Marker } from "../marker"
import { key } from "../rulers"
import { LevelWrapper } from "./level-wrapper"
// week
const ThirdLevel = () => {
  const today = useDate(state => state.date)
  const day = today.day()
  const days_before = Array.from({ length: 7 - (7 - day) }).map((_, i) => -i)
  const days_after = Array.from({ length: 7 - day }).map((_, i) => i + 1)
  const rulers = [...days_before, ...days_after].sort((a, b) => a >= b ? 1 : -1)
  const today_key = today.format("MMMM-YYYY").toLowerCase()
  return (
    <LevelWrapper>
      {
        rulers.map((ruler, index) => {
          const isInThisMonth = today_key === key(today, ruler)
          return <LevelRuler key={key(today, ruler)} index={index} ruler={ruler}>{isInThisMonth && <LevelIndicator hour={today.hour()} />}</LevelRuler>
        })
      }
    </LevelWrapper>
  )
}

const LevelRuler = ({ ruler, children, index }: { ruler: number, index: number, children?: ReactNode }) => {
  const today = useDate(state => state.date)
  const date = today.add(ruler, "days")
  const key = date.format('dddd')
  const markers = Array.from({ length: 11 }).map((_, i) => i)
  const date_key = date.format("YYYY-MM-DD")
  const events = useEvents(state => state.events)
  const onlyInRuler = events.filter(event => {
    const event_date = dayjs(event.created_at)
    const event_key = event_date.format("YYYY-MM-DD")
    return event_key === date_key
  })
  return (
    <div
      id={key}
      className='relative flex flex-col items-center justify-center h-20 gap-2 mt-12 w-fit group'
    >
      <div
        className="relative flex w-full h-full gap-8"
      >
        {children}
        {
          !!onlyInRuler.length &&
          onlyInRuler.map(event => {
            const key = event.event_id
            return <EventMark key={key} event={event} date={today} />
          })
        }
        {
          markers.map(marker => {
            const isFirst = marker === 0
            const isLast = marker === markers.length - 1
            const isMiddle = marker + 1 === parseInt((markers.length / 2).toFixed(0))
            const isBigMaker = isFirst || isLast
            return <Marker key={"marker-" + marker} className={marker !== 0 ? "opacity-1" : "opacity-0"} size={isBigMaker ? "max" : isMiddle ? "mid" : "min"} />
          }
          )
        }
      </div>
      <span className={cn(
        'text-accents-4 transition-opacity text-start w-full text-xs z-10'
      )}>
        {date.format("dddd")}
      </span>
    </div>
  )
}

export const LevelIndicator = ({ hour }: { hour: number }) => {
  const left = (hour / 24) * 100
  return (
    <div style={{ left: `${left}%` }} className='absolute z-10 right-1/2 flex items-center justify-center w-[1px] shrink-0 h-full'>
      <Separator className='w-full h-full rounded-full bg-foreground' orientation="vertical" />
    </div>
  )
}

export { ThirdLevel }
