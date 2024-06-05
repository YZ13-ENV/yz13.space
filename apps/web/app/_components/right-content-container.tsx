import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"

type Props = {
  className?: string
  children?: ReactNode
}
const RightContentContainer = ({ children, className = "" }: Props) => {
  return (
    <div className={cn(
      "max-w-xl lg:mr-auto lg:ml-6 mx-auto h-full space-y-12 py-3 px-6",
      className
    )}>
      {children}
    </div>
  )
}
export { RightContentContainer }
