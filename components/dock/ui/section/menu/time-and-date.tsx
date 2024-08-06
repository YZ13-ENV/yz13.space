"use client"
import { Locales } from "@/dictionaries/tools"
import { CommandItem } from "@yz13/mono/components/command"
import { useInterval } from "ahooks"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import { useMemo, useState } from "react"
const TimeAndDate = ({ lang = "en" }: { lang?: Locales }) => {
  const [date, setDate] = useState<Dayjs>(dayjs().locale(lang))
  const formatted_time = useMemo(() => date.format("HH:mm"), [date])
  const formatted_date = useMemo(() => date.format("DD MMMM YYYY"), [date])
  useInterval(() => {
    const new_date = dayjs().locale(lang)
    setDate(new_date)
  }, 1000)
  return (
    <CommandItem className="gap-1">
      <span className="px-2 py-1 rounded-md border text-xs cursor-pointer inline-flex gap-1 items-center bg-background">
        {formatted_time}
      </span>
      <span className="px-2 py-1 rounded-md border text-xs cursor-pointer inline-flex gap-1 items-center bg-background">
        {formatted_date}
      </span>
    </CommandItem>
  )
}
export { TimeAndDate }
