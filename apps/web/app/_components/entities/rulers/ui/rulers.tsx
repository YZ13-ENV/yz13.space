"use client"
import { GradientLabel } from "@/app/_components/shared/gradient-label"
import { Time } from "@/app/_components/time"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import { VariantProps } from "class-variance-authority"
import dayjs, { Dayjs } from "dayjs"
import { AnimatePresence, motion } from "framer-motion"
import { ElementRef, useEffect, useRef, useState } from "react"
import { BiMinus, BiPlus } from "react-icons/bi"
import { useMediaQuery } from "react-responsive"
import { useDate } from "../../date"
import { useEvents } from "../../events"
import { rulers_variants } from "../const"
import { ZoomLevel, useZoomLevel } from "../store/zoom-store"
import { FirstLevel } from "./levels/first-level"
import { FourthLevel } from "./levels/fourth-level"
import { SecondLevel } from "./levels/second-level"
import { ThirdLevel } from "./levels/third-level"

type Props = {
  className?: string
} & VariantProps<typeof rulers_variants>

export const Indicator = ({ day, today }: { day: number, today: Dayjs }) => {
  const left = (day / today.daysInMonth()) * 100
  return (
    <div style={{ left: `${left}%` }} className='absolute z-10 right-1/2 flex items-center justify-center w-[1px] shrink-0 h-full'>
      {/* <div className='absolute flex items-center justify-center w-5 h-5 rounded-md -top-8 backdrop-blur-sm'> */}
      {/* <span className="text-xs text-accent-foreground">{current_day}</span> */}
      {/* </div> */}
      <Separator className='w-full h-full rounded-full bg-foreground' orientation="vertical" />
    </div>
  )
}

export const key = (today: Dayjs, ruler: number) => today.add(ruler, "month").format("MMMM-YYYY").toLowerCase()
const Rulers = ({ size = "default", className = "", align = "center" }: Props) => {
  const zoomLevel = useZoomLevel(state => state.zoomLevel)
  const [mini, setMini] = useState<boolean>(true)
  const setZoomLevel = useZoomLevel(state => state.setZoomLevel)
  const isMaxZoom = zoomLevel === 4
  const isMinZoom = zoomLevel === 1
  const ref = useRef<ElementRef<"div">>(null)
  const [ready, setReady] = useState<boolean>(false)
  const events = useEvents(state => state.events)
  const date = useDate(state => state.date)
  const date_key = date.format("YYYY-MM-DD")
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
  const moreZoom = () => {
    const newZoomLevel = zoomLevel + 1
    if (newZoomLevel >= 1 && newZoomLevel <= 4) setZoomLevel(newZoomLevel as ZoomLevel)
  }
  const lessZoom = () => {
    const newZoomLevel = zoomLevel - 1
    if (newZoomLevel >= 1 && newZoomLevel <= 4) setZoomLevel(newZoomLevel as ZoomLevel)
  }
  const todayEvents = events.filter(event => {
    const event_date = dayjs(event.created_at)
    const event_key = event_date.format("YYYY-MM-DD")
    return event_key === date_key
  })
  useEffect(() => {
    if (typeof document !== 'undefined') setReady(true)
  }, [typeof document])
  // if (!ready) return <div ref={ref} className={cn("overflow-x-hidden bg-muted animate-pulse overflow-y-visible", rulers_variants({ size, className }))} />
  return (
    <div
      onMouseEnter={() => setMini(false)}
      onMouseLeave={() => setMini(true)}
      className="w-full flex flex-col bg-background border-t rounded-t-3xl pb-6"
    >
      <div ref={ref} className={cn("overflow-x-hidden overflow-y-visible transition-all duration-500", mini ? "pt-3 pb-0" : "pt-12 pb-6", rulers_variants({ size, className, align }))}>
        <motion.div drag="x" dragConstraints={ref} className='flex flex-row justify-center px-6 items-center w-fit h-fit'>
          <AnimatePresence>
            {
              zoomLevel === 1
                ? <FirstLevel />
                : zoomLevel === 2
                  ? <SecondLevel />
                  : zoomLevel === 3
                    ? <ThirdLevel />
                    : zoomLevel === 4
                      ? <FourthLevel />
                      : null
            }
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {
          !mini &&
          <>
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "36px" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ delay: .150 }}
              className="flex items-center px-6 w-full justify-between"
            >
              <Button variant="outline">
                <Time format="dd, DD MMMM HH:mm" className="" />
              </Button>
              {
                !!todayEvents.length && !isMobile &&
                <div className="flex items-center mx-auto gap-2">
                  {
                    todayEvents.map(event =>
                      <GradientLabel key={"announcer-" + event.event_id} text={event.title} />
                    )
                  }
                </div>
              }
              <div className="flex gap-6 items-center">
                <span className="text-secondary text-sm">{zoomLevel === 1 ? "Year" : zoomLevel === 2 ? "Month" : zoomLevel === 3 ? "Week" : zoomLevel === 4 ? "Day" : ""}</span>
                <div className="w-fit flex items-center justify-end">
                  <Button disabled={isMaxZoom} onClick={moreZoom} className="rounded-r-none" size='sm' variant="outline"><BiPlus size={16} /></Button>
                  <Button disabled={isMinZoom} onClick={lessZoom} className="rounded-l-none" size='sm' variant="outline"><BiMinus size={16} /></Button>
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>
  )
}
export { Rulers }
