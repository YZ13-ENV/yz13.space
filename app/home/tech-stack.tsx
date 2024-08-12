"use client"
import { HonoIcon } from "@/components/pixel-stack/hono-icon"
import { JestIcon } from "@/components/pixel-stack/jest-icon"
import { MongoDBIcon } from "@/components/pixel-stack/mongodb-icon"
import { NextIcon } from "@/components/pixel-stack/next-icon"
import { NodeIcon } from "@/components/pixel-stack/node-icon"
import { ReactIcon } from "@/components/pixel-stack/react-icon"
import { ShadcnIcon } from "@/components/pixel-stack/shadcn-ui-icon"
import { SupabaseIcon } from "@/components/pixel-stack/supabase-icon"
import { TailwindIcon } from "@/components/pixel-stack/tailwind-icon"
import { TypeScriptIcon } from "@/components/pixel-stack/typescript-icon"
import { ViteIcon } from "@/components/pixel-stack/vite-icon"
import { ZodIcon } from "@/components/pixel-stack/zod"
import { Separator } from "@yz13/mono/components/separator"
import { Switch } from "@yz13/mono/components/switch"
import { useDebounceEffect } from "ahooks"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode, useState } from "react"
import { cn } from "yz13/cn"

type Dot = {
  x: number
  y: number
}

const Wrapper = ({ children, className }: { className?: string, children?: ReactNode }) => {
  return (
    <div className={cn(
      "w-full group/stack aspect-square relative flex items-center justify-center",
      className
    )}
    >
      <div className="flex items-center justify-center z-10 gap-4 p-4 rounded-full bg-background">
        {children}
      </div>
    </div>
  )
}

const Backend = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{
        type: "spring",
        bounce: 0.4,
        ease: "linear",
        damping: 13,
        stiffness: 150,
        // duration: 4,
      }}
      className="w-full grid grid-cols-3 grid-rows-2"
    >
      <Wrapper className="border-r border-b">
        <NodeIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="border-r border-b">
        <HonoIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="border-b">
        <SupabaseIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="border-r">
        <JestIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="border-r">
        <MongoDBIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="">
        <ZodIcon size={64} className="z-0" />
      </Wrapper>
    </motion.div>

  )
}
const Frontend = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{
        type: "spring",
        bounce: 0.4,
        ease: "linear",
        damping: 13,
        stiffness: 150,
        // duration: 4,
      }}
      className="w-full grid grid-cols-3 grid-rows-2 z-0"
    >
      <Wrapper className="border-b border-r">
        <NextIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="border-b border-r">
        <ReactIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="border-b">
        <ViteIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="border-r">
        <TypeScriptIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="border-r">
        <TailwindIcon size={64} className="z-0" />
      </Wrapper>
      <Wrapper className="">
        <ShadcnIcon size={64} className="z-0" />
      </Wrapper>
    </motion.div>
  )
}

const TechStack = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [stack, setStack] = useState<string | null>("frontend")
  useDebounceEffect(() => {
    if (checked) {
      setStack("backend")
    } else {
      setStack("frontend")
    }
  }, [checked], { wait: 250 })
  return (
    <>
      <Separator className="my-3" />
      <div className="flex items-center gap-3 justify-center">
        <button
          onClick={() => {
            if (checked === true) setStack(null)
            setChecked(false)
          }}
          className={checked ? "text-secondary" : "text-foreground"}>Frontend</button>
        <Switch checked={checked} onCheckedChange={checked => {
          setStack(null)
          setChecked(checked)
        }} />
        <button
          onClick={() => {
            if (checked === false) setStack(null)
            setChecked(true)
          }}
          className={checked ? "text-foreground" : "text-secondary"}>Backend</button>
      </div>
      <Separator className="my-3" />
      <AnimatePresence>
        {stack === "backend" && <Backend />}
        {stack === "frontend" && <Frontend />}
      </AnimatePresence>
    </>
  )
}
export { TechStack }
