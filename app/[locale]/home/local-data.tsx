"use client"
import { Locales } from "@/locales/client"
import { Separator } from "@yz13/mono/components/separator"
import { useInterval } from "ahooks"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { useEffect, useMemo, useState } from "react"
import { cn } from "yz13/cn"
dayjs.extend(utc)
dayjs.extend(timezone)

type LocalDataProps = {
  className?: string
  lang?: Locales
  children?: React.ReactNode
}

const LocalData = ({ className = "", lang = "en", children }: LocalDataProps) => {
  const TZ = "Asia/Yekaterinburg"
  const [ready, setReady] = useState<boolean>(false)
  const [now, setNow] = useState<Dayjs>(dayjs().tz(TZ, true).locale(lang))
  const update = () => setNow(dayjs().tz(TZ, true).locale(lang))
  const time = useMemo(() => { return now.format("HH:mm") }, [now])
  const seconds = useMemo(() => { return now.format("ss") }, [now])
  const date = useMemo(() => { return now.format("dddd, MMM DD") }, [now])
  useInterval(() => {
    update()
  }, ready ? 1000 : undefined)
  useEffect(() => {
    if (typeof document !== "undefined") setReady(true)
  }, [typeof document])
  return (
    <div className={cn("w-full flex items-center flex-row gap-2", className)}>
      <time className="text-sm w-[61px] text-center">{time}{ready && <span className="text-secondary">:{seconds}</span>}</time>
      <Separator orientation="vertical" className="h-3" />
      <time className="text-foreground/60 shrink-0 capitalize text-sm">{date}</time>
      <Separator orientation="vertical" className="h-3" />
      <span className="text-foreground/60 text-sm uppercase">{lang}</span>
      {children}
    </div>
  )
}
export { LocalData }
