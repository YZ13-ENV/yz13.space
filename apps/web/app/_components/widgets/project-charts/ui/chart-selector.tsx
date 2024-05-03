"use client"
import { Button } from "@repo/ui/button"
import { useEffect } from "react"
import { useSelectChart } from "../store/select-chart"
import { ChartTab } from "./project-charts"

type Props = {
  charts?: ChartTab[]
}
const ChartSelector = ({ charts = [] }: Props) => {
  const { selected, setSelected } = useSelectChart()
  useEffect(() => {
    if (charts.length !== 0) setSelected(charts[0]?.value as string)
  }, [charts])
  return (
    <div className="container">
      <div className="w-full rounded-full bg-card h-10 flex items-center justify-center">
        {
          charts.map(
            chart => {
              const isSelected = chart.value === selected
              return (
                <Button
                  onClick={() => setSelected(chart.value)}
                  className="w-full line-clamp-1"
                  key={chart.value}
                  variant={isSelected ? "default" : "ghost"}
                >
                  <span className="line-clamp-1 inline-block w-full">{chart.label}</span>
                </Button>
              )
            })
        }
      </div>
    </div>
  )
}
export { ChartSelector }
