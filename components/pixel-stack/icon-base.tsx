import { cn } from "yz13/cn"
import svg from "./icon.module.css"

export interface SVGProps
  extends React.HTMLAttributes<SVGElement> {
  size?: number
}

const IconBase = ({ className, size = 24, ...props }: SVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={cn(
        svg["svg-icon"],
        "opacity-75 hover:opacity-100 group-hover:opacity-100",
        className
      )}
      fill="none"
      {...props}
      viewBox="0 0 1 1"
      xmlns="http://www.w3.org/2000/svg"
    />
  )
}
export { IconBase }
