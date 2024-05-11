"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import { VariantProps } from "class-variance-authority"
import { Dayjs } from "dayjs"
import { motion } from "framer-motion"
import { ElementRef, useEffect, useRef, useState } from "react"
import { BiMinus, BiPlus } from "react-icons/bi"
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
const Rulers = ({ size = "default", className = "", direction }: Props) => {
  const zoomLevel = useZoomLevel(state => state.zoomLevel)
  const setZoomLevel = useZoomLevel(state => state.setZoomLevel)
  const isMaxZoom = zoomLevel === 4
  const isMinZoom = zoomLevel === 1
  const moreZoom = () => {
    const newZoomLevel = zoomLevel + 1
    if (newZoomLevel >= 1 && newZoomLevel <= 4) setZoomLevel(newZoomLevel as ZoomLevel)
  }
  const lessZoom = () => {
    const newZoomLevel = zoomLevel - 1
    if (newZoomLevel >= 1 && newZoomLevel <= 4) setZoomLevel(newZoomLevel as ZoomLevel)
  }
  const ref = useRef<ElementRef<"div">>(null)
  const [ready, setReady] = useState<boolean>(false)
  useEffect(() => {
    if (typeof document !== 'undefined') setReady(true)
  }, [typeof document])
  if (!ready) return <div ref={ref} className={cn("overflow-x-hidden bg-muted animate-pulse overflow-y-visible", rulers_variants({ size, className }))} />
  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-6 flex items-center justify-end">
        <Button disabled={isMaxZoom} onClick={moreZoom} className="rounded-r-none" size='sm' variant="outline"><BiPlus size={16} /></Button>
        <Button disabled={isMinZoom} onClick={lessZoom} className="rounded-l-none" size='sm' variant="outline"><BiMinus size={16} /></Button>
      </div>
      <div ref={ref} className={cn("overflow-x-hidden overflow-y-visible", rulers_variants({ size, className, direction }))}>
        <motion.div drag="x" dragConstraints={ref} className='flex flex-row justify-start px-6 items-center w-fit h-fit'>
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
        </motion.div>
      </div>
    </div>
  )
}
export { Rulers }
