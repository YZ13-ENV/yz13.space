"use client"
import { Button } from "@yz13/mono/components/button"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import Link from "next/link"
import { ReactNode, useContext, useRef, useState } from "react"
import { BiDownArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import { LuChevronDown } from "react-icons/lu"
import { cn } from "yz13/cn"
import { useStore } from "zustand"
import { ExpandableContext, Store, createExpandableStore } from "../store/expandable.store"

type DefaultProps = {
  className?: string
  children?: ReactNode
}

type GroupStackProps = {
  stackName?: string
} & DefaultProps

const GroupStack = ({ stackName, children, className = "" }: GroupStackProps) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <div className="flex flex-col gap-3 max-w-lg mx-auto">
      {
        !expanded &&
        <div className="flex items-center w-full justify-between px-2">
          {stackName && <span>{stackName}</span>}
          <Button variant="secondary" className={cn("rounded-full", !!stackName ? "" : "mx-auto")} size="sm"><BiDownArrowAlt size={16} /> Click to expand</Button>
        </div>
      }
      <motion.div
        layout
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full group max-w-lg relative mx-auto transition-all",
          expanded ? "space-y-6" : "-space-y-80",
          className
        )}
        transition={{
          type: "spring",
          bounce: 0.4,
          ease: "linear",
          damping: 13,
          stiffness: 150,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export interface ExpandableProps extends DefaultProps {

}

const Expandable = ({ className, children }: ExpandableProps) => {
  const store = useContext(ExpandableContext)
  if (!store) throw new Error('Missing ExpandableContext.Provider in the tree')
  const expanded = useStore(store, state => state.expanded)
  return (
    <AnimatePresence>
      {
        expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "fit-content", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {children}
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export interface ContainerProps extends HTMLMotionProps<"section"> {
  store?: Partial<Store>
  layoutId?: string
  hovered?: boolean
  focused?: boolean
}

const Provider = ({ children, props }: { children?: ReactNode, props?: Partial<Store> }) => {
  const store = useRef(createExpandableStore(props)).current
  return <ExpandableContext.Provider value={store}>{children}</ExpandableContext.Provider>
}

const Wrapper = ({ store, layoutId, focused = false, hovered = false, className, children, ...props }: ContainerProps) => {
  return (
    <Provider props={store}>
      <motion.section
        layout
        layoutId={layoutId}
        whileHover={hovered ? { scale: 1.025 } : undefined}
        whileFocus={focused ? { scale: 1.025 } : undefined}
        className={cn(
          "flex flex-col relative group cursor-pointer bg-background gap-1.5 p-3 rounded-2xl border-2 hover:border-foreground max-w-lg w-full mx-auto",
          hovered ? "hover:shadow-2xl transition-shadow" : "transition-all",
          focused ? "" : "",
          className
        )}
        transition={{
          type: "spring",
          bounce: 0.4,
          ease: "linear",
          damping: 13,
          stiffness: 150,
          // duration: 4,
        }}
        {...props}
      >
        {children}
      </motion.section>
    </Provider>
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
  const store = useContext(ExpandableContext)
  if (!store) throw new Error('Missing ExpandableContext.Provider in the tree')
  const { expanded, setExpanded } = useStore(store)
  return (
    <div className={cn("w-full justify-between flex items-center gap-2", className)}>
      <div className="flex items-center gap-2">
        {children}
      </div>
      <div className="flex items-center">
        {
          expandable &&
          <Button onClick={() => setExpanded(!expanded)} size="icon" className="size-7 rounded-full" variant="ghost">
            <LuChevronDown size={16} className={cn("transition-transform", expanded ? "rotate-0" : "-rotate-90")} />
          </Button>
        }
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

export { Content, Expandable, GroupStack, Header, Provider, Wrapper }

