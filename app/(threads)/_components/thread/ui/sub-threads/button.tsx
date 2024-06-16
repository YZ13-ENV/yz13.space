"use client"
import { cn } from "@/packages/ui/lib/utils"
import { forwardRef } from "react"


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center relative gap-1 z-[2] group/tag text-xs hover:text-foreground text-secondary transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  })
export { Button }
