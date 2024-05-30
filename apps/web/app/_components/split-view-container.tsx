import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"

type Props = {
  className?: string
  children?: ReactNode
}
const SplitViewContainer = ({ children, className }: Props) => {
  return (
    <div className={cn("flex lg:flex-row lg:max-w-full max-w-xl lg:mx-0 mx-auto flex-col lg:divide-x divide-x-0 w-full justify-center min-h-screen", className)}>{children}</div>
  )
}
export { SplitViewContainer }
