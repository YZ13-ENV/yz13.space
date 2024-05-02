"use client"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import { ReactNode, useState } from "react"
import { useEvents } from "../../events"
import { EventMark } from "./event"

const Ruler = ({ ruler, children }: { ruler: number, children?: ReactNode }) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const date = dayjs().add(ruler, "month")
  const today = dayjs()
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
  const isCurrent = ruler === 0
  return (
    <div
      id={key}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='relative w-fit gap-8 flex group justify-center items-center h-full'
    >
      {
        hovered &&
        <motion.div
          layoutId="hover-effect"
          className="w-full h-full absolute rounded-xl left-0 top-0 group-hover:bg-muted/50 transition-colors"
        />
      }
      {children}
      {
        !!onlyInRuler.length &&
        onlyInRuler.map(event => {
          const key = event.event_id
          return <EventMark key={key} event={event} date={today} />
        })
      }
      <span className={cn(
        isCurrent ? "" : "group-hover:opacity-70 opacity-20",
        'absolute text-muted-foreground transition-opacity text-xs -bottom-8 z-10'
      )}>
        {isFirstMonth ? formatWithYear : format}
      </span>
      <div className='relative h-full flex items-center justify-center'>
        <div className='w-5 h-5 flex items-center justify-center -top-10 rounded-md absolute'>
          <span className="text-xs text-muted-foreground transition-colors hover:text-accent-foreground"></span>
        </div>
        <Separator className='h-1/3 opacity-0' orientation="vertical" />
      </div>
      <div className='relative h-full flex items-center justify-center'>
        <div className='w-5 h-5 flex items-center justify-center -top-6 rounded-md absolute'>
          <span className="text-xs text-muted-foreground transition-colors hover:text-accent-foreground"></span>
        </div>
        <Separator className='h-1/3' orientation="vertical" />
      </div>
      <div className='relative h-full flex items-center justify-center'>
        <div className='w-5 h-5 flex items-center justify-center -top-10 rounded-md absolute'>
          <span className="text-xs text-muted-foreground transition-colors hover:text-accent-foreground"></span>
        </div>
        <Separator className='h-2/3' orientation="vertical" />
      </div>
      <div className='relative h-full flex items-center justify-center'>
        <div className='w-5 h-5 flex items-center justify-center -top-10 rounded-md absolute'>
          <span className="text-xs text-muted-foreground transition-colors hover:text-accent-foreground"></span>
        </div>
        <Separator className='h-1/3' orientation="vertical" />
      </div>
      <div className='relative h-full flex items-center justify-center'>
        <div className='w-5 h-5 flex items-center justify-center -bottom-6 rounded-md absolute'>
          <span className="text-xs text-muted-foreground cursor-pointer transition-colors hover:text-accent-foreground">{lastDay}/1</span>
        </div>
        <Separator className='h-full' orientation="vertical" />
      </div>
    </div>
  )
}
const Rulers = () => {
  const months_before = Array.from({ length: 12 }).map((_, i) => -i).reverse()
  const months_after = Array.from({ length: 6 }).map((_, i) => i + 1)
  const rulers = [...months_before, ...months_after].sort((a, b) => a >= b ? 1 : -1)
  const today = dayjs()
  const key = (ruler: number) => today.add(ruler, "month").format("MMMM-YYYY").toLowerCase()
  const current_day = today.date()
  const left = (current_day / today.daysInMonth()) * 100
  const today_key = today.format("MMMM-YYYY").toLowerCase()
  const Indicator = () => {
    return (
      <div style={{ left: `${left}%` }} className='absolute z-10 right-1/2 flex items-center justify-center w-[1px] shrink-0 h-full'>
        <div className='w-5 h-5 flex items-center justify-center -top-6 backdrop-blur-sm rounded-md absolute'>
          <span className="text-xs text-accent-foreground">{current_day}</span>
        </div>
        <Separator className='h-full w-full rounded-full bg-primary' orientation="vertical" />
      </div>
    )
  }
  return (
    <div className='w-full px-12 h-36 pt-20 absolute bottom-20 flex items-center justify-end'>

      <div className='w-fit flex flex-row items-center h-full'>
        {
          rulers.map(ruler => {
            const isInThisMonth = today_key === key(ruler)
            // console.log(today_key === key(ruler))
            return <Ruler key={key(ruler)} ruler={ruler}>{isInThisMonth && <Indicator />}</Ruler>
          })
        }
      </div>
    </div>
  )
}
export { Rulers }
