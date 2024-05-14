import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"

const HeaderWrapper = ({ className = "", children }: { className?: string, children?: ReactNode }) => {
  return (
    <header className={cn("w-full flex items-center justify-between h-16 px-6 md:gap-3 gap-1", className)}>
      {children}
    </header>
  )
}
export { HeaderWrapper }
