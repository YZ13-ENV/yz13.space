import { cn } from "@repo/ui/cn"

type Props = {
  size?: "lg" | "md" | "sm"
  percent?: number
}
const Circle = ({ size = "md", percent = 0 }: Props) => {
  const converted_size = size === 'md' ? 36 : size === 'lg' ? 64 : size === 'sm' ? 24 : 64
  const circle_size = 100
  const circumference = 282.7433388230814
  const gap_percent = 5
  const offset_factor = 0
  const offset_factor_secondary = 1 - offset_factor
  const percent_to_px = "2.827433388230814px"
  const percent_to_deg = 3.6
  const secondary_percent = (100 - percent) - 10
  const stroke = percent * circumference
  const partOfRotateSecondary = gap_percent * percent_to_deg * offset_factor_secondary
  const partOfRotate = gap_percent * offset_factor * percent_to_deg
  return (
    <div
      style={{ width: `${converted_size}px` }}
      className="relative w-fit aspect-square flex-col flex items-center justify-center"
    >
      <span className={cn(
        size === 'md' ? "text-sm" : size === 'lg' ? 'text-lg' : size === 'sm' ? "text-xs" : "text-lg",
        "absolute font-medium"
      )}>{percent.toFixed(0)}</span>
      <svg
        style={{ transform: "translateZ(0)" }}
        fill="none"
        width={converted_size}
        height={converted_size}
        strokeWidth="2"
        viewBox="0 0 100 100"
        shapeRendering="crispEdges"
        className="block align-middle overflow-visible"
      >
        <circle
          cx={circle_size / 2}
          cy={circle_size / 2}
          r={circle_size / 2 - 5}
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          shapeRendering="geometricprecision"
          className="box-border"
          stroke="hsl(var(--yz13-error-foreground))"
          style={{
            opacity: 1,
            strokeDasharray: `calc(${secondary_percent} * ${percent_to_px}) ${circumference}`,
            transform: `rotate(calc(1turn - 90deg - (${gap_percent} * ${percent_to_deg}deg * ${offset_factor_secondary}))) scaleY(-1)`,
            transformOrigin: `calc(${circle_size}px / 2) calc(${circle_size}px / 2)`
          }}
        >
        </circle>
        <circle
          cx={circle_size / 2}
          cy={circle_size / 2}
          r={circle_size / 2 - 5}
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          shapeRendering="geometricprecision"
          className="box-border"
          strokeDasharray={stroke}
          stroke="hsl(var(--yz13-success-foreground))"
          style={{
            opacity: 1,
            strokeDasharray: `calc(${percent} * ${percent_to_px}) ${circumference}`,
            transform: `rotate(calc(-90deg + ${gap_percent} * ${offset_factor} * ${percent_to_deg}deg))`,
            transitionProperty: "stroke-dasharray, transform",
            transformOrigin: `calc(${circle_size}px / 2) calc(${circle_size}px / 2)`
          }}
        ></circle>
      </svg>
    </div>
  )
}

export default Circle