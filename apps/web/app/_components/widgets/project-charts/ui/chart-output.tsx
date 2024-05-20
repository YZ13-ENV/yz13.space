"use client"
import { Vitals } from "@/api/web-vitals"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import { flatten, groupBy, keys } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { TbMathEqualLower, TbMathGreater } from "react-icons/tb"
import { getMetricData } from "../api/getMetricData"
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
  const group = groupBy(chart.map(chart => ({ ...chart, created_at: dayjs(chart.created_at).format("YYYY-MM-DD") })).sort((a, b) => dayjs(a.created_at).diff(dayjs(b.created_at), "date")), "created_at")
  const group_keys = keys(group)
  const metric = metrics.find(item => item.name === selectedChart)
  const grouped_charts = groupBy(charts, "name")
  const grouped_charts_keys = keys(grouped_charts)
  const [max, setMax] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const maxes = grouped_charts_keys.map(key => {
      const chart = grouped_charts[key] || []
      const with_formatted_date = chart.map(chart => ({ ...chart, created_at: dayjs(chart.created_at).format("YYYY-MM-DD") })).sort((a, b) => dayjs(a.created_at).diff(dayjs(b.created_at), "date"))
      const grouped_by_date = groupBy(with_formatted_date, "created_at")
      const grouped_by_date_keys = keys(grouped_by_date)
      const lengths = grouped_by_date_keys.map(key => grouped_by_date[key]?.length || 0)
      return lengths
    })
    const union_of_maxes = Math.max(...flatten(maxes))
    setMax(union_of_maxes * 1.25)
  }, [grouped_charts_keys])
  useEffect(() => {
    if (data.length !== 0) setCharts(data)
  }, [data])
  useEffect(() => {
    if (!!metric) setLoading(false)
  }, [metric])
  const today_metric = getMetricData(charts, selectedChart)
  const yesterday_metric = getMetricData(charts, selectedChart, dayjs().subtract(1, "day").format("YYYY-MM-DD"))
  const today_avg = ((today_metric.length !== 0 ? today_metric.map(metric => metric.value).reduce((a, b) => a + b) : 0) / today_metric.length) / 1000 || 0
  const yesterday_avg = ((yesterday_metric.length !== 0 ? yesterday_metric.map(metric => metric.value).reduce((a, b) => a + b) : 0) / yesterday_metric.length) / 1000 || 0
  const today_avg_formatted = String(today_avg.toFixed(3)) + "s."
  const avg_diff = today_avg - yesterday_avg
  if (loading) return (
    <div className="container">
      <div className="w-full h-[450px] flex items-end rounded-xl bg-muted animate-pulse justify-end"></div>
    </div>
  )
  return (
    <div className="container pt-6 pb-10 bg-card rounded-3xl">
      <div className="flex flex-col justify-center gap-1">
        <h3 className="text-3xl text-secondary font-semibold">{selectedChart}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-5xl text-foreground font-bold">{today_avg_formatted}</span>
          <div className="flex flex-col justify-center items-start">
            <span className={cn(avg_diff > 0 ? "text-error-foreground" : avg_diff < 0 ? "text-success-foreground" : "text-secondary", "text-lg")}>
              {avg_diff > 0 && "+"}
              {avg_diff.toFixed(3)}s.
            </span>
            <span className="text-xs text-secondary">vs yesterday</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 bg-success-background text-success-foreground text-xs">
            <TbMathEqualLower size={14} />
            {metric?.good}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 bg-warning-background text-warning-foreground text-xs">
            <TbMathEqualLower size={14} />
            {metric?.mid}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 bg-error-background text-error-foreground text-xs">
            {metric?.poor}
            <TbMathGreater size={14} />
          </span>
        </div>
      </div>
      <div className="relative w-full h-fit">
        <div className="w-full z-10 h-[40dvh] flex pl-6 items-end justify-end">
          <div className="flex justify-end w-full h-full overflow-x-auto">
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
                        ? "text-success-foreground border-4 border-success-border bg-success-background hover:bg-success-background/80"
                        : status === "needs-improvement"
                          ? "text-warning-foreground bg-warning-background border-4 border-warning-border hover:bg-warning-background/80"
                          : status === "poor"
                            ? "text-error-foreground bg-error-background hover:bg-error-background/80 border-4 border-error-border"
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
        </div>
        <div className="absolute top-0 left-0 z-0 w-full h-full pr-3 pt-11">
          <div className="relative z-0 w-full h-full">
            <div className="absolute top-0 left-0 flex items-center w-full gap-2 h-[1px]">
              <span className="text-sm text-muted-foreground">{max.toFixed(0)}</span>
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
