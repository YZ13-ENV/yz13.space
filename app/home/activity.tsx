"use client"
import { Stack } from "@/components/stack"
import { Locales } from "@/dictionaries/tools"
import { Button } from "@yz13/mono/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import objectSupport from "dayjs/plugin/objectSupport"
import { HTMLAttributes, forwardRef, useState } from "react"
import { cn } from "yz13/cn"

dayjs.extend(objectSupport)

const generateData = ({ month, year, lang = "en" }: { month: number, year: number, lang?: Locales }) => {
  const date = dayjs({ year: year, month: month, date: 1 }).locale(lang)
  const currentMonthLastDay = date.daysInMonth()
  const prevMonthLastDay = date.subtract({ month: 1 }).daysInMonth()

  const lastDayCurrentMonth = date.set({ day: currentMonthLastDay })
  const lastDayPrevMonth = date.set({ day: prevMonthLastDay, month: date.month() - 1 })

  const dayBeforeFirstDay = lastDayPrevMonth.day();
  const predictedCount = dayBeforeFirstDay + lastDayCurrentMonth.day() + (7 - lastDayCurrentMonth.day())
  const dayAfterLastDay = predictedCount === 42 ? 7 - lastDayCurrentMonth.date() : 42 - predictedCount + 7 - lastDayCurrentMonth.date();
  const prevMonthItems = []
  const currentMonthItems = []
  const nextMonthItems = []
  for (let i = (lastDayPrevMonth.date() + 1) - dayBeforeFirstDay; i <= lastDayPrevMonth.date(); i++) {
    const generatedDate = date.set({ date: i, month: date.month() - 1 })
    prevMonthItems.push(generatedDate)
  }
  for (let i = 1; i <= lastDayCurrentMonth.date(); i++) {
    const generatedDate = date.set({ date: i, month: date.month() })
    currentMonthItems.push(generatedDate)
  }
  for (let i = 1; i <= dayAfterLastDay; i++) {
    const generatedDate = date.set({ date: i, month: date.month() + 1 })
    nextMonthItems.push(generatedDate)
  }
  return [...prevMonthItems, ...currentMonthItems, ...nextMonthItems]

}

interface MonthProps extends HTMLAttributes<HTMLDivElement> {
  month: number
  year: number
  lang?: Locales
}

const Month = forwardRef<HTMLDivElement, MonthProps>(
  ({ month, year, lang = "en", ...props }, ref) => {
    const date = dayjs({ year: year, month: month, date: 1 }).locale(lang)
    const dateList = generateData({ month, year, lang })
    const monthName = date.format("MMM")
    const isNeedMove = date.month() === 0 ? false : date.day() !== 1
    return (
      <div className="w-fit flex shrink-0 flex-col h-full gap-1" ref={ref} {...props}>
        <div className="h-3 flex items-center">
          <span className={cn(
            "relative text-xs",
            isNeedMove ? "-left-3.5" : ""
          )}
          >
            {monthName}
          </span>
        </div>
        <div className="grid grid-rows-7 w-fit grid-cols-5 grid-flow-col h-full gap-0.5">
          {
            dateList.map(day => {
              const format = day.format("DD-MM-YYYY")
              const weekday = day.day()
              return (
                <Tooltip key={format} delayDuration={100}>
                  <TooltipTrigger className="size-3 shrink-0 rounded-sm border border-yz-neutral-300" />
                  <TooltipContent>{weekday}/{format}</TooltipContent>
                </Tooltip>
              )
            })
          }
        </div>
      </div>
    )
  })

const Activity = () => {
  const now = dayjs()
  const actualYear = now.year()
  const actualMonth = now.month() + 1
  const [year, setYear] = useState<number>(2024)
  const isActualYear = year === actualYear
  const months = Array.from({ length: isActualYear ? actualMonth : 12 }).map((_, i) => i)
  const lang: Locales = "en"
  return (
    <Stack.Wrapper>
      <Stack.Content className="flex items-center gap-2">
        <div className="w-full flex gap-0.5 flex-row overflow-x-auto no-scrollbar">
          {
            months.map(month => {
              const isActualMonth = (month + 1) === actualMonth && isActualYear
              return <Month
                ref={ref => ref?.scrollIntoView()}
                key={`${month}-${year}`}
                month={month}
                year={year}
                lang={lang}
              />
            })
          }
        </div>
        <div className="w-16 shrink-0 h-full flex flex-col overflow-y-auto">
          <Button
            onClick={() => setYear(2024)}
            variant={year === 2024 ? "secondary" : "ghost"}
            className={cn(year === 2024 ? "" : "text-secondary")}
            size="sm"
          >
            2024
          </Button>
          <Button
            onClick={() => setYear(2023)}
            variant={year === 2023 ? "secondary" : "ghost"}
            className={cn(year === 2023 ? "" : "text-secondary")}
            size="sm"
          >
            2023
          </Button>
          <Button
            onClick={() => setYear(2022)}
            variant={year === 2022 ? "secondary" : "ghost"}
            className={cn(year === 2022 ? "" : "text-secondary")}
            size="sm"
          >
            2022
          </Button>
        </div>
      </Stack.Content>
    </Stack.Wrapper>
  )
}
export { Activity }
