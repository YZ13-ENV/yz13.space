import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"

const PageContainer = ({ children, className = "" }: { className?: string, children?: ReactNode }) => {
  return <div className={cn("container", className)}>{children}</div>
}
const SectionContainer = ({ children, className = "" }: { className?: string, children?: ReactNode }) => {
  return <div className={cn("max-w-4xl mx-auto w-full", className)}>{children}</div>
}
export { PageContainer, SectionContainer }
