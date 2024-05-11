import { Separator } from "@repo/ui/separator"
import { Dayjs } from "dayjs"
import { useDate } from "../../../date"
import { Ruler } from "../ruler"
import { key } from "../rulers"

// year
const FirstLevel = () => {
  const today = useDate(state => state.date)
  const month = today.month()
  const months_before = Array.from({ length: 12 - (12 - month) }).map((_, i) => -(i + 1))
  const months_after = Array.from({ length: 12 - month }).map((_, i) => i)
  const rulers = [...months_before, ...months_after].sort((a, b) => a >= b ? 1 : -1)
  const today_key = today.format("MMMM-YYYY").toLowerCase()
  const current_day = today.date()
  return (
    <>
      {
        rulers.map(ruler => {
          const isInThisMonth = today_key === key(today, ruler)
          // console.log(today_key === key(ruler))
          return <Ruler key={key(today, ruler)} ruler={ruler}>{isInThisMonth && <Indicator day={current_day} today={today} />}</Ruler>
        })
      }
    </>
  )
}


const Indicator = ({ day, today }: { day: number, today: Dayjs }) => {
  const left = (day / today.daysInMonth()) * 100
  return (
    <div style={{ left: `${left}%` }} className='absolute z-10 right-1/2 flex items-center justify-center w-[1px] shrink-0 h-full'>
      <Separator className='w-full h-full rounded-full bg-foreground' orientation="vertical" />
    </div>
  )
}
export { FirstLevel }
