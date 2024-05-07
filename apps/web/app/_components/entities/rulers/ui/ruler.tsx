"use client"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import { cubicBezier, motion } from "framer-motion"
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
      className='relative flex flex-col items-center justify-end h-20 gap-2 mt-12 w-fit group'
    >
      <motion.div
        initial={{ height: "10%" }}
        animate={{ height: "100%" }}
        transition={{
          duration: 1,
          easings: cubicBezier(.17, .67, .83, .67),
        }}
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

        <div className='relative flex items-end justify-center h-full'>
          <div className='absolute flex items-center justify-center w-5 h-5 rounded-md -top-10'>
            <span className="text-xs transition-colors text-accents-4 hover:text-accent-foreground"></span>
          </div>
          <Separator className='opacity-0 h-1/3' orientation="vertical" />
        </div>
        <div className='relative flex items-end justify-center h-full'>
          <div className='absolute flex items-center justify-center w-5 h-5 rounded-md -top-6'>
            <span className="text-xs transition-colors text-accents-4 hover:text-accent-foreground"></span>
          </div>
          <Separator className='h-1/3' orientation="vertical" />
        </div>
        <div className='relative flex items-end justify-center h-full'>
          <div className='absolute flex items-center justify-center w-5 h-5 rounded-md -top-10'>
            <span className="text-xs transition-colors text-accents-4 hover:text-accent-foreground"></span>
          </div>
          <Separator className='h-2/3' orientation="vertical" />
        </div>
        <div className='relative flex items-end justify-center h-full'>
          <div className='absolute flex items-center justify-center w-5 h-5 rounded-md -top-10'>
            <span className="text-xs transition-colors text-accents-4 hover:text-accent-foreground"></span>
          </div>
          <Separator className='h-1/3' orientation="vertical" />
        </div>
        <div className='relative flex items-end justify-center h-full'>
          <div className='absolute flex items-center justify-center w-5 h-5 rounded-md -bottom-6'>
            <span className="text-xs transition-colors cursor-pointer text-accents-4/60">{lastDay}/1</span>
          </div>
          <Separator className='h-full' orientation="vertical" />
        </div>
      </motion.div>
      <span className={cn(
        'text-accents-4 transition-opacity text-xs z-10'
      )}>
        {isFirstMonth ? formatWithYear : format}
      </span>
    </div>
  )
}
export { Ruler }
