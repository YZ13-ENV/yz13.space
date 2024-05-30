import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"

type Props = {
  className?: string
  children?: ReactNode
}
const Wrapper = ({ children, className = "" }: Props) => {
  return (
    <div className={cn(
      "w-full border rounded-2xl flex flex-col bg-accents-1",
      "p-2 flex flex-col items-center justify-center",
      className
    )}>
      {children}
    </div>
  )
}
export { Wrapper }
