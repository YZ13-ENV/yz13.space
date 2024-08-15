"use client"
import { AnimatePresence, m } from "framer-motion"
import { ReactNode, useEffect, useMemo } from "react"
import { cn } from "yz13/cn"
import { contentConfig, defaultUnit } from "../content/config"
import { useDockTab } from "../store/dock.store"

type ContentProps = {
  content: { [key: string]: ReactNode }
}

const DockContent = ({ content }: ContentProps) => {
  const { tab, setTab } = useDockTab()
  const isInContent = tab ? tab in content : false
  const item = tab ? contentConfig[tab] ?? defaultUnit : defaultUnit
  const keys = useMemo(() => { return Object.keys(content) }, [content])
  useEffect(() => {
    if (tab) {
      const isEmpty = keys.length === 0
      const isNotExist = tab ? !keys.includes(tab) : false
      if (isEmpty || isNotExist) setTab(undefined)
    }
  }, [keys, tab])
  return (
    <AnimatePresence>
      {
        isInContent &&
        <m.div
          style={{ maxWidth: "100dvw" }}
          initial={{ opacity: 0, width: "100%", height: 0 }}
          animate={{ height: item.height, width: item.width, opacity: 1 }}
          exit={{ opacity: 0, width: "100%", height: 0 }}
          transition={{
            type: "spring",
            bounce: 0.4,
            ease: "linear",
            damping: 13,
            stiffness: 50,
          }}
          className={cn(
            "relative overflow-hidden flex flex-col justify-center items-center max-w-full",
          )}
        >
          {content[tab as keyof typeof content]}
        </m.div>
      }
    </AnimatePresence>
  )
}
export { DockContent }
