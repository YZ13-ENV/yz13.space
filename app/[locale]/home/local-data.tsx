"use client"
import { Locales } from "@/locales/client"
import { Separator } from "@yz13/mono/components/separator"
import { useInterval } from "ahooks"
import dayjs, { Dayjs } from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { useEffect, useMemo, useState } from "react"
dayjs.extend(utc)
dayjs.extend(timezone)

const LocalData = ({ lang = "en" }: { lang?: Locales }) => {
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
    <div className="w-full flex flex-col gap-2 p-3 max-w-lg mx-auto">
      <time className="text-5xl font-medium">{time}{ready && <span className="text-secondary">:{seconds}</span>}</time>
      <div className="flex items-center gap-2">
        <time className="text-foreground/60 shrink-0 capitalize font-medium">{date}</time>
        <Separator orientation="vertical" className="h-3" />
        <span className="text-foreground/60 font-medium uppercase">{lang}</span>
      </div>
    </div>
  )
}
export { LocalData }
