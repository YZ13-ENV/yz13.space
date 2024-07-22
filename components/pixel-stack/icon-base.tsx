import { cn } from "@repo/ui/cn"
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
        "opacity-75 hover:opacity-100 group-hover:opacity-100 transition-all",
        className
      )}
      viewBox="0 0 1 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    />
  )
}
export { IconBase }
