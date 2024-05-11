import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import { ReactNode } from "react"
import { useDate } from "../../../date"
import { Marker } from "../marker"
import { key } from "../rulers"


// day
const FourthLevel = () => {
  const today = useDate(state => state.date)
  const hour = today.hour()
  const prev_hours = Array.from({ length: 24 - (24 - hour) }).map((_, i) => -(i + 1))
  const next_hours = Array.from({ length: 24 - hour - 1 }).map((_, i) => i)
  const rulers = [...prev_hours, ...next_hours].sort((a, b) => a - b)
  const today_key = today.format("MMMM-YYYY").toLowerCase()
  return (
    <>
      {
        rulers.map((ruler, index) => {
          const isInThisMonth = today_key === key(today, ruler)
          return <LevelRuler key={key(today, ruler)} index={index} ruler={ruler}>{isInThisMonth && <LevelIndicator hour={today.minute()} />}</LevelRuler>
        })
      }
    </>
  )
}

const LevelRuler = ({ ruler, children, index }: { ruler: number, index: number, children?: ReactNode }) => {
  const today = useDate(state => state.date)
  const date = today.add(ruler, "hours")
  const key = date.format("MMMM-YYYY").toLowerCase()
  const isFist = index === 0
  return (
    <div
      id={key}
      className='relative flex flex-col items-center justify-center h-20 gap-2 mt-12 w-fit group'
    >
      <div
        className="relative flex w-full h-full gap-8"
      >
        {children}
        <Marker className={isFist ? "opacity-1" : "opacity-0"} />
        <Marker size="min" />
        <Marker size="min" />
        <Marker size="mid" />
        <Marker size="min" />
        <Marker size="min" />
        <Marker size="max" />
      </div>
      <span className={cn(
        'text-accents-4 transition-opacity text-start w-full text-xs z-10'
      )}>
        {date.format("HH")}:00
      </span>
    </div>
  )
}

export const LevelIndicator = ({ hour }: { hour: number }) => {
  const left = (hour / 60) * 100
  return (
    <div style={{ left: `${left}%` }} className='absolute z-10 right-1/2 flex items-center justify-center w-[1px] shrink-0 h-full'>
      <Separator className='w-full h-full rounded-full bg-foreground' orientation="vertical" />
    </div>
  )
}

export { FourthLevel }
