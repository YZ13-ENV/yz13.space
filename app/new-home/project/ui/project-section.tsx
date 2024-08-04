"use client"
import { ReactNode } from "react"
import { cn } from "yz13/cn"

type DefaultProps = {
  className?: string
  children?: ReactNode
}

type WrapperProps = {} & DefaultProps

const Wrapper = ({ children, className = "" }: WrapperProps) => {
  return (
    <div className={cn("lg:w-2/3 px-6 h-fit gap-3 flex lg:flex-row flex-col ml-auto")}>
      {children}
    </div>
  )
}

type ContentContainerProps = {} & DefaultProps

const Content = ({ children, className }: ContentContainerProps) => {
  return (
    <div className={cn("w-full max-w-lg h-full shrink-0 space-y-6", className)}>
      {children}
    </div>
  )
}

type SubContentContainerProps = {} & DefaultProps

const SubContent = ({ children, className }: SubContentContainerProps) => {
  return (
    <div className={cn("w-full h-full", className)}>
      {children}
    </div>
  )
}
type ContentItemGroupProps = {} & DefaultProps

const ContentItemGroup = ({ children, className }: ContentItemGroupProps) => {
  return (
    <div className={cn("w-full h-fit p-3 group space-y-3 rounded-xl bg-yz-neutral-200", className)}>
      {children}
    </div>
  )
}

type ContentItemProps = {} & DefaultProps

const ContentItem = ({ children, className }: ContentItemProps) => {
  return (
    <div className={cn(
      "w-full p-3 bg-background h-fit",
      "first:rounded-t-xl first:rounded-b-md",
      "last:rounded-b-xl last:rounded-t-md",
      "rounded-md",
      className
    )}>
      {children}
    </div>
  )
}

export { Content, ContentItem, ContentItemGroup, SubContent, Wrapper }
