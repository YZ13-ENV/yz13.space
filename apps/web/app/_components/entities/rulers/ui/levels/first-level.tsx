'use client'
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import dayjs, { Dayjs } from "dayjs"
import { ReactNode } from "react"
import { useDate } from "../../../date"
import { useEvents } from "../../../events"
import { EventMark } from "../event"
import { Marker } from "../marker"
import { key } from "../rulers"
import { LevelWrapper } from "./level-wrapper"

// year
const FirstLevel = () => {
  const today = useDate(state => state.date)
  const month = today.month()
  const months_before = Array.from({ length: 12 - (12 - month) }).map((_, i) => -(i + 1))
  const months_after = Array.from({ length: 12 - month }).map((_, i) => i)
  const rulers = [...months_before, ...months_after].sort((a, b) => a >= b ? 1 : -1)
  const today_key = today.format("MMMM-YYYY").toLowerCase()
  return (
    <LevelWrapper>
      {
        rulers.map((ruler, index) => {
          const isInThisMonth = today_key === key(today, ruler)
          // console.log(today_key === key(ruler))
          return <LevelRuler key={key(today, ruler)} index={index} ruler={ruler}>{isInThisMonth && <LevelIndicator day={today.date()} today={today} />}</LevelRuler>
        })
      }
    </LevelWrapper>
  )
}

const LevelRuler = ({ ruler, children, index }: { ruler: number, index: number, children?: ReactNode }) => {
  const today = useDate(state => state.date)
  const date = today.add(ruler, "month")
  const key = date.format("MM-YYYY")
  const isFist = index === 0
  const events = useEvents(state => state.events)
  const onlyInRuler = events.filter(event => {
    const event_date = dayjs(event.metadata.created_at)
    const isSameMonth = event_date.month() === date.month()
    const isSameYear = event_date.year() === date.year()
    return isSameYear && isSameMonth
  })
  return (
    <div
      id={key}
      className='relative flex flex-col items-center justify-center h-20 gap-2 mt-12 w-fit group'
    >
      <div
        className="relative flex w-full h-full gap-8"
      >
        {
          !!onlyInRuler.length &&
          onlyInRuler.map(event => {
            const key = event.slug
            return <EventMark key={key} event={event} date={today} />
          })
        }
        {children}
        <Marker className={isFist ? "opacity-1" : "opacity-0"} />
        <Marker size="min" />
        <Marker size="mid" />
        <Marker size="min" />
        <Marker size="max" />
      </div>
      <span className={cn(
        'text-accents-4 transition-opacity text-start w-full text-xs z-10'
      )}>
        {date.format("MMMM")}
      </span>
    </div>
  )
}

const LevelIndicator = ({ day, today }: { day: number, today: Dayjs }) => {
  const left = (day / today.daysInMonth()) * 100
  return (
    <div style={{ left: `${left}%` }} className='absolute z-10 right-1/2 flex items-center justify-center w-[1px] shrink-0 h-full'>
      <Separator className='w-full h-full rounded-full bg-foreground' orientation="vertical" />
    </div>
  )
}
export { FirstLevel }
