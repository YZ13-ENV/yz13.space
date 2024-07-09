"use client"
import { cn } from "@repo/ui/cn"
import { cubicBezier, HTMLMotionProps, motion } from "framer-motion"
import { forwardRef } from "react"

const AnimatedWrapper = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div
        layout
        transition={{
          type: "spring",
          duration: .750,
          delay: 0,
          easings: cubicBezier(.96, .00, .66, 1),
          bounce: .45
        }}
        initial={{ height: "60px" }}
        animate={{ height: "fit-content", minHeight: "60px" }}
        onClick={e => e.stopPropagation()}
        className={cn(
          "max-w-xl border w-full rounded-2xl max-h-full bg-background h-fit",
          className
        )}
        {...props}
      />
    )
  }
)
export { AnimatedWrapper }
