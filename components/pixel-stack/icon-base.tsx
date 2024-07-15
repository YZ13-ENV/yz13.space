import { cn } from "@repo/ui/cn"
import icon from "./icon.module.css"
export interface SVGProps
  extends React.HTMLAttributes<SVGElement> {
  size?: number
}

const IconBase = ({ className, size = 24, ...props }: SVGProps) => {
  return (
    <svg width={size} height={size} className={cn(icon["svg-icon"], className)} viewBox="0 0 1 1" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} />
  )
}
export { IconBase }
