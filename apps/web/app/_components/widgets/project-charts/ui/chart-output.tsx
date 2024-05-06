"use client"
import { Vitals } from "@/api/web-vitals"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import { groupBy, keys } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { TbMathEqualLower, TbMathGreater } from "react-icons/tb"
import { metrics } from "../const"
import { useCharts } from "../store/charts-store"
import { useSelectChart } from "../store/select-chart"
import { ChartBar } from "./chart-bar"

type Props = {
  data?: Vitals[]
}
const ChartOutput = ({ data = [] }: Props) => {
  const { charts, setCharts } = useCharts()
  const selectedChart = useSelectChart(state => state.selected)
  const chart = useMemo(() => { return charts.filter(chart => chart.name === selectedChart) }, [selectedChart, charts])
  const group = groupBy(chart.map(chart => ({ ...chart, created_at: dayjs(chart.created_at).format("YYYY-MM-DD") })), "created_at")
  const group_keys = keys(group)
  const metric = metrics.find(item => item.name === selectedChart)
  const grouped_charts = groupBy(charts, "name")
  const grouped_charts_keys = keys(grouped_charts)
  const maxCount = Math.max(...grouped_charts_keys.map(key => grouped_charts[key]?.length || 0))
  const max = Math.round(maxCount * 2)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (data.length !== 0) setCharts(data)
  }, [data])
  useEffect(() => {
    if (!!metric) setLoading(false)
  }, [metric])
  if (loading) return (
    <div className="container">
      <div className="w-full h-[450px] flex items-end rounded-xl bg-muted animate-pulse justify-end"></div>
    </div>
  )
  return (
    <div className="container pt-6 pb-10 bg-card rounded-3xl">
      <div className="flex flex-col justify-center gap-1">
        <h3 className="text-3xl font-bold">{selectedChart}</h3>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 bg-success-secondary text-success-secondary-foreground text-xs">
            <TbMathEqualLower size={14} />
            {metric?.good}
          </span>
          <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 bg-yellow-900/50 text-yellow-600 text-xs">
            <TbMathEqualLower size={14} />
            {metric?.mid}
          </span>
          <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 bg-red-900/50 text-red-600 text-xs">
            {metric?.poor}
            <TbMathGreater size={14} />
          </span>
        </div>
      </div>
      <div className="relative w-full h-fit">
        <div className="w-full z-10 h-[40dvh] flex pl-16 items-end justify-end">
          {
            group_keys.map(
              item => {
                const target = group[item]
                const mid = target ? (target.map(item => item.value).reduce((a, b) => a + b) / target.length) / 1000 : 0
                const status = metric ? mid <= metric?.good ? "good" : mid > metric?.good && metric.mid >= mid ? "needs-improvement" : "poor" : "poor"
                const value = target ? String(mid.toFixed(3)) + " s." : ""
                const percent = ((target?.length || 0) / max) * 100
                if (!target) return <></>
                return <ChartBar
                  withDate
                  date={`${dayjs(item).format("D MMMM")} (${target.length})`}
                  barClassName={
                    status === "good"
                      ? "text-success-secondary-foreground group-hover/chart:bg-success-primary group-hover/chart:text-success-primary-foreground bg-success-secondary"
                      : status === "needs-improvement"
                        ? "text-yellow-600 group-hover/chart:bg-yellow-900 bg-yellow-900/30"
                        : status === "poor"
                          ? "text-red-600 group-hover/chart:bg-red-900 bg-red-900/30"
                          : ""
                  }
                  key={item}
                  percent={percent}
                  value={value}
                />
              }
            )
          }
        </div>
        <div className="absolute top-0 left-0 z-0 w-full h-full pr-3 pt-11">
          <div className="relative z-0 w-full h-full">
            <div className="absolute top-0 left-0 flex items-center w-full gap-2 h-[1px]">
              <span className="text-sm text-muted-foreground">{max}</span>
              <Separator className="z-0" />
            </div>
            <div className="absolute top-[25%] left-0 flex items-center w-full gap-2 h-[1px]">
              <span className="text-sm text-muted-foreground">{(max * (3 / 4)).toFixed(0)}</span>
              <Separator className="z-0" />
            </div>
            <div className="absolute top-[50%] left-0 flex items-center w-full gap-2 h-[1px]">
              <span className="text-sm text-muted-foreground">{(max * (2 / 4)).toFixed(0)}</span>
              <Separator className="z-0" />
            </div>
            <div className="absolute top-[75%] left-0 flex items-center w-full gap-2 h-[1px]">
              <span className="text-sm text-muted-foreground">{(max * (1 / 4)).toFixed(0)}</span>
              <Separator className="z-0" />
            </div>
            <div className="absolute bottom-0 left-0 flex items-center w-full h-[1px] gap-2">
              <span className="text-sm text-muted-foreground">0</span>
              <Separator className="z-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export { ChartOutput }
