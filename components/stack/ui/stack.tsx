"use client"
import { Button } from "@yz13/mono/components/button"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import Link from "next/link"
import { ReactNode, useContext, useRef } from "react"
import { BiRightArrowAlt } from "react-icons/bi"
import { LuChevronDown } from "react-icons/lu"
import { cn } from "yz13/cn"
import { useStore } from "zustand"
import { ExpandableContext, Store, createExpandableStore } from "../store/expandable.store"

type DefaultProps = {
  className?: string
  children?: ReactNode
}

type GroupStackProps = {
} & DefaultProps

const Group = ({ children, className = "" }: GroupStackProps) => {
  return (
    <div className={cn("w-full -space-y-0.5 group/stack", className)}>
      {children}
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
            className={className}
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
          "flex flex-col relative cursor-pointer bg-background gap-1.5 p-3 border-2 hover:border-foreground max-w-lg w-full mx-auto",
          "rounded-2xl hover:z-10",
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

export { Content, Expandable, Group, Header, Provider, Wrapper }

