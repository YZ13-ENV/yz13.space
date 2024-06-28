import { cn } from "@/packages/ui/lib/utils"
import { HTMLAttributes } from "react"

interface BodyProps extends HTMLAttributes<HTMLBodyElement> { }

const Body = ({ className, ...props }: BodyProps) => {
  return <body id="root" className={cn("", className)} {...props} />
}
export { Body }
