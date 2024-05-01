import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"


export type GradientCardProps = {
  cardClassName?: string
  gradientClassName?: string
  className?: string
  children?: ReactNode
}
const GradientCard = ({ children, cardClassName = "", className = "", gradientClassName = "" }: GradientCardProps) => {
  return (
    <div className={cn(
      "w-64 group relative aspect-square rounded-xl flex items-center justify-center p-1",
      cardClassName
    )}>
      <div className={cn(
        className,
        "w-full h-full rounded-[inherit] bg-background"
      )}>{children}</div>
      <div className={cn(
        gradientClassName,
        "absolute w-full z-[-1] h-full rounded-[inherit]"
      )} />
      <div className={cn(
        gradientClassName,
        "duration-1000 group-hover:opacity-100 opacity-0 transition-opacity blur-2xl absolute w-full z-[-1] h-full rounded-[inherit]"
      )}
      />
    </div>
  )
}
export { GradientCard }
