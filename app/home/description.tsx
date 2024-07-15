"use client"
import { cn } from "@repo/ui/cn"
import { useInterval } from "ahooks"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const Description = ({ description = [] }: { description?: string[] }) => {
  const [index, setIndex] = useState<number | null>(null)
  const [stopAnimation, setStopAnimation] = useState<boolean>(true)
  const [isOut, setIsOut] = useState<boolean>(true)
  const totalIndex = (description.length - 1)
  useInterval(() => {
    if (index !== null) {
      const isLastIndex = totalIndex === index
      if (isLastIndex) setIndex(0)
      if (!isLastIndex) setIndex(index + 1)
    } else setIndex(0)
  }, stopAnimation ? undefined : 1200)
  useEffect(() => {
    if (isOut) setStopAnimation(false)
  }, [isOut])
  return (
    <p
      className="text-secondary inline-flex flex-wrap text-lg items-start gap-y-0 gap-x-1"
      onMouseEnter={() => {
        setStopAnimation(true)
        setIsOut(false)
      }}
      onMouseLeave={() => {
        setIndex(null)
        setIsOut(true)
      }}
    >
      <span className="sr-only">{description.join(" ")}</span>
      {
        description.map(
          (item, textIndex) => {
            const isMatch = index === textIndex
            return <span
              onMouseEnter={() => setIndex(textIndex)}
              key={`${item}#${textIndex}`}
              className={cn(
                "relative text-inherit cursor-default",
                "inline-flex items-center justify-center"
              )}
            >
              <span className={cn(
                "z-10 transition-colors hover:text-foreground",
                isMatch ? "text-foreground" : ""
              )}>{item}</span>
              {
                isMatch &&
                <motion.span
                  layoutId="text-wrapper-animated"
                  className="w-full p-2 absolute z-[-1] h-full rounded-md bg-yz-neutral-300"
                />
              }
            </span>
          })
      }
    </p>
  )
}
export { Description }
