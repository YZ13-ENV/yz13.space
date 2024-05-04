"use client"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import { VariantProps } from "class-variance-authority"
import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useDate } from "../../date"
import { rulers_variants } from "../const"
import { Ruler } from "./ruler"

type Props = {
  className?: string
} & VariantProps<typeof rulers_variants>
const Rulers = ({ size = "sm", className = "" }: Props) => {
  const [ready, setReady] = useState<boolean>(false)
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1280px)' })
  const today = useDate(state => state.date)
  const months_before = Array.from({ length: 8 }).map((_, i) => -i).reverse()
  const months_after = Array.from({ length: isTablet && isMobile ? 1 : isTablet ? 3 : 4 }).map((_, i) => i + 1)
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
        {/* <div className='w-5 h-5 flex items-center justify-center -top-8 backdrop-blur-sm rounded-md absolute'> */}
        {/* <span className="text-xs text-accent-foreground">{current_day}</span> */}
        {/* </div> */}
        <Separator className='h-full w-full rounded-full bg-primary' orientation="vertical" />
      </div>
    )
  }
  if (!ready) return null
  return (
    <div className={cn(rulers_variants({ size, className }))}>
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
