import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accents-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow hover:bg-accents-8/90",
        error:
          "bg-error-background text-error-foreground shadow-sm hover:bg-error-background/80",
        "error-default":
          "bg-error-foreground text-error-background shadow-sm hover:bg-error-foreground/80",
        warning:
          "bg-warning-background text-warning-foreground shadow-sm hover:bg-warning-background/80",
        success:
          "bg-success-background text-success-foreground shadow-sm hover:bg-success-background/80",
        "success-default":
          "bg-success-foreground text-success-background shadow-sm hover:bg-success-foreground/80",
        outline:
          "border border-accents-3 bg-background shadow-sm hover:bg-accents-2/70 hover:text-accents-7",
        secondary:
          "rounded-full bg-accents-2/70 backdrop-sm text-accents-7 shadow-sm hover:bg-accents-3/90",
        ghost: "hover:bg-accents-2/70 hover:text-accents-7",
        link: "text-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
