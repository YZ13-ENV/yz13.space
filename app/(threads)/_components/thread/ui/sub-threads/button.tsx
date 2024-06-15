import { cn } from "@/packages/ui/lib/utils"
import { ReactNode } from "react"
import { IconType } from "react-icons/lib"


type ButtonProps = {
  className?: string
  children?: ReactNode
  icon?: IconType
}
const Button = ({ children, className, icon }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center relative gap-1 group/tag text-xs hover:text-foreground text-secondary transition-colors",
        className
      )}
    >
      <span className="relative flex items-center justify-center">
        {icon && icon({ size: 16, className: "z-[1]" })}
        <span className="w-7 h-7 bg-transparent group-hover/tag:bg-yz-neutral-100 transition-colors rounded-full absolute" />
      </span>
      <span className="z-[1] text-inherit">{children}</span>
    </button>
  )
}
export { Button }
