import { events } from "@/actions/activity-events.server";
import { Stack } from "@/components/stack";
import { Locales, getI18n } from "@/locales/server";
import { Button } from "@yz13/mono/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@yz13/mono/components/tooltip";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import { ReactNode } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { cn } from "yz13/cn";
import { generateData } from "../api/genetate-date";

dayjs.extend(objectSupport);

type Commits = {
  commit_id: string
  repo: string
  owner: string
  date: string
  author: string
}

type WrapperProps = {
  className?: string
  children?: ReactNode
  lang?: Locales
}

const Wrapper = async ({ children, className }: WrapperProps) => {
  const t = await getI18n()
  return (
    <>
      <Stack.Wrapper className="rounded-b-none">
        <Stack.Header>{t("home.widget.activity.title")}</Stack.Header>
        <Stack.Content className="flex flex-col gap-2">
          {children}
        </Stack.Content>
      </Stack.Wrapper>
    </>
  )
}

const Cell = async ({ count = 0, cell }: { count?: number, cell?: string }) => {
  const isLVLOne = count >= 1 && count < 5
  const isLVLTwo = count >= 5 && count < 9
  const isLVLThree = count >= 9 && count < 12
  const isLVLFour = count >= 12
  const t = await getI18n()
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger
        className={cn(
          "size-3 shrink-0 rounded-[3px]",
          isLVLOne ? "activity-lvl-1" : "border border-yz-neutral-300",
          isLVLTwo ? "activity-lvl-2" : "border border-yz-neutral-300",
          isLVLThree ? "activity-lvl-3" : "border border-yz-neutral-300",
          isLVLFour ? "activity-lvl-4" : "border border-yz-neutral-300"
        )}
      />
      {cell && <TooltipContent>{count} {t("home.widget.activity.metric")} {"->"} {cell}</TooltipContent>}
    </Tooltip>
  )
}

type GridProps = {
  month: number
  year: number
  isFirst?: boolean
  lang?: Locales
}

const Grid = async ({ isFirst = false, month, year, lang = "en" }: GridProps) => {
  const date = dayjs({ year: year, month: month, date: 1 }).locale(lang)
  const dateList = generateData({ month, year, lang })
  const monthName = date.format("MMM")
  const isNeedMove = isFirst === true ? false : date.month() === 0 ? false : date.day() !== 1
  const isFirstMonth = date.month() === 0
  const from = dateList[0]?.toISOString()
  const to = dateList[dateList.length - 1]?.toISOString()
  const commits = (from && to ? await events({ from, to }) : [])
  const data: Commits[] = commits?.data
  const converted = data.map(item => {
    const date = dayjs(item.date).format("DD-MM-YYYY")
    return { ...item, date }
  })
  return (
    <div className="w-fit flex shrink-0 flex-col h-full gap-1">
      <div className="h-3 flex items-center">
        <span className={cn(
          "relative text-xs capitalize",
          isNeedMove ? "-left-3.5" : ""
        )}
        >
          {monthName}
          {
            isFirstMonth &&
            <span className="text-xs text-secondary">({year})</span>
          }
        </span>
      </div>
      <div className="grid grid-rows-7 w-fit grid-cols-5 grid-flow-col h-full gap-0.5">
        {
          (dateList.reverse()).map(date => {
            const key = date.format("DD-MM-YYYY")
            const filtered = converted.filter(item => item.date === key)
            return <Cell key={key} cell={key} count={filtered.length} />
          })
        }
      </div>
    </div>
  )
}

const Map = ({ year, lang = "en" }: { year: number, lang: Locales }) => {
  const now = dayjs()
  const actualYear = now.year()
  const actualMonth = (now.month() + 1)
  const isCurrentYear = actualYear === year
  const months = Array.from({ length: isCurrentYear ? actualMonth : 12 }).map((_, i) => i)
  return (
    <>
      {
        (months.reverse()).map((month, index) => {
          const key = dayjs({ year, month, date: 1 }).format("MM-YYYY")
          return <Grid
            key={key}
            isFirst={index === 0}
            month={month}
            year={year}
            lang={lang}
          />
        })
      }
    </>
  )
}

const Legend = () => {
  return (
    <div className="w-full flex items-center justify-end">
      <div className="flex items-center gap-1">
        <BiDownArrowAlt size={14} className="text-secondary" />
        <Cell count={0} />
        <Cell count={2} />
        <Cell count={6} />
        <Cell count={9} />
        <Cell count={12} />
        <BiUpArrowAlt size={14} className="text-secondary" />
      </div>
    </div>
  )
}

const Years = ({ year, className = "" }: { year: number, className?: string }) => {
  const now = dayjs()
  const actualYear = now.year()
  const yearDifference = (actualYear + 1) - year
  const yearsArr = Array.from({ length: yearDifference }).map((_, i) => year + i).sort((a, b) => b - a)
  return (
    <>
      <div className={cn(
        "w-full shrink-0 h-full flex flex-col overflow-y-auto",
        className
      )}>
        {
          yearsArr.map(year =>
            <Button key={year} variant="ghost">
              {year}
            </Button>
          )
        }
      </div>
    </>
  )
}

export { Cell, Grid, Legend, Map, Wrapper, Years };

