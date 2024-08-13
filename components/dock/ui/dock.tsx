"use client"
import { useClickAway } from "ahooks"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ElementRef, ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "yz13/cn"
import { useDockTab } from "../store/dock.store"

export type WrapperProps = {
  children?: ReactNode
}
const Wrapper = ({ children }: WrapperProps) => {
  const pathname = usePathname()
  const ref = useRef<ElementRef<"div">>(null)
  const [show, setShow] = useState<boolean>(false)
  const { setTab, tab } = useDockTab()
  const hasActiveTab = !!tab
  useEffect(() => {
    setTab(undefined)
  }, [pathname])
  useEffect(() => {
    if (typeof document !== "undefined") setShow(true)
  }, [typeof document])
  useClickAway(() => setTab(undefined), ref)
  return (
    <motion.footer
      layout
      whileHover={{
        scale: hasActiveTab ? 1 : 1.025,
      }}
      initial={{
        width: "36px",
        bottom: "-64px"
      }}
      animate={{
        width: "fit-content",
        bottom: "24px"
      }}
      transition={{
        type: "spring",
        bounce: 0.4,
        ease: "linear",
        damping: 13,
        stiffness: 150,
        // duration: 4,
      }}
      ref={ref}
      id="dock"
      className={cn(
        "bg-background min-h-10 z-50 flex flex-col items-center justify-center border shadow-2xl",
        "p-2 rounded-2xl",
        "max-w-full"
      )}
    >
      {
        show &&
        children
      }
    </motion.footer>
  )
}

export type ContainerProps = {
  children?: ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full fixed bottom-3 left-0 z-20 h-16 flex items-end justify-center">
      {children}
    </div>
  )
}

export { Container, Wrapper }

