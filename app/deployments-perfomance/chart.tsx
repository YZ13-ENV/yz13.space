"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@repo/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/chart"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
dayjs.extend(duration)
dayjs.extend(relativeTime)


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


function PerformanceChart({ data = [] }: { data?: any[] }) {
  const difference = (start: number, end: number) => {
    return dayjs.duration(end - start)
  }
  const prepared = data.map(deployment => {
    const started_at = deployment.buildingAt as number
    const ready_at = deployment.ready as number
    const diff = difference(started_at, ready_at)
    const formatted = diff.format("mm:ss")
    const deploymentDiff = diff
    const formattedDeploymentDiff = deploymentDiff.asSeconds()
    const formattedDate = dayjs(started_at).format("HH:mm")
    return { ...deployment, formattedDate: formattedDate, readyAtFormatted: formatted, readyAt: formattedDeploymentDiff }
  })
  return (
    <Card className="bg-background shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Deployments performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={prepared}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="formattedDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              formatter={(value) => {
                const formatted = dayjs.duration(value as number, "seconds").format("mm:ss")
                return formatted
              }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              fill="hsl(var(--yz13-neutral-300))"
              dataKey="readyAt"
              strokeWidth={2}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
export { PerformanceChart }

