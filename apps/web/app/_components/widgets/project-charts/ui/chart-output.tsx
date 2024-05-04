"use client"
import { Vitals } from "@/api/web-vitals"
import dayjs from "dayjs"
import { groupBy, keys } from "lodash"
import { useEffect } from "react"
import { useCharts } from "../store/charts-store"
import { useSelectChart } from "../store/select-chart"
import { ChartBar } from "./chart-bar"

type Props = {
  data?: Vitals[]
}
const ChartOutput = ({ data = [] }: Props) => {
  const { charts, setCharts } = useCharts()
  const selectedChart = useSelectChart(state => state.selected)
  const chart = charts.filter(chart => chart.name === selectedChart)
  const group = groupBy(charts.map(chart => ({ ...chart, created_at: dayjs(chart.created_at).format("YYYY-MM-DD") })), "created_at")
  const group_keys = keys(group)
  console.log(group_keys, group)
  useEffect(() => {
    if (data.length !== 0) setCharts(data)
  }, [data])
  if (!chart) return (
    <div className="container">
      <div className="w-full h-[40dvh] flex items-end justify-end"></div>
    </div>
  )
  return (
    <div className="container">
      <div className="w-full h-[40dvh] flex items-end justify-end">
        {
          group_keys.map(item => <ChartBar withDate date={dayjs(item).format("D MMMM")} key={item} percent={group[item]?.length} />)
        }
        {/* <ChartBar date="21 April" withDate percent={100} />
        <ChartBar percent={66} />
        <ChartBar date="23 April" withDate percent={75} />
        <ChartBar percent={50} />
        <ChartBar date="25 April" withDate percent={90} />
        <ChartBar percent={34} />
        <ChartBar date="27 April" withDate percent={16} />
        <ChartBar percent={5} /> */}
      </div>
    </div>
  )
}
export { ChartOutput }
