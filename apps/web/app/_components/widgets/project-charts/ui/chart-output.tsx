"use client"
import { Vitals } from "@/api/web-vitals"
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
    <div className="container">
      <div className="flex flex-col justify-center gap-1">
        <h3 className="text-3xl font-bold">{selectedChart}</h3>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 bg-green-900/50 text-green-600 text-xs">
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
      <div className="w-full h-[40dvh] flex items-end justify-end">
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
                    ? "text-green-600 group-hover/chart:bg-green-900 bg-green-900/30"
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
    </div>
  )
}
export { ChartOutput }
