"use client"
import { cn } from "@repo/ui/cn"
// import "dayjs/locale/ru"
import { ReactNode, forwardRef, useEffect, useState } from "react"
import { useDate } from "./entities/date"

type Props = {
  loader?: ReactNode
}
export interface TimeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
  Props {
  format?: string
}
// dayjs.locale("ru")
const Time = forwardRef<HTMLSpanElement, TimeProps>(
  ({ className, loader, format = "HH:mm", ...props }, ref) => {
    const time = useDate(state => state.date)
    const [ready, setReady] = useState<boolean>(false)
    useEffect(() => {
      setReady(true)
    }, [])
    if (!ready) return loader ? loader : null
    return <time className={cn("", className)} {...props}>{time.format(format)}</time>
  })
Time.displayName = "Time"
export { Time }
