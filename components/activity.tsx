"use client"
import { ActivityEvent } from "@/app/[locale]/home/activity/activity-widget"
import { Stack } from "@/components/stack"
import { Locales } from "@/locales/client"
import { Button } from "@yz13/mono/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import objectSupport from "dayjs/plugin/objectSupport"
import { HTMLAttributes, forwardRef, useState } from "react"
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi"
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
  data?: ActivityEvent[]
}

const Month = forwardRef<HTMLDivElement, MonthProps>(
  ({ month, year, lang = "en", data = [], ...props }, ref) => {
    const date = dayjs({ year: year, month: month, date: 1 }).locale(lang)
    const dateList = generateData({ month, year, lang })
    const monthName = date.format("MMM")
    const isNeedMove = date.month() === 0 ? false : date.day() !== 1
    return (
      <div className="w-fit flex shrink-0 flex-col h-full gap-1" ref={ref} {...props}>
        <div className="h-3 flex items-center">
          <span className={cn(
            "relative text-xs capitalize",
            isNeedMove ? "-left-3.5" : ""
          )}
          >
            {monthName}
          </span>
        </div>
        <div className="grid grid-rows-7 w-fit grid-cols-5 grid-flow-col h-full gap-0.5">
          {
            dateList.map(day => {
              const dayKey = day.format("DD-MM-YYYY")
              const filtered = data.filter(item => item.created_at === dayKey)
              const isLVLOne = filtered.length > 0 && filtered.length < 5
              const isLVLTwo = filtered.length > 5 && filtered.length < 9
              const isLVLThree = filtered.length > 9 && filtered.length < 12
              const isLVLFour = filtered.length >= 12
              const count = filtered.length
              return (
                <Tooltip key={dayKey} delayDuration={100}>
                  <TooltipTrigger
                    className={cn(
                      "size-3 shrink-0 rounded-[3px]",
                      isLVLOne ? "activity-lvl-1" : "border border-yz-neutral-300",
                      isLVLTwo ? "activity-lvl-2" : "border border-yz-neutral-300",
                      isLVLThree ? "activity-lvl-3" : "border border-yz-neutral-300",
                      isLVLFour ? "activity-lvl-4" : "border border-yz-neutral-300"
                    )}
                  />
                  <TooltipContent>{count} {"->"} {dayKey}</TooltipContent>
                </Tooltip>
              )
            })
          }
        </div>
      </div>
    )
  })

type ActivityProps = {
  year: number
  lang?: Locales
  data?: ActivityEvent[]
}

const Activity = ({ year: providedYear, data = [], lang = "en" }: ActivityProps) => {
  const now = dayjs()
  const actualYear = now.year()
  const actualMonth = now.month() + 1
  // +1 to include current year
  const yearDifference = (actualYear + 1) - providedYear
  const yearsArr = Array.from({ length: yearDifference }).map((_, i) => providedYear + i).sort((a, b) => b - a)
  const [year, setYear] = useState<number>(2024)
  const isActualYear = year === actualYear
  const months = Array.from({ length: isActualYear ? actualMonth : 12 }).map((_, i) => i)
  return (
    <Stack.Wrapper className="rounded-b-none">
      <Stack.Content className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-2">
            <div className="w-full flex gap-0.5 flex-row justify-end overflow-x-auto no-scrollbar">
              {
                months.map(month => {
                  const monthKey = dayjs({ year, month, date: 1 }).format("MM-YYYY")
                  const transformed = data.map(item => ({ ...item, created_at: dayjs(item.created_at).format("DD-MM-YYYY") }))
                  const filtered = transformed.filter(item => item.created_at.endsWith(monthKey))
                  const isActualMonth = (month + 1) === actualMonth && isActualYear
                  return <Month
                    // ref={ref => ref?.scrollIntoView()}
                    key={`${month}-${year}`}
                    month={month}
                    year={year}
                    lang={lang}
                    data={filtered}
                  />
                })
              }
            </div>
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-1">
                <BiDownArrowAlt size={14} className="text-secondary" />
                <div className="size-3 shrink-0 rounded-[3px] activity-lvl-0" />
                <div className="size-3 shrink-0 rounded-[3px] activity-lvl-1" />
                <div className="size-3 shrink-0 rounded-[3px] activity-lvl-2" />
                <div className="size-3 shrink-0 rounded-[3px] activity-lvl-3" />
                <div className="size-3 shrink-0 rounded-[3px] activity-lvl-4" />
                <BiUpArrowAlt size={14} className="text-secondary" />
              </div>
            </div>
          </div>
          <div className="w-16 shrink-0 h-full flex flex-col overflow-y-auto">
            {
              yearsArr.map(yr =>
                <Button
                  key={yr}
                  onClick={() => setYear(yr)}
                  variant={year === yr ? "secondary" : "ghost"}
                  className={cn(year === yr ? "" : "text-secondary")}
                  size="sm"
                >
                  {yr}
                </Button>
              )
            }
          </div>
        </div>

      </Stack.Content>
    </Stack.Wrapper>
  )
}
export { Activity }
