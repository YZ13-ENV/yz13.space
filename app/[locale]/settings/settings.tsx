import { Children } from "react"
import { cn } from "yz13/cn"




const Wrapper = ({ children, className = "" }: { className?: string, children?: React.ReactNode }) => {
  return (
    <div
      aria-label="settings-section"
      className={cn("flex gap-4 md:!flex-row flex-col", className)}
    >
      {children}
    </div>
  )
}
const Info = ({ children, className = "" }: { className?: string, children?: React.ReactNode }) => {
  return (
    <div
      className={cn("w-1/3", className)}
    >
      {children}
    </div>
  )
}
const Properties = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div
      className={cn(
        "w-2/3",
        className
      )}
    >
      {children}
    </div>
  )
}

export { Info, Properties, Wrapper }
