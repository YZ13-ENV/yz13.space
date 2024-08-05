"use client"
import { Button } from "@yz13/mono/components/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ReactNode } from "react"
import { BiFullscreen, BiRightArrowAlt } from "react-icons/bi"
import { cn } from "yz13/cn"

type DefaultProps = {
  className?: string
  children?: ReactNode
}

export type ContainerProps = {
  hovered?: boolean
  focused?: boolean
} & DefaultProps




export default ({ focused = false, hovered = false, children, className }: ContainerProps) => {
  return (
    <motion.section
      whileHover={hovered ? { scale: 1.025 } : undefined}
      whileFocus={focused ? { scale: 1.025 } : undefined}
      className={cn(
        "flex flex-col group cursor-pointer bg-background gap-1.5 p-3 rounded-2xl border-2 hover:border-foreground max-w-lg w-full mx-auto",
        hovered ? "hover:shadow-2xl transition-shadow" : "transition-all",
        focused ? "" : "",
      )}
      transition={{
        type: "spring",
        bounce: 0.4,
        ease: "linear",
        damping: 13,
        stiffness: 150,
        // duration: 4,
      }}
    >
      {children}
    </motion.section>
  )
}

export type HeaderProps = {
  expandable?: boolean
  link?: string
} & DefaultProps

const Header = ({
  children,
  className,
  link,
  expandable = false
}: HeaderProps) => {
  return (
    <div className={cn("w-full justify-between flex items-center gap-2", className)}>
      <div className="flex items-center gap-2">
        {children}
      </div>
      <div className="flex items-center">
        {expandable && <Button className="size-7" variant="ghost" size="icon"><BiFullscreen size={16} /></Button>}
        {!!link && <Button className="size-7" variant="secondary" size="icon" asChild><Link href={link}><BiRightArrowAlt size={16} /></Link></Button>}
      </div>
    </div>
  )
}

export type ContentProps = {} & DefaultProps

const Content = ({ children, className = "" }: ContentProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export { Content, Header }

