import { cn } from "@/packages/ui/lib/utils"
import { forwardRef } from "react"
import { IconType } from "react-icons/lib"


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, icon, children, ...props }, ref) => {
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
  })
export { Button }
