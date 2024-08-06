import { HTMLAttributes } from "react"
import { cn } from "yz13/cn"

interface BodyProps extends HTMLAttributes<HTMLBodyElement> { }

const Body = ({ className, ...props }: BodyProps) => {
  return <body id="root" className={cn("", className)} {...props} />
}
export { Body }
