"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import { VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { ElementRef, useEffect, useRef, useState } from "react"
import { BiMinus, BiPlus } from "react-icons/bi"
import { useMediaQuery } from "react-responsive"
import { useDate } from "../../date"
import { rulers_variants } from "../const"
import { useZoomLevel } from "../store/zoom-store"
import { Ruler } from "./ruler"

type Props = {
  className?: string
} & VariantProps<typeof rulers_variants>
const Rulers = ({ size = "default", className = "" }: Props) => {
  const zoomLevel = useZoomLevel(state => state.zoomLevel)
  const setZoomLevel = useZoomLevel(state => state.setZoomLevel)
  const ref = useRef<ElementRef<"div">>(null)
  const [ready, setReady] = useState<boolean>(false)
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1280px)' })
  const today = useDate(state => state.date)
  const months_before = Array.from({ length: 12 }).map((_, i) => -i).reverse()
  const months_after = Array.from({ length: 6 }).map((_, i) => i + 1)
  const rulers = [...months_before, ...months_after].sort((a, b) => a >= b ? 1 : -1)
  const key = (ruler: number) => today.add(ruler, "month").format("MMMM-YYYY").toLowerCase()
  const current_day = today.date()
  const left = (current_day / today.daysInMonth()) * 100
  const today_key = today.format("MMMM-YYYY").toLowerCase()
  useEffect(() => {
    if (typeof document !== 'undefined') setReady(true)
  }, [typeof document])
  const Indicator = () => {
    return (
      <div style={{ left: `${left}%` }} className='absolute z-10 right-1/2 flex items-center justify-center w-[1px] shrink-0 h-full'>
        {/* <div className='absolute flex items-center justify-center w-5 h-5 rounded-md -top-8 backdrop-blur-sm'> */}
        {/* <span className="text-xs text-accent-foreground">{current_day}</span> */}
        {/* </div> */}
        <Separator className='w-full h-full rounded-full bg-foreground' orientation="vertical" />
      </div>
    )
  }
  if (!ready) return <div ref={ref} className={cn("overflow-x-hidden bg-muted animate-pulse overflow-y-visible", rulers_variants({ size, className }))} />
  return (
    <div className="w-full flex flex-col">
      <div className="w-full px-6 flex items-center justify-end">
        <Button className="rounded-r-none" variant="outline"><BiPlus /></Button>
        <Button className="rounded-l-none" variant="outline"><BiMinus /></Button>
      </div>
      <div ref={ref} className={cn("overflow-x-hidden overflow-y-visible", rulers_variants({ size, className }))}>
        <motion.div drag="x" dragConstraints={ref} className='flex flex-row items-center w-fit h-fit'>
          {
            rulers.map(ruler => {
              const isInThisMonth = today_key === key(ruler)
              // console.log(today_key === key(ruler))
              return <Ruler key={key(ruler)} ruler={ruler}>{isInThisMonth && <Indicator />}</Ruler>
            })
          }
        </motion.div>
      </div>
    </div>
  )
}
export { Rulers }
