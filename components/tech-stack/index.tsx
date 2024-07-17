"use client"
import { cn } from "@repo/ui/cn"
import { useInterval } from "ahooks"
import { cubicBezier, motion, MotionValue } from "framer-motion"
import { ReactNode, useEffect, useState } from "react"

export type Stack = {
  label: string
  value: string
  icon: ReactNode
  color?: string
  y: number
}

const AutoSwitcher = ({
  maxIndex,
  index,
  onIndex,
  delay = 3000,
  stop = false
}: {
  stop?: boolean,
  delay?: number,
  maxIndex: number
  index: number | null
  onIndex: (index: number | null) => void
}) => {
  const [stopAnimation, setStopAnimation] = useState<boolean>(true)
  useInterval(() => {
    if (index !== null) {
      const isLastIndex = maxIndex === index
      if (isLastIndex) onIndex(0)
      if (!isLastIndex) onIndex(index + 1)
    } else onIndex(0)
  }, stopAnimation ? undefined : delay)
  useEffect(() => {
    if (stopAnimation) onIndex(null)
  }, [stopAnimation])
  useEffect(() => {
    setStopAnimation(stop)
  }, [stop])
  return <></>
}

const Wrapper = ({
  children,
  className = "",
  onLeave,
  onEnter
}: {
  className?: string,
  children?: ReactNode,
  onLeave?: () => void
  onEnter?: () => void
}) => {
  return (
    <div
      className={className}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
    >
      {children}
    </div>
  )
}

const Header = ({ title = "", children }: { title?: string, children?: ReactNode }) => {
  return (
    <div
      className="w-full flex flex-col justify-center col-span-2 h-40 p-12"
    >
      <span className="text-xl text-foreground/75">{title}</span>
      {children}
    </div>
  )
}

const HeaderList = ({ stack = [], y, selected }: { stack?: Stack[], y: MotionValue<any>, selected: string | null }) => {
  return (
    <div className="w-full h-7 overflow-hidden relative">
      <motion.div
        style={{ y }}
        transition={{
          type: "spring",
          delay: 0,
          duration: .2,
          bounce: 0,
          damping: 0,
          easings: cubicBezier(.17, .67, .83, .67)
        }}
        className="absolute w-full h-fit flex flex-col"
      >
        <span className={cn("h-7 text-xl inline-block", !selected ? "opacity-100" : "opacity-0")}>Frontend</span>
        {
          stack
            .map(item => {
              const isSelected = item.value === selected
              return (
                <span
                  key={item.label + "#" + item.y}
                  style={{ color: item.color }}
                  className={cn("h-7 text-foreground/75 text-xl inline-block", isSelected ? "opacity-100" : "opacity-0")}
                >
                  {item.label}
                </span>
              )
            })
        }
      </motion.div>
    </div>
  )
}

const Item = ({
  stack,
  className = "",
  onChange,
}: {
  stack: Stack,
  onChange?: (change: string | null) => void
  className?: string
}) => {
  return (
    <div
      onMouseEnter={() => onChange && onChange(stack.value)}
      onMouseLeave={() => onChange && onChange(null)}
      className={cn(
        "w-full h-40 flex items-center justify-center",
        className
      )}
    >
      {stack.icon}
    </div>
  )
}


export { AutoSwitcher, Header, HeaderList, Item, Wrapper }

