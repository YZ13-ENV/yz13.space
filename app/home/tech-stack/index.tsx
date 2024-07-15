"use client"
import icon from "@/components/pixel-stack/icon.module.css"
import { NextIcon } from "@/components/pixel-stack/next-icon"
import { ReactIcon } from "@/components/pixel-stack/react-icon"
import { ShadcnIcon } from "@/components/pixel-stack/shadcn-ui-icon"
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon"
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon"
import { ViteIcon } from "@/components/pixel-stack/vite-icon"
import { cn } from "@repo/ui/cn"
import { cubicBezier, motion, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

const stack = [
  {
    label: "Next",
    value: "next",
    color: "#000",
    icon: NextIcon,
    y: -1 * 28
  },
  {
    label: "React",
    value: "react",
    color: "#139eca",
    icon: ReactIcon,
    y: -2 * 28
  },
  {
    label: "TypeScript",
    value: "typescript",
    icon: TypeScriptIcon,
    color: "#3178c6",
    y: -3 * 28
  },
  {
    label: "Vite",
    value: "vite",
    color: "#8779fe",
    icon: ViteIcon,
    y: -4 * 28
  },
  {
    label: "TailwindCSS",
    value: "tailwind",
    color: "#38BDF8",
    icon: TailwindIcon,
    y: -5 * 28
  },
  {
    label: "Shadcn",
    value: "shadcn",
    icon: ShadcnIcon,
    color: "#000",
    y: -6 * 28
  },
]

const TechStack = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const y = useSpring(0)
  const pick = (id: string) => {
    setSelected(null)
    setSelected(id)
  }
  useEffect(() => {
    if (selected) {
      const target = stack.find(item => item.value === selected)
      if (target) y.set(target.y)
    } else y.set(0)
  }, [selected])
  return (
    <div
      className="w-full grid lg:grid-cols-4 grid-cols-2 grid-rows-3 lg:grid-rows-2"
      onMouseLeave={() => setSelected(null)}
    >
      <div
        className="w-full flex flex-col justify-center col-span-2 h-40 p-12"
      >
        <span className="text-xl text-foreground/75">YZ13 Tech stack:</span>
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
      </div>
      {
        stack.map(item => {
          return (
            <div
              onMouseEnter={() => pick(item.value)}
              onMouseLeave={() => setSelected(null)}
              className={cn(icon["icon-wrapper"], "w-full h-40 flex items-center justify-center")}
            >
              {/* @ts-ignore */}
              {item.icon({ size: 48, style: { "--color": item.color } })}
            </div>
          )
        })
      }
    </div>
  )
}
export { TechStack }
