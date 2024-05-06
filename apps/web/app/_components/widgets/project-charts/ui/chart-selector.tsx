"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { motion } from "framer-motion"
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
      <div className="flex items-center justify-center h-10 mx-auto rounded-full w-fit bg-card">
        {
          charts.map(
            chart => {
              const isSelected = chart.value === selected
              return (
                <Button
                  onClick={() => setSelected(chart.value)}
                  className="relative w-full"
                  key={chart.value}
                  variant="ghost"
                >
                  <span className={cn("inline-block w-full z-[1]", isSelected ? "text-primary-foreground" : "text-muted-foreground")}>{chart.label}</span>
                  {
                    isSelected &&
                    <motion.span layoutId="chart-selected-indicator" className="absolute w-full h-full rounded-full bg-primary" />
                  }
                </Button>
              )
            })
        }
      </div>
    </div>
  )
}
export { ChartSelector }
