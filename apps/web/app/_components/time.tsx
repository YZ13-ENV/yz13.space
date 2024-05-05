"use client"
import { cn } from "@repo/ui/cn"
import { useInterval } from "ahooks"
import dayjs, { Dayjs } from "dayjs"
// import "dayjs/locale/ru"
import { forwardRef, useEffect, useState } from "react"

type Props = {

}
export interface TimeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  Props {
  format?: string
}
// dayjs.locale("ru")
const Time = forwardRef<HTMLSpanElement, TimeProps>(
  ({ className, format = "HH:mm", ...props }, ref) => {
    const [time, setTime] = useState<Dayjs>(dayjs())
    const [ready, setReady] = useState<boolean>(false)
    useInterval(() => {
      setTime(dayjs())
    }, ready ? 1000 : undefined)
    useEffect(() => {
      setReady(true)
    }, [])
    if (!ready) return null
    return <time className={cn("", className)} {...props}>{time.format(format)}</time>
  })
Time.displayName = "Time"
export { Time }
